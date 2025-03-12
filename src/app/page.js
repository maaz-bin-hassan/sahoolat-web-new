"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Home from "./home/page";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    return (
        <div className="relative w-full h-screen">
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <Image
                        src="/assets/logo.png" // Replace with your splash image path
                        alt="Splash Screen"
                        width={500}
                        height={500}
                        className="object-contain"
                        priority // Ensures faster loading
                    />
                </div>
            ) : (
                <Home />
            )}
        </div>
    );
}
