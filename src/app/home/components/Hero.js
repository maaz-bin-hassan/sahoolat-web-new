"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";
import LaunchingTimer from "@/components/LaunchingTimer";
import Link from 'next/link'
/**
 * Overall States:
 *  - "IDLE": Not in use (popup closed).
 *  - "CALIBRATING": 1 second of measuring baseline noise.
 *  - "LISTENING": Actively recording user speech, checking for silence.
 *  - "PROCESSING": Sending final audio to server.
 *  - "PLAYING": Playing TTS from server.
 */
const phrases = ["Your Voice, Your Solution"];

// 1 second to measure environment noise floor
const CALIBRATION_DURATION = 1000;
// Then we do "LISTENING" until 2s of silence
const MAX_SILENCE_MS = 2000;
const CHECK_SILENCE_INTERVAL = 200;

export default function HeroSection() {
  const [appState, setAppState] = useState("IDLE");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [fingerprint, setFingerprint] = useState("");
  const [messages, setMessages] = useState([]); // { role: 'user'|'assistant', text: string }

  // Audio references
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const processorNodeRef = useRef(null);
  const audioRef = useRef(null);

  // For VAD logic
  const lastVoiceActivityRef = useRef(Date.now());
  const baselineSumRef = useRef(0);
  const baselineCountRef = useRef(0);
  // If calibration fails or user’s environment is extremely quiet, fallback threshold
  const dynamicThresholdRef = useRef(0.05);

  // On mount, get or create a fingerprint
  useEffect(() => {
    const existingFp = localStorage.getItem("fingerprint");
    if (existingFp) {
      setFingerprint(existingFp);
    } else {
      const newFp = `fp-${Date.now()}`;
      localStorage.setItem("fingerprint", newFp);
      setFingerprint(newFp);
    }
  }, []);

  // Cleanup if unmount
  useEffect(() => {
    return () => {
      stopAllMedia();
    };
  }, []);

  // If popup opens -> calibrate & record; if closed -> IDLE
  useEffect(() => {
    if (isPopupOpen) {
      startCalibration();
    } else {
      stopAllMedia();
      setAppState("IDLE");
    }
  }, [isPopupOpen]);

  // ============================
  // 1) CALIBRATION
  // ============================
  async function startCalibration() {
    console.log("[startCalibration] Starting calibration for 1s...");
    setAppState("CALIBRATING");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const sourceNode = audioContext.createMediaStreamSource(stream);
      sourceNodeRef.current = sourceNode;

      // Optional bandpass filter to remove hum/hiss
      const filterNode = audioContext.createBiquadFilter();
      filterNode.type = "bandpass";
      filterNode.frequency.value = 1500;
      filterNode.Q.value = 1;

      // ScriptProcessor to measure RMS
      const processorNode = audioContext.createScriptProcessor(2048, 1, 1);
      processorNodeRef.current = processorNode;

      baselineSumRef.current = 0;
      baselineCountRef.current = 0;

      processorNode.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
          sum += input[i] * input[i];
        }
        const rms = Math.sqrt(sum / input.length);

        baselineSumRef.current += rms;
        baselineCountRef.current++;
      };

      // Connect chain: source -> filter -> processor -> destination
      sourceNode.connect(filterNode);
      filterNode.connect(processorNode);
      processorNode.connect(audioContext.destination);

      // Also create MediaRecorder (don’t start until calibration done)
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm; codecs=opus",
      });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      mediaRecorder.onstop = finalizeRecording;

      // End calibration after 1s
      setTimeout(() => {
        console.log("[CALIBRATION] Timer fired -> finishCalibration()");
        finishCalibration();
      }, CALIBRATION_DURATION);
    } catch (err) {
      console.error("[startCalibration] Mic access error:", err);
      toast.error("Could not access microphone.");
      setAppState("IDLE");
    }
  }

  function finishCalibration() {
    if (baselineCountRef.current === 0) {
      // fallback
      dynamicThresholdRef.current = 0.05;
      console.warn("No calibration data, fallback threshold=0.05");
    } else {
      // average environment RMS
      const avg = baselineSumRef.current / baselineCountRef.current;
      // multiply by 2 or 3 to only detect speech well above baseline
      dynamicThresholdRef.current = avg * 2.0;
      console.log(
        `[finishCalibration] averageNoise=${avg.toFixed(4)}, threshold=${dynamicThresholdRef.current.toFixed(4)}`,
      );
    }

    // Start actual recording
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
    }
    setAppState("LISTENING");
    toast.info("Listening... Speak now.");

    // Switch the processor to “listening” mode
    if (processorNodeRef.current) {
      processorNodeRef.current.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
          sum += input[i] * input[i];
        }
        const rms = Math.sqrt(sum / input.length);

        // If RMS > dynamicThreshold, we consider it “speaking”
        if (rms > dynamicThresholdRef.current) {
          lastVoiceActivityRef.current = Date.now();
        }
      };
    }
    lastVoiceActivityRef.current = Date.now();
    checkForSilence();
  }

  // ============================
  // 2) LISTEN & AUTO-STOP
  // ============================
  function checkForSilence() {
    if (appState !== "LISTENING") return;

    const now = Date.now();
    const elapsedSilentMs = now - lastVoiceActivityRef.current;
    // console.log(`[checkForSilence] ${elapsedSilentMs}ms of silence so far`);
    if (elapsedSilentMs > MAX_SILENCE_MS) {
      console.log("[checkForSilence] 2s of silence => stopListening");
      stopListening();
    } else {
      setTimeout(checkForSilence, CHECK_SILENCE_INTERVAL);
    }
  }

  function stopListening() {
    if (appState !== "LISTENING") return;
    setAppState("PROCESSING");

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      // fallback in case onstop doesn't fire
      setTimeout(() => {
        if (appState === "PROCESSING") {
          finalizeRecording();
        }
      }, 1000);
    }
  }

  // ============================
  // 3) FINALIZE & SEND
  // ============================
  function finalizeRecording() {
    console.log("[finalizeRecording] Called");
    stopMicCapture();

    if (!audioChunksRef.current.length) {
      console.warn("No audio recorded; likely no speech or an error occurred.");
      setAppState("IDLE");
      return;
    }

    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    audioChunksRef.current = [];

    console.log("Sending audio blob to server...");
    handleRecordedAudio(blob);
  }

  function stopMicCapture() {
    if (processorNodeRef.current) {
      processorNodeRef.current.disconnect();
      processorNodeRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }
  }

  async function handleRecordedAudio(blob) {
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("fingerprint", fingerprint);
      formData.append("language", "en");

      const res = await fetch("/api/voice-conversation", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("voice-conversation API responded with an error.");
      }

      const data = await res.json();
      const { assistantMessage, audioBase64 } = data || {};

      setMessages((prev) => [
        ...prev,
        { role: "user", text: "(audio input)" },
        { role: "assistant", text: assistantMessage || "[No text returned]" },
      ]);

      // If TTS audio is returned, play it
      if (audioBase64) {
        playTTS(audioBase64);
      } else {
        setAppState("IDLE");
      }
    } catch (error) {
      console.error("[handleRecordedAudio] Error:", error);
      toast.error("Error processing voice conversation.");
      setAppState("IDLE");
    }
  }

  // ============================
  // 4) PLAY TTS
  // ============================
  function playTTS(base64Audio) {
    try {
      const audioUrl = `data:audio/mp3;base64,${base64Audio}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      setAppState("PLAYING");

      audio.play().catch((err) => {
        console.error("Audio playback error:", err);
        setAppState("IDLE");
      });

      audio.onended = () => {
        setAppState("IDLE");
      };
    } catch (err) {
      console.error("Error playing TTS:", err);
      setAppState("IDLE");
    }
  }

  // Utility: completely stop media
  function stopAllMedia() {
    stopMicCapture();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  // ============================
  // UI Helpers
  // ============================
  const handleMicClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // A fallback manual stop button if needed
  const handleManualStop = () => {
    if (appState === "LISTENING") {
      stopListening();
    }
  };

  function getStatusLabel() {
    switch (appState) {
      case "CALIBRATING":
        return "Calibrating...";
      case "LISTENING":
        return "Listening...";
      case "PROCESSING":
        return "Processing...";
      case "PLAYING":
        return "Speaking...";
      default:
        return "Ready";
    }
  }

  return (
    <section className="relative bg-[#F2F6F7] py-0 overflow-hidden w-full h-screen flex items-center justify-center">
      <LaunchingTimer />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1
          className="mb-3 text-[50px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-brand to-orangebrand">
          Sahoolat.AI
        </h1>

        <div className="relative flex flex-col items-center">
          <Image
            src="/assets/starOrange.png"
            alt="Sparkle Icon"
            width={80}
            height={80}
            className="block md:hidden w-12 h-12 mb-2"
          />
          <div className="relative inline-block">
            <p className="text-[25px] font-bold md:text-[40px] text-orangebrand inline-block">
              <TypeAnimation
                sequence={phrases}
                repeat={1}
                speed={50}
                wrapper="span"
              />
            </p>
            <div className="hidden md:inline absolute md:-top-8 md:-right-12 w-6 h-6 md:w-16 md:h-16 float-animation">
              <Image
                src="/assets/starOrange.png"
                alt="Sparkle Icon"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <p className="mt-5 mb-5 text-brand font-bold text-[20px] md:text-[30px]">
          Find Skilled Experts or Get Hired – Just by Speaking!
        </p>

        <div className="flex items-center justify-center mb-6 space-x-4">
          <div className="relative cursor-pointer">
            <Link href={"/sahoolat-experience"}>
              <Image
                height={400}
                width={400}
                src="/assets/Mic.png"
                alt="Microphone"
                style={{ height: "140px", width: "540px" }}
                className="object-contain transition-transform transform hover:scale-105"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
          <img
            src="/assets/app-store.png"
            alt="Download on the App Store"
            className="cursor-pointer w-60 md:w-72 hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/assets/google-play.png"
            alt="Get it on Google Play"
            className="cursor-pointer w-60 md:w-72 hover:scale-105 transition-transform duration-300"
          />
        </div>

      </div>

      <style jsx>{`
          .float-animation {
              animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
              0% {
                  transform: translateY(0);
              }
              50% {
                  transform: translateY(-6px);
              }
              100% {
                  transform: translateY(0);
              }
          }
      `}</style>
    </section>
  );
}
