"use client";
import { useState } from "react";

interface ChatMessage {
  sender: "user" | "bot";
  content: string;
}
export default function Page() {
  const chatData: ChatMessage[] = [
    { sender: "bot", content: "Welcome to awesome bank." },
  ];
  const [messages, setMessages] = useState(chatData);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async () => {
    if (inputMessage.trim() !== "") {
      // Add user message to chat
      setMessages([...messages, { sender: "user", content: inputMessage }]);
      setInputMessage("");

      // Show loading message
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: "bot is typing..." },
      ]);

      try {
        // Call your backend API here
        const response = await fetch("http://localhost:8080/v1/chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputMessage }),
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const botMessage = data.message; // Assuming your API returns a 'response' field

        // Update the chat with the bot's response
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove "bot is typing..."
          { sender: "bot", content: botMessage },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        // Handle errors (e.g., display an error message)
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove "bot is typing..."
          { sender: "bot", content: "Oops, something went wrong!" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="flex h-screen antialiased text-gray-800 w-full">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">Awesome Bank</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img src="https://avatars.githubusercontent.com/u/166081520?s=128" alt="Avatar" className="h-full w-full" />
            </div>
            <div className="text-sm font-semibold mt-2">Hermione Granger</div>
            <div className="text-xs text-gray-500">ID: 48752987321</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">2</span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
              <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
                  AM
                </div>
                <div className="ml-2 text-sm font-semibold">Account Manager</div>
              </button>
              <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
                  TR
                </div>
                <div className="ml-2 text-sm font-semibold">Trasury Manager</div>
                <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
                  2
                </div>
              </button>
            </div>
            <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Archivied</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">1</span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2">
              <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  XX
                </div>
                <div className="ml-2 text-sm font-semibold">Debt Collector</div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-1 gap-y-2">
                {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`col-start-${message.sender === "user" ? "1" : "6"} col-end-${message.sender === "user" ? "8" : "13"} p-3 rounded-lg`}
                    >
                      <div className={`flex items-center ${message.sender === "user" ? "flex-row" : "flex-row-reverse"}`}>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          {message.sender === "user" ? "H" : "B"} 
                        </div>
                        <div className={`relative ml-3 text-sm ${message.sender === "user" ? "bg-white" : "bg-indigo-100"} py-2 px-4 shadow rounded-xl ${message.content === "bot is typing..." && "text-gray-500 italic"}`}>
                          <div>{message.content}</div>
                          {index === 7 && message.sender === "bot" && (
                            <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                              Seen
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}/>
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={handleSubmit}>
                  <span>Send</span>
                  <span className="ml-2">
                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}