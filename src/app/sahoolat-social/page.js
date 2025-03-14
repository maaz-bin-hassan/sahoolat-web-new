"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaCompass, FaUser, FaPlus, FaCog, FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { BiPlay, BiPause, BiVolumeMute, BiVolumeFull } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const videoUrls = [
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23plumber+%23work+wall+mixer+ka+fiting+kese+kare+%23bathroom+%23wallmixer+%23geyser.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%F0%9F%98%B1%F0%9F%94%A5Problem+solve+PPR+Green+Pipes+Fitting+System+%F0%9F%98%B1%F0%9F%92%A5.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%24750+in+2+mins+with+a+screwdriver__+%23plumbing+%23plumber+%23satisfying+%23draincleaning+%40KEENUtility.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Bathroom+plumbing+installation+process-+Good+tools+and+machinery+make+work+easy.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/PERFECT+PLUMBING+WORK+%23shorts.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/videoplayback.mp4",
    "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Water+tank+connection+%23shorts+%23shortvideo+%23short+%23shortsfeed+%23trending+%23viralvideo+%23reels.mp4",
];

export default function SahoolatSocial() {
    const containerRef = useRef(null);
    const videoRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [muted, setMuted] = useState(true);
    const [commentsOpen, setCommentsOpen] = useState(false);

    useEffect(() => {
        const options = { root: containerRef.current, rootMargin: "0px", threshold: 0.7 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                    const index = videoRefs.current.indexOf(video);
                    if (index !== -1) setCurrentIndex(index);
                } else {
                    video.pause();
                }
            });
        }, options);

        // Ensure only valid video elements are observed
        videoRefs.current.forEach((video) => {
            if (video instanceof HTMLVideoElement) {
                observer.observe(video);
            }
        });

        return () => {
            videoRefs.current.forEach((video) => {
                if (video instanceof HTMLVideoElement) {
                    observer.unobserve(video);
                }
            });
        };
    }, []);

    const toggleComments = () => {
        setCommentsOpen((prev) => !prev);
    };

    return (
        <div className="relative w-full h-screen flex bg-gray-50">
            {/* Left Sidebar - Bigger with Text */}
            <div className="w-48 h-screen bg-white shadow-xl flex flex-col py-6 fixed left-0">
                {/* Logo */}
                <Link href={"/"}>
                    <div className="flex items-center justify-center mb-10">
                        <Image height={200} width={200} src="/assets/logo.png" alt="Sahoolat AI Logo"/>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col space-y-6 px-4">
                    <button className="flex items-center text-gray-600 hover:text-black transition">
                        <FaHome size={24} className="mr-3" /> <span className="text-lg">Home</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-black transition">
                        <FaCompass size={24} className="mr-3" /> <span className="text-lg">Explore</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-black transition">
                        <FaPlus size={24} className="mr-3" /> <span className="text-lg">Upload</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-black transition">
                        <FaUser size={24} className="mr-3" /> <span className="text-lg">Profile</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-black transition mt-auto">
                        <FaCog size={24} className="mr-3" /> <span className="text-lg">Settings</span>
                    </button>
                </nav>
            </div>

            {/* Main Video Section */}
            <div className="flex-1 flex justify-center items-center ml-48">
                <div ref={containerRef} className="w-full h-screen overflow-y-scroll"
                     style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}>
                    {videoUrls.map((url, idx) => (
                        <section key={idx} className="w-full h-screen flex items-center justify-center"
                                 style={{ scrollSnapAlign: "start" }}>

                            {/* Video Container */}
                            {/* Video Container (Increased Size) */}
                            <div className="relative w-full max-w-[600px] aspect-[10/16] rounded-xl overflow-hidden shadow-lg bg-black">
                                <video
                                    ref={(el) => (videoRefs.current[idx] = el)}
                                    src={url}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    muted={muted}
                                    playsInline
                                    loop
                                    onClick={() => {
                                        const video = videoRefs.current[idx];
                                        video.paused ? video.play() : video.pause();
                                    }}
                                />

                                {/* Right-Side Icons */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 text-white text-2xl">
                                    <button className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                                        <FaHeart />
                                    </button>
                                    <button onClick={toggleComments} className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                                        <FaRegComment />
                                    </button>
                                    <button className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                                        <FaShare />
                                    </button>
                                </div>

                                {/* Bottom Overlay Controls */}
                                <div className="absolute bottom-0 left-0 w-full text-white">
                                    <div className="bg-gradient-to-t from-black via-black/60 to-transparent px-4 pt-8 pb-4">
                                        <p className="font-bold text-lg">Video Title</p>
                                        <p className="text-sm text-gray-300">Engage with the best professionals.</p>
                                        <div className="flex space-x-2 mt-3">
                                            <button onClick={() => setMuted(!muted)} className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition">
                                                {muted ? <BiVolumeMute size={22} /> : <BiVolumeFull size={22} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* Comments Section (Dynamically Opens) */}
            <div className={`fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col transform transition-transform ${
                commentsOpen ? "translate-x-0 w-[30%]" : "translate-x-full w-0"
            }`}>
                <button className="text-black self-end m-3 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={toggleComments}>
                    ✕
                </button>
                <h2 className="text-xl font-bold p-4 border-b">Comments</h2>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <p className="text-gray-700"><strong>JohnDoe:</strong> Great video!</p>
                    <p className="text-gray-700"><strong>PlumberGuy:</strong> Very informative.</p>
                    <p className="text-gray-700"><strong>JaneDoe:</strong> Loved it! 🔥</p>
                </div>
            </div>
        </div>
    );
}
