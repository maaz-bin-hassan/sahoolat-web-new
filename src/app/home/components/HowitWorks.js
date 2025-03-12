"use client";
import React, {Fragment, useState} from "react";
import Image from "next/image";

export default function HowItWorks() {
    const [micSrc, setMicSrc] = useState("/assets/Mic2.png");
    const [selectedImage, setSelectedImage] = useState(null); // State to track enlarged image

    const data = [
        {
            id: 1,
            image: micSrc,
            title: "Speak you need",
            description: "Just say what service you need—no typing required!",
        },
        {
            id: 2,
            image: "/assets/starGreen.png",
            title: "AI Matches You Instantly",
            description: "Our AI finds the best-skilled worker near you in seconds.",
        },
        {
            id: 3,
            image: "/assets/Ready.png",
            title: "Get it Done",
            description: "Connect via voice or chat and get the job done hassle-free.",
        },
    ];

    const handleMicClick = () => {
        setMicSrc((prev) =>
            prev === "/assets/Mic.png" ? "/assets/Mic2.png" : "/assets/Mic2.png"
        );
    };

    return (
        <section className="py-12 bg-white">
            <h1 className="text-[35px] md:text-[100px] text-center font-bold text-textColor mb-6 md:mb-0">
                How It Works?
            </h1>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center">
                {data.map((item, index) => (
                    <Fragment key={item.id}>
                        {/* Step */}
                        <div className="flex flex-col items-center mb-8 md:mb-0 group">
                            <div
                                className="h-[260px] w-[300px] md:w-[340px] border-2 border-dotted rounded-xl border-brand flex flex-col justify-center items-center hover:text-[#ffffff] hover:scale-105 hover:shadow-xl group-hover:bg-[#80b1b1] transition-all duration-300">
                                {item.id === 1 ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={140}
                                        height={140}
                                        className="h-auto w-[140px] cursor-pointer"
                                        onClick={handleMicClick}
                                    />
                                ) : (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={item.id === 2 ? 200 : 140}
                                        height={item.id === 2 ? 200 : 140}
                                        className="h-[140px] w-[140px]"
                                    />
                                )}
                                <h3 className="mt-3 text-center text-[25px] md:text-[40px] font-bold text-textColor  transition-all duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-[16px] text-center text-textColor font-bold mt-2 md:hidden  transition-all duration-300">
                                    {item.description}
                                </p>
                            </div>
                            <p className="hidden md:block text-center text-textColor text-xl font-bold mt-5  transition-all duration-300">
                                {item.description}
                            </p>
                        </div>


                        {/* Arrow (except after the last step) */}
                        {index !== data.length - 1 && (
                            <div>
                                <Image
                                    src="/assets/arrow-flow.png"
                                    alt="Arrow"
                                    width={100}
                                    height={100}
                                    className="hidden md:block -my-10"
                                />
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
            <div className="flex mt-5 justify-center">
                <span className="text-3xl md:text-[50px] mr-1 text-orangebrand font-bold">Say It.&nbsp;</span>
                <span className="text-3xl md:text-[50px] mr-1 text-brand font-bold">Find it.&nbsp;</span>
                <span className="text-3xl md:text-[50px] mr-1 text-orangebrand font-bold">Get it done!</span>
            </div>
            {/*//todo: if user click on any of below image it should get enlarge to full page as popup with cross to cancle and return back to the page*/}
            <div className={'max-w-6xl gap-20 mt-5 mx-auto flex flex-col md:flex-row items-center justify-center'}>
                <img className={"rounded-lg hover:h-[700px] hover:w-[400px]"} height={750} width={380} src="/assets/prototype/post-job-1.png" alt=""/>
                <img className={"rounded-lg hover:h-[720px] hover:w-[410px]"} height={800} width={400} src="/assets/prototype/post-job-2.png" alt=""/>
                <img className={"rounded-lg hover:h-[700px] hover:w-[400px]"} height={750} width={380} src="/assets/prototype/post-job-3.png" alt=""/>
            </div>

        </section>
    );
}
