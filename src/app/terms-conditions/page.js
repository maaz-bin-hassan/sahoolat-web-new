'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NextAPIs } from "@/utils/const";
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
        const res = await axios.get(NextAPIs.TERMS_CONDITION_LANDING_API);
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
