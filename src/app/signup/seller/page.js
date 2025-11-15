"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "@/components/signup/ChatMessage";
import RightPanel from "@/components/signup/RightPannel";
import LeftSidebar from "@/components/signup/LeftSidePannel";


const initialMessages = [
    { id: "m1", from: "bot", text: "Welcome Fahad — let's get your seller profile ready.", time: Date.now() - 1000 * 60 * 8 },
    { id: "m2", from: "bot", text: "Start by choosing the services you will offer.", time: Date.now() - 1000 * 60 * 7 },
];

const uid = (p = "") => `${p}${Math.random().toString(36).slice(2, 9)}`;

/* -------------------------
   MAIN COMPONENT
------------------------- */
export default function Page() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [bankDetails, setBankDetails] = useState({ accountNumber: "", holderName: "" });
    const [profileImage, setProfileImage] = useState(null);
    const [cnicFront, setCnicFront] = useState(null);
    const [cnicBack, setCnicBack] = useState(null);
    const chatRef = useRef(null);
    const inputRef = useRef(null);
    const STEPS = [
        { key: "services", label: "Personal Information", icon: "/sellersignup/userprofile1.png" },
        { key: "bank", label: "Legal Documents", icon: "/sellersignup/cnic.png" },
        { key: "profile", label: "Profile Photo", icon: "/sellersignup/selfie.png" },
        { key: "cnicFront", label: "Bank Account Details", icon: "/sellersignup/bank.png" },
        { key: "cnicBack", label: "Services Queries", icon: "/sellersignup/rs.png" },
        { key: "review", label: "Review Summary", icon: "/sellersignup/documents.png" },
    ];
    /* Demo QR */
    useEffect(() => {
        QRCode.toDataURL("https://sahoolat.app/sample-connect", { width: 800, margin: 2 }).then(() => {});
    }, []);

    /* Scroll only the message area */
    useEffect(() => {
        const el = chatRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages]);

    function pushMessage(from, text) {
        setMessages((m) => [...m, { id: uid("m_"), from, text, time: Date.now() }]);
    }

    function userSend(text) {
        if (!text.trim()) return;
        pushMessage("user", text.trim());
        setInput("");

        setTimeout(() => {
            if (/bank|account|iban|\d{6,}/i.test(text)) {
                pushMessage("bot", "Nice — bank detail detected. Save them or choose a payment option.");
                setCurrentStepIndex(1);
            } else {
                pushMessage("bot", "Thanks — noted. Use the controls on the right to continue the signup flow.");
            }
        }, 600);
    }

    return (
        <div className="h-screen w-full flex overflow-hidden">

            {/* LEFT SIDEBAR */}
            <LeftSidebar
                STEPS={STEPS}
                currentStepIndex={currentStepIndex}
                setCurrentStepIndex={setCurrentStepIndex}
            />
            {/* RIGHT SECTION (center chat + right panel) */}
            <div className="flex-1 flex flex-col">

                {/* STICKY HEADER */}
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#eaf7f6] flex items-center justify-center">
                            <Image src={"/assets/og-image.png"} width={40} height={40} alt="avatar" />
                        </div>
                        <div>
                            <div className="text-lg font-semibold">Seller Account Setup</div>
                            <div className="text-sm text-gray-500">0313 1373109</div>
                        </div>
                    </div>
                </header>

                {/* CHAT + RIGHT PANEL */}
                <div className="flex flex-1 overflow-hidden">
                    {/* CENTER CHAT AREA */}
                    <div className="flex-1 flex flex-col bg-white">

                        {/* MESSAGE LIST SCROLL ONLY HERE */}
                        <div ref={chatRef} className="flex-1 overflow-auto px-6 py-6">
                            <AnimatePresence initial={false}>
                                {messages.map((m, idx) => (
                                    <ChatMessage key={m.id} m={m} prev={messages[idx - 1]} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* FIXED BOTTOM INPUT BAR */}
                        <div className="sticky bottom-0 bg-white border-t px-6 py-4 z-50">
                            <div className="flex items-center gap-3 w-full">
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && userSend(input)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-3 rounded-full border focus:outline-none"
                                />
                                <button
                                    onClick={() => userSend(input)}
                                    className="px-4 py-3 bg-[#007f7a] text-white rounded-full"
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FIXED RIGHT PANEL */}
                    <RightPanel
                        STEPS={STEPS}
                        currentStepIndex={currentStepIndex}
                        userSend={userSend}
                        selectedPayment={selectedPayment}
                        setBankDetails={setBankDetails}
                        bankDetails={bankDetails}
                        setCurrentStepIndex={setCurrentStepIndex}
                    />
                </div>
            </div>
        </div>
    );
}
