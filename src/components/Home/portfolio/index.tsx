"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { getImagePrefix } from "../../../utils/utils";
import { Icon } from "@iconify/react";

const Portfolio = () => {
  const whoIsItFor = [
    {
      icon: "mdi:home-city",
      title: "Homes or Businesses",
      items: ["Need urgent repairs", "Home maintenance", "Cleaning", "Any other"],
    },
    {
      icon: "mdi:account-hard-hat",
      title: "Skilled Workers",
      items: ["Get more customers", "Voice-based leads", "Easy job matching", "Grow your business"],
    },
    {
      icon: "mdi:party-popper",
      title: "Event Planners",
      items: ["Need decorators", "Caterers", "Technicians", "And more..."],
    },
  ];

  return (
    <section className="md:pt-48 sm:pt-28 pt-12 bg-background" id="who-is-it-for">
      <div className="container mx-auto lg:max-w-screen-xl px-4 sm:px-6">
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="sm:text-28 text-21 text-dark_grey mb-4 font-semibold">
            Who Is It <span className="text-primary">For?</span>
          </p>
          <h2 className="text-midnight_text sm:text-44 text-30 mb-4 font-bold">
            Designed to help you connect with the right expertise
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {whoIsItFor.map((item, index) => (
            <motion.div
              key={index}
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border-2 border-secondary hover:border-primary shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Icon
                  icon={item.icon}
                  width="32"
                  height="32"
                  className="text-primary"
                />
              </div>
              <h3 className="text-midnight_text text-24 font-bold mb-4">{item.title}</h3>
              <ul className="space-y-3">
                {item.items.map((listItem, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-dark_grey font-medium">
                    <Icon icon="mdi:check-circle" className="text-success text-18" />
                    {listItem}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: "50%", opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-primary text-21 font-bold">
            ✨ Unlimited skills can be entertained
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
