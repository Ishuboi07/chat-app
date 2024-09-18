"use server";

import { StreamChat } from "stream-chat";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function createToken(userId: string): Promise<string> {
  const apiKey = process.env.STREAM_API_KEY!;
  const apiSecret = process.env.STREAM_API_SECRET!;
  const serverClient = new StreamChat(apiKey, apiSecret);
  return serverClient.createToken(userId);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateText(text: string) {
  const result = await model.generateContent(text);
  console.log(result.response.text());
  return result.response.text();
}

export async function generateTextStream(
  prompt: string
): Promise<ReadableStream> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Create a readable stream that will send the content chunks as they're generated
  const result = await model.generateContentStream(prompt);

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  try {
    // Stream the chunks
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      writer.write(chunkText);
    }
    writer.close();
  } catch (err) {
    writer.abort(err);
  }

  return stream.readable;
}
