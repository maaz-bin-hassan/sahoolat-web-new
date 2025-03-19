import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GoogleTranslate from "@/app/GoogleTranslate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Top-level metadata object
export const metadata = {
  // This tells Next.js the base URL to use when resolving images, links, etc.
  metadataBase: new URL("https://sahoolatai.com"),

  title: "Sahoolat AI - Find Skilled Experts or Get Hired Instantly",
  description:
    "Sahoolat AI connects users with skilled professionals and service providers using voice-based AI. Find experts or get hired instantly with just your voice!",
  keywords: [
    "Sahoolat AI",
    "AI-powered hiring",
    "find experts",
    "service providers",
    "hire skilled workers",
    "voice-based AI",
    "instant job matching",
  ],
  author: "Sahoolat AI Team",
  favicon: "/assets/logo.png",
  robots: "index, follow",

  // Remove viewport & themeColor from here

  // Open Graph
  openGraph: {
    type: "website",
    url: "https://sahoolatai.com", // replace with your actual domain
    title: "Sahoolat AI - Hire & Get Hired Instantly",
    description:
      "Sahoolat AI helps users connect with skilled professionals and job seekers using AI-powered voice-based matching.",
    siteName: "Sahoolat AI",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sahoolat AI - AI-powered job matching platform",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@SahoolatAI", // Replace with actual Twitter handle
    title: "Sahoolat AI - AI-powered Job Matching",
    description:
      "Instantly connect with skilled professionals using AI-powered voice-based technology. Find jobs or hire experts effortlessly.",
    images: [
      {
        url: "/assets/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "Sahoolat AI platform overview",
      },
    ],
  },
};

// Export viewport and themeColor at top-level instead of inside metadata
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = "#057e7e";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      {/* Favicon */}
      <link rel="icon" href={metadata.favicon} />

      {/* These meta tags are mostly redundant with Next.js automatic injection,
            but you can keep them if you prefer to be explicit. */}
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(", ")} />
      <meta name="author" content={metadata.author} />

      {/*
          DO NOT manually include <meta name="viewport" ...> or <meta name="theme-color" ...>
          because Next.js will inject them automatically from the exports above.
        */}

      {/* Open Graph Meta Tags (optional if you rely on Next auto-generation) */}
      <meta property="og:type" content={metadata.openGraph.type} />
      <meta property="og:url" content={metadata.openGraph.url} />
      <meta property="og:title" content={metadata.openGraph.title} />
      <meta
        property="og:description"
        content={metadata.openGraph.description}
      />
      <meta property="og:site_name" content={metadata.openGraph.siteName} />
      <meta
        property="og:image"
        content={metadata.openGraph.images[0].url}
      />
      <meta
        property="og:image:width"
        content={metadata.openGraph.images[0].width}
      />
      <meta
        property="og:image:height"
        content={metadata.openGraph.images[0].height}
      />
      <meta
        property="og:image:alt"
        content={metadata.openGraph.images[0].alt}
      />

      {/* Twitter Meta Tags (again, optional) */}
      <meta name="twitter:card" content={metadata.twitter.card} />
      <meta name="twitter:site" content={metadata.twitter.site} />
      <meta name="twitter:title" content={metadata.twitter.title} />
      <meta
        name="twitter:description"
        content={metadata.twitter.description}
      />
      <meta
        name="twitter:image"
        content={metadata.twitter.images[0].url}
      />
    </head>

    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F2F6F7]`}
    >
    <div className="z-[500]">
      <Script src="https://sahoolat-chatbot.vercel.app/chatbot.js" />
    </div>

     <GoogleTranslate />
    {children}
    </body>
    </html>
  );
}
