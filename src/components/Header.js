"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaDownload } from "react-icons/fa"; // Import Download Icon

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "#", label: "About" },
        { href: "#", label: "Careers" },
        { href: "#", label: "Team" },
        { href: "#", label: "Social Media" },
        { href: "#", label: "Contact" },
    ];

    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/assets/logo.png" width={120} height={60} alt="Sahoolat Logo" />
                </Link>

                {/* Navigation Menu (Desktop) */}
                <ul className="hidden lg:flex flex-1 justify-center space-x-8 font-bold text-black">
                    {navItems.map((item, index) => (
                        <NavItem key={index} href={item.href} label={item.label} />
                    ))}
                </ul>

                {/* Right Animated Download Button */}
                <div className="hidden lg:flex">
                    <button className="download-btn flex items-center gap-3 px-6 py-3 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300">
                        <FaDownload className="text-2xl" /> Download App
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
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 011.414-1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0110 2H4a1 1 011-1zM3 10a1 1 011-1h12a1 1 0110 2H4a1 1 011-1zM3 15a1 1 011-1h12a1 1 0110 2H4a1 1 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </button>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
                        <ul className="flex flex-col items-center space-y-4 py-4 font-bold text-black">
                            {navItems.map((item, index) => (
                                <NavItem key={index} href={item.href} label={item.label} />
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

const NavItem = ({ href, label }) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href);

    return (
        <li>
            <Link
                href={href}
                className={`block py-2 transition-colors border-b-2 text-xl md:text-lg 
        ${
                    isActive
                        ? "border-teal-500 text-teal-500"
                        : "border-transparent hover:border-teal-500 hover:text-teal-500"
                }`}
            >
                {label}
            </Link>
        </li>
    );
};

export default Header;
