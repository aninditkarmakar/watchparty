import React from "react";
import { VideoArea } from "./components/VideoArea";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-full w-full">
      <p>{`Room name: ${id}`}</p>
      <VideoArea />
    </div>
  );
}
