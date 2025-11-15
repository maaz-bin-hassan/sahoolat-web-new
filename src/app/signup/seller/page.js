"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

/* -------------------------
   DATA / CONFIG
   ------------------------- */
const STEPS = [
    { key: "services", label: "Personal Information", icon: "/sellersignup/selfie.png" },
    { key: "bank", label: "Legal Documents", icon: "/sellersignup/selfie.png" },
    { key: "profile", label: "Profile Photo", icon: "/sellersignup/selfie.png" },
    { key: "cnicFront", label: "Bank Account Details", icon: "/sellersignup/selfie.png" },
    { key: "cnicBack", label: "Services Queries", icon: "/sellersignup/selfie.png" },
    { key: "review", label: "Review Summary", icon: "/sellersignup/selfie.png" },
];

const initialMessages = [
    { id: "m1", from: "bot", text: "Welcome Fahad — let's get your seller profile ready.", time: Date.now() - 1000 * 60 * 8 },
    { id: "m2", from: "bot", text: "Start by choosing the services you will offer.", time: Date.now() - 1000 * 60 * 7 },
];

/* -------------------------
   UTILS
   ------------------------- */
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
    const [qrData, setQrData] = useState("");
    const chatRef = useRef(null);
    const inputRef = useRef(null);

    /* generate a demo qr */
    useEffect(() => {
        QRCode.toDataURL("https://sahoolat.app/sample-connect", { width: 800, margin: 2 }).then(setQrData);
    }, []);

    /* scroll on new message */
    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    function pushMessage(from, text) {
        setMessages((m) => [...m, { id: uid("m_"), from, text, time: Date.now() }]);
    }

    function userSend(text) {
        if (!text?.trim()) return;
        pushMessage("user", text);
        setInput("");
        // simple bot reactions for demo
        setTimeout(() => {
            if (/bank|account|iban|\d{6,}/i.test(text)) {
                pushMessage("bot", "Nice — bank detail detected. Save them or choose a payment option.");
                setCurrentStepIndex(1);
            } else {
                pushMessage("bot", "Thanks — noted. Use the controls on the right to continue the signup flow.");
            }
        }, 600);
    }

    function handleIntent(kind, payload = null) {
        // push user visible quick message
        pushMessage("user", payload?.text || kind);
        switch (kind) {
            case "payment-jazz":
                setSelectedPayment("JazzCash");
                pushMessage("bot", "JazzCash selected. Now enter account number or proceed to bank details.");
                setCurrentStepIndex(1);
                break;
            case "payment-easy":
                setSelectedPayment("Easypaisa");
                pushMessage("bot", "Easypaisa selected. Now enter account number or proceed to bank details.");
                setCurrentStepIndex(1);
                break;
            case "upload-profile":
                setCurrentStepIndex(2);
                pushMessage("bot", "Please upload a profile photo.");
                break;
            case "upload-cnic-front":
                setCurrentStepIndex(3);
                pushMessage("bot", "Please upload CNIC front.");
                break;
            case "upload-cnic-back":
                setCurrentStepIndex(4);
                pushMessage("bot", "Please upload CNIC back.");
                break;
            case "review":
                setCurrentStepIndex(5);
                pushMessage("bot", "Review details and submit when ready.");
                break;
            default:
                pushMessage("bot", "Action received.");
        }
    }

    /* file helpers */
    function handleImageUpload(e, setter) {
        const f = e.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        setter({ file: f, url });
        pushMessage("user", `Uploaded ${f.name}`);
    }

    function removeUploaded(setter, label) {
        setter(null);
        pushMessage("user", `Removed ${label}`);
    }

    /* final submit */
    function handleSubmit() {
        // naive validation
        if (!selectedPayment || !bankDetails.accountNumber || !bankDetails.holderName || !profileImage || !cnicFront || !cnicBack) {
            pushMessage("bot", "Please complete all steps before submitting.");
            return;
        }
        pushMessage("user", "Submit registration");
        pushMessage("bot", "Processing... please wait.");
        setTimeout(() => {
            pushMessage("bot", "✅ Registration complete — welcome aboard!");
            setCurrentStepIndex(STEPS.length - 1);
        }, 2000);
    }

    /* UI pieces */
    function LeftStepper() {
        return (
            <div className="hidden lg:flex lg:flex-col lg:items-start lg:gap-6 p-6 w-64">
                <div className="w-full mb-2">
                    <Image src={'/assets/sahoolat.png'} width={400} height={200} alt={'Sahoolat AI'} />
                    <div className="text-xs text-gray-400">Seller Onboarding</div>
                </div>

                <div className="flex-1">
                    {STEPS.map((s, i) => {
                        const active = i === currentStepIndex;
                        const done = i < currentStepIndex;
                        return (
                            <div key={s.key} className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setCurrentStepIndex(i)}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold ${active ? "bg-[#008080] text-white shadow-md" : done ? "bg-white/90 text-emerald-600 border" : "bg-white/60 text-gray-600 border"}`}>
                                    <div><Image height={20} width={20} src={s.icon} /> </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className={`text-sm font-medium ${active ? "text-gray-900" : "text-gray-600"}`}>{s.label}</div>
                                    <div className="text-xs text-gray-400">
                                        {done ? "Completed" : active ? "In progress" : "Pending"}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-auto">
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="w-full h-3 bg-white/30 rounded-full mt-2 overflow-hidden">
                        <div className="h-3 bg-[#008080]" style={{ width: `${Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}%` }} />
                    </div>
                </div>
            </div>
        );
    }

    function RightPanel() {
        const step = STEPS[currentStepIndex]?.key;
        return (
            <div className="w-full lg:w-96 p-6 bg-white/60 border-l hidden lg:block">
                <div className="text-sm text-gray-600 mb-4">Current Step</div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-lg font-semibold mb-2">{STEPS[currentStepIndex].label}</div>
                    <div className="text-sm text-gray-600 mb-4">
                        {step === "bank" && "Enter bank / payment info below and save."}
                        {step === "profile" && "Upload a friendly profile photo customers can recognize."}
                        {step === "cnicFront" && "Upload clear CNIC front image."}
                        {step === "cnicBack" && "Upload CNIC back image."}
                        {step === "review" && "Review all details and submit."}
                        {step === "services" && "Select your service categories."}
                    </div>

                    {/* dynamic panels */}
                    {step === "services" && (
                        <div className="space-y-2">
                            <div className="text-sm text-gray-700 mb-2">Quick service picks</div>
                            <div className="flex flex-wrap gap-2">
                                {["Cleaning", "Tutoring", "Delivery", "Handyman"].map((s) => (
                                    <button key={s} onClick={() => userSend(s)} className="px-3 py-2 rounded-lg bg-white/90 border text-sm text-gray-700">
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4">
                                <button onClick={() => handleIntent("payment-jazz")} className="w-full px-4 py-2 bg-[#008080] text-white rounded-lg">Choose Payment</button>
                            </div>
                        </div>
                    )}

                    {step === "bank" && (
                        <div className="space-y-3">
                            <div className="text-xs text-gray-500">Selected Payment</div>
                            <div className="text-sm font-medium">{selectedPayment || "Not selected"}</div>

                            <label className="block text-xs text-gray-500">Account / IBAN</label>
                            <input value={bankDetails.accountNumber} onChange={(e) => setBankDetails((s) => ({ ...s, accountNumber: e.target.value }))} className="w-full px-3 py-2 rounded-md border" placeholder="0313xxxxxxx" />

                            <label className="block text-xs text-gray-500">Account Holder</label>
                            <input value={bankDetails.holderName} onChange={(e) => setBankDetails((s) => ({ ...s, holderName: e.target.value }))} className="w-full px-3 py-2 rounded-md border" placeholder="Your full name" />

                            <div className="flex gap-2 mt-3">
                                <button onClick={() => { pushMessage("user", `Saved bank ${bankDetails.accountNumber}`); pushMessage("bot", "Bank saved"); setCurrentStepIndex(2); }} className="flex-1 px-3 py-2 bg-[#008080] text-white rounded-lg">Save & Continue</button>
                                <button onClick={() => handleIntent("upload-profile")} className="px-3 py-2 border rounded-lg">Skip to Photo</button>
                            </div>
                        </div>
                    )}

                    {step === "profile" && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                                    {profileImage ? <img src={profileImage.url} className="w-full h-full object-cover" /> : <div className="text-gray-400">No photo</div>}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">Profile Photo</div>
                                    <div className="text-xs text-gray-500">Recommended: headshot, well lit</div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <input id="profileInput2" onChange={(e) => handleImageUpload(e, setProfileImage)} type="file" accept="image/*" className="hidden" />
                                <button onClick={() => document.getElementById("profileInput2").click()} className="flex-1 px-3 py-2 bg-white border rounded-lg">Upload</button>
                                <button onClick={() => removeUploaded(setProfileImage, "Profile Photo")} className="px-3 py-2 border rounded-lg">Remove</button>
                            </div>

                            <div className="mt-3">
                                <button onClick={() => setCurrentStepIndex(3)} className="w-full px-3 py-2 bg-[#008080] text-white rounded-lg">Next: CNIC Front</button>
                            </div>
                        </div>
                    )}

                    {step === "cnicFront" && (
                        <div className="space-y-3">
                            <div className="text-sm text-gray-700">Upload front of CNIC</div>
                            <div className="w-full h-44 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                                {cnicFront ? <img src={cnicFront.url} className="object-contain w-full h-full" /> : <div className="text-gray-400">No file</div>}
                            </div>
                            <div className="flex gap-2">
                                <input id="cnicFrontInput2" onChange={(e) => handleImageUpload(e, setCnicFront)} type="file" accept="image/*,.pdf" className="hidden" />
                                <button onClick={() => document.getElementById("cnicFrontInput2").click()} className="flex-1 px-3 py-2 bg-white border rounded-lg">Upload Front</button>
                                <button onClick={() => removeUploaded(setCnicFront, "CNIC Front")} className="px-3 py-2 border rounded-lg">Remove</button>
                            </div>
                            <div><button onClick={() => setCurrentStepIndex(4)} className="w-full px-3 py-2 bg-[#008080] text-white rounded-lg">Next: CNIC Back</button></div>
                        </div>
                    )}

                    {step === "cnicBack" && (
                        <div className="space-y-3">
                            <div className="text-sm text-gray-700">Upload back of CNIC</div>
                            <div className="w-full h-44 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border">
                                {cnicBack ? <img src={cnicBack.url} className="object-contain w-full h-full" /> : <div className="text-gray-400">No file</div>}
                            </div>
                            <div className="flex gap-2">
                                <input id="cnicBackInput2" onChange={(e) => handleImageUpload(e, setCnicBack)} type="file" accept="image/*,.pdf" className="hidden" />
                                <button onClick={() => document.getElementById("cnicBackInput2").click()} className="flex-1 px-3 py-2 bg-white border rounded-lg">Upload Back</button>
                                <button onClick={() => removeUploaded(setCnicBack, "CNIC Back")} className="px-3 py-2 border rounded-lg">Remove</button>
                            </div>
                            <div><button onClick={() => setCurrentStepIndex(5)} className="w-full px-3 py-2 bg-[#008080] text-white rounded-lg">Next: Review</button></div>
                        </div>
                    )}

                    {step === "review" && (
                        <div className="space-y-3">
                            <div className="text-sm text-gray-700">Review your details</div>
                            <div className="bg-gray-50 p-3 rounded-md border text-sm">
                                <div><strong>Payment:</strong> {selectedPayment || "—"}</div>
                                <div><strong>Account:</strong> {bankDetails.accountNumber || "—"}</div>
                                <div><strong>Holder:</strong> {bankDetails.holderName || "—"}</div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="col-span-1">
                                    <div className="text-xs text-gray-500">Profile</div>
                                    <div className="w-20 h-20 rounded-full overflow-hidden border mt-2">{profileImage ? <img src={profileImage.url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100" />}</div>
                                </div>
                                <div className="col-span-1">
                                    <div className="text-xs text-gray-500">CNIC F</div>
                                    <div className="mt-2 w-full h-20 rounded-md overflow-hidden border">{cnicFront ? <img src={cnicFront.url} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-100" />}</div>
                                </div>
                                <div className="col-span-1">
                                    <div className="text-xs text-gray-500">CNIC B</div>
                                    <div className="mt-2 w-full h-20 rounded-md overflow-hidden border">{cnicBack ? <img src={cnicBack.url} className="w-full h-full object-contain" /> : <div className="w-full h-full bg-gray-100" />}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button onClick={handleSubmit} className="flex-1 px-3 py-2 bg-[#008080] text-white rounded-lg">Submit</button>
                                <button onClick={() => setCurrentStepIndex(0)} className="px-3 py-2 border rounded-lg">Edit</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    function ChatMessage({ m, prev }) {
        const isBot = m.from === "bot";
        const bubbleClass = isBot ? "bg-white/90 text-gray-800 rounded-br-xl rounded-tl-xl" : "bg-[#008080] text-white rounded-bl-xl rounded-tr-xl";
        const align = isBot ? "justify-start" : "justify-end";
        const showAvatar = !prev || prev.from !== m.from;
        return (
            <div className={`flex ${align} mb-3`}>
                <div className={`max-w-[76%]`}>
                    <div className={`flex items-end gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                        {showAvatar && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBot ? "bg-[#008080] text-white" : "bg-gray-200 text-gray-700"}`}>
                                {isBot ? "S" : "U"}
                            </div>
                        )}
                        <div>
                            <div className={`px-5 py-3 ${bubbleClass} text-sm leading-relaxed`}>{m.text}</div>
                            <div className="text-[11px] mt-1 text-gray-400">{new Date(m.time).toLocaleTimeString()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* large chat layout */
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid lg:grid-cols-[280px_1fr_360px]">
                    {/* Left stepper */}
                    <LeftStepper />

                    {/* Center - large Chat */}
                    <div className="relative flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#dedfdf] text-white flex items-center justify-center font-bold text-lg">
                                    <Image src={'/assets/og-image.png'} alt={'Sahoolat'} height={40} width={40} />
                                </div>
                                <div>
                                    <div className="text-lg font-semibold">Seller Account Setup</div>
                                    <div className="text-sm text-gray-500">03131373109</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="text-sm px-3 py-2 border rounded-md text-gray-600">Help</button>
                                <div className="text-xs text-gray-400">Step {currentStepIndex + 1}/{STEPS.length}</div>
                            </div>
                        </div>

                        {/* chat area */}
                        <div className="flex-1 overflow-auto p-8" ref={chatRef} style={{ minHeight: 520 }}>
                            <div className="max-w-3xl mx-auto">
                                {/* messages */}
                                <div className="space-y-2">
                                    {messages.map((m, idx) => (
                                        <ChatMessage key={m.id} m={m} prev={messages[idx - 1]} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* input bar - floating */}
                        <div className="px-6 py-4 border-t bg-white sticky bottom-0">
                            <div className="max-w-3xl mx-auto flex items-center gap-3">
                                <div className="flex-1">
                                    <input
                                        ref={inputRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && userSend(input)}
                                        placeholder="Type a message or choose quick action..."
                                        className="w-full px-4 py-3 rounded-full border focus:outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => userSend(input)} className="px-4 py-3 bg-[#008080] text-white rounded-full">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right panel */}
                    <RightPanel />
                </div>
            </div>
        </div>
    );
}
