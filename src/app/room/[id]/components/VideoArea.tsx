"use client";

import React from "react";
import { VideoFileSelector } from "./VideoFileSelector";

export type VideoAreaProps = {};

export function VideoArea(props: VideoAreaProps) {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);

  const onVideoSelected = (url: string | null) => {
    if (url) {
      setVideoUrl(url);
    } else {
      console.log("No video selected");
    }
  };

  return (
    <div>
      <VideoFileSelector videoUrlCallback={onVideoSelected} />
      <p>{videoUrl}</p>
    </div>
  );
}
