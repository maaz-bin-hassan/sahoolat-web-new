"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { getImagePrefix } from "../../../utils/utils";
import { Icon } from "@iconify/react";

const TimeLine = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [activeTab, setActiveTab] = useState("buyers");

  const buyersFeatures = [
    {
      icon: "mdi:microphone-message",
      title: "AI-Powered Voice Search",
      text: "Simply speak, and AI understands your service needs instantly.",
    },
    {
      icon: "mdi:account-search",
      title: "Instant Matchmaking",
      text: "Get connected to the best-skilled workers in real time.",
    },
    {
      icon: "mdi:phone-voip",
      title: "Real-time Audio Chat",
      text: "Talk to service providers directly via voice chat.",
    },
    {
      icon: "mdi:wifi-off",
      title: "Offline Support (Premium)",
      text: "Access expert services even without the internet.",
    },
    {
      icon: "mdi:shield-lock",
      title: "End-to-End Encryption",
      text: "Your conversations and data are 100% secure and private.",
    },
  ];

  const expertsFeatures = [
    {
      icon: "mdi:briefcase-search",
      title: "Receive Bids",
      text: "Get job requests directly from customers looking for your skills.",
    },
    {
      icon: "mdi:account-check",
      title: "Build Your Profile",
      text: "Showcase your skills and get discovered by more customers.",
    },
    {
      icon: "mdi:cash-multiple",
      title: "Earn More",
      text: "Increase your income with voice-based lead generation.",
    },
    {
      icon: "mdi:star-circle",
      title: "Get Rated",
      text: "Build reputation with customer reviews and ratings.",
    },
    {
      icon: "mdi:map-marker-radius",
      title: "Local Visibility",
      text: "Get discovered by customers in your area instantly.",
    },
  ];

  const features = activeTab === "buyers" ? buyersFeatures : expertsFeatures;

  return (
    <section className="md:pt-40 pt-16 bg-white" id="why-sahoolat">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md lg:px-16 px-4">
        <div className="text-center">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-dark_grey sm:text-28 text-21 mb-4 font-semibold">
              Why <span className="text-primary">Sahoolat.AI?</span>
            </p>
            
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab("buyers")}
                className={`px-8 py-3.5 rounded-xl text-18 font-semibold transition-all duration-300 ${
                  activeTab === "buyers"
                    ? "bg-primary text-white shadow-button"
                    : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-card"
                }`}
              >
                For Buyers
              </button>
              <button
                onClick={() => setActiveTab("experts")}
                className={`px-8 py-3.5 rounded-xl text-18 font-semibold transition-all duration-300 ${
                  activeTab === "experts"
                    ? "bg-primary text-white shadow-button"
                    : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-card"
                }`}
              >
                For Experts
              </button>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center border-2 border-secondary hover:border-primary shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon
                      icon={item.icon}
                      width="32"
                      height="32"
                      className="text-primary"
                    />
                  </div>
                  <h4 className="text-midnight_text text-21 font-bold mb-3">{item.title}</h4>
                  <p className="text-dark_grey text-16">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
