"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export interface BtnCreateRoomProps {}

export function BtnCreateRoom(props: BtnCreateRoomProps) {
  const router = useRouter();

  const goToRoom = () => {
    const roomId = generateRoomId();
    router.push(`/room/${roomId}`);
  };

  return (
    <Button variant="default" onClick={goToRoom}>
      Create Room
    </Button>
  );
}

function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}
