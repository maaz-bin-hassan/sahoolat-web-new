"use client";
import React, {useEffect, useRef, useState} from "react";
import {FaCog, FaCompass, FaHeart, FaHome, FaPlus, FaRegComment, FaShare, FaUser} from "react-icons/fa";
import {BiVolumeFull, BiVolumeMute} from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";


function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

const videoUrls = [
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23plumber+%23work+wall+mixer+ka+fiting+kese+kare+%23bathroom+%23wallmixer+%23geyser.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%F0%9F%98%B1%F0%9F%94%A5Problem+solve+PPR+Green+Pipes+Fitting+System+%F0%9F%98%B1%F0%9F%92%A5.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%24750+in+2+mins+with+a+screwdriver__+%23plumbing+%23plumber+%23satisfying+%23draincleaning+%40KEENUtility.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Bathroom+plumbing+installation+process-+Good+tools+and+machinery+make+work+easy.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/PERFECT+PLUMBING+WORK+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/videoplayback.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/Water+tank+connection+%23shorts+%23shortvideo+%23short+%23shortsfeed+%23trending+%23viralvideo+%23reels.mp4",
//     home handy workers:
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Helpful+construction+tips+you+should+learn+from+the+experience+carpenter+%23carpentry+%23wood+%23skills.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Home+Ceiling+Designer+POP+Bedroom+Amazing+%F0%9F%98%9C+Interior+Work++%23popdesign+%23house+%23designer+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/LALKA+Electric+Grass+Cutting+Machine+_+Lawn+Mower+_+%23grasscutting++%23shortvideo+%23short+%23shorts.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/%23construction+%23plumber+%23plumbing+%23like+%23subscribe+%23shorts+%23video+%23electrical+%23mistri+%23pipes+%23yt.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Pedicure+At+Home+%F0%9F%91%8CPamper+Routine+In+Pregnancy+%23shorts+%23ytshorts+%23youtubeshorts+%23beauty.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/To+See+How+2.5D+Design+Looks+%F0%9F%91%80.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/videoplayback.mp4",
  "https://lyudo-images.s3.eu-north-1.amazonaws.com/videos/home+cares/Ye+kya+kr+diya+%F0%9F%98%82%F0%9F%A4%A3%23noorah_albalushiya+%23shortvideo+%23funny+%23shortvideo+%23comedy.mp4"
];

