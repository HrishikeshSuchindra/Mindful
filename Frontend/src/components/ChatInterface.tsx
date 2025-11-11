import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Send, Bot, User, Heart, Brain, Wind } from "lucide-react";
import { Message } from "./MainInterface";
import { UserPreferences } from "../App";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatInterfaceProps {
  messages: Message[];
  onAddMessage: (
    content: string,
    sender: "user" | "ai",
    emotion?: Message["emotion"],
    suggested_actions?: string[]
  ) => void;
  userPreferences: UserPreferences;
  isListening: boolean;
}

const emotionColors = {
  calm: "bg-blue-100 border-blue-200",
  stressed: "bg-red-100 border-red-200",
  happy: "bg-green-100 border-green-200",
  sad: "bg-gray-100 border-gray-200",
  neutral: "bg-gray-50 border-gray-100",
};

// ✅ Initialize Gemini once
const genAI = new GoogleGenerativeAI("AIzaSyBKqyC2C8r7nvD4jANnBeBkwm5S8IgWYyg");

export default function ChatInterface({
  messages,
  onAddMessage,
  userPreferences,
  isListening,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const detectEmotion = (text: string): Message["emotion"] => {
    const stressWords = [
      "anxious",
      "worried",
      "stressed",
      "overwhelmed",
      "panic",
    ];
    const happyWords = ["happy", "excited", "great", "wonderful", "amazing"];
    const sadWords = ["sad", "depressed", "down", "upset", "cry"];
    const lowerText = text.toLowerCase();

    if (stressWords.some((w) => lowerText.includes(w))) return "stressed";
    if (happyWords.some((w) => lowerText.includes(w))) return "happy";
    if (sadWords.some((w) => lowerText.includes(w))) return "sad";
    return "neutral";
  };

  const fetchGeminiResponse = async (
    userMessage: string,
    userEmotion: Message["emotion"]
  ) => {
    try {
      const res = await fetch("https://mindful-nw2c.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          emotion: userEmotion,
          persona: userPreferences.persona,
        }),
      });

      const data = await res.json();
      return data.reply;
    } catch (error) {
      console.error("Backend API error:", error);
      return "I'm having trouble connecting right now, but I'm here with you.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userEmotion = detectEmotion(inputValue);
    onAddMessage(inputValue, "user", userEmotion);
    setInputValue("");
    setIsTyping(true);

    const aiText = await fetchGeminiResponse(inputValue, userEmotion);

    onAddMessage(aiText, "ai", "calm");
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: "I need support", icon: Heart },
    { label: "Feeling anxious", icon: Wind },
    { label: "Want to practice mindfulness", icon: Brain },
  ];

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <Card className="flex-1 flex flex-col bg-white/70 backdrop-blur-sm">
        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-6 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-blue-500 ml-3"
                        : "bg-teal-500 mr-3"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div
                    className={`rounded-xl p-4 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : `bg-white border-2 ${
                            emotionColors[message.emotion || "neutral"]
                          }`
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>

                    {message.emotion && message.sender === "user" && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {message.emotion}
                      </Badge>
                    )}

                    {message.suggested_actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggested_actions.map((action, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => onAddMessage(action, "user")}
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-6"
            >
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border-2 border-blue-100 rounded-xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </ScrollArea>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="px-6 py-3 border-t bg-white/50">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => onAddMessage(action.label, "user")}
                  className="flex items-center gap-2 text-xs"
                >
                  <action.icon className="w-3 h-3" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t bg-white/50">
          <div className="flex space-x-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isListening ? "Listening..." : "Share what's on your mind..."
              }
              className="flex-1 bg-white"
              disabled={isListening}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {isListening && (
            <div className="flex items-center justify-center mt-3">
              <div className="flex space-x-1">
                <div className="w-2 h-8 bg-red-400 rounded animate-pulse" />
                <div
                  className="w-2 h-6 bg-red-400 rounded animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-10 bg-red-400 rounded animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-4 bg-red-400 rounded animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              <span className="ml-3 text-sm text-red-600">Listening...</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export { ChatInterface };
