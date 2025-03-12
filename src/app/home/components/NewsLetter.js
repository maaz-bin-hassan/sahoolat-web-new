import React from 'react';

export default function Newsletter() {
    return (<>


        <div className="mt-10 text-textColor font-bold text-2xl md:text-5xl text-center">
            Subscribe to our newsletter!
        </div>
        <div className="flex justify-center mt-10 mb-10">

            <div className="relative w-[90%] flex items-center border-2 border-teal-500 bg-gray-100 rounded-full">
                <input
                    type="text"
                    placeholder="Enter your email or phone number for daily updates!"
                    className="flex-grow bg-gray-300 bg-transparent pl-5 py-3  border-gray-300  font-bold focus:outline-none text-base placeholder-bold placeholder-gray-500"
                />
              
                <button className="flex items-center justify-center p-2 mr-4">
                    <img
                        src="/assets/send-icon.png"
                        alt="Send Icon"
                        className="w-5 h-5 md:w-[48px] md:h-[48px]"
                    />
                </button>
            </div>
        </div>
    </>
    );
}
