"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Recorder from "recorder-js";
import LaunchingTimer from "@/components/LaunchingTimer";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";

const phrases = ["Your Voice, Your Solution"];

export default function HeroSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [fingerprint, setFingerprint] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null); // store the current TTS audio

  // Refs for AudioContext, Recorder instance, and media stream.
  const audioContextRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  const createFingerprint = async () => {
    if (typeof window !== "undefined") {
      const fp = localStorage.getItem("fingerprint") || `fp-${Date.now()}`;
      localStorage.setItem("fingerprint", fp);
      setFingerprint(fp);
      await fetch("/api/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: fp }),
      });
    }
  };

  const sendTextMessageToGpt = async (message) => {
    setMessages((prev) => [...prev, { type: "user", text: message }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint, message }),
      });
      if (!res.ok) throw new Error("GPT API network error");
      const { response } = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
      return response;
    } catch (error) {
      toast.error("Network issue with GPT. Please try again!");
      return null;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const recorder = new Recorder(audioContext, {});
      recorderRef.current = recorder;

      await recorder.init(stream);
      await recorder.start();
      setIsRecording(true);
      toast.info("Recording started...");
    } catch (err) {
      console.error("Error accessing microphone or initializing recorder", err);
      toast.error("Microphone access denied or recorder initialization failed.");
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    try {
      const { blob } = await recorderRef.current.stop();
      setIsRecording(false);

      // stop the mic stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      // close the AudioContext
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      toast.success("Recording stopped and saved (WAV).");

      // Now you can send 'blob' to your STT & GPT pipeline
      await handleRecordedAudio(blob);
    } catch (err) {
      toast.error("Failed to stop recorder properly.");
      console.error(err);
    }
  };
  const handleRecordedAudio = async (audioBlob) => {
    setLoading(true);
    try {
      // 3A. Speech to Text
      const transcribedText = await speechToTextApiCall(audioBlob);
      // 3B. Send text to GPT
      const gptReply = await sendTextMessageToGpt(transcribedText);
      // 3C. If GPT returns a reply, do TTS
      if (gptReply) {
        await playTtsAudio(gptReply);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error processing your audio or GPT request.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // 4. SPEECH-TO-TEXT API CALL
  // -----------------------------------------
  const speechToTextApiCall = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "recording.wav");
    formData.append("language", "en");

    const res = await fetch("/api/audio-to-text", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to transcribe audio");
    const data = await res.json();
    return data.text; // The transcribed text from Whisper
  };

  const playTtsAudio = async (text) => {
    try {
      setIsSpeaking(true); // TTS is about to start
      const res = await fetch("/api/text-to-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: "en" }),
      });
      if (!res.ok) throw new Error("TTS API error");

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // If something is already playing, stop it
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate TTS audio.");
      setIsSpeaking(false);
    }
  };

  const handleToggleRecording = async () => {
    // If TTS is currently speaking, stop it
    await createFingerprint();
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      toast.info("Stopped TTS playback.");
      return;
    }

    // Otherwise, toggle recording on/off
    if (!isRecording) {
      await startRecording();
    } else {
      await stopRecording();
    }
  };

  const handleMicClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    if (isRecording) {
      setIsSpeaking(false);
      stopRecording();
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <section className="relative bg-[#F2F6F7] py-0 overflow-hidden w-full h-screen flex items-center justify-center">
      <LaunchingTimer />
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="mb-3 text-[50px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-brand to-orangebrand">
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
          <div className="relative cursor-pointer" onClick={handleMicClick}>
            <img
              src={"/assets/Mic.png"}
              alt="Microphone"
              style={{ height: "140px", width: "540px" }}
              className="object-contain transition-transform transform hover:scale-105"
            />
          </div>
        </div>
        {savedMessage && (
          <p className="mt-4 text-green-500 font-semibold">{savedMessage}</p>
        )}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black px-4 md:px-0 bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
            <button
              className="absolute top-2 right-2 bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-300"
              onClick={handleClosePopup}
              disabled={loading} // Disable while loading
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-brand mb-4">
              {isRecording ? (
                "Recording..."
              ) : (
                <>
                  {isSpeaking ? "Please listen..." : "Press Talk to Speak"}
                  <img
                    src="https://i.gifer.com/7efs.gif"
                    alt="Listening Animation"
                    className="w-full max-w-[200px] mx-auto"
                  />
                </>
              )}
            </h2>

            {/* Only show the GIF when recording */}
            {isRecording && (
              <img
                src="https://i.gifer.com/7efs.gif"
                alt="Listening Animation"
                className="w-full max-w-[200px] mx-auto"
              />
            )}

            <div className="flex justify-between">
              <div>
                <button
                  className="mt-4 px-6 py-2 bg-orangebrand text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
                  onClick={handleClosePopup}
                  disabled={loading} // Disable while loading
                >
                  Close
                </button>
              </div>
              <div>
                <button
                  className="mt-4 px-8 py-2 bg-orangebrand text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
                  onClick={handleToggleRecording}
                  disabled={loading} // Disable while loading
                >
                  {isRecording ? "Stop Voice" : "Talk"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 0.8s step-end infinite;
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

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
