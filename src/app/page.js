"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Home from "./home/page";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef(null);
  useEffect(() => {
    fetch("/animation/launching.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (typeof window !== "undefined" && document.readyState === "complete") {
      handleLoad();
    } else {
      if (typeof window !== "undefined") {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  useEffect(() => {
    const received =typeof window!=='undefined' && localStorage.getItem("received");
    if (!received) {
      const popupTimer = setTimeout(() => {
        setShowPopup(true);
      }, 15000);
      return () => clearTimeout(popupTimer);
    }
  }, []);
  const handleSubmit = () => {
    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    localStorage.setItem("received", "true");
    setShowPopup(false);
  };

  return (
    <div className="relative w-full h-screen">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-[#F2F6F7] z-50">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            lottieRef={lottieRef}
            style={{ width: 320, height: 320 }}
          />
        </div>
      ) : (
        <Home />
      )}

      {/* Popup for Phone Number */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F2F6F7] p-6 rounded-lg shadow-lg w-[90%] md:w-[400px]">
            <div className="flex justify-center">
              <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
            </div>
            <h2 className="text-xl font-semibold text-center mt-4">
              Get Sahoolat.AI Updates On Your Phone.
            </h2>
            <p className="text-center text-gray-600 mt-2">WhatsApp Number:</p>
            <div className="flex items-center border border-gray-300 p-2 rounded mt-2">
              <span className="mr-2">+92</span>
              <input
                type="text"
                placeholder="3000000000"
                className="w-full outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="text-red-500 font-semibold"
                onClick={() => setShowPopup(false)}
              >
                Not Now
              </button>
              <button
                className="bg-[#057e7e] text-white px-5 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
