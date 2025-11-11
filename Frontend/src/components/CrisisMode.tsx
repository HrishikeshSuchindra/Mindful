import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  AlertTriangle,
  Phone,
  MessageCircle,
  ExternalLink,
  Heart,
  Wind,
  ArrowLeft,
  Clock,
  MapPin,
  Globe,
} from "lucide-react";

interface CrisisModeProps {
  onExit: () => void;
}

const emergencyContacts = [
  {
    country: "United States",
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    available: "24/7",
    website: "https://suicidepreventionlifeline.org",
    features: ["Phone", "Chat", "Text"],
  },
  {
    country: "India",
    name: "Suicide Prevention India Foundation",
    phone: "+91 9152987821",
    available: "24/7",
    website: "https://spif.in/i-am-feeling-suicidal/",
    features: ["Phone", "Email"],
  },
  {
    country: "Canada",
    name: "Talk Suicide Canada",
    phone: "1-833-456-4566",
    available: "24/7",
    website: "https://talksuicide.ca",
    features: ["Phone", "Text"],
  },
  {
    country: "Australia",
    name: "Lifeline",
    phone: "13 11 14",
    available: "24/7",
    website: "https://lifeline.org.au",
    features: ["Phone", "Chat"],
  },
];

const copingStrategies = [
  {
    title: "Immediate Grounding",
    description: "5-4-3-2-1 technique to connect with the present moment",
    action: "ground",
    icon: Wind,
    duration: "2-3 minutes",
  },
  {
    title: "Crisis Breathing",
    description: "Slow, deep breathing to activate your calm response",
    action: "breathe",
    icon: Heart,
    duration: "5 minutes",
  },
  {
    title: "Safety Planning",
    description: "Quick reminders of your support network and coping skills",
    action: "plan",
    icon: AlertTriangle,
    duration: "5-10 minutes",
  },
];

