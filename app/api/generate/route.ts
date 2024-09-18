import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a transform stream to handle the incoming chunks
    const result = await model.generateContentStream(prompt);
    const transformStream = new TransformStream();
    const writer = transformStream.writable.getWriter();

    // Stream the content chunks
    (async () => {
      for await (const chunk of result.stream) {
        writer.write(new TextEncoder().encode(chunk.text()));
      }
      writer.close();
    })();

    return new NextResponse(transformStream.readable, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error during AI generation:", error);
    return NextResponse.json(
      { error: "Error during AI generation" },
      { status: 500 }
    );
  }
}
