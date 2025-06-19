"use client";
import React from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";

export type VideoPlayerHandle = {
  play: () => void;
  pause: () => void;
  seekForward: (seconds: number) => void;
  seekBackward: (seconds: number) => void;
};

export type VideoPlayerProps = {
  videoUrl: string;
  videoType: string;
};

export const VideoPlayer = React.forwardRef<
  VideoPlayerHandle,
  VideoPlayerProps
>((props, ref) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<ReturnType<typeof videojs>>(null);

  React.useImperativeHandle(ref, () => ({
    play: () => {
      playerRef.current?.play();
    },
    pause: () => {
      playerRef.current?.pause();
    },
    seekForward: (seconds: number) => {
      if (playerRef.current) {
        playerRef.current.currentTime(
          playerRef.current.currentTime() + seconds
        );
      }
    },
    seekBackward: (seconds: number) => {
      if (playerRef.current) {
        playerRef.current.currentTime(
          playerRef.current.currentTime() - seconds
        );
      }
    },
  }));

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
});

VideoPlayer.displayName = "VideoPlayer";
