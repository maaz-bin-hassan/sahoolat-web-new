'use client';

import { NextAPIs } from "@/utils/const";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  const [guidelinesTitle, setGuidelinesTitle] = useState('');
  const [guidelinesContent, setGuidelinesContent] = useState('');

  useEffect(() => {
    axios.get(NextAPIs.USER_GUIDELINES_API)
      .then(response => {
        const data = response.data;
        setGuidelinesTitle(data.title);
        setGuidelinesContent(data.content);
      })
      .catch(error => {
        console.error('Failed to fetch user guidelines:', error);
      });
  }, []);

  return (
    <>
      <Header/>
      <section className="w-full pb-16 text-gray-800">
        <div className="bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Our Mission
          </h2>
          <p className="max-w-4xl mx-auto text-base md:text-xl leading-relaxed">
            <span className="font-semibold">Sahoolat AI</span> is on a mission to redefine how people access services by combining <strong>AI-powered voice search</strong> with streamlined workflows.
            We aim to bridge the gap between need and fulfillment through innovation, ensuring that everyone can easily <em>find what they need</em>—quickly, securely, and intelligently.
          </p>
        </div>

        {/* User Guidelines Section */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div dangerouslySetInnerHTML={{ __html: guidelinesContent }} />
        </div>

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
