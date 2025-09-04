"use client";

export default function Controls({
                                   disabledStart,
                                   onStart,
                                   disabledRunAll,
                                   onRunAll,
                                   maxCategories,
                                 }) {
  return (
    <>
      <button
        onClick={onStart}
        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition disabled:bg-gray-300 disabled:text-black`}
        disabled={disabledStart}
      >
        Start Signup for Active Category
      </button>

      <button
        onClick={onRunAll}
        className="w-full mt-2 bg-gray-900 hover:bg-black text-white py-2 rounded transition disabled:bg-gray-300 disabled:text-black"
        disabled={disabledRunAll}
      >
        Run All Categories
      </button>

      <p className="mt-3 text-xs text-gray-500">
        You can manage up to {maxCategories} categories. Each run opens a fresh session.
      </p>
    </>
  );
}
