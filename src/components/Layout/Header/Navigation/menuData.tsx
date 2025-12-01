import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/#main-banner" },
  { 
    label: "About", 
    href: "/about",
    submenu: [
      { label: "Our mission & story", href: "/about" },
      { label: "User agreement & policies", href: "/terms" },
      { label: "How we protect your data", href: "/privacy" },
      { label: "Safe & trusted platform", href: "/guidelines" },
    ]
  },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why Sahoolat", href: "/#why-sahoolat" },
  { label: "FAQs", href: "/faq" },
];
