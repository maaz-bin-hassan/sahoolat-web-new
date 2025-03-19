import { setCookie } from "cookies-next";

export const useTranslate = () => {
  const langChange = (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("googtrans", lang);
      setCookie("googtrans", lang);
      window.location.reload();
    }
  };
  return { langChange };
};
