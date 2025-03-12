"use client";
import React from "react";
import Triangle from "./Triangle"; // Reusable Triangle component

const triangleData = [
  {
    title: "Home Business",
    icon:"/assets/Home-Triangle.png",
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="relative">
          <h2 className="text-[35px] md:text-[120px] font-bold text-center mb-8 text-textColor">
            Who Is It For?
          </h2>
          <div
            className="absolute border-4 bottom-[1px]  left-1/2 transform -translate-x-1/2 w-1/4  rounded-full border-brand"
          />
        </div>


        {/* Triangles Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {triangleData.map((item,index) => (
            <span key={index} className="flex flex-col items-centerjustify-center mt-4">
              {/* Triangle Image */}
              <Triangle
                icon={item.icon}
                title={item.title}
              />

              {/* Bullet Points Below */}
              <ul className="list-disc text-textColor font-normal ml-5 hidden md:block items-center justify-center">
                {item.items.map((bullet, idx) => (
                  <li key={idx} className="text-[15px] ml-12">{bullet}</li>
                ))}
              </ul>
            </span>
          ))}
        </div>

        {/* Footer Note in Orange */}
        <p className="text-center text-[25px] md:text-[45px] italic text-orangebrand mt-8 font-bold">
          Unlimited skills can be entertained
        </p>
      </div>
    </section>
  );
};

export default WhoIsItForTriangles;
