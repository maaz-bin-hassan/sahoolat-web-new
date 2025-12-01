"use client";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getImagePrefix } from "@/utils/utils";
import { motion } from "framer-motion";

const Upgrade = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "Sahoolat AI took the guesswork out of finding the right service provider. My sink was fixed in under an hour!",
      author: "Ali",
    },
    {
      text: "Ever since I signed up, I'm getting more daily customers with voice search. It's been a game changer for my business!",
      author: "Ahmed K.",
    },
    {
      text: "The voice-based search is incredible! I just spoke what I needed and found a skilled electrician within minutes.",
      author: "Fatima S.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="md:py-40 py-20 bg-white" id="testimonials">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: "-50%", opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-dark_grey sm:text-28 text-21 mb-4 font-semibold">
            <span className="text-primary">Testimonials</span>
          </p>
          <h2 className="text-midnight_text sm:text-44 text-30 font-bold">
            See how Sahoolat AI is making life easier
          </h2>
          <p className="text-dark_grey text-18 mt-4 font-medium">
            for people and businesses every day.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-10 border-2 border-secondary shadow-card-hover text-center relative">
            <Icon
              icon="mdi:format-quote-open"
              width="48"
              height="48"
              className="text-primary mx-auto mb-6"
            />
            <p className="text-midnight_text text-24 mb-8 italic font-medium">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="text-primary text-21 font-bold">
              - {testimonials[currentTestimonial].author} -
            </p>
            
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Icon icon="mdi:chevron-left" width="24" height="24" className="text-primary hover:text-white" />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Icon icon="mdi:chevron-right" width="24" height="24" className="text-primary hover:text-white" />
              </button>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-primary" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Upgrade;
