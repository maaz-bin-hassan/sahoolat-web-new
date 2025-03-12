'use client'
import React, { useState, Fragment } from 'react'
import Image from 'next/image'

// ------------------ Data for Buyer ------------------
const buyerFeatures = [
    {
        title: "AI-Powered Voice Search",
        icon: "/assets/ai-mic.png"
    },
    {
        title: "Instant Matchmaking",
        icon: "/assets/verified.png"

    },
    {
        title: "Real-time Audio Chat",
        icon: "/assets/audio.png"
    },
    {
        title: "Offline Support (Premium)",
        icon: "/assets/offline.png"
    },
    {
        title: "Safe & Secure",
        icon: "/assets/secure.png"
    }
];

const buyerInfoBoxes = [
    { icon: "/assets/bids.png", title: "Receive Bids" },
    { icon: "/assets/profile.png", title: "Watch profile and Hire!" }
];

// ------------------ Data for Experts ------------------
const expertFeatures = [
    {
        title: "AI-Powered Voice",
        icon: "/assets/speak.png"
    },
    {
        title: "Instant Matchmaking",
        icon: "/assets/matchmaking.png"

    },
    {
        title: "Showcase skills on videos",
        icon: "/assets/profile.png"
    },
    {
        title: "Offline Support (Premium)",
        icon: "/assets/offline.png"
    },
    {
        title: "Safe & Secure",
        icon: "/assets/secure.png"
    }
];

const expertInfoBoxes = [
    { icon: "/assets/notification.png", title: "Get Job Notifications" },
    { icon: "/assets/bid2.png", title: "Bid from your side!" }
];

export default function Text() {
    const [activeTab, setActiveTab] = useState('buyer');
    const features = activeTab === 'buyer' ? buyerFeatures : expertFeatures;
    const infoBoxes = activeTab === 'buyer' ? buyerInfoBoxes : expertInfoBoxes;
    const buyerColor = activeTab === 'buyer' ? 'text-brand' : 'text-textColor';
    const expertColor = activeTab === 'expert' ? 'text-brand' : 'text-textColor';

    return (
        <>
            <div className="bg-white mb-10">
                <div className="flex flex-col items-center justify-center">
                    {/* Main Heading */}
                    <div className='realative'>
                        <h1 className="mt-10 text-[35px] md:text-[120px] font-bold text-textColor relative mb-12 text-center">
                            Why Sahoolat.AI
                            <span
                                className="absolute bottom-[-1px]  left-1/2 transform -translate-x-1/2 w-1/4 border-b-8 rounded-full border-brand"
                            />                        </h1>
                        {/* Tabs: For Buyer & For Experts */}
                        <div className="flex space-x-10 justify-center items-center">
                            <h1
                                onClick={() => setActiveTab('buyer')}

                                className={`${buyerColor} text-brand hover:text-brand text-2xl md:text-[60px] font-bold inline-block relative mb-6 mr-2 cursor-pointer`}
                            >
                                For Buyer!
                                <span
                                    className={`mt-4 absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 w-1/2  border-b-8 rounded-full ${activeTab === 'buyer' ? 'border-brand' : 'border-transparent'
                                        }`}
                                />
                            </h1>
                            <h1
                                onClick={() => setActiveTab('expert')}
                                className={`${expertColor} hover:text-brand text-2xl md:text-[60px] font-bold text-textColor inline-block relative mb-6 cursor-pointer`}
                            >
                                For Experts!
                                <span
                                    className={`absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 w-1/2 border-b-8 rounded-full ${activeTab === 'expert' ? 'border-brand' : 'border-transparent'
                                        }`}
                                />
                            </h1>
                        </div>
                    </div>

                    {/* Features and Info Boxes */}
                    <div className="mt-10">
                        <section className="mx-auto max-w-8xl md:max-w-8xl px-4 flex flex-col md:flex-row justify-center">
                            {/* Left Column: Features */}

                            <div className='flex flex-col md:flex-row'>
                                <div className="flex flex-col gap-4 md:mr-56">
                                    {features.map((feature, index) => (
                                        <div key={index} className="mb-8">
                                            <h2 className="text-[25px] md:text-[45px] font-bold flex items-center text-textColor">
                                                <img
                                                    src={feature.icon}
                                                    alt={`${feature.title} icon`}
                                                    className="object-contain mr-6 w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                                                />
                                                {feature.title}
                                            </h2>
                                        </div>
                                    ))}

                                </div>
                                <div className="flex flex-col items-center">
                                    {infoBoxes.map((box, index) => (
                                        <Fragment key={index}>
                                            {/* The info box */}
                                            <div
                                                className="w-[250px] h-auto md:w-[332px] items-center justify-center bg-white p-6 border-2 border-brand border-dotted rounded-lg"
                                            >
                                                <div className="flex justify-center items-center">
                                                    <Image
                                                        src={box.icon}
                                                        alt={`${box.title} icon`}
                                                        width={100}
                                                        height={100}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <h2 className="font-bold text-[25px] md:text-[40px] mt-2 text-textColor text-center relative top-[-10px]">
                                                    {box.title}
                                                </h2>
                                            </div>

                                            {/* Render the arrow image only if this box is not the last one */}
                                            {index !== infoBoxes.length - 1 && (
                                                <div>
                                                    <Image
                                                        src="/assets/arrow-down.png"
                                                        alt="Arrow"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </div>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>

                            </div>
                        </section>
                    </div>
                </div >
            </div>
        </>

    );
}
