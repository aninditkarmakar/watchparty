"use client";
import React from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";

export type VideoPlayerProps = {
  videoUrl: string;
  videoType: string;
};

export function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<ReturnType<typeof videojs>>(null);

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-fluid");
      videoElement.classList.add("h-full");
      videoElement.classList.add("w-full");
      videoRef.current?.appendChild(videoElement);

      playerRef.current = videojs(videoElement, {
        controls: true,
        sources: [
          {
            src: props.videoUrl,
            type: props.videoType,
          },
        ],
      });
    }
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [props.videoType, props.videoUrl]);

  return (
    <div data-vjs-player className="w-full h-full bg-blue-300">
      <div ref={videoRef} />
    </div>
  );
}
