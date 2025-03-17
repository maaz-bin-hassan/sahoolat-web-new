"use client";

import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const languages = [
  { label: "English", value: "/auto/en" },
  { label: "Urdu", value: "/auto/ur" },
];

const GoogleTranslate = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans"));
    } else {
      setSelected("/auto/en");
    }
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: "auto",
      autoDisplay: false,
      includedLanguages: "en,ur",
    }, "google_translate_element");
  };

  const langChange = (e, lang) => {
    e.preventDefault();

    setCookie("googtrans", decodeURIComponent(lang));
    setSelected(lang);
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      {/*<div*/}
      {/*  id="google_translate_element"*/}
      {/*  // style={{ width: "0px", height: "0px", position: "absolute", left: "50%", zIndex: -99999 }}*/}
      {/*/>*/}
      {languages.map((lang) => (
        <button
          key={lang.value}
          className={`mt-2 px-4 py-2 rounded-lg ${selected === lang.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={(e) => langChange(e, lang.value)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default GoogleTranslate;
