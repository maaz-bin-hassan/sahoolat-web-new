"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import { FaDownload, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {href: "/", label: "Home"},
    {href: "/about-us", label: "About"},
    {href: "/sahoolat-social", label: "Social Media"},
    {href: "/book-call", label: "Book a call"},
    {href: "/faqs", label: "FAQs"},
  ];

  return (
    <header className="bg-white">
      <nav className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            width={120}
            height={60}
            alt="Sahoolat Logo"
          />
        </Link>

        {/* Navigation Menu (Desktop) */}
        <ul className="hidden lg:flex flex-1 justify-center space-x-8 font-bold text-black">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} />
          ))}
        </ul>

        {/* Right-side Download Button (Desktop) */}
        <div className="hidden lg:flex">
          <button
            className="download-btn flex items-center gap-3 px-6 py-3 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300"
          >
            <FaDownload className="text-2xl"/> Download App
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <FaTimes size={20} />
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#F2F6F7] shadow-lg lg:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4 font-bold text-black">
              {navItems.map((item, index) => (
                <NavItem key={index} href={item.href} label={item.label}/>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* CSS for Animated Gradient Button */}
      <style jsx>{`
          .download-btn {
              background-size: 300% 300%;
              background-image: linear-gradient(
                      45deg,
                      #ff8939,
                      #0e6a68,
                      #ff8939,
                      #0e6a68
              );
              animation: animated-gradient 5s ease infinite;
          }

          @keyframes animated-gradient {
              0% {
                  background-position: 0% 50%;
              }
              50% {
                  background-position: 100% 50%;
              }
              100% {
                  background-position: 0% 50%;
              }
          }
      `}</style>
    </header>
  );
};

/** NavItem Component */
const NavItem = ({href, label}) => {
  // Current route
  const pathname = usePathname();

  // Check if the link is active
  const isActive = pathname === href;
  // If you prefer partial matching: const isActive = pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={`block py-2 transition-colors text-xl md:text-lg border-b-2 ${
          isActive
            ? // ACTIVE: bottom border + color
            "border-[#057e7e] text-[#057e7e]"
            : "border-transparent text-[#08202f] hover:border-[#057e7e] hover:text-[#057e7e]"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default Header;
