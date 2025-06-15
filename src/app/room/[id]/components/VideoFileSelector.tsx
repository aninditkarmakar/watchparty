"use client";

import { Input } from "@/components/ui/input";
import React from "react";

export type VideoFileSelectorProps = {
  videoUrlCallback: (url: string | null, type?: string) => void;
};

export function VideoFileSelector(props: VideoFileSelectorProps) {
  const { videoUrlCallback } = props;
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const onFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        videoUrlCallback(url, file.type);
      }
    },
    [videoUrlCallback]
  );

  return (
    <div>
      <Input type="file" accept="video/*" onChange={onFileChange}></Input>
    </div>
  );
}
