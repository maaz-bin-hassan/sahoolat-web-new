"use client";

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

export default function Page() {
  const lottieRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);
  const [rms, setRms] = useState("0.000");
  const [status, setStatus] = useState("Calibrating...");

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

          const voiceDetected = rmsValue > voiceThresholdRef.current;

          if (voiceDetected) {
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
      if (mediaStream.current) mediaStream.current.getTracks().forEach((t) => t.stop());
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

      recorder.current.ondataavailable = (event) => {
        const blob = new Blob([event.data], { type: "audio/webm" });
        const sizeKB = blob.size / 1024;
        const totalVoiceSec = voiceActiveTime.current / 1000;

        console.log("🧠 Total speaking time:", totalVoiceSec.toFixed(2), "sec");
        console.log("📦 Blob Size:", sizeKB.toFixed(2), "KB");

        if (totalVoiceSec > 0.6 && sizeKB >= 10) {
          saveRecording(blob);
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

  const saveRecording = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileName = `voice-recording-${Date.now()}.webm`;
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    console.log("💾 Saved:", fileName);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="absolute top-10 left-10 bg-gray-700/80 px-5 py-3 rounded-lg shadow-md border border-gray-500">
        <p className="text-sm text-gray-300">Mic Input Level</p>
        <p className="text-2xl font-semibold text-lime-400">{rms}</p>
        <p className="text-xs text-gray-400 mt-1">{status}</p>
      </div>

      <div
        className={`transition-all duration-200 shadow-2xl rounded-full p-4 ${
          status === "Voice Detected" ? "shadow-lime-500/40" : "shadow-gray-500/20"
        }`}
      >
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            lottieRef={lottieRef}
            style={{ width: 300, height: 300 }}
          />
        ) : (
          <p className="text-lg">Loading animation...</p>
        )}
      </div>

      <h1 className="absolute bottom-10 text-center text-xl font-bold text-gray-300">
        Speak to Record — Pauses Automatically on Silence
      </h1>
    </div>
  );
}
