"use client";
import React from "react";
function Triangle({ icon, title }) {

    return (
        <div className="relative w-64 h-40 flex items-center justify-center">
            {/* Triangle Image */}
            <img
                src={icon}
                alt={`${title} triangle`}
                className="object-contain w-[207px] h-[194px] md:w-[100%] md:h-[200%]"
            />

            
        </div>
    );
}

export default Triangle;