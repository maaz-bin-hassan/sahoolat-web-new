'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';


export default function TermsConditions() {
  const [content, setContent] = useState({
    title: '',
    intro: '',
    categories: [],
    tagline: []
  });

  useEffect(() => {
    async function fetchLandingData() {
      try {
        const res = await axios.get('/api/terms-condition-landing');
        setContent(res.data);
      } catch (error) {
        console.error('Failed to fetch landing content:', error);
      }
    }

    fetchLandingData();
  }, []);

  return (
    <>
      <Header/>
      <section className="w-full pb-16 text-gray-800">
        <div className="bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            {content.title}
          </h2>
          <p className="max-w-4xl mx-auto text-base md:text-xl leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/*<div className="py-12 px-4 bg-gray-100">*/}
        {/*  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">*/}
        {/*    {[*/}
        {/*      {*/}
        {/*        icon: "/assets/ai-mic.png",*/}
        {/*        title: "AI-Powered Voice Search",*/}
        {/*        desc: "Simply speak, and AI understands your service needs instantly.",*/}
        {/*      },*/}
        {/*      {*/}
        {/*        icon: "/assets/verified.png",*/}
        {/*        title: "Instant Matchmaking",*/}
        {/*        desc: "Get connected to the best-skilled workers in real time.",*/}
        {/*      },*/}
        {/*      {*/}
        {/*        icon: "/assets/audio.png",*/}
        {/*        title: "Real-time Audio Chat",*/}
        {/*        desc: "Talk to service providers directly via voice chat.",*/}
        {/*      }*/}
        {/*    ].map((card, i) => (*/}
        {/*      <div key={i} className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] p-6 border-l-[6px] border-transparent flex flex-col items-center text-center" style={{ borderImage: "linear-gradient(to bottom, #14b8a6, #f97316) 1" }}>*/}
        {/*        <img src={card.icon} alt={card.title} className="w-12 h-12 mb-4" />*/}
        {/*        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{card.title}</h2>*/}
        {/*        <p className="text-gray-600 mb-4">{card.desc}</p>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="max-w-4xl mx-auto px-4 md:mt-24 md:px-8 mt-10">
          {/*<h3 className="text-2xl font-bold mb-6">Terms of Use</h3>*/}
          <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
            {content.categories.map((item) => (
              <li key={item.key}>
                <Link
                  href={`/terms-conditions/${item.key}`}
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition border-b border-gray-200"
                >
                  <span className="font-medium text-lg">{item.title}</span>
                  <span className="text-gray-400 text-xl">&rsaquo;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-1 w-5/12 my-10 mx-auto bg-gradient-to-r from-teal-400 via-pink-500 to-orange-500"></div>
        <div className="flex my-10 justify-center">
          {content.tagline.map((line, index) => (
            <span
              key={index}
              className={`text-3xl md:text-[40px] mr-1 font-bold ${
                index % 2 === 0 ? 'text-orangebrand' : 'text-brand'
              }`}
            >
              {line}
            </span>
          ))}
        </div>
      </section>
      <Footer/>
    </>
  );
}
