import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GoogleTranslate from "@/app/GoogleTranslate";

// Font configuration
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO metadata
export const metadata = {
  metadataBase: new URL("https://www.sahoolatai.com"),
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
  authors: [{ name: "Sahoolat AI Team", url: "https://www.sahoolatai.com" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: "website",
    url: "https://www.sahoolatai.com",
    title: "Sahoolat AI - Hire & Get Hired Instantly",
    description:
      "Sahoolat AI helps users connect with skilled professionals and job seekers using AI-powered voice-based matching.",
    siteName: "Sahoolat AI",
    images: [
      {
        url: "https://www.sahoolatai.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sahoolat AI - AI-powered job matching platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SahoolatAI",
    title: "Sahoolat AI - AI-powered Job Matching",
    description:
      "Instantly connect with skilled professionals using AI-powered voice-based technology. Find jobs or hire experts effortlessly.",
    images: [
      {
        url: "https://www.sahoolatai.com/assets/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "Sahoolat AI platform overview",
      },
    ],
  },
};

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
      <link rel="icon" type="image/png" href="/assets/logo.png" />
      <link rel="canonical" href="https://www.sahoolatai.com" />

      {/* Optional meta tags for enhanced SEO */}
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(", ")} />
      <meta name="author" content="Sahoolat AI Team" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.placename" content="Islamabad" />
      <meta name="geo.position" content="33.6844;73.0479" />
      <meta name="ICBM" content="33.6844, 73.0479" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.sahoolatai.com" />
      <meta property="og:title" content="Sahoolat AI - Hire & Get Hired Instantly" />
      <meta property="og:description" content="Sahoolat AI helps users connect with skilled professionals and job seekers using AI-powered voice-based matching." />
      <meta property="og:site_name" content="Sahoolat AI" />
      <meta property="og:image" content="https://www.sahoolatai.com/assets/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Sahoolat AI - AI-powered job matching platform" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SahoolatAI" />
      <meta name="twitter:title" content="Sahoolat AI - AI-powered Job Matching" />
      <meta name="twitter:description" content="Instantly connect with skilled professionals using AI-powered voice-based technology. Find jobs or hire experts effortlessly." />
      <meta name="twitter:image" content="https://www.sahoolatai.com/assets/twitter-image.png" />
    </head>

    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F2F6F7]`}
    >
    {/* Chatbot script */}
    <div className="z-[500]">
      <Script src="https://sahoolat-chatbot.vercel.app/chatbot.js" strategy="lazyOnload" />
    </div>

    {/* Google Translate (optional performance improvement) */}
    <GoogleTranslate />

    {children}
    </body>
    </html>
  );
}
