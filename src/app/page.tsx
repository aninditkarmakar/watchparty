import { Button } from "@/components/ui/button";
import "./global.css";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>WATCH PARTY!</p>
      <Link href="/room/1234">
        <Button variant="default">Create Room</Button>
      </Link>
    </div>
  );
}
