"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa"; // Importing the Send icon
import Header from "@/components/Header";

const faqData = [
    { question: "What is Sahoolat AI?", answer: "Sahoolat AI is Pakistan’s first AI-powered voice-based freelance platform, designed to connect buyers with service providers seamlessly through audio communication." },
    { question: "How does Sahoolat AI work?", answer: "Sahoolat AI allows buyers to describe their needs through voice input, and our AI system matches them with the best available service provider based on expertise and location." },
    { question: "Is Sahoolat AI free to use?", answer: "Creating an account and exploring services is free. If you want premium services, you may use the paid version, else you may use it for free from posting unlimited jobs and finding skillful experts nearby you." },
    { question: "How can I find the right service provider?", answer: "Simply record a voice request, and Sahoolat AI will instantly match you with skilled professionals based on expertise, availability, and location." },
    { question: "How does Sahoolat AI protect user data?", answer: "We use end-to-end encryption and secure authentication to protect user data and transactions." },
    { question: "What payment methods are supported?", answer: "We support credit/debit cards, Easypaisa, JazzCash, and bank transfers." },
    { question: "Where can I find the application to install?", answer: "You can find our app on the App Store or Play Store." },
    { question: "Can I invest in this platform?", answer: `Yes, you may schedule a 1-1 video meeting call with CEO Fahad Shahzad <a href="mailto:ceo@novasyncdynamics.com" class="text-blue-600 underline">ceo@novasyncdynamics.com</a>` }
];

const FAQChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [showShortcuts, setShowShortcuts] = useState(true);

    const handleQuestionClick = (question, answer) => {
        setMessages([...messages, { type: "user", text: question }, { type: "bot", text: answer }]);
        setShowShortcuts(false); // Hide shortcut questions after first interaction
    };

    const handleUserInput = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;

        const botResponse = faqData.find(faq => faq.question.toLowerCase().includes(input.toLowerCase()))
            ? faqData.find(faq => faq.question.toLowerCase().includes(input.toLowerCase())).answer
            : "I'm sorry, but I don't have an answer to that. Please check our support page!";

        setMessages([...messages, { type: "user", text: input }, { type: "bot", text: botResponse }]);
        setInput("");
        setShowShortcuts(false); // Hide shortcut questions after first interaction
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] text-[#057e7e] px-6 py-8">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-2"
                >
                    💬 Ask Sahoolat AI
                </motion.h1>
                <p className="text-gray-600 text-center mb-4">
                    Get instant answers to your questions! Select a topic below or type your query. 👇
                </p>

                {/* Chat Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-[75%] h-[75vh] bg-white rounded-xl shadow-xl flex flex-col p-6 border border-gray-200"
                >

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 p-4">
                        {messages.length === 0 ? (
                            <p className="text-gray-500 text-center">Start a conversation by selecting a question below! 👇</p>
                        ) : (
                            messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        marginLeft: msg.type === "user" ? "auto" : "0"
                                    }}
                                    className={`p-4 rounded-xl max-w-[60%] ${
                                        msg.type === "user"
                                            ? "self-end bg-[#057e7e] text-white text-right shadow-md"
                                            : "self-start bg-gray-500 text-white text-left shadow-md"
                                    }`}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Shortcut Buttons (Hidden After First Message) */}
                    {showShortcuts && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {faqData.map(({ question, answer }, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="px-6 py-3 text-lg rounded-full bg-white border border-gray-300 hover:border-[#057e7e] hover:bg-[#057e7e] hover:text-white font-semibold shadow-md transition-all"
                                    onClick={() => handleQuestionClick(question, answer)}
                                >
                                    {question}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* User Input Field */}
                    <form onSubmit={handleUserInput} className="flex items-center border-t border-gray-300 pt-3 px-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question..."
                            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#057e7e]"
                        />
                        <button
                            type="submit"
                            className="ml-3 bg-[#057e7e] text-white p-3 rounded-full shadow-md hover:bg-[#056565] transition-all flex items-center justify-center"
                        >
                            <FaPaperPlane className="w-5 h-5" /> {/* Send Icon */}
                        </button>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default FAQChatbot;
