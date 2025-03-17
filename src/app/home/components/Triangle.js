"use client";
import React from "react";

function Triangle({icon, title}) {

  return (
    <div className="relative mt-6 md:mt-0 md:w-64 h-40 md:flex md:items-center md:justify-center">
      {/* Triangle Image */}
      <img
        src={icon}
        alt={`${title} triangle`}
        className="object-contain w-[180px] h-[194px] md:w-[100%] md:h-[200%]"
      />
    </div>
  );
}

export default Triangle;
