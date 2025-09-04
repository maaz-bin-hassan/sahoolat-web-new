"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { NextAPIs, ThirdPartyAPIs } from "@/utils/const";

const promptTitle = "SIGNUP_BUYER";
const country = "Pakistan";
const language = "en";

const generateDeviceId = () =>
  Math.floor(10000 + Math.random() * 90000).toString();

export default function useSignupBuyer(maxCategories = 5) {
  // Categories & tabs
  const [categories, setCategories] = useState([""]);
  const [activeTab, setActiveTab] = useState(0);
  const categoriesRef = useRef(categories);
  useEffect(() => { categoriesRef.current = categories; }, [categories]);

  // Per-category session/socket/status
  const socketsRef = useRef({});
  const [deviceIds, setDeviceIds] = useState([null]);
  const [statuses, setStatuses] = useState(["idle"]); // "idle" | "running" | "done" | "error"
  const statusesRef = useRef(statuses);
  useEffect(() => { statusesRef.current = statuses; }, [statuses]);

  // Run-all & UX
  const [runAll, setRunAll] = useState(false);
  const runAllRef = useRef(runAll);
  useEffect(() => { runAllRef.current = runAll; }, [runAll]);

  const [currentRunningIndex, setCurrentRunningIndex] = useState(null);
  const [log, setLog] = useState([]);
  const [isLocked, setIsLocked] = useState(false); // purely visual

  // Cleanup sockets on unmount
  useEffect(() => {
    return () => {
      Object.values(socketsRef.current).forEach((s) => s && s.disconnect());
    };
  }, []);

  // Helpers
  const addLog = (content, type, category) => {
    setLog((prev) => [...prev, { content, type, category }]);
  };

  const setStatusAt = (idx, status) => {
    setStatuses((prev) => {
      const copy = [...prev];
      copy[idx] = status;
      return copy;
    });
  };

  const ensureArraysLength = (len) => {
    setDeviceIds((prev) => {
      const copy = [...prev];
      while (copy.length < len) copy.push(null);
      return copy.slice(0, len);
    });
    setStatuses((prev) => {
      const copy = [...prev];
      while (copy.length < len) copy.push("idle");
      return copy.slice(0, len);
    });
  };

  const addCategoryTab = () => {
    if (categories.length >= maxCategories) return;
    const next = [...categories, ""];
    setCategories(next);
    ensureArraysLength(next.length);
    setActiveTab(next.length - 1);
  };

  const handleCategoryInput = (value) => {
    setCategories((prev) => {
      const copy = [...prev];
      copy[activeTab] = value;
      return copy;
    });
  };

  // --- auto-run helpers ---
  const getNextIndex = (from = -1) => {
    for (let i = from + 1; i < categoriesRef.current.length; i++) {
      const val = (categoriesRef.current[i] || "").trim();
      if (val && statusesRef.current[i] !== "running" && statusesRef.current[i] !== "done") {
        return i;
      }
    }
    return null;
  };

  const proceedNext = (justFinishedIdx) => {
    if (!runAllRef.current) return;
    const nextIdx = getNextIndex(justFinishedIdx);
    if (nextIdx === null) {
      addLog("✅ All categories processed.", "system");
      setRunAll(false);
      setCurrentRunningIndex(null);
      setIsLocked(false);
      return;
    }
    setActiveTab(nextIdx);
    startCategory(nextIdx);
  };
  // -----------------------

  // Socket listeners for a category
  const registerSocketListeners = (socket, idx, deviceId) => {
    const catLabel = () => categoriesRef.current[idx] || `Category ${idx + 1}`;

    socket.on("connect", () => {
      addLog(`✅ Connected to ${ThirdPartyAPIs.SIGNUP_BUYER_CHAT} (session ${deviceId})`, "system", catLabel());
      setStatusAt(idx, "running");
    });

    socket.on("connected", (data) => {
      addLog(`📡 ${data?.message || "Connected"}`, "system", catLabel());
    });

    socket.on("error", (err) => {
      addLog(`❌ Error: ${JSON.stringify(err)}`, "error", catLabel());
      setStatusAt(idx, "error");
    });

    socket.on("buyer-signup-response", async (data) => {
      addLog(data, "received", catLabel());

      const assistantResponse = data?.assistantResponse;
      const { intent, modelQuery } = assistantResponse || {};
      if (!assistantResponse) {
        addLog("⚠️ Missing assistantResponse in server data.", "error", catLabel());
        return;
      }

      if (intent === "UNDER_REVIEW") {
        addLog("Thank you for registering on Sahoolat AI. Your profile is under review.", "system", catLabel());
        setStatusAt(idx, "done");
        setIsLocked(false);
        setCurrentRunningIndex(null);
        if (socketsRef.current[idx]) socketsRef.current[idx].disconnect();
        socketsRef.current[idx] = null;
        proceedNext(idx);
        return;
      }

      if (!intent) {
        addLog("⚠️ No intent received, skipping next step.", "error", catLabel());
        return;
      }

      if (intent === "COMPLETE_INFORMATION") {
        addLog(`🎉 "COMPLETE_INFORMATION" recognized. Sending "✅"`, "system", catLabel());
        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query: "✅", intent };
        socketsRef.current[idx] && socketsRef.current[idx].emit("signup-buyer", message);
        addLog(message, "sent", catLabel());
        return;
      }

      try {
        const cat = categoriesRef.current[idx];
        const res = await axios.post(NextAPIs.BUYER_AUTOMATE_TESTING, { intent, modelQuery, category: cat });
        const { seller_query } = res.data.response || {};
        if (!seller_query) {
          addLog("❌ Missing seller_query in LLM response.", "error", catLabel());
          return;
        }
        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query, intent };
        socketsRef.current[idx] && socketsRef.current[idx].emit("signup-buyer", message);
        addLog(message, "sent", catLabel());
      } catch (err) {
        console.error(err);
        addLog("❌ Failed to auto-respond based on intent.", "error", catLabel());
      }
    });

    socket.on("disconnect", (reason) => {
      addLog(`🔌 Disconnected: ${reason}`, "system", catLabel());
      const wasDone = statusesRef.current[idx] === "done";
      setStatusAt(idx, wasDone ? "done" : "idle");
      setIsLocked(false);
      setCurrentRunningIndex(null);
      if (runAllRef.current && wasDone) proceedNext(idx);
    });
  };

  // Start flow for a given tab
  const startCategory = async (idx) => {
    const category = (categoriesRef.current[idx] || "").trim();
    if (!category) return;

    setIsLocked(true);
    setCurrentRunningIndex(idx);
    addLog(`🔍 Sending category to OpenAI API: ${category}`, "user", category);

    try {
      // 1) Create fresh session
      const sessionRes = await axios.post(ThirdPartyAPIs.CREATE_SESSION, {
        device_finger_print: generateDeviceId(),
        session_type: "SIGNUP_BUYER",
      });
      const deviceId = sessionRes?.data?.data?.device_finger_print;
      setDeviceIds((prev) => { const copy = [...prev]; copy[idx] = deviceId; return copy; });

      // 2) Connect socket for this category
      const socket = io(ThirdPartyAPIs.SIGNUP_BUYER_CHAT, {
        transports: ["websocket"],
        query: { device_finger_print: deviceId },
      });
      socketsRef.current[idx] = socket;
      registerSocketListeners(socket, idx, deviceId);

      // 3) First step: "sign_up"
      const res = await axios.post(NextAPIs.BUYER_AUTOMATE_TESTING, {
        intent: "sign_up",
        modelQuery: `I am a buyer who is looking for the ${category} profession to hire on Sahoolat AI.`,
        category,
      });

      addLog(`🤖 OpenAI Response: ${JSON.stringify(res.data.response)}`, "openai", category);

      const { intent, seller_query } = res.data.response || {};
      if (intent === "UNDER_REVIEW") {
        addLog("🚫 Skipping socket emission because intent is UNDER_REVIEW", "system", category);
        setStatusAt(idx, "done");
        setIsLocked(false);
        setCurrentRunningIndex(null);
        const s = socketsRef.current[idx];
        if (s) s.disconnect();
        socketsRef.current[idx] = null;
        proceedNext(idx);
        return;
      }

      if (intent && seller_query) {
        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query, intent };
        socketsRef.current[idx] && socketsRef.current[idx].emit("signup-buyer", message);
        addLog(message, "sent", category);
      } else {
        addLog("❌ Intent or seller_query not found in OpenAI response.", "error", category);
        setStatusAt(idx, "error");
        setIsLocked(false);
        setCurrentRunningIndex(null);
      }
    } catch (err) {
      console.error(err);
      addLog("⚠️ Failed to start signup (session or API).", "error", category);
      setStatusAt(idx, "error");
      setIsLocked(false);
      setCurrentRunningIndex(null);
    }
  };

  // UI actions
  const startActiveCategory = () => startCategory(activeTab);

  const startRunAll = () => {
    setRunAll(true);
    const first = getNextIndex(-1);
    if (first === null) {
      addLog("⚠️ No categories to run.", "system");
      setRunAll(false);
      return;
    }
    setActiveTab(first);
    startCategory(first);
  };

  const runningName = currentRunningIndex !== null ? categories[currentRunningIndex] : null;

  return {
    // state
    categories, activeTab, statuses, log, isLocked, runningName,
    // actions
    setActiveTab, addCategoryTab, handleCategoryInput, startActiveCategory, startRunAll,
    // expose max
    maxCategories,
  };
}
