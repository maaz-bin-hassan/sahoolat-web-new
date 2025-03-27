"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const deviceId = "12919";
const promptTitle = "SIGNUP_SELLER";
const country = "Pakistan";
const language = "en";

const intentSequence = [
  "FULL_NAME",
  "AGE",
  "PHONE_NUMBER",
  "LIVING_LOCATION",
  "SERVICE_LOCATION",
  "EXPERIENCE",
  "SKILLS",
  "SKILLS",
  "PROFILE_PICTURE",
  "CNIC_FRONT",
  "CNIC_BACK",
  "BANK_ACCOUNT_INFORMATION",
  "RATE_HOUR",
  "EARNINGS_GOALS",
  "COMPLETE_INFORMATION",
];

const defaultInputs = {
  FULL_NAME: "Ahmed Khan",
  AGE: "I am 28 years old",
  PHONE_NUMBER: "03211234567",
  LIVING_LOCATION: "I am currently living in Lahore",
  SERVICE_LOCATION: "I provide services in Lahore and Rawalpindi",
  EXPERIENCE: "I have 5 years of experience in electrical work",
  SKILLS: [
    "I specialize in wiring, installations, and electrical repairs",
    "I handle all electrical installations and repairs for homes and offices",
  ],
  PROFILE_PICTURE: "http://electricianprofile.com",
  CNIC_FRONT: "http://cnic_front_electrician.com",
  CNIC_BACK: "http://cnic_back_electrician.com",
  BANK_ACCOUNT_INFORMATION: `{'BANK_NAME':'MCB','ACCOUNT_HOLDER_NAME':'Ahmed Khan','ACCOUNT_NUMBER':'1234567890'}`,
  RATE_HOUR: "I charge 1500 pkr per hour for electrical work",
  EARNINGS_GOALS: "120k per month",
  COMPLETE_INFORMATION: "✅",
};

export default function SignupPage() {
  const [category, setCategory] = useState("");
  const [log, setLog] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // For auto-scroll
  const messagesContainerRef = useRef(null);

  // ----- Setup Socket.IO connection -----
  useEffect(() => {
    const socket = io("http://localhost:5004/signUpSellerChat", {
      transports: ["websocket"],
      query: { device_finger_print: "01200101012" },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      addLog("✅ Connected to Socket.IO namespace /signUpSellerChat", "system");
    });

    socket.on("connected", (data) => {
      addLog(`📡 ${data.message}`, "system");
    });

    socket.on("error", (err) => {
      addLog(`❌ Error: ${JSON.stringify(err)}`, "error");
    });

    // ----- Main handler when server sends "text-response" -----
    socket.on("text-response", async (data) => {
      addLog(data, "received");

      const assistantResponse = data?.assistantResponse;
      if (!assistantResponse) {
        addLog("⚠️ Missing assistantResponse in server data.", "error");
        return;
      }

      const { intent, modelQuery, sellerProfile } = assistantResponse;
      if (!intent) {
        addLog("⚠️ No intent received, skipping next step", "error");
        return;
      }

      // Check if this intent is already answered in sellerProfile
      if (sellerProfile && sellerProfile[intent] === true) {
        addLog(`⏭ Intent "${intent}" is already answered, skipping...`, "system");

        // Move to next local intent (if any)
        const currentIdx = intentSequence.indexOf(intent);
        if (currentIdx >= 0 && currentIdx < intentSequence.length - 1) {
          const nextIndex = currentIdx + 1;
          sendIntent(nextIndex);
        } else {
          addLog("✅ All done or no further steps found.", "system");
        }
        return;
      }

      // If intent is COMPLETE_INFORMATION => send "✅" directly
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

      // Otherwise, use your OpenAI route to generate an answer for this intent
      try {
        const res = await axios.post("/api/automate-test", {
          intent,
          modelQuery,
          category,
        });

        const { seller_query } = res.data.response || {};
        if (!seller_query) {
          addLog("❌ Missing seller_query in LLM response.", "error");
          return;
        }

        // Send the answer to the socket server
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
        addLog("❌ Failed to auto-respond based on intent", "error");
        console.error(err);
      }
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      addLog(`🔌 Disconnected: ${reason}`, "system");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ----- Auto-scroll whenever log changes -----
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [log]);

  // ----- Logger helper -----
  const addLog = (content, type) => {
    setLog((prev) => [...prev, { content, type }]);
  };

  // ----- Attempt to move forward in the local intentSequence (if needed) -----
  const sendIntent = (index) => {
    if (index >= intentSequence.length) {
      addLog("✅ Reached end of local steps. No more to send.", "system");
      return;
    }

    const intent = intentSequence[index];
    // If "COMPLETE_INFORMATION" is next in the sequence, we can automatically do it
    if (intent === "COMPLETE_INFORMATION") {
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
      setStepIndex(index);
      return;
    }

    const query = defaultInputs[intent];
    if (intent === "SKILLS" && Array.isArray(query)) {
      // If SKILLS is an array, send each sub-skill
      query.forEach((msg) => sendToSocket(intent, msg));
    } else {
      sendToSocket(intent, query);
    }
    setStepIndex(index);
  };

  const sendToSocket = (intent, query) => {
    const message = {
      language,
      prompt_title: promptTitle,
      country,
      device_id: deviceId,
      seller_query: query,
      intent,
    };

    if (socketRef.current) {
      socketRef.current.emit("signup-seller", message);
      addLog(message, "sent");
    } else {
      addLog("❌ Socket not initialized.", "error");
    }
  };

  const handleStart = async () => {
    if (!category.trim()) return;

    addLog(`🔍 Sending category to OpenAI API: ${category}`, "user");

    try {
      const res = await axios.post("/api/automate-test", {
        intent: "sign_up", // The first step
        modelQuery: `I am a ${category} looking to register on Sahoolat AI.`,
        category,
      });

      const { intent: firstIntent, seller_query: sellerQuery } = res.data.response || {};
      addLog(`🤖 OpenAI Response: ${JSON.stringify(res.data.response)}`, "openai");

      if (firstIntent && sellerQuery) {
        sendToSocket(firstIntent, sellerQuery);
        setStepIndex(intentSequence.indexOf(firstIntent));
      } else {
        addLog("❌ Intent or seller_query not found in OpenAI response.", "error");
      }
    } catch (err) {
      addLog("⚠️ Failed to call OpenAI API via axios. Check network or response format.", "error");
      console.error(err);
    }
  };

  // ----- Render UI -----
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Smart Seller Signup (Auto)
        </h1>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Panel */}
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
                placeholder="e.g. Electrician"
              />
            </label>
            <button
              onClick={handleStart}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
              disabled={!isConnected}
            >
              Start Signup Process
            </button>
          </div>

          {/* Right Panel */}
          <div
            className="w-full sm:w-2/3 bg-white rounded-lg shadow p-4 max-h-[600px] overflow-y-auto"
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
                  <pre className="mt-1">
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
  );
}
