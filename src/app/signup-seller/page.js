"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextAPIs, ThirdPartyAPIs } from "@/utils/const";

const promptTitle = "SIGNUP_SELLER";
const country = "Pakistan";
const language = "en";
let deviceId = null;

const generateDeviceId = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};
export default function SignupPage() {
  const [category, setCategory] = useState("");
  const [log, setLog] = useState([]);
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // For auto-scroll
  const messagesContainerRef = useRef(null);
  // ----- Setup Socket.IO connection -----
  useEffect(() => {
    axios.post(ThirdPartyAPIs.CREATE_SESSION, {
        device_finger_print: generateDeviceId(),
        session_type: "SIGNUP_BUYER",
      })
      .then((res) => {
        deviceId = res.data.data.device_finger_print
        const socket = io(ThirdPartyAPIs.SIGNUP_SELLER_CHAT, {
          transports: ["websocket"],
          query: { device_finger_print: res.data.data.device_finger_print },
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          setIsConnected(true);
          addLog(`✅ Connected to Socket.IO namespace ${ThirdPartyAPIs.SIGNUP_SELLER_CHAT}`, "system");
        });

        socket.on("connected", (data) => {
          addLog(`📡 ${data.message}`, "system");
        });

        // Socket error
        socket.on("error", (err) => {
          addLog(`❌ Error: ${JSON.stringify(err)}`, "error");
        });

        // ----- Main handler: server -> "text-response" -> LLM -> server
        socket.on("text-response", async (data) => {
          addLog(data, "received");

          const assistantResponse = data?.assistantResponse;
          if (!assistantResponse) {
            addLog("⚠️ Missing assistantResponse in server data.", "error");
            return;
          }

          const { intent, modelQuery } = assistantResponse;

          if(intent==="UNDER_REVIEW"){
            addLog("Thank you for registering on Sahoolat AI. Your profile is under review","system")
            return;
          }
          if (!intent) {
            addLog("⚠️ No intent received, skipping next step", "error");
            return;
          }

          // Special case: COMPLETE_INFORMATION => send "✅"
          if (intent === "COMPLETE_INFORMATION") {
            addLog(`🎉 "COMPLETE_INFORMATION" recognized. Sending "✅"`, "system");
            const message = {
              language,
              prompt_title: promptTitle,
              country,
              device_id: deviceId,
              seller_query: "✅",
              intent,
            };
            socketRef.current.emit("signup-seller", message);
            addLog(message, "sent");
            return;
          }

          // Otherwise, let's call your LLM for the next step
          try {
            const res = await axios.post(NextAPIs.AUTOMATE_TESTING_CLIENT, {
              intent,
              modelQuery,
              category, // pass user-typed category for context
            });

            const { seller_query } = res.data.response || {};
            console.log("intent is this ",intent);
            if (!seller_query) {
              addLog("❌ Missing seller_query in LLM response.", "error");
              return;
            }

            // Send that LLM-generated query back to the socket
            const message = {
              language,
              prompt_title: promptTitle,
              country,
              device_id: deviceId,
              seller_query,
              intent,
            };

            socketRef.current.emit("signup-seller", message);
            addLog(message, "sent");
          } catch (err) {
            if(intent === "UNDER_REVIEW"){
              return;
            }
            console.error(err);
            addLog("❌ Failed to auto-respond based on intent", "error");
            console.error(err);
          }
        });

        // On disconnect
        socket.on("disconnect", (reason) => {
          setIsConnected(false);
          addLog(`🔌 Disconnected: ${reason}`, "system");
        });

        // Cleanup
        return () => {
          socket.disconnect();
        };
      });
  }, []);

  // ----- Auto-scroll whenever log changes -----
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [log]);

  // ----- Logger helper -----
  const addLog = (content, type) => {
    setLog((prev) => [...prev, { content, type }]);
  };

  // ----- Called when user clicks "Start Signup Process" -----
  const handleStart = async () => {
    if (!category.trim()) return;

    addLog(`🔍 Sending category to OpenAI API: ${category}`, "user");

    try {
      setIsLocked(true);
      // First step: "sign_up"
      const res = await axios.post(NextAPIs.AUTOMATE_TESTING_CLIENT, {
        intent: "sign_up",
        modelQuery: `I am a ${category} looking to register on Sahoolat AI.`,
        category,
      });

      const { intent, seller_query } = res.data.response || {};
      addLog(`🤖 OpenAI Response: ${JSON.stringify(res.data.response)}`, "openai");

      console.log("This is intent here 1:", intent);
      console.log("This is seller_query here 2:", seller_query);

      // If the intent is UNDER_REVIEW, don't send to socket
      if (intent === "UNDER_REVIEW") {
        addLog("🚫 Skipping socket emission because intent is UNDER_REVIEW", "system");
        setIsLocked(false);
        return;
      }

      if (intent && seller_query) {
        // Send to socket
        const message = {
          language,
          prompt_title: promptTitle,
          country,
          device_id: deviceId,
          seller_query,
          intent,
        };
        socketRef.current.emit("signup-seller", message);
        addLog(message, "sent");
      } else {
        setIsLocked(false);
        addLog("❌ Intent or seller_query not found in OpenAI response.", "error");
      }
    } catch (err) {
      setIsLocked(false);
      addLog(
        "⚠️ Failed to call OpenAI API via axios. Check network or response format.",
        "error"
      );
      console.error(err);
    }
  };


  // ----- Render UI -----
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-full mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">
            Smart Seller Signup (Auto)
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left Panel for Category Input */}
            <div className="w-full sm:w-1/3 bg-white rounded-lg shadow p-4">
              <label className="block mb-4">
                <span className="text-gray-700 font-medium">
                  Enter Service Category
                </span>
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Software Engineer"
                />
              </label>
              <button
                onClick={handleStart}
                className={`w-full ${isLocked? 'bg-gray-300 text-black': "bg-indigo-600 hover:bg-indigo-700 text-white"}  py-2 rounded transition`}
                disabled={isLocked}
              >
                Start Signup Process
              </button>
            </div>

            {/* Right Panel for Messages */}
            <div
              className="w-full sm:w-2/3 bg-white rounded-lg shadow p-4 max-h-[800px] overflow-y-auto"
              ref={messagesContainerRef}
            >
              <h2 className="text-lg font-semibold mb-2">Socket Messages</h2>
              <div className="space-y-3">
                {log.map((entry, i) => (
                  <div
                    key={i}
                    className={`text-sm whitespace-pre-wrap p-3 rounded-md ${
                      entry.type === "sent"
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : entry.type === "received"
                          ? "bg-green-100 border-l-4 border-green-500"
                          : entry.type === "error"
                            ? "bg-red-100 border-l-4 border-red-500"
                            : "bg-gray-100 border-l-4 border-gray-400"
                    }`}
                  >
                    <strong>{entry.type.toUpperCase()}:</strong>
                    <pre className="mt-1 whitespace-pre-wrap break-words">
                      {typeof entry.content === "string"
                        ? entry.content
                        : JSON.stringify(entry.content, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
