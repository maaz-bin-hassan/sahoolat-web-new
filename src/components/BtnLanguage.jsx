import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useTranslate } from "@/hooks/useTranslate";

const languages = [
  { name: "English", code: "/auto/en", tr: "en" },
  { name: "Urdu", code: "/auto/ur", tr: "اردو" },
  { name: "Hindi", code: "/auto/hi", tr: "हिन्दी" },
  { name: "Bengali", code: "/auto/bn", tr: "বাংলা" },
  { name: "Thai", code: "/auto/th", tr: "ไทย" },
  { name: "French", code: "/auto/fr", tr: "fr" },
  { name: "Arabic", code: "/auto/ar", tr: "العربية" },
];

const BtnLanguage = () => {
  const { langChange } = useTranslate();
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const storedLang = localStorage.getItem("googtrans");
    if (storedLang) {
      const currentLang = languages.find((lang) => lang.code === storedLang);
      if (currentLang) {
        setLanguage(currentLang.name);
      }
    }
  }, []);

  const getCurrentLanguage = () => {
    const current = languages.find((lang) => lang.name === language);
    return current ? current.name : "English";
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang.name);
    langChange(lang.code);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center w-[150px] space-x-2 rounded-md border border-primary bg-background px-4 py-2 text-primary transition-all hover:shadow-lg"
          >
            <Globe className="h-4 w-4 mr-4" />
            {getCurrentLanguage()}
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={cn(
                "cursor-pointer flex items-center justify-between",
                language === lang.name && "font-medium",
              )}
            >
              <span>
                {lang.name} {"  "} ({lang.tr.toUpperCase()})
              </span>
              {language === lang.name && <Check className="h-4 w-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BtnLanguage;
