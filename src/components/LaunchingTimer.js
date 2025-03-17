"use client";
import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

function LaunchingTimer() {
  const launchDate = new Date("2025-07-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(launchDate));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(launchDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [launchDate]);

  const isLaunched =
    timeLeft.months <= 0 &&
    timeLeft.days <= 0 &&
    timeLeft.hours <= 0 &&
    timeLeft.minutes <= 0 &&
    timeLeft.seconds <= 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{duration: 0.4}}
          className="fixed top-20 right-1 transform -translate-x-1/2 w-[90%] max-w-md bg-[#023663]/80 backdrop-blur-lg text-white p-5 rounded-xl shadow-2xl border border-white/20"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-4 text-white text-lg font-bold transition transform hover:scale-110 hover:text-gray-300"
          >
            ✖
          </button>

          <div className="flex flex-col items-center">
            {isLaunched ? (
              <motion.h2
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.4}}
                className="text-2xl font-bold text-teal-400"
              >
                🚀 Launched Successfully!
              </motion.h2>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-white">
                  🚀 Launching In:
                </h2>
                <div className="flex gap-3 text-lg font-semibold mt-4">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <motion.div
                      key={unit}
                      initial={{scale: 0.8, opacity: 0}}
                      animate={{scale: 1, opacity: 1}}
                      transition={{duration: 0.4}}
                      className="p-3 bg-[#0e374a] rounded-lg shadow-lg border border-white/10 text-center w-16"
                    >
                      <motion.span
                        animate={{scale: [1, 1.1, 1]}}
                        transition={{repeat: Infinity, duration: 1.5}}
                        className="block text-teal-400 text-2xl font-bold"
                      >
                        {value}
                      </motion.span>
                      <span className="text-xs uppercase text-gray-300">
                                                {unit}
                                            </span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getTimeRemaining(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance <= 0) {
    return {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0};
  }

  const totalSec = Math.floor(distance / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHours = Math.floor(totalMin / 60);
  const totalDays = Math.floor(totalHours / 24);
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;
  const hours = totalHours % 24;
  const minutes = totalMin % 60;
  const seconds = totalSec % 60;

  return {months, days, hours, minutes, seconds};
}

export default LaunchingTimer;
