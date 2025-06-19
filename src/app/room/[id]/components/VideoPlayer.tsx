"use client";
import React from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";

export type VideoPlayerHandle = {
  play: (time?: number) => void;
  pause: (time?: number) => void;
  seekForward: (seconds: number) => void;
  seekBackward: (seconds: number) => void;
  seekTo: (time: number) => void;
};

export type VideoPlayerProps = {
  videoUrl: string;
  videoType: string;
  onPlay?: (time: number) => void;
  onPause?: (time: number) => void;
  onSeek?: (time: number) => void;
};

export const VideoPlayer = React.forwardRef<
  VideoPlayerHandle,
  VideoPlayerProps
>((props, ref) => {
  const { videoUrl, videoType, onPlay, onPause, onSeek } = props;
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<ReturnType<typeof videojs>>(null);
  const programmaticEventRef = React.useRef(false);

  React.useImperativeHandle(ref, () => ({
    play: (time?: number) => {
      programmaticEventRef.current = true;

      if (time) {
        playerRef.current.currentTime(time);
      }

      playerRef.current?.play();
    },
    pause: (time?: number) => {
      programmaticEventRef.current = true;

      if (time) {
        playerRef.current.currentTime(time);
      }

      playerRef.current?.pause();
    },
    seekForward: (seconds: number) => {
      if (playerRef.current) {
        programmaticEventRef.current = true;
        playerRef.current.currentTime(
          playerRef.current.currentTime() + seconds
        );
      }
    },
    seekBackward: (seconds: number) => {
      if (playerRef.current) {
        programmaticEventRef.current = true;
        playerRef.current.currentTime(
          playerRef.current.currentTime() - seconds
        );
      }
    },
    seekTo: (time: number) => {
      if (playerRef.current) {
        programmaticEventRef.current = true;
        playerRef.current.currentTime(time);
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
          console.log("play");
          if (!programmaticEventRef.current) {
            onPlay(playerRef.current!.currentTime());
          }

          programmaticEventRef.current = false; // Reset after handling
        });
      }
      if (onPause) {
        playerRef.current.on("pause", () => {
          console.log("pause");
          if (!programmaticEventRef.current) {
            onPause(playerRef.current!.currentTime());
          }

          programmaticEventRef.current = false; // Reset after handling
        });
      }
      if (onSeek) {
        playerRef.current.on("seeked", () => {
          console.log("seeked");

          if (!programmaticEventRef.current) {
            onSeek(playerRef.current!.currentTime());
          }

          programmaticEventRef.current = false; // Reset after handling
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
