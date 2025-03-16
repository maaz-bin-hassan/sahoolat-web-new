"use client";
import React from "react";
import {motion} from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ContactMe = () => {
    return (
        <>
            <Header/>
            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#023663] to-[#0a283d] text-white px-6 py-10"
            >
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold mb-3">
                        📅 <span className="text-teal-400 glow">Schedule a Meeting</span>
                    </h1>
                </div>

                {/* Calendly Embed Section */}
                <div
                    className="w-full max-w-6xl h-[80vh] bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 mt-6 flex items-center justify-center">
                    <iframe
                        src="https://calendly.com/fahadqureshi/sahoolat-ai-demo-request" // Replace with your Calendly link
                        className="w-full h-full rounded-lg shadow-md border border-white/20"
                        frameBorder="0"
                        scrolling="no"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Contact Information */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-300">
                        Need help? Connect with us at{" "}
                        <a
                            href="mailto:support@sahoolatai.com"
                            className="text-teal-400 underline hover:text-teal-300 transition"
                        >
                            support@sahoolatai.com
                        </a>
                    </p>
                </div>
            </motion.div>

            <Footer />
        </>
    );
};

export default ContactMe;
