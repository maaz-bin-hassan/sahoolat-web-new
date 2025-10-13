"use client";

export default function CategoryInput({ value, onChange }) {
  return (
    <label className="block mb-4">
      <span className="text-gray-700 font-medium">Enter Job Category</span>
      <input
        type="text"
        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Software Engineer"
      />
    </label>
  );
}
