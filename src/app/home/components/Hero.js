"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import LaunchingTimer from "@/components/LaunchingTimer";
import Link from "next/link";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});
const phrases = ["Your Voice, Your Solution"];

export default function HeroSection() {
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef(null);

  useEffect(() => {
    fetch("/animation/animation main 2.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <section className="relative bg-[#F2F6F7] py-0 overflow-hidden w-full h-screen flex items-center justify-center">
      <LaunchingTimer />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="mb-3 text-[50px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-brand to-orangebrand">
          Sahoolat.AI
        </h1>

        <div className="relative flex flex-col items-center">
          <Image
            src="/assets/starOrange.png"
            alt="Sparkle Icon"
            width={80}
            height={80}
            className="block md:hidden w-12 h-12 mb-2"
          />
          <div className="relative inline-block">
            <p className="text-[25px] font-bold md:text-[40px] text-orangebrand inline-block">
              <TypeAnimation
                sequence={phrases}
                repeat={1}
                speed={50}
                wrapper="span"
              />
            </p>
            <div className="hidden md:inline absolute md:-top-8 md:-right-12 w-6 h-6 md:w-16 md:h-16 float-animation">
              <Image
                src="/assets/starOrange.png"
                alt="Sparkle Icon"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <p className="mt-5 mb-5 text-brand font-bold text-[20px] md:text-[30px]">
          Find Skilled Experts or Get Hired – Just by Speaking!
        </p>

        <div className="flex items-center justify-center mb-6 space-x-4">
          <div className="relative cursor-pointer">
            <Link href={"/sahoolat-experience"}>
              {/*<Image*/}
              {/*  height={400}*/}
              {/*  width={400}*/}
              {/*  src="/assets/Mic.png"*/}
              {/*  alt="Microphone"*/}
              {/*  style={{ height: "140px", width: "540px" }}*/}
              {/*  className="object-contain transition-transform transform hover:scale-105"*/}
              {/*/>*/}

              <div className="flex items-center justify-center">
                {animationData ? (
                  <>
                    <Lottie
                      animationData={animationData}
                      loop
                      autoplay
                      lottieRef={lottieRef}
                      style={{ width: 320, height: 320 }}
                    />
                    <img
                      src="/assets/wave.png"
                      alt="Wave"
                      height={'50px'}
                      width={'500px'}
                      style={{marginLeft: '-4rem'}}
                    />
                  </>
                ) : (
                  <p className="text-lg text-center">Loading animation...</p>
                )}
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
          <img
            src="/assets/app-store.png"
            alt="Download on the App Store"
            className="cursor-pointer w-60 md:w-72 hover:scale-105 transition-transform duration-300"
          />
          <img
            src="/assets/google-play.png"
            alt="Get it on Google Play"
            className="cursor-pointer w-60 md:w-72 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <style jsx>{`
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
