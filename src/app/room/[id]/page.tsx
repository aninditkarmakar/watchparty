import React from "react";
import { VideoFileSelector } from "./components/VideoFileSelector";
import { VideoArea } from "./components/VideoArea";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <p>{`Room name: ${id}`}</p>
      <VideoArea />
    </div>
  );
}
