"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { NextAPIs, ThirdPartyAPIs } from "@/utils/const";

const promptTitle = "SIGNUP_SELLER";
const country = "Pakistan";
const language = "en";
const genId = () => Math.floor(10000 + Math.random() * 90000).toString();

export default function useSignupSeller(maxCategories = 5) {
  // categories, committed label visibility, and active tab
  const [categories, setCategories] = useState([""]);
  const categoriesRef = useRef(categories);
  useEffect(() => { categoriesRef.current = categories; }, [categories]);

  const [committed, setCommitted] = useState([false]); // controls when tab shows the typed name
  const committedRef = useRef(committed);
  useEffect(() => { committedRef.current = committed; }, [committed]);

  const [activeTab, setActiveTab] = useState(0);

  // per-category session/socket/status
  const socketsRef = useRef({});
  const [deviceIds, setDeviceIds] = useState([null]);
  const [statuses, setStatuses] = useState(["idle"]); // idle | running | done | error
  const statusesRef = useRef(statuses);
  useEffect(() => { statusesRef.current = statuses; }, [statuses]);

  // run-all + UX
  const [runAll, setRunAll] = useState(false);
  const runAllRef = useRef(runAll);
  useEffect(() => { runAllRef.current = runAll; }, [runAll]);

  const [currentRunningIndex, setCurrentRunningIndex] = useState(null);
  const [log, setLog] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  // cleanup
  useEffect(() => () => {
    Object.values(socketsRef.current).forEach(s => s && s.disconnect());
  }, []);

  // helpers
  const addLog = (content, type, category) =>
    setLog(prev => [...prev, { content, type, category }]);

  const setStatusAt = (idx, status) =>
    setStatuses(prev => { const c=[...prev]; c[idx]=status; return c; });

  const ensureArraysLength = (len) => {
    setDeviceIds(p => { const c=[...p]; while (c.length < len) c.push(null); return c.slice(0,len); });
    setStatuses(p => { const c=[...p]; while (c.length < len) c.push("idle"); return c.slice(0,len); });
    setCommitted(p => { const c=[...p]; while (c.length < len) c.push(false); return c.slice(0,len); });
  };

  const addCategoryTab = () => {
    if (categoriesRef.current.length >= maxCategories) return;
    const next = [...categoriesRef.current, ""];
    setCategories(next);
    ensureArraysLength(next.length);
    setActiveTab(next.length - 1);
  };

  const handleCategoryInput = (value) => {
    setCategories(prev => { const c=[...prev]; c[activeTab]=value; return c; });
    // do NOT change committed here; label visibility is controlled elsewhere
  };

  // next runnable tab index for Run All
  const getNextIndex = (from = -1) => {
    for (let i = from + 1; i < categoriesRef.current.length; i++) {
      const val = (categoriesRef.current[i] || "").trim();
      if (val && statusesRef.current[i] !== "running" && statusesRef.current[i] !== "done") return i;
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

  // socket listeners (SELLER)
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

    // SELLER stream comes on "text-response"
    socket.on("text-response", async (data) => {
      addLog(data, "received", catLabel());

      const assistantResponse = data?.assistantResponse;
      const { intent, modelQuery } = assistantResponse || {};
      if (!assistantResponse) return addLog("⚠️ Missing assistantResponse in server data.", "error", catLabel());

      if (intent === "UNDER_REVIEW") {
        addLog("Thank you for registering on Sahoolat AI. Your profile is under review.", "system", catLabel());
        setStatusAt(idx, "done");
        setIsLocked(false);
        setCurrentRunningIndex(null);
        socketsRef.current[idx]?.disconnect();
        socketsRef.current[idx] = null;
        proceedNext(idx);
        return;
      }

      if (!intent) return addLog("⚠️ No intent received, skipping next step.", "error", catLabel());

      if (intent === "COMPLETE_INFORMATION") {
        addLog(`🎉 "COMPLETE_INFORMATION" recognized. Sending "✅"`, "system", catLabel());
        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query: "✅", intent };
        socketsRef.current[idx]?.emit("signup-seller", message);
        addLog(message, "sent", catLabel());
        return;
      }

      try {
        const category = categoriesRef.current[idx];
        const res = await axios.post(NextAPIs.AUTOMATE_TESTING_CLIENT, { intent, modelQuery, category });
        const { seller_query } = res.data.response || {};
        if (!seller_query) return addLog("❌ Missing seller_query in LLM response.", "error", catLabel());

        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query, intent };
        socketsRef.current[idx]?.emit("signup-seller", message);
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

  // start a category
  const startCategory = async (idx) => {
    const category = (categoriesRef.current[idx] || "").trim();
    if (!category) return;

    // mark label as committed when the run starts (tabs will show the typed name)
    setCommitted(prev => { const c=[...prev]; c[idx] = true; return c; });

    setIsLocked(true);
    setCurrentRunningIndex(idx);
    addLog(`🔍 Sending category to OpenAI API: ${category}`, "user", category);

    try {
      // 1) create session
      const sessionRes = await axios.post(ThirdPartyAPIs.CREATE_SESSION, {
        device_finger_print: genId(),
        session_type: "SIGNUP_SELLER",
      });
      const deviceId = sessionRes?.data?.data?.device_finger_print;
      setDeviceIds(prev => { const c=[...prev]; c[idx]=deviceId; return c; });

      // 2) connect socket
      const socket = io(ThirdPartyAPIs.SIGNUP_SELLER_CHAT, {
        transports: ["websocket"],
        query: { device_finger_print: deviceId },
      });
      socketsRef.current[idx] = socket;
      registerSocketListeners(socket, idx, deviceId);

      // 3) first step to LLM
      const res = await axios.post(NextAPIs.AUTOMATE_TESTING_CLIENT, {
        intent: "sign_up",
        modelQuery: `I am a ${category} looking to register on Sahoolat AI.`,
        category,
      });
      addLog(`🤖 OpenAI Response: ${JSON.stringify(res.data.response)}`, "openai", category);

      const { intent, seller_query } = res.data.response || {};
      if (intent === "UNDER_REVIEW") {
        addLog("🚫 Skipping socket emission because intent is UNDER_REVIEW", "system", category);
        setStatusAt(idx, "done");
        setIsLocked(false);
        setCurrentRunningIndex(null);
        socketsRef.current[idx]?.disconnect();
        socketsRef.current[idx] = null;
        proceedNext(idx);
        return;
      }

      if (intent && seller_query) {
        const message = { language, prompt_title: promptTitle, country, device_id: deviceId, seller_query, intent };
        socketsRef.current[idx]?.emit("signup-seller", message);
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

  // exposed actions
  const startActiveCategory = () => startCategory(activeTab);
  const startRunAll = () => {
    setRunAll(true);
    const first = getNextIndex(-1);
    if (first === null) { addLog("⚠️ No categories to run.", "system"); setRunAll(false); return; }
    setActiveTab(first);
    startCategory(first);
  };

  const removeCategory = (idx) => {
    socketsRef.current[idx]?.disconnect();
    delete socketsRef.current[idx];

    if (currentRunningIndex === idx) { setCurrentRunningIndex(null); setIsLocked(false); setRunAll(false); }

    setCategories(prev => { const n = prev.filter((_,i)=>i!==idx); return n.length?n:[""]; });
    setStatuses(prev => { const n = prev.filter((_,i)=>i!==idx); return n.length?n:["idle"]; });
    setDeviceIds(prev => { const n = prev.filter((_,i)=>i!==idx); return n.length?n:[null]; });
    setCommitted(prev => { const n = prev.filter((_,i)=>i!==idx); return n.length?n:[false]; });

    setActiveTab(prev => (idx < prev ? prev - 1 : idx === prev ? Math.max(0, prev - 1) : prev));

    const name = (categoriesRef.current[idx] || `Category ${idx + 1}`).trim();
    if (name) addLog(`🗑️ Removed category: ${name}`, "system", name);
  };

  const runningName =
    currentRunningIndex !== null ? categories[currentRunningIndex] : null;

  return {
    // state
    categories, committed, activeTab, statuses, log, isLocked, runningName,
    // actions
    setActiveTab, addCategoryTab, handleCategoryInput,
    startActiveCategory, startRunAll, removeCategory,
    // misc
    maxCategories,
  };
}
