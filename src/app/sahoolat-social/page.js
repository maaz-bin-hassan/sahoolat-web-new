"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCompass, FaHome, FaPlus, FaUser } from "react-icons/fa";
import SocialMediaSideDrawer from "../../components/ui/SocialMediaSideDrawer";  // Adjust path if needed
import VideoCard from "../../components/ui/VideoCard";                // Adjust path if needed
import Image from "next/image";
import Link from "next/link";

// Example navigation menu
const menu = [
  { text: "Home", icon: FaHome, href: "#home" },
  { text: "Explore", icon: FaCompass, href: "#explore" },
  { text: "Upload", icon: FaPlus, href: "#upload" },
  { text: "Profile", icon: FaUser, href: "#profile" },
];

// Example video URLs
const videoUrls = [
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23plumber+%23work+wall+mixer+ka+fiting+kese+kare+%23bathroom+%23wallmixer+%23geyser.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%F0%9F%98%B1%F0%9F%94%A5Problem+solve+PPR+Green+Pipes+Fitting+System+%F0%9F%98%B1%F0%9F%92%A5.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%24750+in+2+mins+with+a+screwdriver__+%23plumbing+%23plumber+%23satisfying+%23draincleaning+%40KEENUtility.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Bathroom+plumbing+installation+process-+Good+tools+and+machinery+make+work+easy.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/PERFECT+PLUMBING+WORK+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/videoplayback.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Water+tank+connection+%23shorts+%23shortvideo+%23short+%23shortsfeed+%23trending+%23viralvideo+%23reels.mp4",
  // home handy workers:
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Helpful+construction+tips+you+should+learn+from+the+experience+carpenter+%23carpentry+%23wood+%23skills.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Home+Ceiling+Designer+POP+Bedroom+Amazing+%F0%9F%98%9C+Interior+Work++%23popdesign+%23house+%23designer+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/LALKA+Electric+Grass+Cutting+Machine+_+Lawn+Mower+_+%23grasscutting++%23shortvideo+%23short+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Pedicure+At+Home+%F0%9F%91%8CPamper+Routine+In+Pregnancy+%23shorts+%23ytshorts+%23youtubeshorts+%23beauty.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/To+See+How+2.5D+Design+Looks+%F0%9F%91%80.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/videoplayback.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Ye+kya+kr+diya+%F0%9F%98%82%F0%9F%A4%A3%23noorah_albalushiya+%23shortvideo+%23funny+%23shortvideo+%23comedy.mp4",
];


export default function SahoolatSocial() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]); // array of refs

  const [isMuted, setIsMuted] = useState(true);
  const [playCounts, setPlayCounts] = useState(
    new Array(videoUrls.length).fill(0)
  );
  const [pausedByAuto, setPausedByAuto] = useState(
    new Array(videoUrls.length).fill(false)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Loading states per video
  const [loadingVideos, setLoadingVideos] = useState(
    new Array(videoUrls.length).fill(true)
  );

  // Duration & currentTime arrays
  const [durations, setDurations] = useState(
    new Array(videoUrls.length).fill(0)
  );
  const [currentTimes, setCurrentTimes] = useState(
    new Array(videoUrls.length).fill(0)
  );

  // Drawer & comments
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Active nav link
  const [activeLink, setActiveLink] = useState("#home");
  const handleMenuClick = (link) => setActiveLink(link);

  // Intersection Observer for auto-play/pause
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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
        // replay on first end
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else if (updated[index] >= 2) {
        // auto-pause on second end
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
      // reset if auto-paused
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

  return (
    <div className="relative w-full h-screen flex bg-gray-50">
      <SocialMediaSideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="hidden md:flex md:w-60 md:h-screen md:bg-white md:shadow-xl md:flex-col md:py-6 md:fixed md:left-0">
        <Link href={"/"}>
          <div className="flex items-center justify-center mb-10">
            <Image
              height={100}
              width={100}
              src="/assets/logo.png"
              alt="Sahoolat AI Logo"
            />
          </div>
        </Link>
        <nav className="flex flex-col space-y-1 px-4">
          {menu.map((item) => (
            <button
              key={item.text}
              onClick={() => handleMenuClick(item.href)}
              className={`flex items-center p-3 text-gray-600 transition ${
                activeLink === item.href
                  ? "text-white font-bold bg-[#0ea288] rounded-lg shadow-md"
                  : ""
              }`}
            >
              <item.icon size={24} className="mr-3" />
              <span className="text-lg">{item.text}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <div
          ref={containerRef}
          className="w-full flex-1 overflow-y-scroll"
          style={{
            scrollSnapType: "y mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {videoUrls.map((url, idx) => (
            <section
              key={idx}
              className="w-full h-screen flex items-center justify-center"
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
              />
            </section>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-white shadow-inner border-t border-gray-200">
        {menu.map((item) => (
          <button
            key={item.text}
            onClick={() => handleMenuClick(item.href)}
            className={`flex-1 flex flex-col items-center p-3 text-gray-600 transition ${
              activeLink === item.href
                ? "text-white font-bold bg-[#0ea288]"
                : ""
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs">{item.text}</span>
          </button>
        ))}
      </div>

      {commentsOpen && (
        <div className="fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col w-[90%] md:w-[30%]">
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
