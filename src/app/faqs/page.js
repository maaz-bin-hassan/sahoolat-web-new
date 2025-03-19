"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Image from "next/image";

const faqData = [
  {
    question: "What is Sahoolat AI?",
    answer: "Sahoolat AI is Pakistan’s first AI-powered voice-based freelance platform, designed to connect buyers with service providers seamlessly through audio communication.",
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
    answer: `Yes, you may schedule a 1-1 video meeting call with CEO Fahad Shahzad <a href="mailto:ceo@novasyncdynamics.com" class="text-blue-600 underline">ceo@novasyncdynamics.com</a>`,
  },
];


const FAQChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [fingerprint, setFingerprint] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if(typeof window!=='undefined'){
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message) => {
    setMessages((prev) => [...prev, { type: "user", text: message }]);
    setLoading(true);

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
    } finally {
      setLoading(false);
    }

    setInput("");
    setShowShortcuts(false);
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] text-[#057e7e] px-6 py-8">
        <motion.h1 className="text-4xl font-bold text-center mb-2">💬 Ask Sahoolat AI</motion.h1>

        <div className="md:w-[75%] h-[75vh] bg-white rounded-xl shadow-xl flex flex-col p-6 border border-gray-200">
          <div className="flex-1 overflow-y-auto space-y-3 p-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl relative flex items-start gap-2 ${msg.type === "user"
                  ? "ml-auto w-fit max-w-[90%] md:max-w-[70%] bg-[#0ea288] text-white text-right shadow-md"
                  : "mr-auto w-fit max-w-full md:max-w-[70%] bg-[#f0f0f0] text-black text-left shadow-md"}`}
              >
                {msg.type === "bot" && (
                  <div className="flex-shrink-0">
                    <Image
                      src={"/assets/logo.png"}
                      alt="Sahoolat AI Logo"
                      width={30}
                      height={30}
                      className="mt-1"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <span dangerouslySetInnerHTML={{ __html: msg?.text || "" }} />
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
            {loading && <div className="text-center text-gray-500">⏳ Thinking...</div>}
          </div>

          {showShortcuts && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {faqData.map(({ question }, index) => (
                <button
                  key={index}
                  className="px-6 py-3 rounded-full bg-white border border-gray-300 hover:bg-[#057e7e] hover:text-white font-semibold shadow-md text-xs md:text-sm"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center border-t border-gray-300 pt-3 md:px-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..." className="flex-1 p-3 rounded-full border border-gray-300"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || input.trim() === ""}
              className="ml-3 bg-[#057e7e] text-white p-3 rounded-full shadow-md"
            >
              {loading ?
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" /> :
                <FaPaperPlane className="w-5 h-5" />
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FAQChatbot;
