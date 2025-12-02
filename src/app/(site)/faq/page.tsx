"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { getImagePrefix } from "@/utils/utils";

const faqData = [
  {
    question: "What is Sahoolat AI?",
    answer: "Sahoolat AI is Pakistan's first AI-powered voice-based freelance platform, designed to connect buyers with service providers seamlessly through audio communication.",
  },
  {
    question: "How does Sahoolat AI work?",
    answer: "Sahoolat AI allows buyers to describe their needs through voice input, and our AI system matches them with the best available service provider based on expertise and location.",
  },
  {
    question: "Is Sahoolat AI free to use?",
    answer: "Creating an account and exploring services is free. If you want premium services, you may use the paid version, else you may use it for free from posting unlimited jobs and finding skillful experts nearby you.",
  },
  {
    question: "How can I find the right service provider?",
    answer: "Simply record a voice request, and Sahoolat AI will instantly match you with skilled professionals based on expertise, availability, and location.",
  },
  {
    question: "How does Sahoolat AI protect user data?",
    answer: "We use end-to-end encryption and secure authentication to protect user data and transactions.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We support credit/debit cards, Easypaisa, JazzCash, and bank transfers.",
  },
  {
    question: "Where can I find the application to install?",
    answer: "You can find our app on the App Store or Play Store.",
  },
  {
    question: "Can I invest in this platform?",
    answer: `Yes, you may schedule a 1-1 video meeting call with CEO Fahad Shahzad <a href="mailto:ceo@novasyncdynamics.com" class="text-primary underline hover:text-orange transition-colors">ceo@novasyncdynamics.com</a>`,
  },
];

interface Message {
  type: "user" | "bot";
  text: string;
}

const FAQChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: "👋 Hello! Welcome to Sahoolat AI. I'm here to help answer your questions. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [fingerprint, setFingerprint] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fp = localStorage.getItem("fingerprint") || `fp-${Date.now()}`;
      localStorage.setItem("fingerprint", fp);
      setFingerprint(fp);

      fetch("/api/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint: fp }),
      });
    }
  }, []);

  useEffect(() => {
    // Scroll only within the messages container, not the whole page
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: message }]);
    setLoading(true);
    setInput("");
    setShowShortcuts(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint, message }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const { response } = await res.json();
      setMessages((prev) => [...prev, { type: "bot", text: response }]);
    } catch (error) {
      toast.error("Network issue occurred. Please try again!");
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        toastClassName="bg-white shadow-card-hover"
      />

      <section className="min-h-screen bg-white pt-20 md:pt-24 pb-10 overflow-x-hidden">
        <div className="container mx-auto lg:max-w-screen-xl px-3 md:px-4">
          {/* Header */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4 px-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-midnight_text mb-2 md:mb-4">
              💬 Ask <span className="text-primary">Sahoolat</span><span className="text-orange">.AI</span>
            </h1>
            <p className="text-dark_grey text-sm md:text-lg">
              Get instant answers to your questions about our platform
            </p>
          </motion.div>

          {/* Chat Container */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-card-hover border-2 border-secondary overflow-hidden">
              {/* Chat Header */}
              <div className="bg-primary px-4 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
                  <Icon icon="mdi:robot-happy" className="text-primary" width="20" />
                </div>
                <div>
                  <h2 className="text-white font-semibold text-sm md:text-base">Sahoolat AI Assistant</h2>
                  <p className="text-white/70 text-xs md:text-sm">Always here to help</p>
                </div>
                <div className="ml-auto flex items-center gap-1 md:gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white/70 text-xs md:text-sm">Online</span>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={messagesContainerRef}
                className="h-[30vh] md:h-[40vh] overflow-y-auto p-3 md:p-5 space-y-3 md:space-y-5 bg-gradient-to-b from-secondary/10 to-white scroll-smooth"
              >
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-2 md:gap-3 ${
                      msg.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.type === "user"
                          ? "bg-orange"
                          : "bg-primary"
                      }`}
                    >
                      <Icon
                        icon={msg.type === "user" ? "mdi:account" : "mdi:robot-happy"}
                        className="text-white"
                        width="18"
                      />
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] md:max-w-[75%] px-3 md:px-5 py-2 md:py-3 rounded-2xl shadow-card ${
                        msg.type === "user"
                          ? "bg-primary text-white rounded-tr-sm"
                          : "bg-white text-midnight_text rounded-tl-sm border border-secondary"
                      }`}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                        className="text-xs md:text-base leading-relaxed"
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Loading Indicator */}
                {loading && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center">
                      <Icon icon="mdi:robot-happy" className="text-white" width="18" />
                    </div>
                    <div className="bg-white px-3 md:px-5 py-3 md:py-4 rounded-2xl rounded-tl-sm shadow-card border border-secondary">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-dark_grey text-sm">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {showShortcuts && (
                <div className="px-3 md:px-4 py-2 md:py-3 bg-secondary/20 border-t border-secondary">
                  <p className="text-dark_grey text-[10px] md:text-xs mb-1.5 md:mb-2 font-medium">
                    ⚡ Quick Questions:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {faqData.map(({ question }, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-white border border-primary/20 hover:border-primary hover:bg-primary hover:text-white text-midnight_text font-medium text-[9px] md:text-xs transition-all duration-300 shadow-sm"
                        onClick={() => sendMessage(question)}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <form
                className="px-3 md:px-4 py-2 md:py-3 bg-white border-t-2 border-secondary flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-full border-2 border-secondary focus:border-primary focus:outline-none transition-colors bg-secondary/20 text-midnight_text placeholder:text-dark_grey text-xs md:text-sm"
                    disabled={loading}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading || input.trim() === ""}
                  className="bg-primary hover:bg-primary/90 disabled:bg-dark_grey disabled:cursor-not-allowed text-white p-2.5 md:p-3 rounded-full shadow-button transition-all duration-300"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-t-2 border-white" />
                  ) : (
                    <Icon icon="mdi:send" className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </motion.button>
              </form>
            </div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-3 md:mt-4"
            >
              <p className="text-dark_grey text-xs md:text-base">
                Can't find what you're looking for?{" "}
                <a
                  href="mailto:support@sahoolat.ai"
                  className="text-primary hover:text-orange font-semibold transition-colors"
                >
                  Contact Support
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQChatbot;
