"use client";

import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";


const GoogleTranslate = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var addScript = document.createElement("script");
      addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;

      if (hasCookie("googtrans")) {
        setSelected(getCookie("googtrans"));
      } else {
        setSelected("/auto/en");
      }
    }
  }, []);

  const googleTranslateElementInit = () => {
    if (typeof window !== "undefined") {
      new window.google.translate.TranslateElement({
        pageLanguage: "auto",
        autoDisplay: false,
        includedLanguages: "en,ur,hi,bn,th,fr,ar",
      }, "google_translate_element");
    }
  };


  return (
    <div className="flex items-center">
      <div id="google_translate_element" className={"hidden"} />
    </div>
  );
};

export default GoogleTranslate;
