"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const AboutPage = () => {
  const howItWorks = [
    {
      icon: "mdi:microphone",
      step: "1. Say It",
      text: "Use our voice or text input to let us know what service or solution you need. Seamless, hands-free, and quick.",
    },
    {
      icon: "mdi:magnify",
      step: "2. We Find It",
      text: "Our AI instantly searches and recommends the best service providers or professionals based on your request.",
    },
    {
      icon: "mdi:handshake",
      step: "3. Connect & Discuss",
      text: "Compare providers, chat or call directly, and negotiate terms. You're always in control of the final decision.",
    },
    {
      icon: "mdi:check-circle",
      step: "4. Get It Done",
      text: "Hire the right person or team, schedule your job, and relax as Sahoolat AI ensures a hassle-free experience from start to finish.",
    },
  ];

  return (
    <section className="pt-32 pb-20 bg-background min-h-screen">
      {/* Our Mission Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/80 to-orange py-16 mb-16">
        <div className="container mx-auto lg:max-w-screen-xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-54 font-bold mb-6">Our Mission</h1>
            <p className="text-white/90 text-18 leading-relaxed max-w-4xl mx-auto">
              At Sahoolat AI, we leverage the power of AI-driven voice search and intuitive workflows. We&apos;re committed to making everyday tasks simpler, faster, and more reliable so everyone can focus on what truly matters.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto lg:max-w-screen-xl px-4">
        {/* How Sahoolat AI Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-midnight_text text-44 font-bold text-center mb-12">
            How Sahoolat AI Works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border-2 border-secondary hover:border-primary shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="bg-secondary/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    icon={item.icon}
                    width="32"
                    height="32"
                    className="text-primary"
                  />
                </div>
                <h3 className="text-midnight_text text-21 font-bold mb-3">{item.step}</h3>
                <p className="text-dark_grey text-16 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Gradient Line */}
          <div className="mt-12 mb-8 h-1 bg-gradient-to-r from-primary via-primary to-orange rounded-full max-w-4xl mx-auto"></div>

          {/* Tagline */}
          <div className="text-center">
            <h3 className="text-44 font-bold">
              <span className="text-primary">Say It.</span>{" "}
              <span className="text-primary">Find it.</span>{" "}
              <span className="text-orange">Get it done!</span>
            </h3>
          </div>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-card border-2 border-secondary">
            <h2 className="text-midnight_text text-28 font-bold mb-6">About Sahoolat AI</h2>
            <p className="text-dark_grey text-18 leading-relaxed mb-6">
              Sahoolat AI is on a mission to redefine how people access services by combining AI-powered voice search with streamlined workflows. We aim to bridge the gap between need and fulfillment through innovation, ensuring that everyone can easily find what they need—quickly, securely, and intelligently.
            </p>
            <p className="text-dark_grey text-18 leading-relaxed mb-6">
              Whether you need a plumber, electrician, tutor, or any other service provider, Sahoolat AI makes it effortless. Simply speak your need, and our intelligent system will match you with verified professionals in your area.
            </p>
            <p className="text-dark_grey text-18 leading-relaxed">
              We believe technology should simplify life, not complicate it. That&apos;s why we&apos;ve built a platform that puts you in control while handling the complexity behind the scenes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPage;
