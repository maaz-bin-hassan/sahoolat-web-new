"use client";
import Image from "next/image";
import {useState, useEffect} from "react";

const storeLinks = [
    {
        src: "/assets/app-store.png",
        alt: "App Store",
        href: "#",
    },
    {
        src: "/assets/google-play.png",
        alt: "Google Play",
        href: "#",
    },
];

export default function HeroSection() {
    const [isOriginal, setIsOriginal] = useState(true);
    const [typedText, setTypedText] = useState(""); // Initialize with an empty string

    const fullText = "Your Voice, Your Solution";

    useEffect(() => {
        let index = 0;
        setTypedText(""); // Ensure it's cleared before starting

        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setTypedText((prev) => prev + fullText.charAt(index)); // Append characters correctly
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100); // Adjust speed as needed

        return () => clearInterval(typingInterval);
    }, []);

    const handleImageClick = () => {
        setIsOriginal((prev) => !prev);
    };

    return (
        <section className="relative py-12 overflow-hidden w-full h-screen flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/assets/heroBackground.png"
                    alt="Background"
                    style={{width: 'fit-content', fill: 'cover'}}
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                {/* Logo */}
                <h1 className="mb-3 text-[50px] md:text-[150px] font-bold text-brand">
                    Sahoolat.AI
                </h1>

                {/* Typing Effect for Tagline */}
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
                            {typedText}
                            <span className="animate-blink">{typedText.length < fullText.length ? "|" : ""}</span>
                        </p>
                        <div
                            className="hidden md:inline absolute md:-top-8 md:-right-12 w-6 h-6 md:w-16 md:h-16 float-animation">
                            <Image
                                src="/assets/starOrange.png"
                                alt="Sparkle Icon"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="mt-5 mb-5 text-brand font-bold text-[20px] md:text-[30px]">
                    Find Skilled Experts or Get Hired – Just by Speaking!
                </p>

                {/* Mic & Waves Section */}
                <div className="flex items-center justify-center mb-6 space-x-4">
                    {/* Mic */}
                    <div className="relative cursor-pointer">
                        <img
                            src={'/assets/Mic.png'}
                            alt="Microphone"
                            style={{height: '140px', width: '540px'}}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Download Section */}
                <p className="mb-6 mt-2 text-xl md:text-4xl font-bold text-textColor">
                    Download for free!
                </p>

                {/* App Store Buttons */}
                <div className="flex space-x-4 md:space-x-36">
                    {storeLinks.map((link, index) => (
                        <a key={index} href={link.href}>
                            <Image
                                {...link}
                                width={400}
                                height={114}
                                className="cursor-pointer w-[150px] h-[50px] lg:w-[400px] lg:h-[100px]"
                            />
                        </a>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .float-animation {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-blink {
                    animation: blink 0.8s step-end infinite;
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

                @keyframes blink {
                    50% {
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
}
