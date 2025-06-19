"use client";
import React from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import { createDebouncedEventQueue } from "../utils";

const DEBOUNCE_PERIOD = 500; // milliseconds

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

      const { queueEvent, flush } = createDebouncedEventQueue<
        "play" | "pause" | "seeked",
        number
      >(DEBOUNCE_PERIOD, (events) => {
        if (events.findIndex((evt) => evt.type === "seeked") !== -1) {
          onSeek(playerRef.current!.currentTime());
          return;
        }

        for (const evt of events) {
          if (evt.type === "play" && onPlay)
            onPlay(playerRef.current!.currentTime());
          if (evt.type === "pause" && onPause)
            onPause(playerRef.current!.currentTime());
        }
      });

      // Add event listeners
      if (onPlay) {
        playerRef.current.on("play", () => {
          if (!programmaticEventRef.current) {
            queueEvent("play", playerRef.current!.currentTime());
          }

          programmaticEventRef.current = false; // Reset after handling
        });
      }
      if (onPause) {
        playerRef.current.on("pause", () => {
          if (!programmaticEventRef.current) {
            queueEvent("pause", playerRef.current!.currentTime());
          }

          programmaticEventRef.current = false; // Reset after handling
        });
      }
      if (onSeek) {
        playerRef.current.on("seeked", () => {
          if (!programmaticEventRef.current) {
            queueEvent("seeked", playerRef.current!.currentTime());
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
