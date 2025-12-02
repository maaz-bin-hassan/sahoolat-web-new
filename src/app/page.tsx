import React from "react";
import Hero from "../components/Home/Hero";
import Work from "../components/Home/work";
import TimeLine from "../components/Home/timeline";
import Platform from "../components/Home/platform";
import Portfolio from "../components/Home/portfolio";
import Upgrade from "../components/Home/upgrade";
import Perks from "../components/Home/perks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sahoolat.AI - Your Voice, Your Solution",
  description: "Find Skilled Experts or Get Hired – Just by Speaking! AI-powered voice search platform connecting you with skilled professionals instantly.",
  keywords: "Sahoolat, AI, voice search, skilled workers, service providers, Pakistan",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <TimeLine />
      <Portfolio />
      <Upgrade />
      <Platform />
      <Perks />
    </main>
  );
}
