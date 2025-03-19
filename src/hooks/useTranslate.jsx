import { setCookie } from "cookies-next";

export const useTranslate = () => {

  const langChange = (lang) => {
    localStorage.setItem("googtrans", lang);
    setCookie("googtrans", lang);
    window.location.reload();
  };

  return { langChange };
};
