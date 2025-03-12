// 'use client';
// import React from 'react';


// export default function Testimonials() {

//     const testimonials = [
//         {
//             text: "Sahoolat AI helped me find a plumber in minutes! Game changer",
//             author: "Ali",
//         },
//         {
//             text: "I get more customers daily with voice search. Love it!",
//             author: "Ahmed K.",
//         },
//     ];
//     return (
//         <div>
//             {/* Testimonials Section */}
//             <div className="text-center">
//                 <h2 className="text-5xl md:text-[120px] font-bold mb-5 text-textColor">Testimonials</h2>

//                 <span className="text-2xl md:text-[40px] font-bold text-textColor inline-block relative mb-6">
//                     What Users Say?
//                     <span className="absolute bottom-[-10px] left-0 right-0 mx-auto w-full border-b-4 border-brand rounded-full"></span>
//                 </span>

//                 <div className="w-full mt-4 flex flex-col md:flex-row justify-center items-center">

//                     {testimonials.map((item, index) => (
//                         <div key={index} className="px-2 w-full md:w-auto flex justify-center">
//                             {/* Testimonial Box */}
//                             <div className="w-full md:w-96 h-32 border-4 border-brand border-dotted rounded-lg p-4 flex flex-col justify-center items-center mb-2">
//                                 <p className="text-sm font-bold text-center ">{item.text}</p>
//                                 <p className="text-right mt-4 font-bold ">- {item.author} -</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }



'use client';
import React, { useState } from 'react';

export default function Testimonials() {
    const testimonials = [
        {
            text: "Sahoolat AI helped me find a plumber in minutes! Game changer",
            author: "Ali",
        },
        {
            text: "I get more customers daily with voice search. Love it!",
            author: "Ahmed K.",
        },
        // Add additional testimonials for demonstration
        {
            text: "Another testimonial for our service.",
            author: "Sara",
        },
        {
            text: "Yet another great experience!",
            author: "John",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Calculate the subset of testimonials to show (2 at a time)
    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 2);

    const next = () => {
        // Move to next set; wrap around if at the end
        setCurrentIndex((prev) =>
            prev + 2 < testimonials.length ? prev + 2 : 0
        );
    };

    const prev = () => {
        // Move to previous set; wrap to the last set if at the beginning
        setCurrentIndex((prev) =>
            prev - 2 >= 0 ? prev - 2 : Math.max(testimonials.length - 2, 0)
        );
    };

    return (
        <div className="text-center">
            <h2 className="text-5xl md:text-[120px] font-bold mb-5 text-textColor">Testimonials</h2>
            <span className="text-2xl md:text-[40px] font-bold text-textColor inline-block relative mb-6">
                What Users Say?
                <span className="absolute bottom-[-20px] left-0 right-0 mx-auto w-full border-b-4 border-brand rounded-full"></span>
            </span>

            <div className="flex justify-center items-center">
                <button onClick={prev} className="px-4 py-2 mr-4 rounded">
                <img src='/assets/arrow-left.png' alt='next'
                    className="md:w-[65px] md:h-[55px] w-[50px] h-[45px]"
                />

                </button>
                <div className="w-full mt-4 flex flex-col md:flex-row justify-center items-center">
                    {visibleTestimonials.map((item, index) => (
                        <div key={index} className="px-2 w-full md:w-auto flex justify-center">
                            <div className="w-full md:w-96 h-32 border-4 border-brand border-dotted rounded-lg p-4 flex flex-col justify-center items-center mb-2">
                                <p className="text-sm font-bold text-center">{item.text}</p>
                                <p className="text-right mt-4 font-bold">- {item.author} -</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={next} className="px-4 py-2 ml-4 rounded">
                    <img src='/assets/arrow-right.png' alt='next'
                    
                    className="md:w-[65px] md:h-[55px] w-[50px] h-[45px]"
                    
                    />

                </button>
            </div>
        </div>
    );
}
