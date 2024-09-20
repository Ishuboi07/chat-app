"use client";

import { useCallback } from "react";
import { ChannelOptions, ChannelSort } from "stream-chat";
import { EmojiPicker } from "stream-chat-react/emojis";
import {
  Channel,
  ChannelList,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  MessageStatus,
  MessageStatusProps,
  Thread,
  TooltipUsernameMapper,
  useCreateChatClient,
  ChannelHeader,
  Window,
  InfiniteScroll,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

import { SearchIndex } from "emoji-mart";
import { Loader, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomDateSeparator from "./CustomDateSeparator";
import Sidebar from "./Sidebar";

const emptyChat = () => {
  return (
    <div className="">
      <p>No Channel found...</p>
      <p> Please add a channel or join an existing channel</p>
    </div>
  );
};
export default function App({
  apiKey,
  createToken,
  userId,
  userName,
  userImage,
}: {
  apiKey: string;
  createToken: (userId: string) => Promise<string>;
  userId: string;
  userName: string;
  userImage: string;
}) {
  const { toast } = useToast();
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
      image: userImage,
    },
  });
  // const {user} = useUser();
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
  const createNewChannel = async (channelName: string, users: string[]) => {
    try {
      if (!channelName.trim()) return;

      const newChannel = client!.channel("messaging", {
        name: channelName,
        members: [userId, ...users],
      });
      await newChannel.create();
      console.log("Channel created:", newChannel);
      toast({
        title: "Channel created",
        description: newChannel.data?.name,
      });
    } catch (error) {
      console.error("Error creating channel:", error);
      toast({
        title: "Error creating channel",
        description: "Check the console for more info",
        type: "foreground",
        variant: "destructive",
      });
    }
  };
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader className="animate-spin" />
        <p>Loading chats...</p>
      </div>
    );
  }
  return (
    <Chat client={client}>
      <div className="flex h-screen">
        <Sidebar onCreateChannel={createNewChannel} />

        <div className="flex-grow">
          <ChannelList
            sort={sort}
            filters={filters}
            options={options}
            EmptyStateIndicator={emptyChat}
            showChannelSearch
            Paginator={InfiniteScroll}
          />
          <Channel
            EmojiPicker={EmojiPicker}
            emojiSearchIndex={SearchIndex}
            AudioRecorder={Mic}
            MessageStatus={CustomMessageStatus}
            DateSeparator={CustomDateSeparator}
          >
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
}
