'use client';
import React from 'react';

export default function GetApp() {
  return (
    <section
      className="relative overflow-hidden text-center py-16 md:py-24 bg-gradient-to-r from-teal-500 via-teal-400 to-orange-400">
      {/* Decorative Background Shape (Optional) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-hero-pattern bg-cover bg-center"
        style={{backgroundImage: 'url("/assets/bg-pattern.png")'}}
      ></div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Get App Now
        </h1>

        {/* Short Tagline */}
        <p className="text-lg md:text-2xl text-white font-medium mb-8 max-w-3xl">
          Experience a whole new way to find services and get tasks done with
          <span className="mx-1 font-bold">Sahoolat AI.</span>
          One app for all your needs—quick, reliable, and easy!
        </p>

        {/* Brand Tagline */}
        <div
          className="flex flex-wrap justify-center items-center text-white text-xl md:text-3xl font-bold space-x-2 mb-12">
          <span className="text-orange-200">Say It.</span>
          <span className="text-teal-100">Find it.</span>
          <span className="text-orange-200">Get it done!</span>
        </div>

        {/* Store Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
          <img
            src="/assets/app-store.png"
            alt="Download on the App Store"
            className="cursor-pointer w-60 md:w-72 hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/assets/google-play.png"
            alt="Get it on Google Play"
            className="cursor-pointer w-60 md:w-72 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Subheading or CTA */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
          Download and Try
        </h2>
        <p className="text-white text-sm md:text-base">
          Join thousands of users simplifying their lives every day.
        </p>
      </div>
    </section>
  );
}
