"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUp, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  projects,
  getProjectsByCategory,
  getWeb3Projects,
  getAIProjects,
} from "@/data/projects";
import {
  experiences,
  getBlockchainExperiences,
  getAIExperiences,
} from "@/data/experiences";
import ChatProjectList from "./chat-project-list";

interface Message {
  text: string;
  sender: "user" | "bot";
  specialContent?: {
    type: "projects" | "experiences";
    category?: string;
    title: string;
  };
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Tell me about your projects",
  "Show me your Web3 projects",
  "What AI experience do you have?",
  "What technologies do you work with?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatHistory = useRef<ChatMessage[]>([]);

  // Helper function to check if message is about projects or experiences
  const checkForSpecialContent = (text: string) => {
    const lowerText = text.toLowerCase();

    // Check for project-related queries
    if (
      lowerText.includes("web3 project") ||
      lowerText.includes("blockchain project")
    ) {
      return {
        type: "projects" as const,
        category: "Web3",
        title: "Web3 & Blockchain Projects",
      };
    } else if (lowerText.includes("ai project")) {
      return {
        type: "projects" as const,
        category: "AI",
        title: "AI Projects",
      };
    } else if (
      lowerText.match(/show\s+(me\s+)?(your\s+)?projects/) ||
      lowerText.match(/tell\s+(me\s+)?about\s+(your\s+)?projects/) ||
      lowerText.includes("what projects")
    ) {
      return {
        type: "projects" as const,
        title: "All Projects",
      };
    }

    // Check for experience-related queries
    if (
      lowerText.includes("blockchain experience") ||
      lowerText.includes("web3 experience")
    ) {
      return {
        type: "experiences" as const,
        category: "Blockchain",
        title: "Blockchain & Web3 Experience",
      };
    } else if (lowerText.includes("ai experience")) {
      return {
        type: "experiences" as const,
        category: "AI",
        title: "AI Experience",
      };
    } else if (
      lowerText.match(/show\s+(me\s+)?(your\s+)?experience/) ||
      lowerText.match(/tell\s+(me\s+)?about\s+(your\s+)?experience/) ||
      lowerText.includes("work experience")
    ) {
      return {
        type: "experiences" as const,
        title: "Work Experience",
      };
    }

    return null;
  };

  const handleSendMessage = async (text: string) => {
    if (text.trim() === "") return;

    // Check if this is a special query about projects or experiences
    const specialContent = checkForSpecialContent(text);

    const userMessage: Message = { text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    if (!isChatOpen) setIsChatOpen(true);

    // Add user message to chat history
    chatHistory.current.push({
      role: "user",
      content: text,
    });

    setIsTyping(true);
    setError(null);

    try {
      // Call the API route
      const response = await axios.post("/api/chat", {
        messages: chatHistory.current,
      });

      const botResponse = response.data.message;

      // Add bot response to messages and chat history
      const botMessage: Message = {
        text: botResponse,
        sender: "bot",
        ...(specialContent && { specialContent }),
      };

      setMessages((prev) => [...prev, botMessage]);

      chatHistory.current.push({
        role: "assistant",
        content: botResponse,
      });
    } catch (err) {
      console.error("Error calling chat API:", err);
      setError(
        "Sorry, I'm having trouble connecting right now. Please try again later."
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isChatOpen]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full px-2">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-lg h-[500px] bg-primary/5 backdrop-blur-2xl border border-primary/10 rounded-2xl flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  V
                </div>
                <h3 className="font-semibold text-base text-theme">
                  vicdevman
                </h3>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10"
              >
                <X size={20} />
              </button>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* <div className="flex flex-col max-w-full"> */}
                    {msg.sender === "bot" && msg.specialContent && (
                      <div className="mb-3 w-full">
                        {msg.specialContent.type === "projects" && (
                          <ChatProjectList
                            title={msg.specialContent.title}
                            projects={
                              msg.specialContent.category === "Web3"
                                ? getWeb3Projects()
                                : msg.specialContent.category === "AI"
                                ? getAIProjects()
                                : projects
                            }
                          />
                        )}

                        {msg.specialContent.type === "experiences" && (
                          <ChatProjectList
                            title={msg.specialContent.title}
                            experiences={
                              msg.specialContent.category === "Blockchain"
                                ? getBlockchainExperiences()
                                : msg.specialContent.category === "AI"
                                ? getAIExperiences()
                                : experiences
                            }
                          />
                        )}
                      </div>
                    )}

                      {msg.sender === "bot" && msg.specialContent ? <></> :  <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm font-medium ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                    {msg.text}

                      {/* Special UI for projects and experiences */}
                    </div>}
                  {/* </div> */}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-2.5 rounded-2xl bg-muted text-muted-foreground text-sm font-medium flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-2.5 rounded-2xl bg-red-100 text-red-600 text-sm font-medium">
                    {error}
                  </div>
                </motion.div>
              )}
            </div>

            {
              <div className="p-4 pt-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSendMessage(s)}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            }
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-1.5 flex items-center gap-2 w-fit">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="pl-3 focus:outline-none bg-transparent w-52 sm:focus:w-80 focus:w-64 transition-all duration-300 placeholder:text-sm placeholder:text-faint font-medium"
        />
        <button
          onClick={() => {
            handleSendMessage(inputValue);
            setInputValue("");
          }}
          className="bg-primary p-2 rounded-lg text-white font-medium text-sm cursor-pointer disabled:opacity-50"
          disabled={!inputValue.trim() || isTyping}
        >
          {isTyping ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ArrowUp size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
