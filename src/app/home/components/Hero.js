"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Recorder from "recorder-js"; // Ensure recorder-js is installed (npm install recorder-js)
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

  // Refs for AudioContext, Recorder instance, and media stream.
  const audioContextRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  const createFingerprint = async () => {
    const fp = localStorage.getItem("fingerprint") || `fp-${Date.now()}`;
    localStorage.setItem("fingerprint", fp);
    setFingerprint(fp);
    await fetch("/api/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint: fp }),
    });
  };

  const sendTextMessageToGpt = async (message) => {
    setMessages((prev) => [...prev, { type: "user", text: message }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint, message }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const { response } = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
    } catch (error) {
      toast.error("Network issue occurred. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // Start recording using Recorder.js (to produce WAV)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Verify that the stream is valid
      if (!stream || typeof stream.getTracks !== "function") {
        throw new Error("Invalid media stream");
      }
      streamRef.current = stream;
      // Create an AudioContext instance
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      // Initialize Recorder.js with the AudioContext
      const recorder = new Recorder(audioContext, {});
      recorderRef.current = recorder;
      // Initialize recorder with the MediaStream (pass stream directly)
      await recorder.init(stream);
      await recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone or initializing recorder", err);
      toast.error("Microphone access denied or recorder initialization failed.");
    }
  };

  // Stop recording, export the WAV blob, and release resources
  const stopRecording = async () => {
    if (recorderRef.current) {
      try {
        // Recorder.js stop returns an object with a 'blob' property containing a WAV file
        const { blob } = await recorderRef.current.stop();
        setRecordedBlob(blob);
        setIsRecording(false);
        // Stop all tracks in the media stream to release the microphone
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        // Close the AudioContext to free up resources
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        toast.success("Your voice is saved in wav format");
        setSavedMessage("Your voice is saved in wav format");
      } catch (err) {
        console.error("Error stopping recorder", err);
        toast.error("Failed to stop recorder properly.");
      }
    }
  };

  // Toggle recording state when button is clicked
  const handleToggleRecording = async () => {
    if (!localStorage.getItem("fingerprint")) {
      await createFingerprint();
    }
    if (!isRecording) {
      setSavedMessage(""); // Clear any previous message
      await startRecording();
    } else {
      await stopRecording();
      setIsPopupOpen(false);
    }
  };

  // Open popup to start recording
  const handleMicClick = () => {
    setIsPopupOpen(true);
  };

  // Close popup (and stop recording if active)
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    if (isRecording) {
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
              <TypeAnimation sequence={phrases} repeat={1} speed={50} wrapper="span" />
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
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-brand mb-4">
              {isRecording ? "Recording..." : "Listening..."}
            </h2>
            <img
              src="https://i.gifer.com/7efs.gif"
              alt="Listening Animation"
              className="w-full max-w-[200px] mx-auto"
            />
            <div className="flex justify-between">
              <div>
                <button
                  className="mt-4 px-6 py-2 bg-orangebrand text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
              </div>
              <div>
                <button
                  className="mt-4 px-8 py-2 bg-orangebrand text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
                  onClick={handleToggleRecording}
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
