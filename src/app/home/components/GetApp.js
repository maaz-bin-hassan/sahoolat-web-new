'use client';
import React from 'react'

export default function GetApp() {
    return (
        <div className="text-center mt-10">
            <h1 className="text-[35px] md:text-[120px] font-bold text-textColor inline-block relative mb-6">Get App Now</h1>

            <div className="flex justify-center mt-4 mb-8 md:mb-20">
                <span className="text-[25px] md:text-[50px] mr-1 text-orangebrand font-bold">Say It.&nbsp;</span>
                <span className="text-[25px] md:text-[50px] mr-1 text-brand font-bold">Find it.&nbsp;</span>
                <span className="text-[25px] md:text-[50px] mr-1 text-orangebrand font-bold">Get it done!</span>
            </div>
            <div>
                <div className="flex flex-col md:flex-row justify-center items-center mt-8 mb-10 gap-8 md:gap-20">
                    <img src="/assets/app-store.png" href="#" alt="appstore button" className="cursor-pointer w-[295px] h-[83px] lg:w-[400px] lg:h-[114px]" />
                    <img src="/assets/google-play.png" href="#" alt="playstore button" className="cursor-pointer w-[295px] h-[83px] lg:w-[400px] lg:h-[114px]" />
                </div>
                <h1 className="text-[30px] font-bold text-textColor inline-block relative mb-6">Download and Try</h1>

            </div>
        </div>
    )
}