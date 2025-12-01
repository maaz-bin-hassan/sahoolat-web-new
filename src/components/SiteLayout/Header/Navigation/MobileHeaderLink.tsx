import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();

  const handleToggle = (e: React.MouseEvent) => {
    if (item.submenu) {
      e.preventDefault();
      setSubmenuOpen(!submenuOpen);
    }
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full py-3 font-medium transition-colors ${
          path === item.href || (item.submenu && item.submenu.some(sub => path === sub.href))
            ? "text-primary"
            : "text-midnight_text hover:text-primary"
        }`}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
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
      </Link>
      {submenuOpen && item.submenu && (
        <div className="bg-secondary/20 rounded-lg p-2 w-full mt-1 mb-2">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                path === subItem.href
                  ? "text-primary bg-white"
                  : "text-midnight_text hover:text-primary hover:bg-white"
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

export default MobileHeaderLink;
