import { useEffect, useState } from "react";

export const useTranslate = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    const storedLang = localStorage.getItem("googtrans");
    if (storedLang) {
      setSelected(storedLang);
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

  const langChange = (lang) => {
    localStorage.setItem("googtrans", decodeURIComponent(lang));
    setSelected(lang);
    window.location.reload();
  };

  return { langChange, selected };
};
