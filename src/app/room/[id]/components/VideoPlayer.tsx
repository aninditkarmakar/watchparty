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
  onPlay?: (opts?: { triggeredBySeek?: boolean }) => void;
  onPause?: (opts?: { triggeredBySeek?: boolean }) => void;
  onSeek?: (time: number) => void;
};

export const VideoPlayer = React.forwardRef<
  VideoPlayerHandle,
  VideoPlayerProps
>((props, ref) => {
  const { videoUrl, videoType, onPlay, onPause, onSeek } = props;
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<ReturnType<typeof videojs>>(null);
  const seekingRef = React.useRef(false);

  React.useImperativeHandle(ref, () => ({
    play: () => {
      playerRef.current?.play();
    },
    pause: () => {
      playerRef.current?.pause();
    },
    seekForward: (seconds: number) => {
      if (playerRef.current) {
        seekingRef.current = true;
        playerRef.current.currentTime(
          playerRef.current.currentTime() + seconds
        );
      }
    },
    seekBackward: (seconds: number) => {
      if (playerRef.current) {
        seekingRef.current = true;
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
          if (seekingRef.current) {
            onPlay({ triggeredBySeek: true });
            seekingRef.current = false;
          } else {
            onPlay();
          }
        });
      }
      if (onPause) {
        playerRef.current.on("pause", () => {
          if (seekingRef.current) {
            onPause({ triggeredBySeek: true });
          } else {
            onPause();
          }
        });
      }
      if (onSeek) {
        playerRef.current.on("seeking", () => {
          seekingRef.current = true;
        });
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
