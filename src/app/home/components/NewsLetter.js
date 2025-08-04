import React, { useState } from "react";

export default function Newsletter() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isValidInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/; // adjust based on your country
    return emailRegex.test(inputValue) || phoneRegex.test(inputValue);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault(); // prevent form reload
    if (!isValidInput()) return;
    setIsLoading(true);

    try {
      const payload = inputValue.includes("@")
        ? { email: inputValue }
        : { phone: inputValue };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setInputValue("");
        setIsSubscribed(true);
      } else {
        console.error("Subscription failed:", data.error);
      }
    } catch (err) {
      console.error("Network or server error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-teal-400 to-orange-400 py-12 px-4 md:py-16">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-10 pointer-events-none"
        style={{ backgroundImage: 'url("/assets/bg-pattern.png")' }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-white text-2xl md:text-5xl font-extrabold tracking-tight">
          Get Early Access!
        </h2>

        <p className="mt-3 text-white text-sm md:text-lg max-w-xl mx-auto">
          Looking for top-tier professional services — from basic to elite — without
          paying a single extra rupee? 💸
          <br />
          <ul>
            <li className={'text-left'}>- Multiple verified options</li>
            <li className={'text-left'}>- Zero extra cost</li>
            <li className={'text-left'}>- Delivered right to your doorstep</li>
            <li className={'text-left'}>- 100% hassle-free</li>
            <li className={'text-left'}>- Powered by cutting-edge AI</li>
          </ul>
          <br />
          Welcome to Sahoolat AI — your smart gateway to effortless service.
          Experience a new era of convenience and control.
        </p>

        {isSubscribed ? (
          <div className="mt-8 text-white text-xl font-semibold">
            🎉 Thank you for subscribing!
            <br />
            We’ll keep you posted with the latest updates, exclusive features, and early access perks.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-8 flex justify-center">
            <div
              className="relative w-full max-w-xl flex items-center
                         bg-white/80 border-2 border-teal-500
                         rounded-full shadow-md"
            >
              <input
                type="text"
                placeholder="Enter your email or phone number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow bg-transparent pl-5 py-3 md:py-4
                           text-gray-700 font-medium focus:outline-none
                           placeholder:text-gray-500 placeholder:font-normal"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !isValidInput()}
                className="flex items-center justify-center p-2 mr-3
                           bg-teal-500 hover:bg-teal-600 rounded-full
                           transition-colors duration-200 disabled:opacity-60"
                aria-label="Subscribe"
              >
                {isLoading ? (
                  <div className="animate-spin w-6 h-6 md:w-8 md:h-8 border-4 border-white border-t-transparent rounded-full" />
                ) : (
                  <img
                    src="/assets/send-icon.png"
                    alt="Send icon"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
