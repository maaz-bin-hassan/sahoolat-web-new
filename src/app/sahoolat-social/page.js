"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FaCompass,
  FaHome,
  FaPlus,
  FaUser,
  FaBars,
  FaArrowUp,
  FaArrowDown,
  FaHeart,
  FaRegComment,
  FaShare,
  FaEllipsisV,
} from "react-icons/fa";

import { useSwipeable } from "react-swipeable";

import SocialMediaSideDrawer from "../../components/ui/SocialMediaSideDrawer";
import SocialMediaSideBar from "../../components/ui/SocialMediaSideBar";
import { useRouter } from "next/navigation";
import VideoCard from "../../components/ui/VideoCard";



const menu = [
  { text: "Home", icon: FaHome, href: "#home" },
  { text: "Explore", icon: FaCompass, href: "/sahoolat-social/explore" },
  { text: "Upload", icon: FaPlus, href: "/sahoolat-social/upload" },
  { text: "Profile", icon: FaUser, href: "/sahoolat-social/profile" },
];


const videoUrls = [
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23plumber+%23work+wall+mixer+ka+fiting+kese+kare+%23bathroom+%23wallmixer+%23geyser.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%F0%9F%98%B1%F0%9F%94%A5Problem+solve+PPR+Green+Pipes+Fitting+System+%F0%9F%98%B1%F0%9F%92%A5.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%24750+in+2+mins+with+a+screwdriver__+%23plumbing+%23plumber+%23satisfying+%23draincleaning+%40KEENUtility.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Bathroom+plumbing+installation+process-+Good+tools+and+machinery+make+work+easy.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/PERFECT+PLUMBING+WORK+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/videoplayback.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Water+tank+connection+%23shorts+%23shortvideo+%23short+%23shortsfeed+%23trending+%23viralvideo+%23reels.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Helpful+construction+tips+you+should+learn+from+the+experience+carpenter+%23carpentry+%23wood+%23skills.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Home+Ceiling+Designer+POP+Bedroom+Amazing+%F0%9F%98%9C+Interior+Work++%23popdesign+%23house+%23designer+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/LALKA+Electric+Grass+Cutting+Machine+_+Lawn+Mower+_+%23grasscutting++%23shortvideo+%23short+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Pedicure+At+Home+%F0%9F%91%8CPamper+Routine+In+Pregnancy+%23shorts+%23ytshorts+%23youtubeshorts+%23beauty.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/To+See+How+2.5D+Design+Looks+%F0%9F%91%80.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/videoplayback.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Ye+kya+kr+diya+%F0%9F%98%82%F0%9F%A4%A3%23noorah_albalushiya+%23shortvideo+%23funny+%23shortvideo+%23comedy.mp4",
];

const mockStats = [
  { likesCount: "368.5K", commentsCount: "6427", sharesCount: "25K" },
  { likesCount: "120K", commentsCount: "542", sharesCount: "10K" },
  { likesCount: "1.2M", commentsCount: "3400", sharesCount: "5K" },
  { likesCount: "900K", commentsCount: "1300", sharesCount: "3K" },
  { likesCount: "368.5K", commentsCount: "6427", sharesCount: "25K" },
  { likesCount: "120K", commentsCount: "542", sharesCount: "10K" },
  { likesCount: "1.2M", commentsCount: "3400", sharesCount: "5K" },
  { likesCount: "900K", commentsCount: "1300", sharesCount: "3K" },
  { likesCount: "368.5K", commentsCount: "6427", sharesCount: "25K" },
  { likesCount: "120K", commentsCount: "542", sharesCount: "10K" },
  { likesCount: "1.2M", commentsCount: "3400", sharesCount: "5K" },
  { likesCount: "900K", commentsCount: "1300", sharesCount: "3K" },
  { likesCount: "368.5K", commentsCount: "6427", sharesCount: "25K" },
  { likesCount: "120K", commentsCount: "542", sharesCount: "10K" },
  { likesCount: "1.2M", commentsCount: "3400", sharesCount: "5K" },
  { likesCount: "900K", commentsCount: "1300", sharesCount: "3K" },
];


