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

  return <div ref={videoRef} />;
}
