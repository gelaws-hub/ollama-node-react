import { useState, useEffect } from "react";
import io from "socket.io-client";
import MarkdownRenderer from "./react-markdown";
import TextareaAutosize from "react-textarea-autosize";

// Connect to backend server
const socket = io(import.meta.env.VITE_SERVER_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

console.log("SERVER_URL", import.meta.env.VITE_SERVER_URL);

const ChatBox = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [currentBotResponse, setCurrentBotResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on("response", (response: string) => {
      setCurrentBotResponse((prevResponse) => prevResponse + response);
      setIsTyping(response ? true : false);
      console.log("response", response);
    });

    return () => {
      socket.off("response");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChatHistory((prevHistory) => [...prevHistory, `You: ${userInput}`]);
    socket.emit("chat", userInput);
    setUserInput("");
    setCurrentBotResponse("");
    setIsTyping(true);
  };

  useEffect(() => {
    if (!isTyping && currentBotResponse) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        `${currentBotResponse}`,
      ]);
    }
  }, [isTyping, currentBotResponse]);

  const trimThink = (text: string) => {
    return text.replace(/<think>.*?<\/think>/gs, "").trim();
  };

  return (
    <div className="w-full h-full relative overflow-auto">
      <div
        style={{ scrollbarWidth: "none" }}
        className="h-full overflow-scroll p-4 pb-12 flex flex-col gap-2 rounded-md my-2 md:min-w-[400px] md:max-w-[600px] w-[95%] text-sm md:text-base"
      >
        {chatHistory.map((message, index) => (
          <MarkdownRenderer
            content={trimThink(message)}
            key={index}
            className={
              message.startsWith("You")
                ? "text-left border border-gray-500 p-2 rounded-lg ml-auto rounded-tr-none px-4"
                : "w-full text-left p-2 rounded-lg"
            }
          />
        ))}
        {isTyping && (
          <MarkdownRenderer
            content={
              trimThink(currentBotResponse) + "\n-----\n" + "Bot is typing..."
            }
            className="w-full text-left"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="w-[70vw] flex fixed bottom-4 right-1/2 translate-x-1/2 bg-[#242424] shadow-md">
        <TextareaAutosize
          rows={1}
          maxRows={2}
          onResize={(e) => console.log(e)}
          disabled={isTyping}
          required={true}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="p-2 pl-6 rounded-md w-full scrollbar-thin resize-none outline-0 shadow-md"
          placeholder="Ask me anything..."
          style={{ scrollbarWidth: "none" }}
        />
        <button disabled={isTyping} className="" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
