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
        <div className="w-[600px] h-[600px] rounded-full border border-white/5"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/10"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-primary/30"></div>
      </div>

      <div className="container mx-auto lg:max-w-screen-xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="sm:text-28 text-21 text-white/70 mb-4 font-semibold">
              How It <span className="text-primary">Works?</span>
            </p>
            <h2 className="sm:text-44 text-30 text-white font-bold mb-6">
              Say It. Find it. <span className="text-orange">Get it done!</span>
            </h2>
          </motion.div>
        </div>

        {/* Main Content - Phone with Surrounding Steps */}
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

          {/* Center - Phone Mockup */}
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {/* Phone Frame */}
            <div className="relative">
              <div className="w-[280px] h-[560px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl border-4 border-gray-700">
                <div className="w-full h-full bg-midnight_text rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                  
                  {/* Phone Screen Content */}
                  <div className="p-4 pt-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <Icon icon="mdi:arrow-left" className="text-white/60" width="20" />
                      <span className="text-white font-semibold">Sahoolat.AI</span>
                      <Icon icon="mdi:dots-vertical" className="text-white/60" width="20" />
                    </div>
                    
                    {/* Chat Animation */}
                    <div className="flex-1 flex flex-col justify-start overflow-hidden">
                      {/* Chat Messages */}
                      <div className="space-y-3 mb-4">
                        {/* User Message */}
                        <div className="flex justify-end">
                          <div className="bg-primary text-white px-3 py-2 rounded-2xl rounded-br-sm text-xs max-w-[80%]">
                            I need a plumber nearby
                          </div>
                        </div>
                        {/* AI Response */}
                        <div className="flex justify-start">
                          <div className="bg-white/10 text-white px-3 py-2 rounded-2xl rounded-bl-sm text-xs max-w-[80%]">
                            🔍 Finding experts nearby...
                          </div>
                        </div>
                        {/* Expert Found */}
                        <div className="flex justify-start">
                          <div className="bg-orange/20 text-white px-3 py-2 rounded-2xl rounded-bl-sm text-xs max-w-[85%]">
                            ✅ Found 3 plumbers within 2km!
                          </div>
                        </div>
                      </div>
                      
                      {/* Typing Indicator */}
                      <div className="flex items-center gap-1 px-2">
                        <span className="text-white/60 text-xs">Chatting</span>
                        <div className="flex gap-1">
                          {[0,1,2].map((i) => (
                            <div 
                              key={i} 
                              className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-center gap-4 pb-4">
                      <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                        Find Experts
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Service Icons */}
              {floatingIcons.map((item, index) => (
                <motion.div
                  key={index}
                  whileInView={{ scale: 1, opacity: 1 }}
                  initial={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`absolute ${item.position} ${item.color} w-10 h-10 rounded-full flex items-center justify-center shadow-lg`}
                >
                  <Icon icon={item.icon} width="20" height="20" className="text-white" />
                </motion.div>
              ))}
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

        {/* Bottom CTA */}
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">Ready to experience the future of finding services?</p>
          <a 
            href="#"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/80 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Icon icon="mdi:rocket-launch" width="24" />
            Try Sahoolat.AI Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
