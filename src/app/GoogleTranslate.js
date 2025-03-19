"use client";

import { useTranslate } from "@/hooks/useTranslate";

const languages = [
  { label: "English", value: "/auto/en" },
  { label: "Urdu", value: "/auto/ur" },
];

const GoogleTranslate = () => {
  const { langChange, selected } = useTranslate();

  return (
    <div className="flex items-center">
      {languages.map((lang) => (
        <button
          key={lang.value}
          className={`mt-2 px-4 py-2 rounded-lg ${selected === lang.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => langChange(lang.value)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default GoogleTranslate;
