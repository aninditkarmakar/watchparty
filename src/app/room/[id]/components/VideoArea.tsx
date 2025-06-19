"use client";

import React from "react";
import { VideoFileSelector } from "./VideoFileSelector";
import { VideoPlayer, VideoPlayerHandle } from "./VideoPlayer";
import { Button } from "@/components/ui/button";

export function VideoArea() {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [videoType, setVideoType] = React.useState<string | null>(null);

  const playerRef = React.useRef<VideoPlayerHandle>(null);

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
        <>
          <div
            id="videoPlayerContainer"
            className="max-h-screen bg-amber-200 flex items-center justify-center overflow-hidden"
          >
            <VideoPlayer
              ref={playerRef}
              videoUrl={videoUrl}
              videoType={videoType}
            />
          </div>
          <div id="videoControls" className="flex justify-center mt-4">
            <Button onClick={() => playerRef.current?.play()} className="mr-2">
              Play
            </Button>
            <Button onClick={() => playerRef.current?.pause()} className="mr-2">
              Pause
            </Button>
            <Button
              onClick={() => playerRef.current?.seekForward(10)}
              className="mr-2"
            >
              Forward 10s
            </Button>
            <Button
              onClick={() => playerRef.current?.seekBackward(10)}
              className="mr-2"
            >
              Backward 10s
            </Button>
          </div>
        </>
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}
