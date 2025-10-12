"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryTabs from "@/components/CategoryTabs";
import CategoryInput from "@/components/CategoryInput";
import Controls from "@/components/Controls";
import LogsPanel from "@/components/LogsPanel";
import BuyerExtras from "@/components/BuyerExtras";
import usePostJobBuyer from "@/hooks/usePostJobBuyer";


export default function PostJobPage() {
  const [authorized, setAuthorized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("sb_ok") === "1") setAuthorized(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const expected = process.env.NEXT_PUBLIC_SIGNUP_BUYER_PASSWORD || "";
    if (pw && pw === expected) {
      sessionStorage.setItem("sb_ok", "1");
      setAuthorized(true);
    } else {
      setError("Wrong password");
    }
  }

  function handleCancel() {
    router.replace("/");
  }

  if (!mounted) return null;

  if (!authorized) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white rounded-2xl shadow p-6 space-y-4"
        >
          <h1 className="text-xl font-semibold text-center">Restricted Access</h1>
          <p className="text-sm text-gray-600 text-center">
            Enter the access password to continue.
          </p>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-black text-white py-2"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-xl bg-gray-200 text-gray-900 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <PostJobBuyerInner />;
}

function PostJobBuyerInner() {
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
      removeCategory,
      startRunAll,
      maxCategories,
      committed,
      imageUrls,
      buyerIds,
      setImageUrlForActive,
      setBuyerIdForActive,
    } = usePostJobBuyer(5);

  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <>
      {/*<Header />*/}
      <div className="h-screen overflow-hidden bg-gray-50">
        <div className="max-w-full mx-auto h-full grid grid-rows-[auto,1fr] gap-4 p-6">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4">
              Post Job Buyer (Auto)
            </h1>
            {runningName && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-indigo-50 border-l-4 border-indigo-600 p-3 rounded">
                  <span className="font-semibold">Current Category:</span>{" "}
                  <span className="text-indigo-700">{runningName}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 h-full overflow-hidden">
            <div className="w-full sm:w-1/3 bg-white rounded-lg shadow p-4 min-w-0 h-full overflow-y-auto">
              <CategoryTabs
                categories={categories}
                activeTab={activeTab}
                committed={committed}
                statuses={statuses}
                onTabClick={setActiveTab}
                onAdd={addCategoryTab}
                onDelete={removeCategory}
                maxCategories={maxCategories}
              />

              <CategoryInput
                value={categories[activeTab]}
                onChange={handleCategoryInput}
              />
              <BuyerExtras
                imageUrl={imageUrls[activeTab]}
                onImageUrlChange={setImageUrlForActive}
                buyerId={buyerIds[activeTab]}
                onBuyerIdChange={setBuyerIdForActive}
              />

              <Controls
                disabledStart={
                  statuses[activeTab] === "running" ||
                  !(categories[activeTab] || "").trim()
                }
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
    </>
  );
}
