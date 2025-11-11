import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { MainInterface } from './components/MainInterface';
import { motion, AnimatePresence } from 'motion/react';

export type UserPreferences = {
  language: string;
  interactionStyle: 'text-only' | 'voice-enabled' | 'multimodal';
  personalization: boolean;
  persona: 'friendly-peer' | 'calm-coach' | 'expert-guide';
  name?: string;
};

export type AppState = 'welcome' | 'onboarding' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Check if user has been here before (in real app, this would check localStorage/database)
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsFirstTime(false);
      setAppState('main');
      // Load saved preferences
      const savedPrefs = localStorage.getItem('userPreferences');
      if (savedPrefs) {
        setUserPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const handleWelcomeComplete = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setAppState('main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <WelcomeScreen onComplete={handleWelcomeComplete} />
          </motion.div>
        )}
        
        {appState === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        )}
        
        {appState === 'main' && userPreferences && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <MainInterface 
              userPreferences={userPreferences}
              onUpdatePreferences={setUserPreferences}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}