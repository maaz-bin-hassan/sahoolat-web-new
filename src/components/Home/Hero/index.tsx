"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "../../../utils/utils";

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    // Check if user dismissed the countdown before
    const dismissed = localStorage.getItem("countdownDismissed");
    if (dismissed) {
      setShowCountdown(false);
    }
  }, []);

  useEffect(() => {
    // Set launch date to 1 month from now
    const now = new Date();
    const launchDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 1 month from now
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = launchDate.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setShowCountdown(false);
    localStorage.setItem("countdownDismissed", "true");
  };

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
      {/* Floating Countdown Timer */}
      <AnimatePresence>
        {showCountdown && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 md:top-32 right-2 md:right-4 z-30 hidden md:block"
          >
            <div className="bg-white shadow-card-hover rounded-2xl px-6 py-4 border-2 border-primary relative">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-2 -left-2 bg-orange text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors shadow-md"
                aria-label="Dismiss countdown"
              >
                <Icon icon="mdi:close" width="14" height="14" />
              </button>
              
              <p className="text-midnight_text text-center mb-2 text-16 font-semibold">🚀 Launching In:</p>
              <div className="flex gap-2 text-center">
                <div className="bg-primary/10 px-3 py-2 rounded-lg">
                  <span className="text-primary text-24 font-bold">{countdown.days}</span>
                  <p className="text-dark_grey text-xs font-medium">days</p>
                </div>
                <div className="bg-primary/10 px-3 py-2 rounded-lg">
                  <span className="text-primary text-24 font-bold">{countdown.hours}</span>
                  <p className="text-dark_grey text-xs font-medium">hours</p>
                </div>
                <div className="bg-primary/10 px-3 py-2 rounded-lg">
                  <span className="text-primary text-24 font-bold">{countdown.minutes}</span>
                  <p className="text-dark_grey text-xs font-medium">mins</p>
                </div>
                <div className="bg-orange/10 px-3 py-2 rounded-lg">
                  <span className="text-orange text-24 font-bold">{countdown.seconds}</span>
                  <p className="text-dark_grey text-xs font-medium">secs</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="relative md:pt-40 md:pb-28 pt-20 pb-16 overflow-hidden z-1 bg-gradient-to-br from-white via-secondary/30 to-primary/10 md:bg-background"
        id="main-banner"
      >
        <div className="container mx-auto lg:max-w-screen-xl px-3 md:px-4">
          <div className="grid grid-cols-12 items-center">
            <motion.div {...leftAnimation} className="lg:col-span-7 col-span-12 lg:text-left text-center">
              {/* Sahoolat.AI Brand */}
              <h1 className="lg:text-86 md:text-70 text-4xl sm:text-54 mb-4 md:mb-8 font-extrabold font-[family-name:var(--font-poppins)] tracking-tight italic">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600 md:text-primary">Sahoolat</span><span className="text-orange">.AI</span>
              </h1>
              
              {/* Tagline */}
              <h2 className="font-bold lg:text-44 md:text-36 text-xl sm:text-28 mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                <span className="text-orange">Your Voice,</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600 md:text-primary">Your Solution</span>
                <span className="text-orange inline-block ml-2">✨</span>
              </h2>
              
              {/* Subtext */}
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-600 md:text-primary text-base sm:text-xl md:text-24 mb-6 md:mb-10 font-bold">
                Find Skilled Experts or Get Hired – Just by Speaking!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 sm:gap-6 mb-6 md:mb-10">
                <Link
                  href="#how-it-works"
                  className="bg-primary border-2 border-primary rounded-xl text-sm sm:text-18 font-semibold hover:bg-transparent hover:text-primary text-white py-2.5 sm:py-3.5 px-6 sm:px-8 shadow-button transition-all duration-300 hover:shadow-card-hover w-full sm:w-auto text-center"
                >
                  Experience Now
                </Link>
                <Link
                  href="#"
                  className="bg-white border-2 border-primary rounded-xl text-sm sm:text-18 font-semibold hover:bg-primary hover:text-white text-primary py-2.5 sm:py-3.5 px-6 sm:px-8 shadow-card transition-all duration-300 hover:shadow-card-hover w-full sm:w-auto text-center"
                >
                  Book a Call
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 sm:gap-4 mt-6 md:mt-10">
                <Link 
                  href="#" 
                  className="flex items-center gap-2 sm:gap-3 bg-midnight_text text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-primary transition-all duration-300 shadow-card hover:shadow-card-hover hover:scale-105 w-full sm:w-auto justify-center"
                >
                  <Icon icon="mdi:apple" className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[10px] sm:text-xs opacity-80">Download on the</p>
                    <p className="text-sm sm:text-lg font-semibold -mt-1">App Store</p>
                  </div>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center gap-2 sm:gap-3 bg-midnight_text text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-primary transition-all duration-300 shadow-card hover:shadow-card-hover hover:scale-105 w-full sm:w-auto justify-center"
                >
                  <Icon icon="mdi:google-play" className="w-6 h-6 sm:w-7 sm:h-7" />
                  <div className="text-left">
                    <p className="text-[10px] sm:text-xs opacity-80">GET IT ON</p>
                    <p className="text-sm sm:text-lg font-semibold -mt-1">Google Play</p>
                  </div>
                </Link>
              </div>
            </motion.div>
            
            {/* Right Side - Image */}
            <motion.div
              {...rightAnimation}
              className="lg:col-span-5 col-span-12 lg:block hidden"
            >
            <div className="flex justify-end">
              <Image
                src={`${getImagePrefix()}images/hero/banner-image.png`}
                alt="Sahoolat AI App"
                width={500}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>
    </section>
    </>
  );
};

export default Hero;
