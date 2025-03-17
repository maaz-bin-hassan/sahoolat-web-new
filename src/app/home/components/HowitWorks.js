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
    <section className="py-0 bg-[#F2F6F7]">
      <h1 className="text-[35px] md:text-[100px] text-center font-bold text-textColor mb-6 md:mb-0">
        How It Works?
      </h1>
      {/* Video Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center">
        {data.map((item, index) => (
          <Fragment key={item.id}>
            {/* Step */}
            <div className="flex flex-col items-center mb-8 md:mb-0 group">
              <div
                className={`h-[260px] ${item.id === 2 ? "w-[380px] md:w-[400px]" : "w-[300px] md:w-[340px]"} 
                                border-2 border-dotted rounded-xl border-brand flex flex-col justify-center items-center 
                                hover:text-[#ffffff] hover:scale-105 hover:shadow-xl group-hover:bg-[#80b1b1] transition-all duration-300`}
              >
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
                    width={item.id === 2 ? 220 : 140} // Middle image is larger
                    height={item.id === 2 ? 220 : 140}
                    className={`${item.id === 2 ? "h-[160px] w-[160px] md:h-[200px] md:w-[200px]" : "h-[140px] w-[140px]"}`}
                  />
                )}
                <h3
                  className="mt-3 text-center text-[20px] md:text-[30px] font-bold text-textColor transition-all duration-300">
                  {item.title}
                </h3>
                <p
                  className="text-[16px] text-center text-textColor font-bold mt-2 md:hidden transition-all duration-300">
                  {item.description}
                </p>
              </div>
              <p
                className="hidden md:block text-center text-textColor text-xl font-bold mt-5 transition-all duration-300">
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

      {/* Call to Action */}
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

      {/* Image Grid with Popup */}
      <div className="max-w-6xl gap-20 mt-5 mx-auto flex flex-col md:flex-row items-center justify-center">
        {["/assets/prototype/post-job-1.png", "/assets/prototype/post-job-2.png", "/assets/prototype/post-job-3.png"].map(
          (src, index) => (
            <img
              key={index}
              className={`rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${index === 1 ? "w-[420px] h-[780px]" : "w-[380px] h-[750px]"}`}
              src={src}
              alt={`Step ${index + 1}`}
              onClick={() => setSelectedImage(src)} // Open full-screen image on click
            />
          )
        )}
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-[#F2F6F7] text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-lg hover:bg-gray-200"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            {/* Enlarged Image */}
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}


    </section>
  );
}
