"use client";

import React from "react";
import { VideoFileSelector } from "./VideoFileSelector";
import { VideoPlayer, VideoPlayerHandle } from "./VideoPlayer";
import { Button } from "@/components/ui/button";

export function VideoArea() {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [videoType, setVideoType] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<string[]>([]);

  const playerRef = React.useRef<VideoPlayerHandle>(null);

  const onVideoSelected = (url: string | null, type?: string) => {
    if (url) {
      setVideoUrl(url);
      setVideoType(type || "video/mp4");
      setLogs([]); // Clear logs when new video is selected
    } else {
      console.log("No video selected");
    }
  };

  // Event handlers for logging
  const handlePlay = React.useCallback((time: number) => {
    setLogs((prev) => [
      `Play at ${time.toFixed(2)}s (${new Date().toLocaleTimeString()})`,
      ...prev,
    ]);
  }, []);

  const handlePause = React.useCallback((time: number) => {
    setLogs((prev) => [
      `Paused at ${time.toFixed(2)}s (${new Date().toLocaleTimeString()})`,
      ...prev,
    ]);
  }, []);

  const handleSeek = React.useCallback((time: number) => {
    setLogs((prev) => [
      `Seeked to ${time.toFixed(2)}s (${new Date().toLocaleTimeString()})`,
      ...prev,
    ]);
  }, []);

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
              onPlay={handlePlay}
              onPause={handlePause}
              onSeek={handleSeek}
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
            <Button
              onClick={() => setLogs([])}
              variant="secondary"
              className="ml-4"
            >
              Clear Logs
            </Button>
          </div>
          <div id="videoPlaybackLogs" className="mt-4 p-4 bg-gray-100 rounded">
            {logs.length === 0 ? (
              <span className="text-gray-500">No playback events yet.</span>
            ) : (
              <ul className="list-disc pl-5">
                {logs.map((log, idx) => (
                  <li key={idx}>{log}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}
