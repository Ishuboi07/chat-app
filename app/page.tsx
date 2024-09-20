import App from "@/components/App";
import { StreamChat } from "stream-chat";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  async function createToken(userId: string): Promise<string> {
    "use server";
    const apiKey = process.env.STREAM_API_KEY!;
    const apiSecret = process.env.STREAM_API_SECRET!;
    const serverClient = new StreamChat(apiKey, apiSecret);
    return serverClient.createToken(userId);
  }

  const user = await currentUser();
  const apiKey = process.env.STREAM_API_KEY!;
  const userId = user!.username;
  const userName = user!.fullName || user!.username || "Anonymous";
  const userImage =
    user!.imageUrl || `https://getstream.io/random_svg/?name=${userName}`;
  return (
    <App
      apiKey={apiKey}
      createToken={createToken}
      userId={userId!}
      userName={userName}
      userImage={userImage}
    />
  );
}
