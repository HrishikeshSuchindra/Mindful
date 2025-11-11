import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { ChevronRight, ChevronLeft, Globe, MessageCircle, User, Settings } from 'lucide-react';
import { UserPreferences } from '../App';

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences) => void;
}

const steps = [
  { id: 'privacy', title: 'Privacy & Consent', icon: Settings },
  { id: 'language', title: 'Language & Culture', icon: Globe },
  { id: 'interaction', title: 'Interaction Style', icon: MessageCircle },
  { id: 'persona', title: 'Choose Your Companion', icon: User }
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    language: 'en',
    interactionStyle: 'text-only',
    personalization: true,
    persona: 'calm-coach'
  });

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences as UserPreferences);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Settings className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl mb-2">Privacy & Data Control</h2>
              <p className="text-gray-600">We prioritize your privacy and give you complete control over your data.</p>
            </div>
            
            <div className="space-y-4 text-left">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="mb-2">🔒 Your Data Security</h3>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• All conversations are encrypted end-to-end</li>
                  <li>• Data is stored anonymously and securely</li>
                  <li>• You can delete your data at any time</li>
                  <li>• No personal information is shared with third parties</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="mb-2">✨ Optional Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Save conversation history</p>
                      <p className="text-xs text-gray-600">Remember our previous conversations for continuity</p>
                    </div>
                    <Switch 
                      checked={preferences.personalization} 
                      onCheckedChange={(checked) => updatePreferences({ personalization: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl mb-2">Language & Culture</h2>
              <p className="text-gray-600">Help us provide culturally sensitive and personalized support.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base mb-3 block">Preferred Language</Label>
                <RadioGroup 
                  value={preferences.language} 
                  onValueChange={(value) => updatePreferences({ language: value })}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-blue-50">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">English</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-blue-50">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es">Español</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-blue-50">
                    <RadioGroupItem value="fr" id="fr" />
                    <Label htmlFor="fr">Français</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-blue-50">
                    <RadioGroupItem value="de" id="de" />
                    <Label htmlFor="de">Deutsch</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="name" className="text-base mb-3 block">What would you like to be called? (Optional)</Label>
                <Input 
                  id="name"
                  placeholder="Enter your preferred name"
                  value={preferences.name || ''}
                  onChange={(e) => updatePreferences({ name: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl mb-2">Interaction Style</h2>
              <p className="text-gray-600">Choose how you'd like to communicate with your AI companion.</p>
            </div>
            
            <RadioGroup 
              value={preferences.interactionStyle} 
              onValueChange={(value) => updatePreferences({ interactionStyle: value as UserPreferences['interactionStyle'] })}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50">
                <RadioGroupItem value="text-only" id="text-only" className="mt-1" />
                <div>
                  <Label htmlFor="text-only" className="text-base">Text Only</Label>
                  <p className="text-sm text-gray-600">Traditional chat interface with typing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50">
                <RadioGroupItem value="voice-enabled" id="voice-enabled" className="mt-1" />
                <div>
                  <Label htmlFor="voice-enabled" className="text-base">Voice Enabled</Label>
                  <p className="text-sm text-gray-600">Speak your thoughts and hear responses</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50">
                <RadioGroupItem value="multimodal" id="multimodal" className="mt-1" />
                <div>
                  <Label htmlFor="multimodal" className="text-base">Multimodal</Label>
                  <p className="text-sm text-gray-600">Text, voice, and emotion detection for comprehensive support</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl mb-2">Choose Your Companion</h2>
              <p className="text-gray-600">Select the AI personality that feels most comfortable for you.</p>
            </div>
            
            <RadioGroup 
              value={preferences.persona} 
              onValueChange={(value) => updatePreferences({ persona: value as UserPreferences['persona'] })}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50">
                <RadioGroupItem value="friendly-peer" id="friendly-peer" className="mt-1" />
                <div>
                  <Label htmlFor="friendly-peer" className="text-base">Friendly Peer</Label>
                  <p className="text-sm text-gray-600">Casual, understanding friend who listens without judgment</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50">
                <RadioGroupItem value="calm-coach" id="calm-coach" className="mt-1" />
                <div>
                  <Label htmlFor="calm-coach" className="text-base">Calm Coach</Label>
                  <p className="text-sm text-gray-600">Gentle guide who offers structured support and coping strategies</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-blue-50">
                <RadioGroupItem value="expert-guide" id="expert-guide" className="mt-1" />
                <div>
                  <Label htmlFor="expert-guide" className="text-base">Expert Guide</Label>
                  <p className="text-sm text-gray-600">Professional, knowledgeable companion with evidence-based insights</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <CardTitle className="flex items-center gap-3">
            {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-blue-500" })}
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}