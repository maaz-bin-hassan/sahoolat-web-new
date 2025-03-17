'use client';
import React, {useState} from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Sahoolat AI took the guesswork out of finding the right service provider. My sink was fixed in under an hour!",
      author: "Ali",
      rating: 5,
    },
    {
      text: "Ever since I signed up, I'm getting more daily customers with voice search. It's been a game changer for my business!",
      author: "Ahmed K.",
      rating: 4,
    },
    {
      text: "I love how quick and easy it is. Booked an electrician in minutes, and everything went smoothly!",
      author: "Sara",
      rating: 5,
    },
    {
      text: "I'm impressed by the variety of services. From home repair to cleaning, they've got it all covered.",
      author: "John",
      rating: 4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Show two testimonials at a time
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 2);

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 2 < testimonials.length ? prev + 2 : 0
    );
  };

  const prev = () => {
    setCurrentIndex((prev) =>
      prev - 2 >= 0 ? prev - 2 : Math.max(testimonials.length - 2, 0)
    );
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array.from({length: 5}, (_, index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${
          index < rating ? 'fill-current text-yellow-400' : 'fill-current text-gray-300'
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.179 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.088 2.24a1 1 0 00-.364 1.118l1.179 3.63c.3.921-.755 1.688-1.54 1.118l-3.088-2.24a1 1 0 00-1.176 0l-3.088 2.24c-.784.57-1.84-.197-1.54-1.118l1.179-3.63a1 1 0 00-.364-1.118l-3.088-2.24c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.179-3.63z"/>
      </svg>
    ));
  };

  return (
    <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Testimonials
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto">
          See how <span className="text-brand font-bold">Sahoolat AI</span> is
          making life easier for people and businesses every day.
        </p>
      </div>

      {/* Testimonials Carousel */}
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-6">
          <button
            onClick={prev}
            className="transition-colors duration-200 p-2 rounded mr-4"
          >
            <img
              src="/assets/arrow-left.png"
              alt="Previous"
              className="w-6 h-6"
            />
          </button>

          {/* Testimonial Cards */}
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6">
            {visibleTestimonials.map((item, index) => (
              <div
                key={index}
                className="relative w-full md:w-96 bg-white border border-gray-200
                                           rounded-xl shadow-md p-6 flex flex-col
                                           transform transition duration-300 hover:scale-105"
              >
                {/* Star Rating */}
                <div className="flex mb-2">
                  {renderStars(item.rating)}
                </div>
                {/* Testimonial Text */}
                <p className="text-base text-gray-700 italic mb-4">
                  "{item.text}"
                </p>
                {/* Author */}
                <p className="text-right text-sm font-semibold text-gray-900">
                  - {item.author} -
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className="transition-colors duration-200 p-2 rounded ml-4"
          >
            <img
              src="/assets/arrow-right.png"
              alt="Next"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Optional CTA or Footer Text */}
      <div className="text-center mt-8">
        <p className="text-gray-700 text-lg">
          Ready to simplify your life and business?
          <span className="text-brand font-bold"> Say it. Find it. Get it done!</span>
        </p>
      </div>
    </div>
  );
}
