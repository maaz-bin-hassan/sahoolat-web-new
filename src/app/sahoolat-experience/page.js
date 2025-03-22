"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);
  const [rms, setRms] = useState("0.000");
  const [status, setStatus] = useState("Calibrating...");
  const llmAudioRef = useRef(null); // LLM audio ref
  const llmAudioAnalyser = useRef(null);
  const llmAudioContext = useRef(null);
  const llmAnimationFrame = useRef(null);

  const voiceThresholdRef = useRef(0.04);
  const silenceTimeout = useRef(null);
  const isSpeaking = useRef(false);
  const recorder = useRef(null);
  const chunks = useRef([]);
  const mediaStream = useRef(null);
  const calibrated = useRef(false);
  const calibrationSum = useRef(0);
  const calibrationFrames = useRef(0);
  const recordingStartTime = useRef(null);
  const voiceActiveTime = useRef(0);
  const voiceStartedAt = useRef(null);

  const CALIBRATION_FRAMES = 90;
  const SILENCE_DURATION_MS = 2000;

  useEffect(() => {
    fetch("/animation/animation main 2.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  useEffect(() => {
    let audioContext = null;
    let analyser = null;
    let mic = null;
    let dataArray = null;
    let animationFrameId;

    const setupRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStream.current = stream;

        recorder.current = new MediaRecorder(stream);

        recorder.current.onstop = () => {
          console.log("⏹️ MediaRecorder stopped.");
        };

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        mic = audioContext.createMediaStreamSource(stream);
        mic.connect(analyser);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const animate = () => {
          analyser.getByteTimeDomainData(dataArray);

          let sumSquares = 0;
          for (let i = 0; i < bufferLength; i++) {
            const value = (dataArray[i] - 128) / 128;
            sumSquares += value * value;
          }

          const rmsValue = Math.sqrt(sumSquares / bufferLength);
          const formattedRms = rmsValue.toFixed(3);
          setRms(formattedRms);

          if (!calibrated.current) {
            calibrationFrames.current++;
            calibrationSum.current += rmsValue;
            if (calibrationFrames.current >= CALIBRATION_FRAMES) {
              const avg = calibrationSum.current / calibrationFrames.current;
              voiceThresholdRef.current = avg + 0.015;
              calibrated.current = true;
              setStatus("Listening...");
            } else {
              setStatus("Calibrating...");
              animationFrameId = requestAnimationFrame(animate);
              return;
            }
          }

          const voiceDetected = rmsValue > voiceThresholdRef.current + 0.015; // Added noise margin

          if (voiceDetected) {
            if (llmAudioRef.current && !llmAudioRef.current.paused) {
              llmAudioRef.current.pause();
              llmAudioRef.current.currentTime = 0;
              console.log("⛔ Stopped LLM voice due to user speaking");
              stopLLMAnimation();
            }

            setStatus("Voice Detected");
            if (!isSpeaking.current) {
              startRecording();
              isSpeaking.current = true;
            }

            if (!voiceStartedAt.current) {
              voiceStartedAt.current = Date.now();
            }

            clearTimeout(silenceTimeout.current);
            silenceTimeout.current = null;
          } else {
            if (voiceStartedAt.current) {
              const activeDuration = Date.now() - voiceStartedAt.current;
              voiceActiveTime.current += activeDuration;
              voiceStartedAt.current = null;
            }

            if (isSpeaking.current && !silenceTimeout.current) {
              setStatus("Waiting to stop...");
              silenceTimeout.current = setTimeout(() => {
                stopRecording();
                isSpeaking.current = false;
                setStatus("Saved. Listening...");
              }, SILENCE_DURATION_MS);
            }
          }

          const minSpeed = 0.2;
          const maxSpeed = 2.5;
          const speed = Math.min(maxSpeed, Math.max(minSpeed, rmsValue * 20));
          if (lottieRef.current) {
            lottieRef.current.setSpeed(speed);
          }

          animationFrameId = requestAnimationFrame(animate);
        };

        animate();
      } catch (error) {
        console.error("Mic error:", error);
      }
    };

    setupRecorder();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (audioContext) audioContext.close();
      if (mediaStream.current)
        mediaStream.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startRecording = () => {
    chunks.current = [];
    voiceActiveTime.current = 0;
    voiceStartedAt.current = null;
    if (recorder.current && recorder.current.state !== "recording") {
      recorder.current.start();
      recordingStartTime.current = Date.now();
      console.log("🎙️ Recording started...");
    }
  };

  const stopRecording = () => {
    if (recorder.current && recorder.current.state === "recording") {
      if (voiceStartedAt.current) {
        const activeDuration = Date.now() - voiceStartedAt.current;
        voiceActiveTime.current += activeDuration;
        voiceStartedAt.current = null;
      }

      recorder.current.ondataavailable = async (event) => {
        const blob = new Blob([event.data], { type: "audio/webm" });
        const sizeKB = blob.size / 1024;
        const totalVoiceSec = voiceActiveTime.current / 1000;

        console.log("🧠 Total speaking time:", totalVoiceSec.toFixed(2), "sec");
        console.log("📦 Blob Size:", sizeKB.toFixed(2), "KB");

        if (totalVoiceSec > 0.6 && sizeKB >= 10) {
          await sendToLLM(blob);
        } else {
          console.warn("🛑 Short or invalid input, recording skipped.");
        }

        chunks.current = [];
        voiceActiveTime.current = 0;
      };

      recorder.current.stop();
      console.log("🛑 Recorder stopped.");
    }
  };

  const sendToLLM = async (blob) => {
    setStatus("Sending to LLM...");
    try {
      const formData = new FormData();
      formData.append("audio", blob, `recording-${Date.now()}.webm`);
      formData.append("fingerprint", "demo-session");
      formData.append("language", "en");

      const response = await fetch("/api/voice-conversation", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
        llmAudioRef.current = audio;
        setupLLMVisualizer(audio);
        audio.play();

        // Stop LLM playback if recording goes over 1.5 sec
        const llmInterruptTimer = setInterval(() => {
          if (isSpeaking.current && voiceStartedAt.current) {
            const activeDuration = Date.now() - voiceStartedAt.current;
            if (activeDuration > 1500) {
              if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                stopLLMAnimation();
                clearInterval(llmInterruptTimer);
                console.log("🛑 Stopped LLM playback because user spoke over 1.5s");
              }
            }
          }
          if (audio.ended || audio.paused) {
            clearInterval(llmInterruptTimer);
          }
        }, 100);
        setStatus("Response received & playing...");
      } else {
        setStatus("No audio response.");
      }
    } catch (err) {
      console.error("Error sending to LLM:", err);
      setStatus("Failed to get LLM response.");
    }
  };

  const setupLLMVisualizer = (audio) => {
    if (llmAudioContext.current) {
      llmAudioContext.current.close();
    }

    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const animate = () => {
      analyser.getByteTimeDomainData(dataArray);
      let sumSquares = 0;
      for (let i = 0; i < bufferLength; i++) {
        const val = (dataArray[i] - 128) / 128;
        sumSquares += val * val;
      }
      const rmsValue = Math.sqrt(sumSquares / bufferLength);
      const minSpeed = 0.2;
      const maxSpeed = 2.5;
      const speed = Math.min(maxSpeed, Math.max(minSpeed, rmsValue * 20));
      if (lottieRef.current) {
        lottieRef.current.setSpeed(speed);
      }
      llmAnimationFrame.current = requestAnimationFrame(animate);
    };

    llmAudioContext.current = context;
    llmAudioAnalyser.current = analyser;
    llmAnimationFrame.current = requestAnimationFrame(animate);
  };

  const stopLLMAnimation = () => {
    if (llmAnimationFrame.current) cancelAnimationFrame(llmAnimationFrame.current);
    if (llmAudioContext.current) llmAudioContext.current.close();
    llmAnimationFrame.current = null;
    llmAudioContext.current = null;
    llmAudioAnalyser.current = null;
  };

  return (
    <>
      <Header />
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6">
        {/* Status Panel */}
        <div className="absolute top-6 sm:top-8 left-6 sm:left-8 bg-gray-800/90 px-6 py-4 rounded-xl shadow-lg border border-gray-600 backdrop-blur-md">
          <p className="text-sm font-medium text-gray-300 tracking-wide">
            Mic Input Level
          </p>
          <p className="text-3xl font-bold text-lime-400 leading-tight">{rms}</p>
          <p className="text-xs text-gray-400 mt-1 italic">{status}</p>
        </div>

        {/* Lottie Animation */}
        <div
          className={`transition-all duration-300 rounded-full p-6 shadow-xl ${
            status === "Voice Detected"
              ? "shadow-lime-500/50 bg-gray-900/30"
              : "shadow-gray-700/30 bg-gray-800/30"
          }`}
        >
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              lottieRef={lottieRef}
              style={{ width: 320, height: 320 }}
            />
          ) : (
            <p className="text-lg text-center">Loading animation...</p>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-10 text-center">
          <h1 className="text-xl font-semibold text-gray-200 mb-2">
            Speak to Record
          </h1>
          <p className="text-sm text-gray-400">
            Voice detection starts automatically. Pauses on silence.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
