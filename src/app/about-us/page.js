'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaCheckCircle, FaHandshake, FaMicrophoneAlt, FaSearch} from 'react-icons/fa';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await axios.get('/api/about-us');
        setAboutData(res.data);
      } catch (err) {
        console.error('Failed to load about-us data', err);
      }
    }

    fetchAboutData();
  }, []);

  return (
    <>
      <Header/>
      <section className="w-full pb-16 text-gray-800">
        {/* Mission Header */}
        <div className="bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            {aboutData?.missionTitle || 'Our Mission'}
          </h2>
          <p className="max-w-4xl mx-auto text-base md:text-xl leading-relaxed">
            {aboutData?.missionDescription || 'Default mission description.'}
          </p>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
          <h3 className="text-center text-2xl md:text-4xl font-bold text-gray-800 mb-12">
            How Sahoolat AI Works
          </h3>

          {/* Four Steps in a Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {aboutData?.workflowSteps?.map((step, index) => {
              const Icon = {
                FaMicrophoneAlt,
                FaSearch,
                FaHandshake,
                FaCheckCircle
              }[step.icon] || FaMicrophoneAlt;

              return (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                  <Icon className="mx-auto text-teal-500 w-12 h-12 mb-4" />
                  <h4 className="text-xl font-bold text-gray-700 mb-2">
                    {index + 1}. {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* Multi-Color (Gradient) Line */}
        <div
          className="h-1 w-5/12 my-10 mx-auto bg-gradient-to-r from-teal-400 via-pink-500 to-orange-500 mb-8"></div>

        {/* One-Line Tagline */}
        <div className="flex my-10 justify-center">
          {aboutData?.tagline?.map((line, index) => (
            <span
              key={index}
              className={`text-3xl md:text-[50px] mr-1 ${
                index % 2 === 0 ? 'text-orangebrand' : 'text-brand'
              } font-bold`}
            >
              {line}&nbsp;
            </span>
          ))}
        </div>

      </section>
      <Footer/>
    </>
  );
}
