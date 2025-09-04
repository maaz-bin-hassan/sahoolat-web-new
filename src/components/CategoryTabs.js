"use client";

export default function CategoryTabs({ categories, activeTab, statuses, onTabClick, onAdd, maxCategories }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((_, i) => {
        const isActive = i === activeTab;
        const status = statuses[i];
        return (
          <button
            key={i}
            onClick={() => onTabClick(i)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              isActive ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            title={`Status: ${status}`}
          >
            {`Category ${i + 1}`}{" "}
            {status !== "idle" && <span className="ml-1 text-xs opacity-80">({status})</span>}
          </button>
        );
      })}
      <button
        onClick={onAdd}
        disabled={categories.length >= maxCategories}
        className={`px-3 py-1 rounded-full border text-sm transition ${
          categories.length >= maxCategories
            ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
        title="Add another category"
      >
        + Add
      </button>
    </div>
  );
}
