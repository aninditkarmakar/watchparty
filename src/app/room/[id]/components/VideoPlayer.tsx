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
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (time: number) => void;
};

export const VideoPlayer = React.forwardRef<
  VideoPlayerHandle,
  VideoPlayerProps
>((props, ref) => {
  const { videoUrl, videoType, onPlay, onPause, onSeek } = props;
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
            src: videoUrl,
            type: videoType,
          },
        ],
      });
      // Add event listeners
      if (onPlay) {
        playerRef.current.on("play", () => {
          onPlay();
        });
      }
      if (onPause) {
        playerRef.current.on("pause", () => {
          onPause();
        });
      }
      if (onSeek) {
        playerRef.current.on("seeked", () => {
          onSeek(playerRef.current!.currentTime());
        });
      }
    }
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoType, videoUrl, onPlay, onPause, onSeek]);

  return <div ref={videoRef} />;
});

VideoPlayer.displayName = "VideoPlayer";
