"use client";

import { useState, useRef, useEffect } from "react";
import { generateText } from "@/lib/actions/chat.actions";
import { Send, Loader2, User, Bot, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
// import ReactShowdown from "react-showdown";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    setUserInput("");
    if (!userInput.trim()) return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", text: userInput },
    ]);
    setIsLoading(true);

    try {
      const modelResponse = await generateText(userInput);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: modelResponse },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          text: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      <Link
        className="flex text-gray-600 mt-4 ml-4 font-medium hover:text-gray-500"
        href={"/"}
      >
        <ChevronLeft /> <p>Go back</p>
      </Link>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        ref={chatContainerRef}
      >
        {chatHistory.length > 0 ? (
          chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } items-end space-x-2`}
            >
              {message.role === "model" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </Avatar>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-2xl shadow-md ${
                  message.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {message.role === "model" ? (
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {message.text}
                  </ReactMarkdown>
                ) : (
                  // Removed markdown rendering for now because of bugs
                  // <p></p>
                  // <MDXProvider>{message.text}</MDXProvider>
                  // <ReactShowdown markdown={message.text} />
                  <p>{message.text}</p>
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </Avatar>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">
              Start a conversation with Alex based out of Gemini 1.5 flash... 🚀
            </p>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-start items-end space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>AI</AvatarFallback>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
            </Avatar>
            <div className="bg-white p-3 rounded-lg shadow-md rounded-bl-none">
              <p className="text-gray-500">
                Thinking<span className="animate-pulse">...</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <input
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <button
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors duration-200"
            onClick={sendMessage}
            disabled={isLoading || !userInput.trim()}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
