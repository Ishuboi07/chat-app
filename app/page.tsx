import App from '@/components/App';
import { StreamChat } from 'stream-chat';

export default function Home() {
  async function createToken(userId: string): Promise<string> {
    "use server";
    const apiKey = process.env.STREAM_API_KEY!;
    const apiSecret = process.env.STREAM_API_SECRET!;
    const serverClient = new StreamChat(apiKey, apiSecret);
    return serverClient.createToken(userId);
  }
  const apiKey = process.env.STREAM_API_KEY!;
  const userId = "ishaan7";
  const userName = 'Ishaan';
  return (
    <App apiKey={apiKey} createToken={createToken} userId={userId} userName={userName} />
  )
}
