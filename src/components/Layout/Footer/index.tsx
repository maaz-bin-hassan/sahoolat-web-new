import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { footerlabels, popularServices } from "@/app/api/data";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-white border-t-2 border-secondary">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 lg:gap-12 md:gap-6 sm:gap-12 gap-6 pb-16">
          {/* Logo and Social Links */}
          <div className="lg:col-span-3 md:col-span-6 col-span-6">
            <Logo />
            <p className="text-dark_grey text-16 mt-4 mb-6 font-medium">
              Your smart gateway to effortless service.
            </p>
            <div className="flex gap-4 items-center relative z-10">
              <a href="https://web.facebook.com/profile.php?id=61578982266283" target="_blank" rel="noopener noreferrer" className="group bg-secondary p-2.5 rounded-full hover:bg-primary transition-all shadow-card cursor-pointer inline-flex items-center justify-center">
                <Icon
                  icon="fa6-brands:facebook-f"
                  width="18"
                  height="18"
                  className="text-primary group-hover:text-white pointer-events-none"
                />
              </a>
              <a href="https://whatsapp.com/channel/0029Vb644EF5EjxxxDZa9o0Z" target="_blank" rel="noopener noreferrer" className="group bg-secondary p-2.5 rounded-full hover:bg-primary transition-all shadow-card cursor-pointer inline-flex items-center justify-center">
                <Icon
                  icon="fa6-brands:whatsapp"
                  width="18"
                  height="18"
                  className="text-primary group-hover:text-white pointer-events-none"
                />
              </a>
              <a href="#" className="group bg-secondary p-2.5 rounded-full hover:bg-primary transition-all shadow-card cursor-pointer inline-flex items-center justify-center">
                <Icon
                  icon="fa6-brands:instagram"
                  width="18"
                  height="18"
                  className="text-primary group-hover:text-white pointer-events-none"
                />
              </a>
              <a href="#" className="group bg-secondary p-2.5 rounded-full hover:bg-primary transition-all shadow-card cursor-pointer inline-flex items-center justify-center">
                <Icon
                  icon="fa6-brands:x-twitter"
                  width="18"
                  height="18"
                  className="text-primary group-hover:text-white pointer-events-none"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-midnight_text mb-4 font-bold text-18">Quick Links</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.href}
                    className="text-dark_grey hover:text-primary text-16 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Services */}
          <div className="lg:col-span-3 md:col-span-3 col-span-6">
            <h4 className="text-midnight_text mb-4 font-bold text-18">Popular Services</h4>
            <ul className="grid grid-cols-2 gap-x-4">
              {popularServices?.slice(0, 8).map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.herf}
                    className="text-dark_grey hover:text-primary text-16 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-midnight_text mb-4 font-bold text-18">Company & Legal</h4>
            <ul>
              {footerlabels.map((item, index) => (
                <li key={index} className="pb-3">
                  <Link
                    href={item.herf}
                    className="text-dark_grey hover:text-primary text-16 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="lg:col-span-2 md:col-span-4 col-span-6">
            <h4 className="text-midnight_text mb-4 font-bold text-18">Stay Connected</h4>
            <p className="text-dark_grey text-16 mb-4 font-medium">
              Get early access and updates
            </p>
            <div className="relative">
              <input
                type="email"
                name="mail"
                id="mail"
                placeholder="Enter Email"
                className="bg-background border-2 border-secondary py-3 text-midnight_text rounded-xl w-full px-4 text-14 focus:border-primary focus:outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-lg">
                <Icon
                  icon="tabler:send"
                  width="16"
                  height="16"
                  className="text-white"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-secondary py-6">
          <p className="text-dark_grey text-14 text-center font-medium">
            © 2025 All copyrights are reserved by <span className="text-primary font-bold">NovaSync Dynamics Private Limited</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
