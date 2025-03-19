"use client";
import Image from "next/image";
import { useState } from "react";
import LaunchingTimer from "@/components/LaunchingTimer";
import { TypeAnimation } from "react-type-animation";

const phrases = ["Your Voice, Your Solution"];

export default function HeroSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMicClick = () => {
    setIsPopupOpen(true); // Show the popup when mic is clicked
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handleRecordVoice = () => {
    //todo: 1. Record voice in wav format or mp3 format
    //2. Send the voice to speech to text api created here
    //3. Receive the text and send to chat api with session
    //4. Receive the text in response and send to text to speech api
    //5. Receive the audio and play the audio
    setIsPopupOpen(false);
  };

  return (
    <section className="relative bg-[#F2F6F7] py-0 overflow-hidden w-full h-screen flex items-center justify-center">
      {/* Content */}
      <LaunchingTimer />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo with linear gradient */}
        <h1 className="mb-3 text-[50px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-brand to-orangebrand">
          Sahoolat.AI
        </h1>

        {/* Typing Effect for Tagline */}
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

        {/* Description */}
        <p className="mt-5 mb-5 text-brand font-bold text-[20px] md:text-[30px]">
          Find Skilled Experts or Get Hired – Just by Speaking!
        </p>
        {/* Mic & Waves Section */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          {/* Mic (Click to Open Popup) */}
          <div className="relative cursor-pointer" onClick={handleMicClick}>
            <img
              src={"/assets/Mic.png"}
              alt="Microphone"
              style={{ height: "140px", width: "540px" }}
              className="object-contain transition-transform transform hover:scale-105"
            />
          </div>
        </div>

      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black px-4 md:px-0 bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-300"
              onClick={handleClosePopup}
            >
              ✕
            </button>

            {/* Animated Image from Cloud URL */}
            <h2 className="text-2xl font-bold text-brand mb-4">Listening...</h2>
            <img
              src="https://i.gifer.com/7efs.gif" // Example animated image
              alt="Listening Animation"
              className="w-full max-w-[200px] mx-auto"
            />

            <div className="flex justify-between">
              {/* Close Popup Button */}
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
                  onClick={handleRecordVoice}
                >
                  Talk
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
