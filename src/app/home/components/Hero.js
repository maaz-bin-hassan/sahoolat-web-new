"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import LaunchingTimer from "@/components/LaunchingTimer";

const storeLinks = [
  {
    src: "/assets/app-store.png",
    alt: "App Store",
    href: "#",
  },
  {
    src: "/assets/google-play.png",
    alt: "Google Play",
    href: "#",
  },
];

export default function HeroSection() {
  const [isOriginal, setIsOriginal] = useState(true);
  const [typedText, setTypedText] = useState(""); // Initialize with an empty string
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  const fullText = "Yoour Voice, Your Solution";

  useEffect(() => {
    let index = 0;
    setTypedText(""); // Ensure it's cleared before starting

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index)); // Append characters correctly
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust speed as needed

    return () => clearInterval(typingInterval);
  }, []);

  const handleMicClick = () => {
    setIsPopupOpen(true); // Show the popup when mic is clicked
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <section className="relative bg-[#F2F6F7] py-0 overflow-hidden w-full h-screen flex items-center justify-center">
      {/* Content */}
      <LaunchingTimer/>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo with linear gradient */}
        <h1
          className="mb-3 text-[50px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-brand to-orangebrand">
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
              {typedText}
              <span className="animate-blink">{typedText.length < fullText.length ? "|" : ""}</span>
            </p>
            <div
              className="hidden md:inline absolute md:-top-8 md:-right-12 w-6 h-6 md:w-16 md:h-16 float-animation">
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
              src={'/assets/Mic.png'}
              alt="Microphone"
              style={{height: '140px', width: '540px'}}
              className="object-contain transition-transform transform hover:scale-105"
            />
          </div>
        </div>

        {/* Download Section */}
        <p className="mb-6 mt-2 text-xl md:text-4xl font-bold text-textColor">
          Download for free!
        </p>

        {/* App Store Buttons */}
        <div className="flex space-x-4 md:space-x-36">
          {storeLinks.map((link, index) => (
            <a key={index} href={link.href}>
              <Image
                {...link}
                width={400}
                height={114}
                className="cursor-pointer w-[150px] h-[50px] lg:w-[400px] lg:h-[100px]"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
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

            {/* Close Popup Button */}
            <button
              className="mt-4 px-6 py-2 bg-orangebrand text-white font-bold rounded-lg hover:bg-orange-600 transition-all"
              onClick={handleClosePopup}
            >
              Close
            </button>
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
