"use client";
import React, { useState } from "react";
import Image from "next/image";

import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillInfoCircle,
} from "react-icons/ai";
import {
  FaNewspaper,
  FaEnvelopeOpenText,
  FaBriefcase,FaFacebook , FaLinkedinIn
} from "react-icons/fa";

import { SiTiktok } from "react-icons/si";


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

           <div className="mt-10 px-4 pb-10 h-full overflow-y-scroll" style={{ fontFamily: "Roboto, sans-serif" }}>

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

          <h3 className="text-xl font-bold mt-4">Company</h3>
          <ul className="mt-2 space-y-2 text-gray-700 text-lg">

            {/* About */}
            <li
              className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
                selectedItem === "About" ? "bg-[#0ea288] text-white rounded" : ""
              }`}
              onClick={() => handleItemClick("About")}
            >
              <AiFillInfoCircle size={22} />
              <span className="pl-0.5">About</span>

            </li>

            {/* Newsroom */}
            <li
              className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
                selectedItem === "Newsroom" ? "bg-[#0ea288] text-white rounded" : ""
              }`}
              onClick={() => handleItemClick("Newsroom")}
            >
              <FaNewspaper size={22} />
              <span className="pl-0.5">Newsroom</span>
            </li>

            {/* Contact */}
            <li
              className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
                selectedItem === "Contact" ? "bg-[#0ea288] text-white rounded" : ""
              }`}
              onClick={() => handleItemClick("Contact")}
            >
              <FaEnvelopeOpenText size={22} />
              <span className="pl-0.5">Contact</span>
            </li>

            {/* Careers */}
            <li
              className={`flex items-center space-x-2 cursor-pointer pl-2 pt-2 ${
                selectedItem === "Careers" ? "bg-[#0ea288] text-white rounded" : ""
              }`}
              onClick={() => handleItemClick("Careers")}
            >
              <FaBriefcase size={22} />
              <span className="pl-0.5">Careers</span>
            </li>
          </ul>

          <div className="border-b my-4"></div>

          <h3 className="text-xl font-bold mt-4">Follow Us</h3>
          <div className="mt-2 space-y-3 text-gray-700">
            <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
              <AiFillTwitterCircle size={30} />
              <span>Twitter</span>
            </div>
            <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
              <AiFillInstagram size={30} />
              <span>Instagram</span>
            </div>

               {/* New icons */}
               <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
                 <SiTiktok size={30} />
                 <span>TikTok</span>
               </div>
               <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
                 <FaFacebook size={30} />
                 <span>Facebook</span>
               </div>
               <div className="flex items-center space-x-2 text-xl pl-2 pt-2">
                 <FaLinkedinIn size={30} />
                 <span>LinkedIn</span>
               </div>
          </div>
        </div>
      </div>
    </>
  );
}
