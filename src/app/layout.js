import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Place metadata here inside the file
export const metadata = {
  title: "Sahoolat AI - Find Skilled Experts or Get Hired Instantly",
  description: "Sahoolat AI connects users with skilled professionals and service providers using voice-based AI. Find experts or get hired instantly with just your voice!",
  keywords: [
    "Sahoolat AI",
    "AI-powered hiring",
    "find experts",
    "service providers",
    "hire skilled workers",
    "voice-based AI",
    "instant job matching"
  ],
  author: "Sahoolat AI Team",
  favicon: "/assets/logo.png",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#057e7e",
  openGraph: {
    type: "website",
    url: "https://sahoolatai.com", // Replace with actual URL
    title: "Sahoolat AI - Hire & Get Hired Instantly",
    description: "Sahoolat AI helps users connect with skilled professionals and job seekers using AI-powered voice-based matching.",
    siteName: "Sahoolat AI",
    images: [
      {
        url: "/assets/og-image.png", // Replace with actual socialyour media image
        width: 1200,
        height: 630,
        alt: "Sahoolat AI - AI-powered job matching platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SahoolatAI", // Replace with actual Twitter handle
    title: "Sahoolat AI - AI-powered Job Matching",
    description: "Instantly connect with skilled professionals using AI-powered voice-based technology. Find jobs or hire experts effortlessly.",
    images: [
      {
        url: "/assets/twitter-image.png", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "Sahoolat AI platform overview",
      },
    ],
  },
  canonical: "https://sahoolatai.com", // Replace with your actual site URL
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href={metadata.favicon}/>
      <meta name="description" content={metadata.description}/>
      <meta name="keywords" content={metadata.keywords.join(", ")}/>
      <meta name="author" content={metadata.author}/>
      <meta name="viewport" content={metadata.viewport}/>
      <meta name="theme-color" content={metadata.themeColor}/>

      {/* Open Graph Meta Tags for Facebook & LinkedIn */}
      <meta property="og:type" content={metadata.openGraph.type}/>
      <meta property="og:url" content={metadata.openGraph.url}/>
      <meta property="og:title" content={metadata.openGraph.title}/>
      <meta property="og:description" content={metadata.openGraph.description}/>
      <meta property="og:site_name" content={metadata.openGraph.siteName}/>
      <meta property="og:image" content={metadata.openGraph.images[0].url}/>
      <meta property="og:image:width" content={metadata.openGraph.images[0].width}/>
      <meta property="og:image:height" content={metadata.openGraph.images[0].height}/>
      <meta property="og:image:alt" content={metadata.openGraph.images[0].alt}/>

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={metadata.twitter.card}/>
      <meta name="twitter:site" content={metadata.twitter.site}/>
      <meta name="twitter:title" content={metadata.twitter.title}/>
      <meta name="twitter:description" content={metadata.twitter.description}/>
      <meta name="twitter:image" content={metadata.twitter.images[0].url}/>

      {/* Canonical URL */}
      <link rel="canonical" href={metadata.canonical}/>
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-[#F2F6F7]`}>
    <div className="z-[50000000000000000000000000]">
      <Script src="https://sahoolat-chatbot.vercel.app/chatbot.js"></Script>
      {/*<Script src="http://localhost:3002/chatbot.js"></Script>*/}
    </div>
    {children}
    </body>
    </html>
  );
}