export default function SahoolatSocial() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // For toggling audio, we won't rely on muted={muted}. We'll do manual DOM manipulation.
  const [isMuted, setIsMuted] = useState(true);

  // For 2-loop logic
  const [playCounts, setPlayCounts] = useState(
    new Array(videoUrls.length).fill(0)
  );
  const [pausedByAuto, setPausedByAuto] = useState(
    new Array(videoUrls.length).fill(false)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // Loader
  const [loadingVideos, setLoadingVideos] = useState(
    new Array(videoUrls.length).fill(true)
  );

  // Durations & currentTimes => progress bar
  const [durations, setDurations] = useState(
    new Array(videoUrls.length).fill(0)
  );
  const [currentTimes, setCurrentTimes] = useState(
    new Array(videoUrls.length).fill(0)
  );

  // Comments
  const [commentsOpen, setCommentsOpen] = useState(false);

  // ----------------------------------------
  // HELPER: Update actual video muted property
  // whenever `isMuted` changes
  // ----------------------------------------
  useEffect(() => {
    // Only update the currently visible video or all videos as you prefer
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.muted = isMuted;
      }
    });
  }, [isMuted]);

  // ----------------------------------------
  // IntersectionObserver => auto-play
  // ----------------------------------------
  useEffect(() => {
    const options = {root: containerRef.current, threshold: 0.7};
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const idx = videoRefs.current.indexOf(video);

        if (entry.isIntersecting) {
          if (!pausedByAuto[idx]) {
            video.play().catch(() => {
            });
            setCurrentIndex(idx);
          }
        } else {
          video.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [pausedByAuto]);

  // ----------------------------------------
  // VIDEO EVENT HANDLERS
  // ----------------------------------------
  const handleVideoLoad = (i) => {
    setLoadingVideos((prev) => {
      const clone = [...prev];
      clone[i] = false;
      return clone;
    });
  };

  const handleVideoBuffer = (i) => {
    setLoadingVideos((prev) => {
      const clone = [...prev];
      clone[i] = true;
      return clone;
    });
  };

  const handleLoadedMetadata = (i) => {
    const vid = videoRefs.current[i];
    if (!vid) return;
    setDurations((prev) => {
      const clone = [...prev];
      clone[i] = vid.duration || 0;
      return clone;
    });
  };

  const handleTimeUpdate = (i) => {
    const vid = videoRefs.current[i];
    if (!vid) return;
    setCurrentTimes((prev) => {
      const clone = [...prev];
      clone[i] = vid.currentTime;
      return clone;
    });
  };

  const handleVideoEnd = (i) => {
    setPlayCounts((prev) => {
      const updated = [...prev];
      updated[i] += 1;

      // First end => replay
      if (updated[i] === 1) {
        const vid = videoRefs.current[i];
        vid.currentTime = 0;
        vid.play().catch(() => {
        });
      }
      // Second end => auto pause
      else if (updated[i] >= 2) {
        const vid = videoRefs.current[i];
        vid.pause();

        setPausedByAuto((old) => {
          const clone = [...old];
          clone[i] = true;
          return clone;
        });
      }
      return updated;
    });
  };

  // If video was auto-paused => user override
  const handleVideoClick = (i) => {
    const vid = videoRefs.current[i];
    if (!vid) return;

    if (pausedByAuto[i]) {
      // reset auto-pause
      setPausedByAuto((old) => {
        const clone = [...old];
        clone[i] = false;
        return clone;
      });
      // reset playCounts => can watch 2 loops again
      setPlayCounts((old) => {
        const clone = [...old];
        clone[i] = 0;
        return clone;
      });
    }
    vid.paused ? vid.play() : vid.pause();
  };

  // PROGRESS BAR => real-time scrub
  const handleScrub = (i, val) => {
    const vid = videoRefs.current[i];
    if (!vid) return;

    if (pausedByAuto[i]) {
      // override auto-pause
      setPausedByAuto((old) => {
        const clone = [...old];
        clone[i] = false;
        return clone;
      });
      setPlayCounts((old) => {
        const clone = [...old];
        clone[i] = 0;
        return clone;
      });
    }
    vid.currentTime = Number(val);
    vid.play().catch(() => {
    });
  };

  const toggleComments = () => setCommentsOpen((x) => !x);

  // ----------------------------------------
  // RENDER
  // ----------------------------------------
  return (
    <div className="relative w-full h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <div className="w-48 h-screen bg-white shadow-xl flex flex-col py-6 fixed left-0">
        <Link href={"/"}>
          <div className="flex items-center justify-center mb-10">
            <Image
              height={200}
              width={200}
              src="/assets/logo.png"
              alt="Sahoolat AI Logo"
            />
          </div>
        </Link>
        <nav className="flex flex-col space-y-6 px-4">
          <button className="flex items-center text-gray-600 hover:text-black transition">
            <FaHome size={24} className="mr-3"/>
            <span className="text-lg">Home</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-black transition">
            <FaCompass size={24} className="mr-3"/>
            <span className="text-lg">Explore</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-black transition">
            <FaPlus size={24} className="mr-3"/>
            <span className="text-lg">Upload</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-black transition">
            <FaUser size={24} className="mr-3"/>
            <span className="text-lg">Profile</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-black transition mt-auto">
            <FaCog size={24} className="mr-3"/>
            <span className="text-lg">Settings</span>
          </button>
        </nav>
      </div>

      {/* MAIN VIDEO SECTION */}
      <div className="flex-1 flex justify-center items-center ml-48">
        <div
          ref={containerRef}
          className="w-full h-screen overflow-y-scroll"
          style={{
            scrollSnapType: "y mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {videoUrls.map((url, idx) => (
            <section
              key={idx}
              className="w-full h-screen flex items-center justify-center"
              style={{scrollSnapAlign: "start"}}
            >
              <div
                className="relative w-full max-w-[600px] aspect-[10/16] rounded-xl overflow-hidden shadow-lg bg-black">
                {/* Loader */}
                {loadingVideos[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                      className="loader border-4 border-gray-300 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
                  </div>
                )}

                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={url}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  playsInline
                  // No muted={isMuted} here => we do it manually in useEffect
                  onLoadedData={() => handleVideoLoad(idx)}
                  onWaiting={() => handleVideoBuffer(idx)}
                  onLoadedMetadata={() => handleLoadedMetadata(idx)}
                  onTimeUpdate={() => handleTimeUpdate(idx)}
                  onEnded={() => handleVideoEnd(idx)}
                  onClick={() => handleVideoClick(idx)}
                />

                {/* Right Side Icons */}
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 text-white text-2xl">
                  <button className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                    <FaHeart/>
                  </button>
                  <button
                    onClick={toggleComments}
                    className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition"
                  >
                    <FaRegComment/>
                  </button>
                  <button className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
                    <FaShare/>
                  </button>
                </div>

                {/* Mute/Unmute */}
                <div className="absolute bottom-4 left-4 text-white text-2xl">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition"
                  >
                    {isMuted ? <BiVolumeMute/> : <BiVolumeFull/>}
                  </button>
                </div>

                {/* PROGRESS BAR & TIME */}
                <div className="absolute bottom-3 left-[60px] right-2 flex items-center">
                  <input
                    type="range"
                    className="w-full h-1.5 text-textColor"
                    min={0}
                    step={0.1}
                    max={durations[idx] || 0}
                    value={currentTimes[idx] || 0}
                    onInput={(e) => handleScrub(idx, e.target.value)}
                  />
                  <span className="text-white text-sm ml-2">
                    {formatTime(currentTimes[idx])} / {formatTime(durations[idx])}
                  </span>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Comments Panel */}
      {commentsOpen && (
        <div
          className="fixed top-0 right-0 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col transform transition-transform w-[30%]">
          <button
            className="text-black self-end m-3 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => setCommentsOpen(false)}
          >
            ✕
          </button>
          <h2 className="text-xl font-bold p-4 border-b">Comments</h2>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-gray-700">
              <strong>User123:</strong> Great video!
            </p>
            <p className="text-gray-700">
              <strong>PlumberGuy:</strong> Very informative.
            </p>
            <p className="text-gray-700">
              <strong>JaneDoe:</strong> Loved it! 🔥
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
