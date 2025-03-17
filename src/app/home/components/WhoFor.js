"use client";
import React from "react";
import Triangle from "./Triangle"; // Reusable Triangle component

const triangleData = [
  {
    title: "Homes or Businesses",
    icon: "/assets/Home-Triangle.png",
    items: ["Need urgent repairs", "Home maintenance", "Cleaning", "Any other"],
  },
  {
    title: "Skilled Workers",
    icon: "/assets/Worker-Triangle.png",
    items: ["Need urgent repairs", "Home maintenance", "Cleaning", "Any other"],
  },
  {
    title: "Event Planners",
    icon: "/assets/Planner-Triangle.png",
    items: ["Need decorators", "Caterers", "Technicians", "Etc."],
  },
];

const WhoIsItForTriangles = () => {
  return (
    <section className="w-full text-white bg-[#07212f] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main Title */}
        <div className="text-center">
          <h1 className="text-[100px] md:text-[100px] text-center font-bold text-white mb-6 md:mb-0">
            Who Is It For?
          </h1>
          <p className="text-lg md:text-xl text-white">
            Designed to help you connect with the right expertise
          </p>
        </div>

        {/* Triangles & Descriptions */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {triangleData.map((group, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 rounded-2xl shadow-sm
                         transition-transform transform-gpu duration-300 hover:shadow-md hover:scale-105"
            >
              {/* Triangle Icon + Title */}
              <Triangle icon={group.icon} title={group.title}/>

              {/* Subtitle or Bullet Points */}
              <ul className="mt-6 space-y-2 text-sm md:text-base text-white leading-relaxed">
                {group.items.map((bullet, i) => (
                  <li key={i} className="list-disc list-inside">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-center text-xl md:text-2xl text-orange-500 font-semibold italic">
          Unlimited skills can be entertained
        </p>
      </div>
    </section>
  );
};

export default WhoIsItForTriangles;
