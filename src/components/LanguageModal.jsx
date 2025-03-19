import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslate } from "@/hooks/useTranslate";
import "../../node_modules/flag-icons/css/flag-icons.min.css";

const LanguageModal = () => {
  const { langChange } = useTranslate();
  const [openModal, setOpenModal] = useState(typeof window!=='undefined' && !localStorage.getItem("googtrans"));

  const handleLanguageChange = (lang) => {
    langChange(lang);
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="w-[350px] md:w-[850px] py-10 px-20 rounded-md">
          <DialogHeader>
            <DialogTitle className={"text-xl md:text-[30px] mb-6"}>Choose Language</DialogTitle>
            <DialogDescription className={"flex items-center justify-center h-full"}>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Flag flag={"us"} language={"English"} lang={"/auto/en"} handleLanguageChange={handleLanguageChange} />
                <Flag flag={"pk"} language={"Urdu"} lang={"/auto/ur"} handleLanguageChange={handleLanguageChange} />
                <Flag flag={"in"} language={"Hindi"} lang={"/auto/hi"} handleLanguageChange={handleLanguageChange} />

                <Flag flag={"fr"} language={"French"} lang={"/auto/fr"} handleLanguageChange={handleLanguageChange} />
                <Flag flag={"bd"} language={"Bengali"} lang={"/auto/bn"} handleLanguageChange={handleLanguageChange} />
                <Flag flag={"sa"} language={"Arabic"} lang={"/auto/ar"} handleLanguageChange={handleLanguageChange} />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageModal;


function Flag({ flag, language, lang, handleLanguageChange }) {

  return (
    <div
      onClick={() => handleLanguageChange(lang)}
      className="flex flex-col cursor-pointer items-center w-24 py-2 px-8 md:w-28 gap-3 md:py-3 md:px-6 border border-[#0ea288] rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-[#e0f7fa]">
      <span className={`fi fi-${flag} text-4xl md:text-5xl`} />
      <span className="text-lg text-black">{language}</span>
    </div>
  )
}
