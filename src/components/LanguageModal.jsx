import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslate } from "@/hooks/useTranslate";

const LanguageModal = () => {
  const { langChange } = useTranslate();
  const [openModal, setOpenModal] = useState(!localStorage.getItem("googtrans"));

  const handleLanguageChange = (lang) => {
    localStorage.setItem("googtrans", lang);
    langChange(lang);
    setOpenModal(false);
  };

  return (
    <div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="w-[350px] md:w-[800px] h-[300px] rounded-md">
          <DialogHeader>
            <DialogTitle className={"text-[30px]"}>Choose Language</DialogTitle>
            <DialogDescription className={"flex items-center justify-center h-full"}>
              <div className={"flex gap-3 md:gap-6"}>
                <Button
                  onClick={() => {
                    handleLanguageChange("/auto/en");
                  }}
                  className={"bg-[#0ea288] hover:bg-[#0e6d69] border-none outline-none focus:border-none p-6 md:p-8 text-lg"} size={"lg"}>
                  English (EN)
                </Button>

                <Button
                  onClick={() => {
                    handleLanguageChange("/auto/ur");
                  }}
                  className={"bg-[#0ea288] hover:bg-[#0e6d69] border-none outline-none focus:border-none p-6 md:p-8 text-lg"} size={"lg"}>
                  Urdu (اردو)
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LanguageModal;
