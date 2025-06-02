'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextAPIs } from '@/utils/const';

export default function HowItWorks() {
  const [privacyTitle, setPrivacyTitle] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');

  useEffect(() => {
    async function fetchPrivacyData() {
      try {
        const res = await axios.get(NextAPIs.PRIVACY_POLICY_API);
        setPrivacyTitle(res.data.title);
        setPrivacyContent(res.data.content);
      } catch (error) {
        console.error('Failed to fetch privacy policy:', error);
      }
    }

    fetchPrivacyData();
  }, []);

  return (
    <>
      <Header/>
      <section className="w-full pb-16 text-gray-800">
        {/* Mission Header  */}
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
          <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
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
