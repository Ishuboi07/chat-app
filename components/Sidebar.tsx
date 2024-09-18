import { Bot, MessageSquare, Video } from "lucide-react";
import Link from "next/link";
import React from "react";
import CreateChannel from "./CreateChannel";
import { UserButton } from "@clerk/nextjs";

export default function Sidebar({
  onCreateChannel,
}: {
  onCreateChannel: (channelName: string, users: string[]) => void;
}) {
  return (
    <div className="w-[80px] bg-gray-800 p-4 text-white flex flex-col items-center gap-6">
      {/* <p className="mb-4">Menu</p> */}
      <p className="font-bold text-center bg-blue-700 p-4 rounded-md flex flex-col items-center gap-2">
        <MessageSquare />
        <p>Chat</p>
      </p>
      <Link
        href={process.env.NEXT_PUBLIC_YOOM_URL!}
        className="mb-4 text-white font-bold hover:text-gray-300 text-center flex flex-col items-center gap-2"
      >
        <Video />
        <p>Meet</p>
      </Link>
      <Link
        href="/bot"
        className="mb-4 text-white font-bold hover:text-gray-300 text-center flex flex-col items-center gap-2"
      >
        <Bot />
        <p>Bot</p>
      </Link>
      {/* <p>Other links</p> */}
      <CreateChannel
        onCreateChannel={onCreateChannel} // Pass the function
      />
      <UserButton />
    </div>
  );
}
