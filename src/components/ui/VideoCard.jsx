"use client";

import React from "react";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

export default function VideoCard({
                                    videoRef,
                                    videoUrl,
                                    isMuted,
                                    loading,
                                    duration,
                                    currentTime,
                                    onVideoClick,
                                    onVideoEnd,
                                    onLoadedData,
                                    onWaiting,
                                    onLoadedMetadata,
                                    onTimeUpdate,
                                    onScrub,
                                    onToggleMute,
                                    onToggleComments,
                                    showHamburger,
                                    onOpenDrawer,
                                    likesCount,
                                    commentsCount,
                                    sharesCount,
                                  }) {
  return (
    <div className="relative w-full max-w-[450px] h-full bg-black overflow-hidden md:rounded-xl">
      {/* Hamburger Button (visible on mobile) */}
      {showHamburger && (
        <button
          onClick={onOpenDrawer}
          className="absolute top-2 left-2 p-2 text-white bg-black/50 hover:bg-black/70 z-10 md:hidden"
        >
          <div className="w-5 h-0.5 bg-current mb-1"></div>
          <div className="w-5 h-0.5 bg-current mb-1"></div>
          <div className="w-5 h-0.5 bg-current"></div>
        </button>
      )}

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="loader border-4 border-gray-300 border-t-transparent w-12 h-12 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        autoPlay
        muted={isMuted}
        onLoadedData={onLoadedData}
        onWaiting={onWaiting}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onClick={onVideoClick}
        onEnded={onVideoEnd}
      />

      {/* Right-side icons & counters (reduce gap via space-y-2) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2 text-white text-2xl z-10">
        {/* Like */}
        <button className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
          <FaHeart />
        </button>
        <span className="text-sm">{likesCount}</span>

        {/* Comment */}
        <button
          onClick={onToggleComments}
          className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition"
        >
          <FaRegComment />
        </button>
        <span className="text-sm">{commentsCount}</span>

        {/* Share */}
        <button className="p-3 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition">
          <FaShare />
        </button>
        <span className="text-sm">{sharesCount}</span>
      </div>

      {/* Mute/Unmute Button (bottom-left) */}
      <div className="absolute bottom-4 left-4 text-white text-2xl z-10">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition"
        >
          {isMuted ? <BiVolumeMute /> : <BiVolumeFull />}
        </button>
      </div>

      {/* Progress Bar (bottom) */}
      <div className="absolute bottom-3 left-[60px] right-2 flex items-center z-10">
        <input
          type="range"
          className="w-full h-1.5 text-textColor transition-all duration-300 cursor-pointer"
          min={0}
          step={0.1}
          max={duration || 0}
          value={currentTime || 0}
          onInput={onScrub}
        />
      </div>
    </div>
  );
}