export function CrisisMode({ onExit }: CrisisModeProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);

  const groundingSteps = [
    "Name 5 things you can see around you",
    "Name 4 things you can touch",
    "Name 3 things you can hear",
    "Name 2 things you can smell",
    "Name 1 thing you can taste",
  ];

  const safetyReminders = [
    "This feeling is temporary and will pass",
    "You have survived difficult times before",
    "There are people who care about you",
    "You deserve support and care",
    "Taking care of yourself is important",
  ];

  const callEmergency = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const openWebsite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderGroundingExercise = () => (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Wind className="w-5 h-5" />
          Grounding Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-blue-700 text-sm">
          Focus on your senses to stay connected to the present moment.
        </p>

        <div className="space-y-3">
          {groundingSteps.map((step, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 transition-colors ${
                groundingStep > index
                  ? "border-green-500 bg-green-50 text-green-800"
                  : groundingStep === index
                  ? "border-blue-500 bg-blue-100 text-blue-800"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              <p className="text-sm">{step}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setGroundingStep(Math.max(0, groundingStep - 1))}
            disabled={groundingStep === 0}
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setGroundingStep(
                Math.min(groundingSteps.length, groundingStep + 1)
              )
            }
            disabled={groundingStep === groundingSteps.length}
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            {groundingStep === groundingSteps.length ? "Complete" : "Next"}
          </Button>
        </div>

        {groundingStep === groundingSteps.length && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              Great job! Take a moment to notice how you're feeling now.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderBreathingExercise = () => (
    <Card className="bg-teal-50 border-teal-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-teal-800">
          <Heart className="w-5 h-5" />
          Crisis Breathing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-teal-700 text-sm">
          Slow, deep breathing to help regulate your nervous system.
        </p>

        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-r from-teal-400 to-teal-500 flex items-center justify-center"
              animate={
                breathingActive
                  ? {
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{
                duration: 8,
                repeat: breathingActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              <span className="text-white text-sm">
                {breathingActive ? "Breathe" : "Ready"}
              </span>
            </motion.div>
          </div>

          <p className="text-sm text-teal-700 mb-4">
            {breathingActive
              ? "Breathe in for 4, hold for 4, breathe out for 6"
              : "Click start when you're ready to begin"}
          </p>

          <Button
            onClick={() => setBreathingActive(!breathingActive)}
            className={
              breathingActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-teal-600 hover:bg-teal-700"
            }
          >
            {breathingActive ? "Stop" : "Start Breathing"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderSafetyPlan = () => (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <AlertTriangle className="w-5 h-5" />
          Safety Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-purple-700 text-sm">
          Remember these important truths about yourself and your situation.
        </p>

        <div className="space-y-3">
          {safetyReminders.map((reminder, index) => (
            <div
              key={index}
              className="p-3 bg-white border border-purple-200 rounded-lg"
            >
              <p className="text-sm text-purple-800">{reminder}</p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-purple-100 rounded-lg">
          <p className="text-sm text-purple-800 mb-2">
            <strong>If you're having thoughts of self-harm:</strong>
          </p>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Remove any means of harm from your immediate area</li>
            <li>• Call a crisis helpline or trusted person</li>
            <li>• Go to a safe place with other people</li>
            <li>• Remember: these feelings are temporary</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedStrategy) {
    return (
      <div className="min-h-screen bg-red-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setSelectedStrategy(null)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Crisis Support
          </Button>

          {selectedStrategy === "ground" && renderGroundingExercise()}
          {selectedStrategy === "breathe" && renderBreathingExercise()}
          {selectedStrategy === "plan" && renderSafetyPlan()}

          <Card className="mt-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-800 text-sm text-center">
                If you're in immediate danger, please call emergency services
                (911, 999, etc.) right away.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-2xl">Crisis Support</h1>
            </div>
            <Button
              variant="outline"
              onClick={onExit}
              className="text-red-600 border-white hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Crisis Mode
            </Button>
          </div>
          <p className="text-red-100">
            You're not alone. Help is available 24/7. Choose the support that
            feels right for you.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Immediate Help */}
        <Card className="border-red-200 bg-white">
          <CardHeader>
            <CardTitle className="text-red-800">
              Immediate Help Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {emergencyContacts.slice(0, 2).map((contact, index) => (
                <div
                  key={index}
                  className="p-4 border border-red-200 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm mb-1">{contact.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {contact.country}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      {contact.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="text-lg">{contact.phone}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {contact.available}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => callEmergency(contact.phone)}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      size="sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => openWebsite(contact.website)}
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-red-800 text-sm">
                <strong>Emergency:</strong> If you're in immediate physical
                danger, call your local emergency number (911, 999, 112) right
                away.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Coping Strategies */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Coping Strategies</CardTitle>
            <p className="text-gray-600 text-sm">
              Try these techniques while you wait for help or to manage intense
              feelings.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {copingStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300"
                  onClick={() => setSelectedStrategy(strategy.action)}
                >
                  <strategy.icon className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="text-sm mb-2">{strategy.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {strategy.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {strategy.duration}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* More Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm mb-3">International Helplines</h3>
                <div className="space-y-3">
                  {emergencyContacts.slice(2).map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-600">
                          {contact.country}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => callEmergency(contact.phone)}
                        >
                          {contact.phone}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm mb-3">Safety Tips</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Reach out to a trusted friend or family member</p>
                  <p>• Stay in a safe, populated area</p>
                  <p>• Remove any items that could be used for self-harm</p>
                  <p>• Focus on getting through the next hour, then the next</p>
                  <p>
                    • Remember: crises are temporary, even when they feel
                    overwhelming
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return to App */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg mb-2">You're Taking an Important Step</h3>
            <p className="text-blue-700 text-sm mb-4">
              Seeking help shows strength and self-care. You deserve support.
            </p>
            <Button onClick={onExit} className="bg-blue-600 hover:bg-blue-700">
              Return to Mindful
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
