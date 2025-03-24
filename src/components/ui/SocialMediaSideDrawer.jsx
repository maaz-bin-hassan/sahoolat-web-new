"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaBloggerB,
  FaListUl,
  FaLifeRing,
  FaMicrophoneAlt,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillInfoCircle,
} from "react-icons/ai";
import { SiTiktok } from "react-icons/si";

import appStore from "../../../public/assets/app-store.png";
import googlePlay from "../../../public/assets/google-play.png";

export default function SocialMediaSideDrawer({ isOpen, onClose }) {
  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <>

          <style jsx global>{`
        ::selection {
          background-color: #0ea288;
          color: #ffffff;
        }
        ::-moz-selection {
          background-color: #0ea288;
          color: #ffffff;
        }

     `}</style>

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

      {/* Scrollable container */}
      <div
        className="mt-10 px-4 pb-10 h-full overflow-y-scroll"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/assets/logo.png"
            alt="Sahoolat AI Logo"
            width={120}
            height={120}
          />
        </div>

        <button className="block w-full py-2 mb-4 border border-green-500 text-green-500 font-semibold rounded hover:bg-green-50">
          Log in
        </button>

        <div className="border-b my-4"></div>

        <h3 className="text-xl font-bold mt-4">Company</h3>
        <ul className="mt-2 space-y-2 text-gray-700 text-lg">
          <li
            className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
              selectedItem === "About" ? "bg-[#0ea288] text-white rounded" : ""
            }`}
            onClick={() => handleItemClick("About")}
          >
            <AiFillInfoCircle size={22} />
            <span className="pl-0.5">About</span>
          </li>

          {/* Blogs */}
          <li
            className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
              selectedItem === "Blogs" ? "bg-[#0ea288] text-white rounded" : ""
            }`}
            onClick={() => handleItemClick("Blogs")}
          >
            <FaBloggerB size={22} />
            <span className="pl-0.5">Blogs</span>
          </li>

          {/* Categories */}
          <li
            className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
              selectedItem === "Categories" ? "bg-[#0ea288] text-white rounded" : ""
            }`}
            onClick={() => handleItemClick("Categories")}
          >
            <FaListUl size={22} />
            <span className="pl-0.5">Categories</span>
          </li>

          {/* Voice Experience */}
          <li
            className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
              selectedItem === "Voice Experience" ? "bg-[#0ea288] text-white rounded" : ""
            }`}
            onClick={() => handleItemClick("Voice Experience")}
          >
            <FaMicrophoneAlt size={22} />
            <span className="pl-0.5">Voice Experience</span>
          </li>
          {/* Support */}
          <li
            className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
              selectedItem === "Support" ? "bg-[#0ea288] text-white rounded" : ""
            }`}
            onClick={() => handleItemClick("Support")}
          >
            <FaLifeRing size={22} />
            <span className="pl-0.5">Support</span>
          </li>


        </ul>

        <div className="border-b my-4"></div>

        <h3 className="text-xl font-bold mt-4">Follow Us</h3>
        <div className="mt-2 space-y-3 text-gray-700">
          <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
            <AiFillTwitterCircle size={22} />
            <span>Twitter</span>
          </div>
          <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
            <AiFillInstagram size={22} />
            <span>Instagram</span>
          </div>

          {/* New icons */}
          <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
            <SiTiktok size={22} />
            <span>TikTok</span>
          </div>
          <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
            <FaFacebook size={22} />
            <span>Facebook</span>
          </div>
          <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
            <FaLinkedinIn size={22} />
            <span>LinkedIn</span>
          </div>
        </div>

        <div className="border-b my-4"></div>
         <div className="mt-4 flex items-center justify-center space-x-4 pb-6">
        <Image
          src={appStore}
          alt="Download on the App Store"
          width={120}
          height={50}
        />
        <Image
          src={googlePlay}
          alt="Get it on Google Play"
          width={120}
          height={50}
        />
      </div>

      </div>
    </div>
    </>
  );
}
