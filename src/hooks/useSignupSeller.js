"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { NextAPIs, ThirdPartyAPIs } from "@/utils/const";

const promptTitle = "SIGNUP_SELLER";
const country = "Pakistan";
const language = "en";

const generateDeviceId = () =>
  Math.floor(10000 + Math.random() * 90000).toString();

export default function useSignupSeller(maxCategories = 5) {

  const finishedRef = useRef([]);
  const [categories, setCategories] = useState([""]);
  const [activeTab, setActiveTab] = useState(0);
  const categoriesRef = useRef(categories);
  useEffect(() => { categoriesRef.current = categories; }, [categories]);
  const [committed, setCommitted] = useState([false]);


  const resetTabs = () => {
    try { Object.values(socketsRef.current).forEach(s => s?.disconnect?.()); } catch {}
    socketsRef.current = {};
    setCategories([""]);
    setStatuses(["idle"]);
    setDeviceIds([null]);
    setCommitted([false]);
    setActiveTab(0);
    finishedRef.current = [];
  };

  const socketsRef = useRef({});
  const [deviceIds, setDeviceIds] = useState([null]);
  const [statuses, setStatuses] = useState(["idle"]);
  const statusesRef = useRef(statuses);
  useEffect(() => { statusesRef.current = statuses; }, [statuses]);


  const [runAll, setRunAll] = useState(false);
  const runAllRef = useRef(runAll);
  useEffect(() => { runAllRef.current = runAll; }, [runAll]);

  const [currentRunningIndex, setCurrentRunningIndex] = useState(null);
  const [log, setLog] = useState([]);
  const [isLocked, setIsLocked] = useState(false);


  useEffect(() => {
    return () => {
      Object.values(socketsRef.current).forEach((s) => s && s.disconnect());
    };
  }, []);


  const removeCategory = (idx) => {
    const sock = socketsRef.current[idx];
    if (sock) {
      try { sock.disconnect(); } catch {}
      delete socketsRef.current[idx];
    }

    if (currentRunningIndex === idx) {
      setCurrentRunningIndex(null);
      setIsLocked(false);
      setRunAll(false);
    }

    setCategories((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [""];
    });
    setStatuses((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : ["idle"];
    });
    setDeviceIds((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [null];
    });

    setCommitted(prev => {
      const next = prev.filter((_, i) => i !== idx);
      return next.length ? next : [false];
    });


    setActiveTab((prev) => {
      if (idx < prev) return prev - 1;
      if (idx === prev) return Math.max(0, prev - 1);
      return prev;
    });

    const name = (categoriesRef.current[idx] || `Category ${idx + 1}`).trim();
    if (name) addLog(`🗑️ Removed category: ${name}`, "system", name);
  };



  const addLog = (content, type, category) => {
    setLog((prev) => [...prev, { content, type, category }]);
  };

  const setStatusAt = (idx, status) => {
    setStatuses(prev => {
      const copy = [...prev];
      copy[idx] = status;

      statusesRef.current = copy;
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

    setCommitted(prev => {
      const copy = [...prev];
      while (copy.length < len) copy.push(false);
      return copy.slice(0, len);
    });

  };

  const addCategoryTab = () => {
    if (categories.length >= maxCategories) return;
    const next = [...categories, ""];
    setCategories(next);

    setCommitted(prev => {
      const copy = [...prev];
      copy[activeTab] = true;
      while (copy.length < next.length) copy.push(false);
      return copy.slice(0, next.length);
    });

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
      resetTabs();
      return;
    }
    setActiveTab(nextIdx);
    startCategory(nextIdx);
  };


  const registerSocketListeners = (socket, idx, deviceId) => {
    const catLabel = () => categoriesRef.current[idx] || `Category ${idx + 1}`;

    socket.on("connect", () => {
      addLog(`✅ Connected to ${ThirdPartyAPIs.SIGNUP_SELLER_CHAT} (session ${deviceId})`, "system", catLabel());
      setStatusAt(idx, "running");
    });

    socket.on("connected", (data) => {
      addLog(`📡 ${data?.message || "Connected"}`, "system", catLabel());
    });

    socket.on("error", (err) => {
      addLog(`❌ Error: ${JSON.stringify(err)}`, "error", catLabel());
      setStatusAt(idx, "error");
    });

    socket.on("text-response", async (data) => {
      addLog(data, "received", catLabel());

      const assistantResponse = data?.assistantResponse;
      const { intent, modelQuery } = assistantResponse || {};
      if (!assistantResponse) {
        addLog("⚠️ Missing assistantResponse in server data.", "error", catLabel());
        return;
      }

      if (intent === "UNDER_REVIEW") {
        addLog("Thank you for registering on Sahoolat AI. Your profile is under review.", "system", catLabel());
        finishedRef.current[idx] = true;
        setStatusAt(idx, "done");
        setIsLocked(false);
        setCurrentRunningIndex(null);

        const s = socketsRef.current[idx];
        if (s) s.disconnect();
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
        socketsRef.current[idx] && socketsRef.current[idx].emit("signup-seller", message);
        addLog(message, "sent", catLabel());
        return;
      }

      try {
        const cat = categoriesRef.current[idx];
        const res = await axios.post(NextAPIs.AUTOMATE_TESTING_CLIENT, { intent, modelQuery, category: cat });
        const { seller_query } = res.data.response || {};
        if (!seller_query) {
          addLog("❌ Missing seller_query in LLM response.", "error", catLabel());
          return;
        }
        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query, intent };
        socketsRef.current[idx] && socketsRef.current[idx].emit("signup-seller", message);
        addLog(message, "sent", catLabel());
      } catch (err) {
        console.error(err);
        addLog("❌ Failed to auto-respond based on intent.", "error", catLabel());
      }
    });

    socket.on("disconnect", (reason) => {
      addLog(`🔌 Disconnected: ${reason}`, "system", catLabel());
      const wasDone = finishedRef.current[idx] || statusesRef.current[idx] === "done";
      setStatusAt(idx, wasDone ? "done" : "idle");
      setIsLocked(false);
      setCurrentRunningIndex(null);
      if (runAllRef.current && wasDone) proceedNext(idx);
      else if (wasDone) resetTabs();
    });
  };

  const startCategory = async (idx) => {
    const category = (categoriesRef.current[idx] || "").trim();
    if (!category) return;

    setCommitted(prev => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });


    setIsLocked(true);
    setCurrentRunningIndex(idx);
    addLog(`🔍 Sending category to OpenAI API: ${category}`, "user", category);

    try {
      const sessionRes = await axios.post(ThirdPartyAPIs.CREATE_SESSION, {
        device_finger_print: generateDeviceId(),
        session_type: "SIGNUP_SELLER",
      });
      const deviceId = sessionRes?.data?.data?.device_finger_print;
      setDeviceIds((prev) => { const copy = [...prev]; copy[idx] = deviceId; return copy; });

      const socket = io(ThirdPartyAPIs.SIGNUP_SELLER_CHAT, {
        transports: ["websocket"],
        query: { device_finger_print: deviceId },
      });
      socketsRef.current[idx] = socket;
      registerSocketListeners(socket, idx, deviceId);

      const res = await axios.post(NextAPIs.AUTOMATE_TESTING_CLIENT, {
        intent: "sign_up",
        modelQuery: `I am a ${category} looking to register as Seller Role on Sahoolat AI Platform.`,
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
        socketsRef.current[idx] && socketsRef.current[idx].emit("signup-seller", message);
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

  const startActiveCategory = () => {
    setCommitted(prev => {
      const copy = [...prev];
      if ((categoriesRef.current[activeTab] || "").trim()) copy[activeTab] = true;
      return copy;
    });
    startCategory(activeTab);
  };

  const startRunAll = () => {
    setCommitted(prev => {
      const copy = [...prev];
      if ((categoriesRef.current[activeTab] || "").trim()) copy[activeTab] = true;
      return copy;
    });

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
    categories, activeTab, statuses, log, isLocked, runningName,
    setActiveTab, addCategoryTab, handleCategoryInput,
    startActiveCategory, startRunAll,
    removeCategory,
    committed,
    maxCategories,
  };
}
