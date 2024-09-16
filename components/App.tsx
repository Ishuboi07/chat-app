"use client";
// import Image from "next/image";
import { useCallback } from "react";
import { ChannelOptions, ChannelSort } from "stream-chat";
import { EmojiPicker } from "stream-chat-react/emojis";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  //   ChannelPreviewProps,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  MessageStatus,
  MessageStatusProps,
  Thread,
  TooltipUsernameMapper,
  useCreateChatClient,
  //   useMessageContext,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

import { SearchIndex } from "emoji-mart";
import { MessageSquare, Mic, Video } from "lucide-react";
import Link from "next/link";
// init({ data: SearchIndex });
export default function App({
  apiKey,
  createToken,
  userId,
  userName,
}: {
  apiKey: string;
  createToken: (userId: string) => Promise<string>;
  userId: string;
  userName: string;
}) {
  const tokenProvider = useCallback(
    async () => await createToken(userId),
    [createToken, userId]
  );
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: tokenProvider,
    userData: {
      id: userId,
      name: userName,
      image: `https://getstream.io/random_svg/?name=${userName}`,
    },
  });
  const CustomMessageStatus = (props: MessageStatusProps) => {
    const allCapsUserName = useCallback<TooltipUsernameMapper>(
      (user) => (user.name || user.id).toUpperCase(),
      []
    );
    return <MessageStatus {...props} tooltipUserNameMapper={allCapsUserName} />;
  };
  const sort: ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 };
  const filters = { type: "messaging", members: { $in: [userId] } };
  const options: ChannelOptions = { limit: 10, state: true, watch: true };

  if (!client) {
    return <div>Loading...</div>;
  }
  return (
    <Chat client={client}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-[80px] bg-gray-800 p-4 text-white flex flex-col items-center gap-6">
          {/* <p className="mb-4">Menu</p> */}
          <p className="font-bold text-center bg-blue-700 p-4 rounded-md flex flex-col items-center gap-2">
            <MessageSquare />
            <p>Chat</p>
          </p>
          <Link
            href="https://zoom-clone-wheat.vercel.app/sign-in?redirect_url=https%3A%2F%2Fzoom-clone-wheat.vercel.app%2F"
            className="mb-4 text-white font-bold hover:text-gray-300 text-center flex flex-col items-center gap-2"
          >
            <Video />
            <p>Meet</p>
          </Link>
          {/* <p>Other links</p> */}
        </div>

        {/* Channel List */}
        <div className="flex-grow">
          <ChannelList sort={sort} filters={filters} options={options} />
          <Channel
            EmojiPicker={EmojiPicker}
            emojiSearchIndex={SearchIndex}
            AudioRecorder={Mic}
            MessageStatus={CustomMessageStatus}
          >
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput audioRecordingEnabled />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
}
