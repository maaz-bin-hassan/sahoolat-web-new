"use client";
import { useState } from "react";
import { getImagePrefix } from "../../../utils/utils";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

const Perks = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setEmail("");
  };

  const features = [
    "Multiple verified options",
    "Zero extra cost",
    "Delivered right to your doorstep",
    "100% hassle-free",
    "Powered by cutting-edge AI",
  ];

  return (
    <section className="pb-28 pt-20 relative bg-background" id="early-access">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Get Early Access */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: "-50%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-dark_grey sm:text-28 text-21 mb-4 font-semibold">
              Get <span className="text-primary">Early Access!</span>
            </p>
            <p className="text-dark_grey text-18 mb-6 font-medium">
              Looking for top-tier professional services — from basic to elite — without paying a single extra rupee? 💸
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-midnight_text font-medium">
                  <Icon icon="mdi:check-circle" className="text-success text-21" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-midnight_text text-18 mb-6 font-medium">
              Welcome to <span className="text-primary font-bold">Sahoolat AI</span> — your smart gateway to effortless service. Experience a new era of convenience and control.
            </p>
            
            <form onSubmit={handleSubmit} className="relative max-w-md">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or phone number"
                className="bg-white border-2 border-secondary py-4 text-midnight_text rounded-xl w-full px-6 pr-14 shadow-card focus:border-primary focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-lg"
              >
                <Icon
                  icon="tabler:send"
                  width="20"
                  height="20"
                  className="text-white"
                />
              </button>
            </form>
          </motion.div>

          {/* Right Side - Download App */}
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: "50%", opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-midnight_text sm:text-44 text-30 font-bold mb-4">
              Download and Try
            </h2>
            <p className="text-dark_grey text-18 mb-8 font-medium">
              Join thousands of users simplifying their lives every day.
            </p>
            
            <div className="bg-white rounded-3xl p-8 border-2 border-secondary shadow-card-hover">
              <h3 className="text-primary text-28 font-bold mb-4">
                Say It. Find it. Get it done!
              </h3>
              <p className="text-dark_grey text-16 mb-8 font-medium">
                One app for all your needs—quick, reliable, and easy!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="#" 
                  className="flex items-center gap-3 bg-midnight_text text-white px-5 py-3 rounded-xl hover:bg-primary transition-all duration-300 shadow-card hover:shadow-card-hover hover:scale-105"
                >
                  <Icon icon="mdi:apple" width="24" height="24" />
                  <div className="text-left">
                    <p className="text-xs opacity-80">Download on the</p>
                    <p className="text-base font-semibold -mt-1">App Store</p>
                  </div>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center gap-3 bg-midnight_text text-white px-5 py-3 rounded-xl hover:bg-primary transition-all duration-300 shadow-card hover:shadow-card-hover hover:scale-105"
                >
                  <Icon icon="mdi:google-play" width="24" height="24" />
                  <div className="text-left">
                    <p className="text-xs opacity-80">GET IT ON</p>
                    <p className="text-base font-semibold -mt-1">Google Play</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-tealGreen to-charcoalGray sm:w-50 w-96 sm:h-50 h-96 rounded-full sm:-bottom-80 bottom-0 blur-400 z-0 absolute sm:-left-48 opacity-60"></div>
    </section>
  );
};

export default Perks;
