"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setSubmenuOpen(false);
    }, 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.submenu) {
      e.preventDefault();
      setSubmenuOpen(!submenuOpen);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className={`text-17 flex items-center gap-1 font-medium hover:text-primary capitalized transition-colors ${
          path === item.href || (item.submenu && item.submenu.some(sub => path === sub.href)) 
            ? "text-primary" 
            : "text-midnight_text"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${submenuOpen ? "rotate-180" : ""}`}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </button>
      {!item.submenu && (
        <Link
          href={item.href}
          className={`text-17 flex items-center gap-1 font-medium hover:text-primary capitalized transition-colors absolute inset-0 ${
            path === item.href ? "text-primary" : "text-midnight_text"
          }`}
        >
          {item.label}
        </Link>
      )}
      {submenuOpen && item.submenu && (
        <div
          className="absolute py-3 left-0 mt-2 w-64 bg-white shadow-card-hover rounded-xl border border-secondary/50 z-50 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block px-5 py-3 text-16 font-medium transition-colors ${
                path === subItem.href
                  ? "text-primary bg-secondary/30"
                  : "text-midnight_text hover:text-primary hover:bg-secondary/20"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
