"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCompass, FaHome, FaPlus, FaUser } from "react-icons/fa";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs"; // NEW ICONS
import { toast } from "react-toastify";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// Components
import SocialMediaSideDrawer from "../../components/ui/SocialMediaSideDrawer";
import SocialMediaSideBar from "../../components/ui/SocialMediaSideBar";
import VideoCard from "../../components/ui/VideoCard";

// Bottom nav menu items
const menu = [
  { text: "Home", icon: FaHome, href: "#home" },
  { text: "Explore", icon: FaCompass, href: "#explore" },
  { text: "Upload", icon: FaPlus, href: "#upload" },
  { text: "Profile", icon: FaUser, href: "#profile" },
];

// Demo video URLs
const videoUrls = [
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23plumber+%23work+wall+mixer+ka+fiting+kese+kare+%23bathroom+%23wallmixer+%23geyser.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%F0%9F%98%B1%F0%9F%94%A5Problem+solve+PPR+Green+Pipes+Fitting+System+%F0%9F%98%B1%F0%9F%92%A5.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%24750+in+2+mins+with+a+screwdriver__+%23plumbing+%23plumber+%23satisfying+%23draincleaning+%40KEENUtility.mp4",
];

// Demo stats for each video
const mockStats = [
  { likesCount: "368.5K", commentsCount: "6427", sharesCount: "25K" },
  { likesCount: "120K",   commentsCount: "542",  sharesCount: "10K" },
  { likesCount: "1.2M",   commentsCount: "3400", sharesCount: "5K" },
  { likesCount: "900K",   commentsCount: "1300", sharesCount: "3K" },
];

