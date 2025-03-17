"use client";
import React from "react";
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter} from "react-icons/fa";

function Footer() {
  // iconSize for Social Links
  const iconSize = 24;
  // Company & Legal Links
  const companyLinks = [
    {href: "#", label: "About Us – Our mission & story"},
    {href: "#", label: "Terms & Conditions – User agreement & policies"},
    {href: "#", label: "Privacy Policy – How we protect your data"},
    {href: "#", label: "User Guidelines – Safe & trusted platform"},
  ];
  // Popular Services
  const popularServices = [
    {href: "#", label: "Electricians"},
    {href: "#", label: "Plumbers"},
    {href: "#", label: "Carpenters"},
    {href: "#", label: "Mechanics"},
    {href: "#", label: "Home Cleaning"},
    {href: "#", label: "Tutor"},
    {href: "#", label: "Transport & Movers"},
    {href: "#", label: "Vehicle Repair"},
    {href: "#", label: "Gutter Cleaner"},
    {href: "#", label: "Carpet Installation"},


  ];
  // Quick Links
  const quickLinks = [
    {href: "#", label: "Explore our platform & features"},
    {href: "#", label: "Get Sahoolat AI on Google Play & App Store"},
    {href: "#", label: "Browse skilled workers & professionals"},
    {href: "#", label: "Start getting jobs today!"},
    {href: "#", label: "Need help? Reach out anytime"},
  ];
  // Social Links
  const socialLinks = [
    {href: "#", icon: <FaFacebookF size={iconSize}/>, label: "Facebook"},
    {href: "#", icon: <FaTwitter size={iconSize}/>, label: "Twitter"},
    {href: "#", icon: <FaInstagram size={iconSize}/>, label: "Instagram"},
    {href: "#", icon: <FaLinkedinIn size={iconSize}/>, label: "LinkedIn"},
    {href: "#", icon: <FaTiktok size={iconSize}/>, label: "Tiktok"},
  ];


  return (
    <footer className="bg-[#0f2332] text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top Row: 3 Columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h2 className="text-[35px] font-semibold mb-6">Quick Links</h2>
            <ul className="space-y-7 text-[16px] xl:text-[20px] font-bold">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Popular Services */}
          <div>
            <h2 className="text-[35px] font-bold mb-6">Popular Services</h2>
            <ul className="space-y-3 text-[16px] font-bold list-disc ">
              {popularServices.map((service, index) => (
                <li key={index} className="ml-[25px]">
                  <a href={service.href} className="no-underline hover:underline">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Company & Legal */}
          <div>
            <h2 className="text-[35px] font-bold mb-6">Company &amp; Legal</h2>
            <ul className="space-y-7 text-[16px] xl:text-[20px] font-bold">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Stay Connected */}
        <div className="mt-10 text-center">
          <h2 className="text-[35px] font-bold mb-4">Stay Connected</h2>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-brand transition-colors "
                aria-label={link.label}

              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>


        {/* Bottom Note */}
        <div className="mt-10 text-center text-sm text-gray-300">
          <p>
            2025 All copyrights are reserved by
            <a target="_blank" href={"https://novasyncdynamics.com"}>
                        <span className="font-bold text-white">
                            {" "}
                          NovaSync Dynamics Private Limited
                        </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
