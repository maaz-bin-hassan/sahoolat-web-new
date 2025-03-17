import React from 'react';

export default function Newsletter() {
  return (
    <section className="relative bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 md:py-16">
      {/* Optional decorative background pattern */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-10 pointer-events-none"
        style={{backgroundImage: 'url("/assets/bg-pattern.png")'}}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-white text-2xl md:text-5xl font-extrabold tracking-tight">
          Subscribe to our Newsletter!
        </h2>

        {/* Subheading or quick note */}
        <p className="mt-3 text-white text-sm md:text-lg max-w-xl mx-auto">
          Stay in the loop with updates, tips, and services from
          <span className="font-bold"> Sahoolat AI</span>. We promise to keep it
          interesting—no spam, ever!
        </p>

        {/* Input & Send Button Container */}
        <div className="mt-8 flex justify-center">
          <div
            className="relative w-full max-w-xl flex items-center
                       bg-white/80 border-2 border-teal-500
                       rounded-full shadow-md"
          >
            <input
              type="text"
              placeholder="Enter your email or phone number"
              className="flex-grow bg-transparent pl-5 py-3 md:py-4
                         text-gray-700 font-medium focus:outline-none
                         placeholder:text-gray-500 placeholder:font-normal"
            />
            <button
              className="flex items-center justify-center p-2 mr-3
                         bg-teal-500 hover:bg-teal-600 rounded-full
                         transition-colors duration-200"
              aria-label="Subscribe"
            >
              {/* Icon or text—use what works best for your brand */}
              <img
                src="/assets/send-icon.png"
                alt="Send icon"
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
