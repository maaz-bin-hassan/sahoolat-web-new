"use client";
import React from "react";
import Image from "next/image";

export default function SocialMediaSideDrawer({ isOpen, onClose }) {
  return (
    <div
      className={`
        fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50
        transform transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 text-gray-700 hover:text-black"
      >
        ✕
      </button>

      <div className="mt-10 px-4 overflow-y-auto h-full pb-10">
        {/* Logo replaces "For You / Following" */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/assets/logo.png"
            alt="Sahoolat AI Logo"
            width={120}
            height={120}
          />
        </div>

        <button className="block w-full py-2 mb-4 border border-red-500 text-red-500 font-semibold rounded hover:bg-red-50">
          Log in
        </button>

        <div className="border-b my-4"></div>

        <h3 className="text-lg font-semibold mt-4">Company</h3>
        <ul className="text-sm text-gray-700 mt-2 space-y-1">
          <li>About</li>
          <li>Newsroom</li>
          <li>Contact</li>
          <li>Careers</li>
        </ul>

        <div className="border-b my-4"></div>

        <h3 className="text-lg font-semibold mt-4">Program</h3>
        <ul className="text-sm text-gray-700 mt-2 space-y-1">
          <li>TikTok for Good</li>
          <li>Advertise</li>
          <li>TikTok LIVE Creator Networks</li>
          <li>Developers</li>
          <li>Transparency</li>
          <li>TikTok Rewards</li>
          <li>SoundOn Music Distribution</li>
          <li>TikTok Live</li>
        </ul>
      </div>
    </div>
  );
}
