import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

export const useTranslate = () => {
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

  const langChange = (lang) => {
    setCookie("googtrans", decodeURIComponent(lang));
    setSelected(lang);
    window.location.reload();
  };

  return { langChange, selected };
};