export default function SahoolatSocial() {
  // Refs for videos and sections
  const containerRef = useRef(null);
  const videoRefs = useRef([]);   // Video elements
  const sectionRefs = useRef([]); // Section wrappers for scrolling

// Drawers and modals
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Video state
  const [isMuted, setIsMuted] = useState(true);
  const [playCounts, setPlayCounts] = useState(new Array(videoUrls.length).fill(0));
  const [pausedByAuto, setPausedByAuto] = useState(new Array(videoUrls.length).fill(false));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Loading/progress
  const [loadingVideos, setLoadingVideos] = useState(new Array(videoUrls.length).fill(true));
  const [durations, setDurations] = useState(new Array(videoUrls.length).fill(0));
  const [currentTimes, setCurrentTimes] = useState(new Array(videoUrls.length).fill(0));


  const [commentsOpen, setCommentsOpen] = useState(false);

  // Mobile bottom nav
  const [activeLink, setActiveLink] = useState("#home");
  const handleMenuClick = (link) => setActiveLink(link);

  // Keep sectionRefs array in sync
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, videoUrls.length);
  }, [videoUrls.length]);

  // IntersectionObserver for auto-play/pause
  useEffect(() => {
    const options = { root: containerRef.current, threshold: 0.7 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoEl = entry.target;
        const idx = videoRefs.current.indexOf(videoEl);

        if (entry.isIntersecting) {
          if (!pausedByAuto[idx]) {
            videoEl.play().catch(() => {});
            setCurrentIndex(idx);
          }
        } else {
          videoEl.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((vid) => {
      if (vid) observer.observe(vid);
    });

    return () => {
      videoRefs.current.forEach((vid) => {
        if (vid) observer.unobserve(vid);
      });
    };
  }, [pausedByAuto]);


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setDrawerOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = isMuted;
    });
  }, [isMuted]);

  const handleVideoLoad = (index) => {
    setLoadingVideos((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleVideoBuffer = (index) => {
    setLoadingVideos((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleLoadedMetadata = (index) => {
    const vid = videoRefs.current[index];
    if (!vid) return;
    setDurations((prev) => {
      const updated = [...prev];
      updated[index] = vid.duration || 0;
      return updated;
    });
  };

  const handleTimeUpdate = (index) => {
    const vid = videoRefs.current[index];
    if (!vid) return;
    setCurrentTimes((prev) => {
      const updated = [...prev];
      updated[index] = vid.currentTime;
      return updated;
    });
  };

  const handleVideoEnd = (index) => {
    setPlayCounts((prev) => {
      const updated = [...prev];
      updated[index] += 1;

      const vid = videoRefs.current[index];
      if (updated[index] === 1) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else if (updated[index] >= 2) {
        vid.pause();
        setPausedByAuto((old) => {
          const clone = [...old];
          clone[index] = true;
          return clone;
        });
      }
      return updated;
    });
  };

  const handleVideoClick = (index) => {
    const vid = videoRefs.current[index];
    if (!vid) return;
    if (pausedByAuto[index]) {
      setPausedByAuto((old) => {
        const clone = [...old];
        clone[index] = false;
        return clone;
      });
      setPlayCounts((old) => {
        const clone = [...old];
        clone[index] = 0;
        return clone;
      });
    }
    vid.paused ? vid.play() : vid.pause();
  };

  const handleScrub = (index, val) => {
    const vid = videoRefs.current[index];
    if (!vid) return;
    if (pausedByAuto[index]) {
      setPausedByAuto((old) => {
        const clone = [...old];
        clone[index] = false;
        return clone;
      });
      setPlayCounts((old) => {
        const clone = [...old];
        clone[index] = 0;
        return clone;
      });
    }
    vid.currentTime = Number(val);
    vid.play().catch(() => {});
  };

  const toggleComments = () => setCommentsOpen((prev) => !prev);

  const handleNextVideo = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < videoUrls.length) {
        sectionRefs.current[newIndex]?.scrollIntoView({ behavior: "smooth" });
      }
      return newIndex < videoUrls.length ? newIndex : prevIndex;
    });
  };

  const handlePreviousVideo = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex >= 0) {
        sectionRefs.current[newIndex]?.scrollIntoView({ behavior: "smooth" });
      }
      return newIndex >= 0 ? newIndex : prevIndex;
    });
  };

  return (
    <div className="relative w-full h-screen flex bg-gray-50">
      <SocialMediaSideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />


      <SocialMediaSideBar />

      <div className="flex-1 flex flex-col">
        <div
          ref={containerRef}
          className="w-full flex-1 overflow-y-scroll"
          style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {videoUrls.map((url, idx) => (
            <section
              key={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className="w-full h-screen flex items-center justify-center md:py-[10px] rounded-t-xl"
              style={{ scrollSnapAlign: "start" }}
            >
              <VideoCard
                videoRef={(el) => (videoRefs.current[idx] = el)}
                videoUrl={url}
                isMuted={isMuted}
                loading={loadingVideos[idx]}
                duration={durations[idx]}
                currentTime={currentTimes[idx]}
                onLoadedData={() => handleVideoLoad(idx)}
                onWaiting={() => handleVideoBuffer(idx)}
                onLoadedMetadata={() => handleLoadedMetadata(idx)}
                onTimeUpdate={() => handleTimeUpdate(idx)}
                onVideoClick={() => handleVideoClick(idx)}
                onVideoEnd={() => handleVideoEnd(idx)}
                onScrub={(e) => handleScrub(idx, e.target.value)}
                onToggleMute={() => setIsMuted((m) => !m)}
                onToggleComments={toggleComments}
                showHamburger={true}
                onOpenDrawer={() => setDrawerOpen(true)}
                likesCount={mockStats[idx].likesCount}
                commentsCount={mockStats[idx].commentsCount}
                sharesCount={mockStats[idx].sharesCount}
              />
            </section>
          ))}
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:space-y-5 z-10 absolute right-5 top-1/2 transform -translate-y-1/2">
        {currentIndex > 0 && (
          <button
            className="w-20 h-20 p-3 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
            onClick={handlePreviousVideo}
          >
            <FaArrowUp size={35} />
          </button>
        )}

        {currentIndex < videoUrls.length - 1 && (
          <button
            className="w-20 h-20 p-3 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
            onClick={handleNextVideo}
          >
            <FaArrowDown size={35} />
          </button>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-white shadow-inner border-t border-gray-200 z-20">
        {menu.map((item) => (
          <button
            key={item.text}
            onClick={() => handleMenuClick(item.href)}
            className={`flex-1 flex flex-col items-center p-3 text-gray-600 transition ${
              activeLink === item.href ? "text-white font-bold bg-[#0ea288]" : ""
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs">{item.text}</span>
          </button>
        ))}
      </div>

      {/* Comments drawer (right side) */}
      {commentsOpen && (
        <div
          className="fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col w-[90%] md:w-[30%] z-30">
          <button
            className="text-black self-end m-3 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setCommentsOpen(false)}
          >
            ✕
          </button>
          <h2 className="text-xl font-bold p-4 border-b">Comments</h2>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-gray-700">
            <p>
              <strong>User123:</strong> Great video!
            </p>
            <p>
              <strong>PlumberGuy:</strong> Very informative.
            </p>
            <p>
              <strong>JaneDoe:</strong> Loved it! 🔥
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
