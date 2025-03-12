"use client";
import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {href: "/", label: "Home"},
        {href: "#", label: "About"},
        {href: "#", label: "Careers"},
        {href: "#", label: "Team"},
        {href: "#", label: "Social Media"},
        {href: "#", label: "Contact"},
    ];
    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-2xl">
                    {/* Logo */}
                    <Link href={navItems[0].href} className="flex items-center">
                        <img src="/assets/logo.png"
                             className="w-[120px] h-[61px] md:w-[241px] md:h-[124px]"
                             alt="Sahoolat Logo"/>
                    </Link>
                    <div className="flex items-center justify-end lg:order-2 w-full lg:w-auto">
                        {/* Download Button */}
                        <button
                            className="w-[169px] h-[56px] md:w-[291px] md:h-[75px] font-bold text-[20px] md:text-[25px] flex-shrink-0 px-4 py-2 text-white bg-brand rounded-l-md rounded-r-full hover:bg-brand transition-colors text-center ml-2">
                            Download App
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div
                        className={`${isMenuOpen ? "flex" : "hidden"
                        } flex-col lg:flex lg:flex-row lg:space-x-8 w-full lg:w-auto lg:order-1`}
                        id="mobile-menu"
                    >
                        <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 font-bold text-black">
                            {navItems.map((item, index) => (
                                <NavItem key={index} href={item.href} label={item.label}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

const NavItem = ({href, label}) => {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href);

    return (
        <li>
            <Link
                href={href}
                className={`
            block  border-b-2 transition-colors text-xl md:text-[18px]
            ${isActive ? "border-brand text-brand" : "border-transparent hover:border-brand hover:text-brand"}
          `}
            >
                {label}
            </Link>
        </li>
    );
};

export default Header;


// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Header = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const navItems = [
//         { href: "/", label: "Home" },
//         { href: "/about", label: "About" },
//         { href: "/careers", label: "Careers" },
//         { href: "/team", label: "Team" },
//         { href: "/social-media", label: "Social Media" },
//         { href: "/contact", label: "Contact" },
//     ];

//     return (
//         <header className="bg-white border-gray-200 py-3">
//             <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-8 lg:px-16">
//                 {/* Logo Section */}
//                 <Link href="/" className="flex items-center">
//                     <Image src="/assets/logo.png" width={120} height={120} alt="Sahoolat Logo" />
//                 </Link>

//                 {/* Navigation Menu */}
//                 <ul className="hidden lg:flex flex-1 justify-center space-x-8 font-bold text-black">
//                     {navItems.map((item, index) => (
//                         <NavItem key={index} href={item.href} label={item.label} />
//                     ))}
//                 </ul>

//                 {/* Right Button Section */}
//                 <div className="hidden lg:flex">
//                     <button className="inline-flex text-2xl items-center px-4 py-2 text-white bg-teal-600 rounded-l-md rounded-r-full hover:bg-teal-700 transition-colors">
//                         Download App
//                     </button>
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <button
//                     onClick={() => setIsMenuOpen(!isMenuOpen)}
//                     className="lg:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
//                     aria-controls="mobile-menu"
//                     aria-expanded={isMenuOpen}
//                 >
//                     <span className="sr-only">Open main menu</span>
//                     {isMenuOpen ? (
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                             <path
//                                 fillRule="evenodd"
//                                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                 clipRule="evenodd"
//                             ></path>
//                         </svg>
//                     ) : (
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
//                             <path
//                                 fillRule="evenodd"
//                                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                                 clipRule="evenodd"
//                             ></path>
//                         </svg>
//                     )}
//                 </button>

//                 {/* Mobile Menu */}
//                 {isMenuOpen && (
//                     <div className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
//                         <ul className="flex flex-col items-center space-y-4 py-4 font-bold text-black">
//                             {navItems.map((item, index) => (
//                                 <NavItem key={index} href={item.href} label={item.label} />
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </nav>
//         </header>
//     );
// };

// const NavItem = ({ href, label }) => {
//     const pathname = usePathname();
//     const isActive = pathname === href || pathname.startsWith(href);

//     return (
//         <li>
//             <Link
//                 href={href}
//                 className={`block py-2 transition-colors border-b-2 text-2xl
//                 ${isActive ? "border-teal-600 text-teal-600" : "border-transparent hover:border-teal-600 hover:text-teal-600"}`}
//             >
//                 {label}
//             </Link>
//         </li>
//     );
// };

// export default Header;
