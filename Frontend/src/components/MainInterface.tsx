import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatInterface } from './ChatInterface';
import { Dashboard } from './Dashboard';
import { CBTTools } from './CBTTools';
import { SettingsPanel } from './SettingsPanel';
import { CrisisMode } from './CrisisMode';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MessageCircle, 
  BarChart3, 
  Brain, 
  Settings, 
  AlertTriangle,
  Heart,
  Mic,
  MicOff
} from 'lucide-react';
import { UserPreferences } from '../App';

interface MainInterfaceProps {
  userPreferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: 'calm' | 'stressed' | 'happy' | 'sad' | 'neutral';
  suggested_actions?: string[];
};

export type MoodEntry = {
  id: string;
  date: Date;
  mood: number; // 1-10 scale
  notes?: string;
  activities?: string[];
};

export function MainInterface({ userPreferences, onUpdatePreferences }: MainInterfaceProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello${userPreferences.name ? ` ${userPreferences.name}` : ''}! I'm here to support you today. How are you feeling?`,
      sender: 'ai',
      timestamp: new Date(),
      emotion: 'calm'
    }
  ]);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: new Date(Date.now() - 86400000),
      mood: 7,
      notes: 'Had a good day at work',
      activities: ['exercise', 'meditation']
    },
    {
      id: '2',
      date: new Date(Date.now() - 172800000),
      mood: 5,
      notes: 'Feeling a bit overwhelmed',
      activities: ['journaling']
    }
  ]);

  const addMessage = (content: string, sender: 'user' | 'ai', emotion?: Message['emotion']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      emotion
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addMoodEntry = (mood: number, notes?: string, activities?: string[]) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood,
      notes,
      activities
    };
    setMoodEntries(prev => [newEntry, ...prev]);
  };

  const toggleVoiceListening = () => {
    if (userPreferences.interactionStyle === 'text-only') return;
    setIsListening(!isListening);
    // In a real app, this would handle speech recognition
  };

  const handleCrisisToggle = () => {
    setIsCrisisMode(!isCrisisMode);
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tools', label: 'CBT Tools', icon: Brain },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (isCrisisMode) {
    return <CrisisMode onExit={() => setIsCrisisMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Mindful
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {(userPreferences.interactionStyle === 'voice-enabled' || 
                userPreferences.interactionStyle === 'multimodal') && (
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="sm"
                  onClick={toggleVoiceListening}
                  className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleCrisisToggle}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Crisis Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/70 backdrop-blur-sm">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2"
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
    </div>
  );
}