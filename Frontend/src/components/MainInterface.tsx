import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatInterface } from "./ChatInterface";
import { Dashboard } from "./Dashboard";
import { CBTTools } from "./CBTTools";
import { SettingsPanel } from "./SettingsPanel";
import { CrisisMode } from "./CrisisMode";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  MessageCircle,
  BarChart3,
  Brain,
  Settings,
  AlertTriangle,
  Heart,
  Mic,
  MicOff,
  Mail,
  Linkedin,
  Github,
  Instagram,
} from "lucide-react";
import { UserPreferences } from "../App";

interface MainInterfaceProps {
  userPreferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  emotion?: "calm" | "stressed" | "happy" | "sad" | "neutral";
  suggested_actions?: string[];
};

export type MoodEntry = {
  id: string;
  date: Date;
  mood: number; // 1–10 scale
  notes?: string;
  activities?: string[];
};

export function MainInterface({
  userPreferences,
  onUpdatePreferences,
}: MainInterfaceProps) {
  const [activeTab, setActiveTab] = useState("chat");
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello${
        userPreferences.name ? ` ${userPreferences.name}` : ""
      }! I'm here to support you today. How are you feeling?`,
      sender: "ai",
      timestamp: new Date(),
      emotion: "calm",
    },
  ]);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 86400000),
      mood: 7,
      notes: "Had a good day at work",
      activities: ["exercise", "meditation"],
    },
    {
      id: "2",
      date: new Date(Date.now() - 172800000),
      mood: 5,
      notes: "Feeling a bit overwhelmed",
      activities: ["journaling"],
    },
  ]);

  const addMessage = (
    content: string,
    sender: "user" | "ai",
    emotion?: Message["emotion"]
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      emotion,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addMoodEntry = (
    mood: number,
    notes?: string,
    activities?: string[]
  ) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood,
      notes,
      activities,
    };
    setMoodEntries((prev) => [newEntry, ...prev]);
  };

  const toggleVoiceListening = () => {
    if (userPreferences.interactionStyle === "text-only") return;
    setIsListening(!isListening);
  };

  const handleCrisisToggle = () => {
    setIsCrisisMode(!isCrisisMode);
  };

  const tabs = [
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "tools", label: "CBT Tools", icon: Brain },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (isCrisisMode) {
    return <CrisisMode onExit={() => setIsCrisisMode(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-teal-400 rounded-lg flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-semibold">
                Mindful
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {(userPreferences.interactionStyle === "voice-enabled" ||
                userPreferences.interactionStyle === "multimodal") && (
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  onClick={toggleVoiceListening}
                  className={`transition-all ${
                    isListening
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisToggle}
                className="text-red-600 border-red-200 hover:bg-red-50 transition-all"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Crisis Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="chat" className="mt-0">
                <ChatInterface
                  messages={messages}
                  onAddMessage={addMessage}
                  userPreferences={userPreferences}
                  isListening={isListening}
                />
              </TabsContent>

              <TabsContent value="dashboard" className="mt-0">
                <Dashboard
                  moodEntries={moodEntries}
                  onAddMoodEntry={addMoodEntry}
                  messages={messages}
                  userPreferences={userPreferences}
                />
              </TabsContent>

              <TabsContent value="tools" className="mt-0">
                <CBTTools userPreferences={userPreferences} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <SettingsPanel
                  userPreferences={userPreferences}
                  onUpdatePreferences={onUpdatePreferences}
                />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

      {/* 🌸 Peaceful Footer */}
      {/* 🌿 Peaceful Deep Green Footer with Breathing Animation */}
      {/* 🌿 Mindful Footer — Calm Deep Green with Gentle Breathing Animation */}
      <footer className="relative bg-[#4CA978] text-[#F8FAF9] backdrop-blur-sm border-t border-green-300 py-10 mt-10 shadow-inner overflow-hidden">
        <style>
          {`
      @keyframes breathe {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .breathe-hover:hover {
        animation: breathe 2.5s ease-in-out infinite;
        color: #054e28ff !important;
        text-shadow: 0 0 6px rgba(232, 255, 243, 0.4);
      }
      @keyframes fadeInFooter {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      footer {
        animation: fadeInFooter 1s ease-out both;
      }
    `}
        </style>

        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-lg font-semibold text-[#F0F8F4] mb-1 tracking-wide">
            Mindful
          </h2>
          <p className="text-sm text-[#E9F5EE] mb-6">
            Helping you find balance, awareness, and calm — one moment at a
            time.
          </p>

          <div className="flex justify-center items-center space-x-12 text-[#F5FBF8] mb-6">
            {/* Gmail */}
            <a
              href="mailto:hrishikesh.suchindra@gmail.com"
              className="flex items-center gap-2 transition-all breathe-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 13L2 6.76V18a2 2 0 002 2h16a2 2 0 002-2V6.76L12 13zM12 11L22 4H2l10 7z" />
              </svg>
              Gmail
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/hrishikesh-suchindra-a3050725a"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all breathe-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V9h3v10zM6.5 7.7A1.75 1.75 0 116.49 4a1.75 1.75 0 010 3.7zm12.5 11.3h-3v-5c0-1.2 0-2.7-1.7-2.7-1.7 0-2 1.3-2 2.6v5.1h-3V9h2.9v1.4h.1c.4-.7 1.3-1.4 2.9-1.4 3.1 0 3.8 2 3.8 4.6v5.4z" />
              </svg>
              LinkedIn
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/hrishikeshsuchindra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all breathe-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .3A12 12 0 008.2 23.7c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.1-1.3-1.5-1.3-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1 1.6-.9 1.6-.9.9-1.6 2.4-1.1 3-.9.1-.6.4-1 .7-1.3-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3 0-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.5 11.5 0 016.2 0c2.4-1.6 3.4-1.3 3.4-1.3.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.6-5.4 5.9.4.3.7.9.7 1.8v2.6c0 .4.2.7.8.6A12 12 0 0012 .3z" />
              </svg>
              GitHub
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/hrishikesh_suchindra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all breathe-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.5.3.8.6 1.1 1.1.3.4.5 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.3.5-.6.8-1.1 1.1-.4.3-1.1.5-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.5-.3-.8-.6-1.1-1.1-.3-.4-.5-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.3-.5.6-.8 1.1-1.1.4-.3 1.1-.5 2.3-.5C8.4 2.2 8.8 2.2 12 2.2zM12 5.8a6.2 6.2 0 100 12.4A6.2 6.2 0 0012 5.8zm0 10.3a4.1 4.1 0 110-8.2 4.1 4.1 0 010 8.2zm6.4-10.9a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0z" />
              </svg>
              Instagram
            </a>
          </div>

          <div className="text-xs text-[#E4F2E9] mt-4">
            © {new Date().getFullYear()} Mindful • Crafted with calm by{" "}
            <span className="font-medium text-green">Hrishikesh Suchindra</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