export default function SahoolatSocial() {
  const router = useRouter();


  const prevVideoRef = useRef(null);
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [loadingVideos, setLoadingVideos] = useState(
    new Array(videoUrls.length).fill(true)
  );
  const [durations, setDurations] = useState(
    new Array(videoUrls.length).fill(0)
  );
  const [currentTimes, setCurrentTimes] = useState(
    new Array(videoUrls.length).fill(0)
  );

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const wheelTimerRef = useRef(null);
  const wheelDeltaRef = useRef(0);

  useEffect(() => {
    const prefetchIndex = currentIndex + 2;
    if (prefetchIndex < videoUrls.length) {
      const video = document.createElement("video");
      video.src = videoUrls[prefetchIndex];
      video.preload = "auto";
    }
  }, [currentIndex]);

  const arrowDown = () => {
    if (currentIndex < videoUrls.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const arrowUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => arrowDown(),
    onSwipedDown: () => arrowUp(),
    trackTouch: true,
    trackMouse: true,
    delta: 10,
    preventScrollOnSwipe: true,
    rotationAngle: 0,
    axis: "y",
  });

  const WHEEL_THRESHOLD = 80;
  const WHEEL_DEBOUNCE = 150; // ms

  const handleWheel = (e) => {
    e.preventDefault();

    wheelDeltaRef.current += e.deltaY;

    if (wheelTimerRef.current) {
      clearTimeout(wheelTimerRef.current);
    }

    wheelTimerRef.current = setTimeout(() => {
      // Once user stops scrolling for 150ms, finalize the direction
      if (wheelDeltaRef.current > WHEEL_THRESHOLD) {
        arrowDown();
      } else if (wheelDeltaRef.current < -WHEEL_THRESHOLD) {
        arrowUp();
      }

      wheelDeltaRef.current = 0;
      wheelTimerRef.current = null;
    }, WHEEL_DEBOUNCE);
  };

  const handleMenuClick = (href) => {
    setActiveLink(href);
    router.push(href);
  };

  useEffect(() => {
    if (prevVideoRef.current) {
      prevVideoRef.current.muted = isMuted;
      prevVideoRef.current.pause();
    }
    if (currentVideoRef.current) {
      currentVideoRef.current.muted = isMuted;
      currentVideoRef.current.play().catch(() => {});
    }
    if (nextVideoRef.current) {
      nextVideoRef.current.muted = isMuted;
      nextVideoRef.current.pause();
    }
  }, [isMuted, currentIndex]);

  const handleVideoPlaying = (index) => {
    setLoadingVideos((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleVideoError = (index) => {
    setLoadingVideos((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleLoadedMetadata = (index, videoRef) => {
    if (videoRef.current) {
      setDurations((prev) => {
        const updated = [...prev];
        updated[index] = videoRef.current.duration || 0;
        return updated;
      });
    }
  };

  const handleTimeUpdate = (index, videoRef) => {
    if (videoRef.current) {
      setCurrentTimes((prev) => {
        const updated = [...prev];
        updated[index] = videoRef.current.currentTime;
        return updated;
      });
    }
  };

  const handleVideoEnd = (index, videoRef) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleVideoClick = (videoRef) => {
    if (videoRef.current) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
    }
  };

  const handleScrub = (index, videoRef, val) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(val);
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleComments = () => setCommentsOpen((prev) => !prev);

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex =
    currentIndex < videoUrls.length - 1 ? currentIndex + 1 : null;

  const visibleSlides = [prevIndex, currentIndex, nextIndex].filter(
    (idx) => idx !== null && idx >= 0 && idx < videoUrls.length
  );

  const getSlideStyle = (slideIdx) => {
    const offset = slideIdx - currentIndex; // -1, 0, +1
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition: "transform 0.4s ease-in-out",
      transform: `translateY(${offset * 100}%)`,
    };
  };

  return (
    <div className="w-screen h-screen flex bg-gray-50">
      {/* Mobile Drawer Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-full focus:outline-none text-black bg-transparent hover:bg-black/20 transition"
        >
          <FaBars size={24} />
        </button>
      </div>

      <SocialMediaSideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="hidden md:block fixed top-0 left-0 w-44 h-screen bg-white shadow-md">
        <SocialMediaSideBar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div
        className="flex-1 ml-0 md:ml-44 relative overflow-hidden"
        style={{ touchAction: "none" }}
        {...swipeHandlers}
        onWheel={handleWheel}
      >
        {visibleSlides.map((slideIdx) => {
          if (slideIdx >= mockStats.length) {
            return null;
          }

          return (
            <section
              key={slideIdx}
              style={getSlideStyle(slideIdx)}
              className="flex items-center justify-center"
            >
              <VideoCard
                videoRef={
                  slideIdx === prevIndex
                    ? prevVideoRef
                    : slideIdx === nextIndex
                      ? nextVideoRef
                      : currentVideoRef
                }
                videoUrl={videoUrls[slideIdx]}
                isMuted={isMuted}
                loading={loadingVideos[slideIdx]}
                duration={durations[slideIdx]}
                currentTime={currentTimes[slideIdx]}
                onPlaying={() => handleVideoPlaying(slideIdx)}
                onError={() => handleVideoError(slideIdx)}
                onLoadedMetadata={() =>
                  handleLoadedMetadata(
                    slideIdx,
                    slideIdx === prevIndex
                      ? prevVideoRef
                      : slideIdx === nextIndex
                        ? nextVideoRef
                        : currentVideoRef
                  )
                }
                onTimeUpdate={() =>
                  handleTimeUpdate(
                    slideIdx,
                    slideIdx === prevIndex
                      ? prevVideoRef
                      : slideIdx === nextIndex
                        ? nextVideoRef
                        : currentVideoRef
                  )
                }
                onVideoClick={() =>
                  handleVideoClick(
                    slideIdx === prevIndex
                      ? prevVideoRef
                      : slideIdx === nextIndex
                        ? nextVideoRef
                        : currentVideoRef
                  )
                }
                onVideoEnd={() =>
                  handleVideoEnd(
                    slideIdx,
                    slideIdx === prevIndex
                      ? prevVideoRef
                      : slideIdx === nextIndex
                        ? nextVideoRef
                        : currentVideoRef
                  )
                }
                onScrub={(e) =>
                  handleScrub(
                    slideIdx,
                    slideIdx === prevIndex
                      ? prevVideoRef
                      : slideIdx === nextIndex
                        ? nextVideoRef
                        : currentVideoRef,
                    e.target.value
                  )
                }
                onToggleMute={() => setIsMuted((m) => !m)}
                onToggleComments={toggleComments}
                showHamburger={false}
                onOpenDrawer={() => setDrawerOpen(true)}
                likesCount={mockStats[slideIdx].likesCount}
                commentsCount={mockStats[slideIdx].commentsCount}
                sharesCount={mockStats[slideIdx].sharesCount}
              />

              {/* Desktop Social Icons (only for the "current" slide) */}
              {slideIdx === currentIndex && (
                <div className="hidden md:flex flex-col items-center space-y-2 z-10 absolute right-[29%] top-[66%] transform -translate-y-1/2">
                  <button className="p-3 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition">
                    <FaHeart size={30} />
                  </button>
                  <span className="text-sm text-black pb-4">
                    {mockStats[slideIdx].likesCount}
                  </span>
                  <button
                    onClick={toggleComments}
                    className="p-3 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
                  >
                    <FaRegComment size={30} />
                  </button>
                  <span className="text-sm text-black pb-4">
                    {mockStats[slideIdx].commentsCount}
                  </span>
                  <button className="p-3 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition">
                    <FaShare size={30} />
                  </button>
                  <span className="text-sm text-black">
                    {mockStats[slideIdx].sharesCount}
                  </span>
                  <button className="p-3 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition">
                    <FaEllipsisV size={30} />
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Desktop Navigation Arrows (Up/Down) */}
      <div className="hidden md:flex md:flex-col md:space-y-5 z-10 absolute right-20 top-1/2 transform -translate-y-1/2">
        {/* Only show Up arrow if NOT on first video */}
        {currentIndex > 0 && (
          <button
            className="w-20 h-20 p-3 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
            onClick={arrowUp}
          >
            <FaArrowUp size={35} />
          </button>
        )}

        {/* Only show Down arrow if NOT on last video */}
        {currentIndex < videoUrls.length - 1 && (
          <button
            className="w-20 h-20 p-3 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300 transition"
            onClick={arrowDown}
          >
            <FaArrowDown size={35} />
          </button>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex md:hidden bg-white shadow-inner border-t border-gray-200 z-20">
        {menu.map((item) => (
          <button
            key={item.text}
            onClick={() => handleMenuClick(item.href)}
            className={`flex-1 flex flex-col items-center p-3 transition-all ${
              activeLink === item.href
                ? "text-white font-bold bg-[#0ea288]"
                : "text-gray-600"
            }`}
            style={{
              transform: "translateY(0)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <item.icon size={25} />
            <span className="text-xs">{item.text}</span>
          </button>
        ))}
      </div>

      {/* Comments Section */}
      {commentsOpen && (
        <div className="fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col w-[90%] md:w-[30%] z-30">
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
