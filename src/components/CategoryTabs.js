"use client";

export default function CategoryTabs({ categories, activeTab, statuses, onTabClick, onAdd, onDelete, maxCategories, committed = [] })
 {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat, i) => {
        const isActive = i === activeTab;
        const status = statuses[i];

        const name = (cat || "").trim();
        const showTyped = committed[i] && !!name;
        const label = showTyped ? name : `Category ${i + 1}`;


        return (
          <div key={i} className="relative group inline-block">

            <button
              onClick={() => onTabClick(i)}
              className={`px-3 py-1 rounded-full border text-sm transition pr-7
                ${isActive
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
              title={`${label}${status !== "idle" ? ` (${status})` : ""}`}
            >

              <span className="inline-block max-w-[140px] truncate align-middle">
                {label}
              </span>
              {status !== "idle" && (
                <span className="ml-1 text-xs opacity-80 align-middle">
                  ({status})
                </span>
              )}
            </button>


            {categories.length > 1 && (
              <button
                type="button"
                aria-label="Delete category"
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
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
