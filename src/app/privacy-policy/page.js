'use client';
import React from 'react';
import {FaCheckCircle, FaHandshake, FaMicrophoneAlt, FaSearch} from 'react-icons/fa';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  return (
    <>
      <Header/>
      <section className="w-full pb-16 text-gray-800">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Our Mission
          </h2>
          <p className="max-w-4xl mx-auto text-base md:text-xl leading-relaxed">
            At <span className="font-semibold">Sahoolat AI</span>, we leverage
            the power of AI-driven voice search and intuitive workflows. We’re
            committed to making everyday tasks simpler, faster, and more
            reliable so everyone can focus on what truly matters.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 border-b-2 border-orangebrand pb-2">How We Use and Protect Your Data</h2>

          <p className="text-lg text-gray-700 mb-4">
            At <strong>Sahoolat AI</strong>, we believe in <em>transparency</em>, <em>respect</em>, and <em>responsibility</em> when it comes to your personal data.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">What We Collect</h3>
          <p className="text-gray-700 mb-4">
            We only collect personal data that is <strong>essential</strong> to providing our services. This includes your <u>name</u>, <u>contact details</u>, and <u>preferences</u>, all handled with <em>utmost care</em>.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">How We Use It</h3>
          <p className="text-gray-700 mb-4">
            Your data is used <strong>strictly</strong> for improving our services, fulfilling your requests, processing transactions, and communicating updates or support.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">Your Control & Rights</h3>
          <p className="text-gray-700 mb-4">
            You have <strong>full control</strong> over your data. You can request <u>access</u>, <u>updates</u>, or <u>deletion</u> at any time. We support your right to privacy <em>every step of the way</em>.
          </p>

          <h3 className="text-2xl font-semibold text-brand mt-6 mb-2">Sharing & Protection</h3>
          <p className="text-gray-700 mb-4">
            We <strong>never sell</strong> your data. Any third-party partnerships are vetted and bound by <em>strict data protection agreements</em>. Your information is protected with <u>encryption</u> and <u>secured systems</u>.
          </p>

          <p className="text-sm text-gray-600 mt-8 border-t pt-4">
            For questions or concerns, please contact us at <span className="text-orange-500 font-medium">privacy@sahoolat.ai</span>.
          </p>
        </div>
        {/* Multi-Color (Gradient) Line */}
        <div
          className="h-1 w-5/12 my-10 mx-auto bg-gradient-to-r from-teal-400 via-pink-500 to-orange-500 mb-8"></div>

        {/* One-Line Tagline */}
        <div className="flex my-10 justify-center">
                <span className="text-3xl md:text-[50px] mr-1 text-orangebrand font-bold">
                    Say It.&nbsp;
                </span>
          <span className="text-3xl md:text-[50px] mr-1 text-brand font-bold">
                    Find it.&nbsp;
                </span>
          <span className="text-3xl md:text-[50px] mr-1 text-orangebrand font-bold">
                    Get it done!
                </span>
        </div>

      </section>
      <Footer/>
    </>
  );
}
