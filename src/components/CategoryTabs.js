"use client";

export default function CategoryTabs({
                                       categories,
                                       activeTab,
                                       statuses,
                                       onTabClick,
                                       onAdd,
                                       onDelete,          // ⬅️ NEW
                                       maxCategories,
                                     }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((_, i) => {
        const isActive = i === activeTab;
        const status = statuses[i];

        return (
          <div key={i} className="relative group inline-block">
            {/* The tab itself */}
            <button
              onClick={() => onTabClick(i)}
              className={`px-3 py-1 rounded-full border text-sm transition pr-7
                ${isActive
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
              title={`Status: ${status}`}
            >
              {`Category ${i + 1}`}{" "}
              {status !== "idle" && (
                <span className="ml-1 text-xs opacity-80">({status})</span>
              )}
            </button>

            {/* Delete (×) — only show if there’s more than 1 category */}
            {categories.length > 1 && (
              <button
                type="button"
                aria-label="Delete category"
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation(); // don’t trigger tab click
                  onDelete(i);
                }}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs
                           flex items-center justify-center opacity-0 group-hover:opacity-100
                           shadow hover:bg-red-600 transition"
              >
                ×
              </button>
            )}
          </div>
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
