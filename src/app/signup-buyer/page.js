"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSignupBuyer from "@/hooks/useSignupBuyer";
import CategoryTabs from "@/components/CategoryTabs";
import CategoryInput from "@/components/CategoryInput";
import Controls from "@/components/Controls";
import LogsPanel from "@/components/LogsPanel";

export default function SignupPage() {
  const {
    categories,
    activeTab,
    statuses,
    log,
    isLocked,
    runningName,
    setActiveTab,
    addCategoryTab,
    handleCategoryInput,
    startActiveCategory,
    startRunAll,
    maxCategories,
  } = useSignupBuyer(5);

  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-full mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Smart Buyer Signup (Auto)</h1>

          {runningName && (
            <div className="max-w-4xl mx-auto mb-4">
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-3 rounded">
                <span className="font-semibold">Current Category:</span>{" "}
                <span className="text-indigo-700">{runningName}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3 bg-white rounded-lg shadow p-4">
              <CategoryTabs
                categories={categories}
                activeTab={activeTab}
                statuses={statuses}
                onTabClick={setActiveTab}
                onAdd={addCategoryTab}
                maxCategories={maxCategories}
              />

              <CategoryInput
                value={categories[activeTab]}
                onChange={handleCategoryInput}
              />

              <Controls
                disabledStart={statuses[activeTab] === "running" || !(categories[activeTab] || "").trim()}
                onStart={startActiveCategory}
                disabledRunAll={statuses.some((s) => s === "running")}
                onRunAll={startRunAll}
                maxCategories={maxCategories}
              />
            </div>

            <LogsPanel log={log} ref={messagesContainerRef} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
