"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  X,
  Loader2,
  Expand,
  Maximize2,
  Minimize2,
} from "lucide-react";
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
import { skills, getSkillsByCategory, getFeaturedSkills } from "@/data/skills";
import ChatProjectList from "./chat-project-list";
import ChatSkillsList from "./chat-skills-list";
import ChatContactForm from "./chat-contact-form";

interface Message {
  text: string;
  sender: "user" | "bot";
  specialContent?: {
    type: "projects" | "experiences" | "skills" | "contact";
    category?: string;
    title: string;
  };
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  { title: "Projects", msg: "Tell me about your projects" },
  { title: "Web3 projects", msg: "Show me your Web3 projects" },
  { title: "AI projects", msg: "What AI experience do you have?" },
  { title: "Skills", msg: "What skills do you have?" },
  { title: "Experience", msg: "What experience do you have?" },
  { title: "Contact", msg: "I want to get in touch" },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatHistory = useRef<ChatMessage[]>([]);

  // Helper function to check if message is about projects, experiences, skills or contact
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

    // Check for skills-related queries
    if (
      lowerText.includes("frontend skill") ||
      lowerText.includes("front-end skill") ||
      lowerText.includes("front end skill")
    ) {
      return {
        type: "skills" as const,
        category: "frontend",
        title: "Frontend Development Skills",
      };
    } else if (
      lowerText.includes("backend skill") ||
      lowerText.includes("back-end skill") ||
      lowerText.includes("back end skill")
    ) {
      return {
        type: "skills" as const,
        category: "backend",
        title: "Backend Development Skills",
      };
    } else if (
      lowerText.includes("ai skill") ||
      lowerText.includes("machine learning skill")
    ) {
      return {
        type: "skills" as const,
        category: "ai",
        title: "AI & Machine Learning Skills",
      };
    } else if (
      lowerText.includes("web3 skill") ||
      lowerText.includes("blockchain skill")
    ) {
      return {
        type: "skills" as const,
        category: "web3",
        title: "Web3 & Blockchain Skills",
      };
    } else if (
      lowerText.match(/what\s+(are\s+)?(your\s+)?skills/) ||
      lowerText.match(/tell\s+(me\s+)?about\s+(your\s+)?skills/) ||
      lowerText.match(/what\s+technologies/) ||
      lowerText.match(/what\s+tech\s+stack/) ||
      lowerText.includes("what can you do")
    ) {
      return {
        type: "skills" as const,
        title: "Technical Skills",
      };
    }

    // Check for contact-related queries
    if (
      lowerText.includes("contact") ||
      lowerText.includes("get in touch") ||
      lowerText.includes("reach out") ||
      lowerText.includes("send message") ||
      lowerText.includes("send email") ||
      lowerText.includes("hire you") ||
      lowerText.includes("connect with")
    ) {
      return {
        type: "contact" as const,
        title: "Contact Form",
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
            <div className="flex items-center justify-between p-2.5 border-b border-primary/10">
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
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
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

                      {msg.specialContent.type === "skills" && (
                        <ChatSkillsList
                          title={msg.specialContent.title}
                          skills={
                            msg.specialContent.category
                              ? getSkillsByCategory(msg.specialContent.category)
                              : getFeaturedSkills()
                          }
                          category={msg.specialContent.category}
                        />
                      )}

                      {msg.specialContent.type === "contact" && (
                        <ChatContactForm />
                      )}
                    </div>
                  )}

                  {msg.sender === "user" && msg.specialContent ? (
                    <></>
                  ) : (
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm font-medium ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-primary/20 text-white/80 backdrop-blur-lg rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
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
              <div className="p-2.5 pt-1.5 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => handleSendMessage(s.msg)}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {s.title}
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
          onClick={() => {
            if (messages.length !== 0) setIsChatOpen(true);
          }}
          className="pl-3 focus:outline-none bg-transparent w-52 sm:focus:w-80 focus:w-64 transition-all duration-300 placeholder:text-sm placeholder:text-faint font-medium"
        />
        <button
          onClick={() => {
            if (!isChatOpen) setIsChatOpen(true);
            else setIsChatOpen(false);
          }}
          className={`bg-primary/10 p-2 rounded-lg text-white font-medium text-sm cursor-pointer disabled:opacity-50 ${
            messages.length == 0 ? "hidden" : "block"
          }`}
        >
          {isChatOpen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
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
