"use client";
import { useState } from "react";

import "./global.css";

export default function Page() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  return (
    <div>
      <h1 className="underline">Welcome to WatchParty!</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ margin: "20px 0" }}
        className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500"
      />
      {videoSrc && (
        <video
          controls
          src={videoSrc}
          style={{ width: "100%", maxHeight: "500px" }}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
