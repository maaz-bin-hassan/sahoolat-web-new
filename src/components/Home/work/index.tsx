"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { getImagePrefix } from "../../../utils/utils";

const Work = () => {
  const processSteps = [
    {
      icon: "mdi:pencil-box",
      title: "Write Your Request",
      text: "Describe your requirements and let the bot understand your needs",
      position: "left-top",
      iconBg: "bg-primary",
    },
    {
      icon: "mdi:brain",
      title: "AI Analysis",
      text: "Our AI analyzes your request and finds the best matches",
      position: "right-top",
      iconBg: "bg-orange",
    },
    {
      icon: "mdi:file-upload",
      title: "Upload Requirements",
      text: "Share documents, images or details to help experts understand better",
      position: "left-bottom",
      iconBg: "bg-teal-500",
    },
    {
      icon: "mdi:account-search",
      title: "Find Experts",
      text: "Connect with verified skilled professionals near you instantly",
      position: "right-bottom",
      iconBg: "bg-emerald-500",
    },
  ];

  const floatingIcons = [
    { icon: "mdi:microphone", color: "bg-primary", position: "top-0 left-1/2 -translate-x-1/2 -translate-y-4" },
    { icon: "mdi:tools", color: "bg-blue-500", position: "top-1/4 left-0 -translate-x-4" },
    { icon: "mdi:home-city", color: "bg-orange", position: "top-1/4 right-0 translate-x-4" },
    { icon: "mdi:car-wrench", color: "bg-yellow-500", position: "bottom-1/4 left-0 -translate-x-4" },
    { icon: "mdi:account-tie", color: "bg-purple-500", position: "bottom-1/4 right-0 translate-x-4" },
    { icon: "mdi:handshake", color: "bg-emerald-500", position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-4" },
  ];

  return (
    <section className="md:py-28 py-16 bg-midnight_text relative overflow-hidden" id="how-it-works">
      {/* Background Gradient Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full border border-white/5 hidden md:block"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10 hidden md:block"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10 hidden md:block"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-primary/30 hidden md:block"></div>
      </div>

      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="sm:text-28 text-lg text-white/70 mb-2 md:mb-4 font-semibold">
              How It <span className="text-primary">Works?</span>
            </p>
            <h2 className="sm:text-44 text-2xl text-white font-bold mb-4 md:mb-6">
              Say It. Find it. <span className="text-orange">Get it done!</span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile Layout - Steps then Phone */}
        <div className="lg:hidden">
          {/* Steps Grid for Mobile */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                whileInView={{ y: 0, opacity: 1 }}
                initial={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-2xl p-4 text-center"
              >
                <div className={`${step.iconBg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon icon={step.icon} width="24" height="24" className="text-white" />
                </div>
                <h3 className="text-white text-sm font-bold mb-1">{step.title}</h3>
                <p className="text-white/60 text-xs">{step.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Phone Mockup for Mobile */}
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-[240px] h-[480px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[2.5rem] p-[8px] shadow-2xl border border-gray-700/50">
                <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative border border-gray-800">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-30"></div>
                  <div className="absolute inset-0 pt-6">
                    <Image
                      src={`${getImagePrefix()}images/work/screenshot.jpg`}
                      alt="Sahoolat AI Chat Interface"
                      fill
                      loading="lazy"
                      sizes="224px"
                      quality={80}
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout - Phone with Surrounding Steps */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center min-h-[700px]">
            
            {/* Left Side Steps */}
            <div className="absolute left-0 lg:left-10 top-1/2 -translate-y-1/2 space-y-20 z-20">
              {/* Voice Request */}
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 max-w-xs"
              >
                <div className="text-right">
                  <h3 className="text-white text-xl font-bold mb-2">{processSteps[0].title}</h3>
                  <p className="text-white/60 text-sm">{processSteps[0].text}</p>
                </div>
                <div className={`${processSteps[0].iconBg} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon icon={processSteps[0].icon} width="28" height="28" className="text-white" />
                </div>
              </motion.div>

              {/* Upload Requirements */}
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 max-w-xs"
              >
                <div className="text-right">
                  <h3 className="text-white text-xl font-bold mb-2">{processSteps[2].title}</h3>
                  <p className="text-white/60 text-sm">{processSteps[2].text}</p>
                </div>
                <div className={`${processSteps[2].iconBg} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon icon={processSteps[2].icon} width="28" height="28" className="text-white" />
                </div>
              </motion.div>
            </div>

            {/* Center - iPhone Mockup */}
            <motion.div
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              {/* iPhone Frame */}
              <div className="relative">
                <div className="w-[300px] h-[600px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-[10px] shadow-2xl border border-gray-700/50">
                  {/* iPhone Inner Frame */}
                  <div className="w-full h-full bg-black rounded-[2.4rem] overflow-hidden relative border border-gray-800">
                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30"></div>
                    
                    {/* Screen Content - Chat Screenshot */}
                    <div className="absolute inset-0 pt-8">
                      <Image
                        src={`${getImagePrefix()}images/work/screenshot.jpg`}
                        alt="Sahoolat AI Chat Interface"
                        fill
                        loading="lazy"
                        sizes="280px"
                        quality={80}
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>

                {/* iPhone Side Button (Power) */}
                <div className="absolute -right-[2px] top-28 w-[3px] h-12 bg-gray-700 rounded-l-sm"></div>
                
                {/* iPhone Side Buttons (Volume) */}
                <div className="absolute -left-[2px] top-24 w-[3px] h-8 bg-gray-700 rounded-r-sm"></div>
                <div className="absolute -left-[2px] top-36 w-[3px] h-12 bg-gray-700 rounded-r-sm"></div>
                <div className="absolute -left-[2px] top-52 w-[3px] h-12 bg-gray-700 rounded-r-sm"></div>
              </div>
            </motion.div>

            {/* Right Side Steps */}
            <div className="absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 space-y-20 z-20">
              {/* AI Analysis */}
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 max-w-xs"
              >
                <div className={`${processSteps[1].iconBg} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon icon={processSteps[1].icon} width="28" height="28" className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-white text-xl font-bold mb-2">{processSteps[1].title}</h3>
                  <p className="text-white/60 text-sm">{processSteps[1].text}</p>
                </div>
              </motion.div>

              {/* Find Experts */}
              <motion.div
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 max-w-xs"
              >
                <div className={`${processSteps[3].iconBg} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon icon={processSteps[3].icon} width="28" height="28" className="text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-white text-xl font-bold mb-2">{processSteps[3].title}</h3>
                  <p className="text-white/60 text-sm">{processSteps[3].text}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-16"
        >
          <p className="text-white/60 mb-4 md:mb-6 text-sm md:text-base">Ready to experience the future of finding services?</p>
          <a 
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-primary/80 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <Icon icon="mdi:rocket-launch" width="20" className="md:w-6" />
            Try Sahoolat.AI Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
