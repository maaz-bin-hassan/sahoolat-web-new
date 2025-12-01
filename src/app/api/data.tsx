import { title } from "process";

export const footerlabels: { label: string; herf: string }[] = [
  { label: "About Us", herf: "/about" },
  { label: "Terms & Conditions", herf: "/terms" },
  { label: "Privacy Policy", herf: "/privacy" },
  { label: "User Guidelines", herf: "/guidelines" },
];

export const popularServices: { label: string; herf: string }[] = [
  { label: "Electricians", herf: "#" },
  { label: "Plumbers", herf: "#" },
  { label: "Carpenters", herf: "#" },
  { label: "Mechanics", herf: "#" },
  { label: "Home Cleaning", herf: "#" },
  { label: "Tutor", herf: "#" },
  { label: "Transport & Movers", herf: "#" },
  { label: "Vehicle Repair", herf: "#" },
];

export const howItWorksData: {
  icon: string;
  title: string;
  text: string;
}[] = [
  {
    icon: "/images/icons/icon-speak.svg",
    title: "Speak Your Need",
    text: "Just say what service you need—no typing required!",
  },
  {
    icon: "/images/icons/icon-ai-match.svg",
    title: "AI Matches You Instantly",
    text: "Our AI finds the best-skilled worker near you in seconds.",
  },
  {
    icon: "/images/icons/icon-done.svg",
    title: "Get it Done",
    text: "Connect via voice or chat and get the job done hassle-free.",
  },
];

export const whySahoolatBuyersData: {
  icon: string;
  title: string;
  text: string;
}[] = [
  {
    icon: "/images/icons/icon-voice-search.svg",
    title: "AI-Powered Voice Search",
    text: "Simply speak, and AI understands your service needs instantly.",
  },
  {
    icon: "/images/icons/icon-matchmaking.svg",
    title: "Instant Matchmaking",
    text: "Get connected to the best-skilled workers in real time.",
  },
  {
    icon: "/images/icons/icon-audio-chat.svg",
    title: "Real-time Audio Chat",
    text: "Talk to service providers directly via voice chat.",
  },
  {
    icon: "/images/icons/icon-offline.svg",
    title: "Offline Support (Premium)",
    text: "Access expert services even without the internet.",
  },
  {
    icon: "/images/icons/icon-encryption.svg",
    title: "End-to-End Encryption",
    text: "Your conversations and data are 100% secure and private.",
  },
];

export const whoIsItForData: {
  title: string;
  items: string[];
}[] = [
  {
    title: "Homes or Businesses",
    items: ["Need urgent repairs", "Home maintenance", "Cleaning", "Any other"],
  },
  {
    title: "Skilled Workers",
    items: ["Get more customers", "Voice-based leads", "Easy job matching", "Grow your business"],
  },
  {
    title: "Event Planners",
    items: ["Need decorators", "Caterers", "Technicians", "Etc."],
  },
];

export const testimonialsData: {
  text: string;
  author: string;
}[] = [
  {
    text: "Sahoolat AI took the guesswork out of finding the right service provider. My sink was fixed in under an hour!",
    author: "Ali",
  },
  {
    text: "Ever since I signed up, I'm getting more daily customers with voice search. It's been a game changer for my business!",
    author: "Ahmed K.",
  },
];

export const portfolioData: { image: string; title: string }[] = [
  {
    image: "/images/portfolio/icon-wallet.svg",
    title: "Multiple verified options",
  },
  {
    image: "/images/portfolio/icon-vault.svg",
    title: "Zero extra cost",
  },
  {
    image: "/images/portfolio/icon-mobileapp.svg",
    title: "100% hassle-free",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "Multiple verified options" },
  { title: "Zero extra cost" },
  { title: "Delivered right to your doorstep" },
  { title: "100% hassle-free" },
  { title: "Powered by cutting-edge AI" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
  {
    icon: "/images/perks/icon-support.svg",
    title: "24/7 Support",
    text: "Need help? Get your requests solved quickly via support team.",
    space: "lg:mt-8",
  },
  {
    icon: "/images/perks/icon-community.svg",
    title: "Community",
    text: "Join thousands of users simplifying their lives every day.",
    space: "lg:mt-14",
  },
  {
    icon: "/images/perks/icon-academy.svg",
    title: "Easy to Use",
    text: "One app for all your needs—quick, reliable, and easy!",
    space: "lg:mt-4",
  },
];

export const timelineData: {
  icon: string;
  title: string;
  text: string;
  position: string;
}[] = [
  {
    icon: "/images/timeline/icon-planning.svg",
    title: "Speak Your Need",
    text: "Just say what service you need",
    position: "md:top-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-refinement.svg",
    title: "AI Matches You",
    text: "Find the best skilled worker near you",
    position: "md:top-0 md:right-0",
  },
  {
    icon: "/images/timeline/icon-prototype.svg",
    title: "Connect Instantly",
    text: "Chat or call directly with providers",
    position: "md:bottom-0 md:left-0",
  },
  {
    icon: "/images/timeline/icon-support.svg",
    title: "Get It Done",
    text: "Complete your task hassle-free",
    position: "md:bottom-0 md:right-0",
  },
];

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];

export const pricedeta: {
  icon: string;
  title: string;
  short: string;
  price: string;
  mark: string;
  background: string;
  padding: string;
  width: number;
  height: number;
}[] = [
  {
    icon: "/images/icons/icon-electrician.svg",
    title: "Electrician",
    short: "Services",
    price: "Starting Rs. 500",
    mark: "Popular",
    background: "bg-primary/20",
    padding: "p-3",
    width: 32,
    height: 32,
  },
  {
    icon: "/images/icons/icon-plumber.svg",
    title: "Plumber",
    short: "Services",
    price: "Starting Rs. 400",
    mark: "Popular",
    background: "bg-orange/20",
    padding: "p-3",
    width: 32,
    height: 32,
  },
  {
    icon: "/images/icons/icon-carpenter.svg",
    title: "Carpenter",
    short: "Services",
    price: "Starting Rs. 600",
    mark: "Available",
    background: "bg-green/20",
    padding: "p-3",
    width: 32,
    height: 32,
  },
  {
    icon: "/images/icons/icon-mechanic.svg",
    title: "Mechanic",
    short: "Services",
    price: "Starting Rs. 800",
    mark: "Available",
    background: "bg-blue/20",
    padding: "p-3",
    width: 32,
    height: 32,
  },
];

