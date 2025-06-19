"use client";

import React from "react";
import { VideoFileSelector } from "./VideoFileSelector";
import { VideoPlayer } from "./VideoPlayer";

export function VideoArea() {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [videoType, setVideoType] = React.useState<string | null>(null);

  const onVideoSelected = (url: string | null, type?: string) => {
    if (url) {
      setVideoUrl(url);
      setVideoType(type || "video/mp4");
    } else {
      console.log("No video selected");
    }
  };

  return (
    <div className="w-full h-full">
      <VideoFileSelector videoUrlCallback={onVideoSelected} />
      {videoUrl ? (
        <div
          id="videoPlayerContainer"
          className="max-h-screen bg-amber-200 flex items-center justify-center overflow-hidden"
        >
          <VideoPlayer videoUrl={videoUrl} videoType={videoType} />
        </div>
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}
