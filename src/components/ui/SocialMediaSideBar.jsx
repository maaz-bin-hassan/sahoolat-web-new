"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillInfoCircle,
} from "react-icons/ai";
import {
  FaBloggerB,
  FaListUl,
  FaLifeRing,
  FaMicrophoneAlt,
  FaFacebook,
  FaLinkedinIn,
  FaHome,
  FaCompass,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import Link from "next/link";
import appStore from "../../../public/assets/app-store.png";
import googlePlay from "../../../public/assets/google-play.png";


export default function SocialMediaSideBar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (itemName) => setSelectedItem(itemName);

  return (
    <div
      className="
        hidden md:flex
        md:flex-col
        md:w-80 md:h-screen
        md:bg-white md:shadow-xl
        md:py-6
        md:fixed
        overflow-y-scroll
        md:left-0
      "
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center mb-6">
      <div>
        <Image
          src="/assets/logo.png"
          alt="Sahoolat AI Logo"
          width={120}
          height={120}
        />
      </div>
      </Link>

      <span className="pl-2 pr-1">
        <button className="block text-xl w-full py-2 mb-4 border border-green-500 text-gray-800 font-bold rounded hover:bg-green-50">
          Log in
        </button>
      </span>

      <h2 className="text-xl font-bold text-gray-800 mt-4 px-4">Company</h2>
      <ul className="mt-2 space-y-2 text-gray-700 text-lg px-4">
        <li
          className={`flex items-center space-x-2 cursor-pointer py-1 pl-2 pt-2 ${
            selectedItem === "About" ? "bg-[#0ea288] text-white rounded py-2" : ""
          }`}
          onClick={() => handleItemClick("About")}
        >
          <Link href="/about-us" className="flex items-center space-x-2">
            <AiFillInfoCircle size={24} />
            <span className="text-[18px] pl-0.5">About</span>
          </Link>
        </li>

        <li
          className={`flex items-center text-gray-800 space-x-2 cursor-pointer py-1 pl-2 pt-2 ${
            selectedItem === "Blogs" ? "bg-[#0ea288] text-white rounded py-2" : ""
          }`}
          onClick={() => handleItemClick("Blogs")}
        >
          <Link href="/blogs" className="flex items-center space-x-2">
              <FaBloggerB size={24} />
              <span className="text-[18px] pl-0.5">Blogs</span>
          </Link>
        </li>

        <li
          className={`flex items-center text-gray-800 space-x-2 cursor-pointer py-1 pl-2 pt-2 ${
            selectedItem === "Categories"
              ? "bg-[#0ea288] text-white rounded py-2"
              : ""
          }`}
          onClick={() => handleItemClick("Categories")}
        >
          <Link href="/category" className="flex items-center space-x-2">
            <FaListUl size={24} />
            <span className="text-[18px] pl-0.5 ">Categories</span>
          </Link>
        </li>

        <li
          className={`flex items-center text-gray-800 space-x-2 cursor-pointer py-1 pl-2 pt-2 ${
            selectedItem === "Voice Experience"
              ? "bg-[#0ea288] text-white rounded py-2"
              : ""
          }`}
          onClick={() => handleItemClick("Voice Experience")}
        >
          <Link href="/sahoolat-experience" className="flex items-center space-x-2">
            <FaMicrophoneAlt size={24} />
            <span className="text-[18px] pl-0.5">Voice Experience</span>
          </Link>
        </li>

        <li
          className={`flex items-center text-gray-800 space-x-2 cursor-pointer py-1 pl-2 pt-2 ${
            selectedItem === "Support" ? "bg-[#0ea288] text-white rounded py-2" : ""
          }`}
          onClick={() => handleItemClick("Support")}
        >
          <Link href="/support" className="flex items-center space-x-2">
            <FaLifeRing size={24} />
            <span className="text-[18px] pl-0.5">Support</span>
          </Link>
        </li>
      </ul>

      {/* Company Section */}
      <div className="border-b my-4"></div>

      {/* Follow Us */}
      <h2 className="text-xl text-gray-800 font-bold mt-4 px-4">Follow Us</h2>
      <div className="mt-2 space-y-3 text-gray-700 text-xl px-4">
        <div className="flex items-center space-x-2 pl-1.5 pt-1.5">
          <AiFillTwitterCircle size={24} />
          <span className="text-[18px] text-gray-800">Twitter</span>
        </div>
        <div className="flex items-center space-x-2 pl-1.5 pt-1.5">
          <AiFillInstagram size={24} />
          <span className="text-[18px] text-gray-800">Instagram</span>
        </div>
        <div className="flex items-center space-x-2 pl-1.5 pt-1.5">
          <SiTiktok size={24} />
          <span className="text-[18px] text-gray-800">TikTok</span>
        </div>
        <div className="flex items-center space-x-2 pl-1.5 pt-1.5">
          <FaFacebook size={24} />
          <span className="text-[18px] text-gray-800">Facebook</span>
        </div>
        <div className="flex items-center space-x-2 pl-1.5 pt-1.5">
          <FaLinkedinIn size={24} />
          <span className="text-[18px] text-gray-800">LinkedIn</span>
        </div>
      </div>

      {/* Download CTA */}
      <div className="border-b my-4"></div>
      <div className="mt-4 flex items-center justify-center space-x-4 pb-6 px-4">
        <Image
          src={appStore}
          alt="Download on the App Store"
          width={135}
          height={65}
        />
        <Image
          src={googlePlay}
          alt="Get it on Google Play"
          width={135}
          height={65}
        />
      </div>
    </div>
  );
}
