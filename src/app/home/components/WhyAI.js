"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";

// ------------------ Data ------------------
// Buyer Features
const buyerFeatures = [
  {
    title: "AI-Powered Voice Search",
    icon: "/assets/ai-mic.png",
    description: "Simply speak, and AI understands your service needs instantly.",
    tag: "AI-Powered",
  },
  {
    title: "Instant Matchmaking",
    icon: "/assets/verified.png",
    description: "Get connected to the best-skilled workers in real time.",
    tag: "Smart Matching",
  },
  {
    title: "Real-time Audio Chat",
    icon: "/assets/audio.png",
    description: "Talk to service providers directly via voice chat.",
    tag: "Live Chat",
  },
  {
    title: "Offline Support (Premium)",
    icon: "/assets/offline.png",
    description: "Access expert services even without the internet.",
    tag: "Premium Feature",
  },
  {
    title: "End-to-End Encryption",
    icon: "/assets/secure.png",
    description: "Your conversations and data are 100% secure and private.",
    tag: "Secure",
  },
];

const buyerInfoBoxes = [
  { icon: "/assets/mdi_bell-notification-outline.png", title: "Receive Bids" },
  { icon: "/assets/bxs_videos.png", title: "Watch profile and Hire!" },
];

// Seller Features
const expertFeatures = [
  {
    title: "AI-Powered Voice",
    icon: "/assets/speak.png",
    description: "Talk to AI to get matched with jobs effortlessly.",
    tag: "AI Assistant",
  },
  {
    title: "Instant Matchmaking",
    icon: "/assets/matchmaking.png",
    description: "Get job offers instantly based on your skills.",
    tag: "Smart Matching",
  },
  {
    title: "Showcase Skills with Videos",
    icon: "/assets/profile.png",
    description: "Upload short videos to demonstrate your skills.",
    tag: "Boost Visibility",
  },
  {
    title: "Offline Support (Premium)",
    icon: "/assets/offline.png",
    description: "Even without internet, clients can still find you.",
    tag: "Premium Feature",
  },
  {
    title: "Safe & Secure",
    icon: "/assets/secure.png",
    description: "We ensure a safe and fraud-free platform for professionals.",
    tag: "Trust & Safety",
  },
];

const expertInfoBoxes = [
  { icon: "/assets/notification.png", title: "Get Job Notifications" },
  { icon: "/assets/bid2.png", title: "Bid from your side!" },
];

export default function Text() {
  const [activeTab, setActiveTab] = useState("buyer");

  const features = activeTab === "buyer" ? buyerFeatures : expertFeatures;
  const infoBoxes = activeTab === "buyer" ? buyerInfoBoxes : expertInfoBoxes;

  return (
    <section className="bg-[#F2F6F7] mb-16 py-12">
      <div className="flex flex-col items-center justify-center">
        {/* Main Heading */}
        <h1 className="text-[50px] md:text-[100px] text-center font-bold text-textColor mb-6 md:mb-0">
          Why Sahoolat.AI?
        </h1>

        {/* Tabs */}
        <div className="flex space-x-5 justify-center items-center mb-10">
          <button
            onClick={() => setActiveTab("buyer")}
            className={`px-8 py-3 md:px-16 md:py-5 rounded-full text-lg md:text-2xl font-bold transition-all duration-300 
              ${activeTab === "buyer" ? "bg-brand text-white shadow-lg scale-110" : "bg-gray-200 text-textColor hover:bg-gray-300"}`}
          >
            For Buyers
          </button>
          <button
            onClick={() => setActiveTab("expert")}
            className={`px-8 py-3 md:px-16 md:py-5 rounded-full text-lg md:text-2xl font-bold transition-all duration-300 
              ${activeTab === "expert" ? "bg-brand text-white shadow-lg scale-110" : "bg-gray-200 text-textColor hover:bg-gray-300"}`}
          >
            For Experts
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl p-3">
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-gray-100 transition-all hover:scale-105 border-l-4 border-brand"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={60}
                height={60}
                className="object-contain mb-4"
              />
              <h2 className="text-[22px] md:text-[28px] font-bold text-textColor text-center">
                {feature.title}
              </h2>
              <p className="text-[16px] text-gray-600 text-center">
                {feature.description}
              </p>
              <span className="mt-3 px-3 py-1 text-sm font-semibold text-white bg-brand rounded-full">
                {feature.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 max-w-4xl p-3">
          {features.slice(3, 5).map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-gray-100 transition-all hover:scale-105 border-l-4 border-brand"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={60}
                height={60}
                className="object-contain mb-4"
              />
              <h2 className="text-[22px] md:text-[28px] font-bold text-textColor text-center">
                {feature.title}
              </h2>
              <p className="text-[16px] text-gray-600 text-center">
                {feature.description}
              </p>
              <span className="mt-3 px-3 py-1 text-sm font-semibold text-white bg-brand rounded-full">
                {feature.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Info Boxes */}
        <div className="flex flex-col md:flex-row items-center mt-12 gap-8 max-w-6xl">
          {infoBoxes.map((box, index) => (
            <Fragment key={index}>
              <div className="w-[280px] md:w-[350px] bg-[#07212f] p-6 border-2 border-brand border-dotted rounded-xl shadow-lg text-center transition-all hover:scale-105">
                <Image
                  src={box.icon}
                  alt={`${box.title} icon`}
                  width={80}
                  height={80}
                  className="object-contain mx-auto"
                />
                <h2 className="font-bold text-[22px] md:text-[28px] mt-4 text-white">
                  {box.title}
                </h2>
              </div>
              {index !== infoBoxes.length - 1 && (
                <Image
                  src={
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? "/assets/arrow-down.png"
                      : "/assets/arrow-right.png"
                  }
                  alt="Arrow"
                  width={40}
                  height={40}
                  className="animate-pulse"
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* New Interactive Demo Section */}
        <div className="mt-16 flex justify-center px-4">
          <div
            style={{ paddingLeft: "20rem", paddingRight: "20rem" }}
            className="w-full max-w-4xl bg-gradient-to-tr from-[#d4d6d9] to-[#e1e2e5] rounded-xl shadow-sm py-20 flex flex-col items-center"
          >
            <Image
              src="/video-placeholder.png" // Use outlined icon
              alt="Video Icon"
              width={60}
              height={60}
              className="mb-4"
            />
            <h2 className="text-lg md:text-xl font-semibold text-[#1f2937]">
              Demo Coming Soon
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
