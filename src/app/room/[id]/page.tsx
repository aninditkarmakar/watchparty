import React from "react";
import { VideoArea } from "./components/VideoArea";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-full w-full">
      <p>{`Room name: ${id}`}</p>

      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <VideoArea />
    </div>
  );
}
