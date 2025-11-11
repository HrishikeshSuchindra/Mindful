import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Brain,
  Heart,
  Wind,
  BookOpen,
  Target,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { UserPreferences } from "../App";

interface CBTToolsProps {
  userPreferences: UserPreferences;
}

type Tool = "reframing" | "breathing" | "grounding" | "journaling" | "goals";

const breathingExercises = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8",
    cycles: 4,
    phases: [
      {
        name: "Inhale",
        duration: 4000,
        instruction: "Breathe in slowly through your nose",
      },
      { name: "Hold", duration: 7000, instruction: "Hold your breath gently" },
      {
        name: "Exhale",
        duration: 8000,
        instruction: "Exhale slowly through your mouth",
      },
      {
        name: "Rest",
        duration: 2000,
        instruction: "Rest and prepare for the next cycle",
      },
    ],
  },
  {
    name: "Box Breathing",
    description: "Equal timing: inhale, hold, exhale, hold",
    cycles: 4,
    phases: [
      { name: "Inhale", duration: 4000, instruction: "Breathe in slowly" },
      { name: "Hold", duration: 4000, instruction: "Hold your breath" },
      { name: "Exhale", duration: 4000, instruction: "Breathe out slowly" },
      { name: "Hold", duration: 4000, instruction: "Hold empty" },
    ],
  },
];

const journalingPrompts = [
  "What am I feeling right now, and what might be causing these feelings?",
  "What thoughts are going through my mind? Are they helpful or unhelpful?",
  "What evidence do I have for and against this thought?",
  "How would I advise a friend who was thinking this way?",
  "What's one thing I'm grateful for today?",
  "What's a small step I can take to improve my situation?",
  "What did I learn about myself today?",
  "How did I show kindness to myself or others today?",
];

const groundingTechniques = [
  { sense: "See", instruction: "Name 5 things you can see around you" },
  { sense: "Touch", instruction: "Name 4 things you can touch" },
  { sense: "Hear", instruction: "Name 3 things you can hear" },
  { sense: "Smell", instruction: "Name 2 things you can smell" },
  { sense: "Taste", instruction: "Name 1 thing you can taste" },
];

export function CBTTools({ userPreferences }: CBTToolsProps) {
  // For Breathing Exercise control
  const [phaseInstruction, setPhaseInstruction] = useState("");
  const [progress, setProgress] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [breathingState, setBreathingState] = useState({
    isActive: false,
    currentCycle: 0,
    currentPhase: 0,
    selectedExercise: 0,
  });
  const [groundingProgress, setGroundingProgress] = useState(0);
  const [reframingData, setReframingData] = useState({
    situation: "",
    automaticThought: "",
    evidence: "",
    balancedThought: "",
  });
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [goals, setGoals] = useState([
    {
      id: 1,
      text: "Practice mindfulness for 10 minutes daily",
      completed: false,
    },
    { id: 2, text: "Write in journal 3 times this week", completed: true },
    { id: 3, text: "Try one new coping strategy", completed: false },
  ]);

  const tools = [
    {
      id: "reframing" as Tool,
      title: "Thought Reframing",
      description: "Challenge and reframe negative thoughts",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "breathing" as Tool,
      title: "Breathing Exercises",
      description: "Guided breathing for relaxation and focus",
      icon: Wind,
      color: "from-teal-500 to-teal-600",
    },
    {
      id: "grounding" as Tool,
      title: "5-4-3-2-1 Grounding",
      description: "Connect with your senses to stay present",
      icon: Target,
      color: "from-green-500 to-green-600",
    },
    {
      id: "journaling" as Tool,
      title: "Guided Journaling",
      description: "Reflective writing with therapeutic prompts",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const startBreathingExercise = () => {
    setBreathingState({
      isActive: true,
      currentCycle: 0,
      currentPhase: 0,
      selectedExercise: breathingState.selectedExercise,
    });
    runBreathingCycle();
  };

  const runBreathingCycle = () => {
    const exercise = breathingExercises[breathingState.selectedExercise];
    let phaseIndex = 0;
    let cycleCount = 0;

    const runPhase = () => {
      const phase = exercise.phases[phaseIndex];
      setBreathingState((prev) => ({ ...prev, currentPhase: phaseIndex }));

      const timer = setTimeout(() => {
        phaseIndex++;
        if (phaseIndex >= exercise.phases.length) {
          phaseIndex = 0;
          cycleCount++;
          setBreathingState((prev) => ({ ...prev, currentCycle: cycleCount }));
        }

        if (cycleCount < exercise.cycles && breathingState.isActive) {
          runPhase();
        } else {
          setBreathingState((prev) => ({ ...prev, isActive: false }));
        }
      }, phase.duration);
    };

    runPhase();
  };

  const stopBreathingExercise = () => {
    setBreathingState((prev) => ({ ...prev, isActive: false }));
  };
  useEffect(() => {
    if (!breathingState.isActive) return;

    const exercise = breathingExercises[breathingState.selectedExercise];
    if (!exercise) return;

    let phaseIndex = 0;
    let cycleCount = 0;

    setPhaseInstruction(exercise.phases[phaseIndex].instruction);
    setProgress(0);

    const runPhase = () => {
      const phase = exercise.phases[phaseIndex];
      setPhaseInstruction(phase.instruction);

      const timer = setTimeout(() => {
        phaseIndex++;
        if (phaseIndex >= exercise.phases.length) {
          phaseIndex = 0;
          cycleCount++;
          setBreathingState((prev) => ({
            ...prev,
            currentCycle: cycleCount,
          }));
        }

        if (cycleCount < exercise.cycles && breathingState.isActive) {
          runPhase();
        } else {
          setBreathingState((prev) => ({ ...prev, isActive: false }));
          setPhaseInstruction("Well done! Take a moment to rest.");
        }
      }, phase.duration);
    };

    runPhase();
  }, [breathingState.isActive, breathingState.selectedExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingState.isActive) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / totalDuration) * 100, 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [breathingState.isActive, breathingState.selectedExercise]);
  // Voice guidance effect
  useEffect(() => {
    if (voiceEnabled && phaseInstruction) {
      const utterance = new SpeechSynthesisUtterance(phaseInstruction);
      utterance.rate = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  }, [phaseInstruction, voiceEnabled]);

  const renderToolContent = () => {
    switch (activeTool) {
      case "reframing":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Cognitive Reframing Exercise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm mb-2">
                  1. Describe the situation:
                </label>
                <Textarea
                  value={reframingData.situation}
                  onChange={(e) =>
                    setReframingData((prev) => ({
                      ...prev,
                      situation: e.target.value,
                    }))
                  }
                  placeholder="What happened? Describe the facts objectively..."
                  className="w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  2. What was your automatic thought?
                </label>
                <Textarea
                  value={reframingData.automaticThought}
                  onChange={(e) =>
                    setReframingData((prev) => ({
                      ...prev,
                      automaticThought: e.target.value,
                    }))
                  }
                  placeholder="What went through your mind first?"
                  className="w-full"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  3. What evidence supports or challenges this thought?
                </label>
                <Textarea
                  value={reframingData.evidence}
                  onChange={(e) =>
                    setReframingData((prev) => ({
                      ...prev,
                      evidence: e.target.value,
                    }))
                  }
                  placeholder="Is there evidence for and against this thought?"
                  className="w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  4. What's a more balanced thought?
                </label>
                <Textarea
                  value={reframingData.balancedThought}
                  onChange={(e) =>
                    setReframingData((prev) => ({
                      ...prev,
                      balancedThought: e.target.value,
                    }))
                  }
                  placeholder="How might you think about this more objectively?"
                  className="w-full"
                  rows={3}
                />
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Save Reframing Exercise
              </Button>
            </CardContent>
          </Card>
        );

      case "breathing":
        const currentExercise =
          breathingExercises[breathingState.selectedExercise];
        const totalDuration = currentExercise.phases.reduce(
          (sum, p) => sum + p.duration,
          0
        );

        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-teal-500" />
                Guided Breathing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {breathingExercises.map((exercise, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setBreathingState((prev) => ({
                        ...prev,
                        selectedExercise: index,
                      }))
                    }
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      breathingState.selectedExercise === index
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <h3 className="font-semibold mb-1">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">
                      {exercise.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center mt-8 space-y-4">
                <motion.div
                  className="w-48 h-48 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-lg"
                  animate={
                    breathingState.isActive
                      ? { scale: [1, 1.3, 1] }
                      : { scale: [1] }
                  }
                  transition={{
                    duration:
                      currentExercise.phases.reduce(
                        (sum, phase) => sum + phase.duration,
                        0
                      ) / 4000,
                    repeat: breathingState.isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  {breathingState.isActive ? "Breathe..." : "Ready?"}
                </motion.div>

                <p className="text-gray-700 text-center">{phaseInstruction}</p>
                <Progress value={progress} className="w-64" />

                <div className="flex justify-center gap-3 mt-4">
                  {!breathingState.isActive ? (
                    <Button
                      onClick={() =>
                        setBreathingState((prev) => ({
                          ...prev,
                          isActive: true,
                        }))
                      }
                      className="bg-teal-500 hover:bg-teal-600"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        setBreathingState((prev) => ({
                          ...prev,
                          isActive: false,
                        }))
                      }
                      variant="outline"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "grounding":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                5-4-3-2-1 Grounding Technique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                This exercise helps you stay present by focusing on your senses.
                Go through each step slowly and mindfully.
              </p>

              <div className="space-y-4">
                {groundingTechniques.map((technique, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      groundingProgress > index
                        ? "border-green-500 bg-green-50"
                        : groundingProgress === index
                        ? "border-green-300 bg-green-25"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="mb-1">
                          {technique.sense}: {technique.instruction}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Take your time and really focus on each item
                        </p>
                      </div>
                      {groundingProgress > index && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Progress
                  value={(groundingProgress / groundingTechniques.length) * 100}
                />
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setGroundingProgress(Math.max(0, groundingProgress - 1))
                    }
                    disabled={groundingProgress === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() =>
                      setGroundingProgress(
                        Math.min(
                          groundingTechniques.length,
                          groundingProgress + 1
                        )
                      )
                    }
                    disabled={groundingProgress === groundingTechniques.length}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {groundingProgress === groundingTechniques.length
                      ? "Complete"
                      : "Next"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "journaling":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" />
                Guided Journaling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm mb-3">
                  Choose a prompt or write freely:
                </label>
                <div className="grid gap-2 mb-4">
                  {journalingPrompts.slice(0, 3).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPrompt(index)}
                      className={`p-3 text-left text-sm rounded-lg border transition-colors ${
                        selectedPrompt === index
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedPrompt(
                      Math.floor(Math.random() * journalingPrompts.length)
                    )
                  }
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Get Random Prompt
                </Button>
              </div>

              <div>
                <Textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder={journalingPrompts[selectedPrompt]}
                  className="w-full min-h-[200px]"
                  rows={8}
                />
              </div>

              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Save Journal Entry
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (activeTool) {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setActiveTool(null)}
          className="mb-6"
        >
          ← Back to Tools
        </Button>
        {renderToolContent()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">CBT Tools & Exercises</h2>
        <p className="text-gray-600">
          Evidence-based techniques to support your mental health journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className="cursor-pointer border-2 border-transparent hover:border-blue-200 transition-colors"
              onClick={() => setActiveTool(tool.id)}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4`}
                >
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <div className="flex items-center text-blue-600 text-sm">
                  Start Exercise
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  goal.completed
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setGoals((prev) =>
                      prev.map((g) =>
                        g.id === goal.id ? { ...g, completed: !g.completed } : g
                      )
                    )
                  }
                  className={`w-6 h-6 p-0 rounded-full ${
                    goal.completed
                      ? "bg-green-500 text-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {goal.completed && <CheckCircle className="w-4 h-4" />}
                </Button>
                <span
                  className={goal.completed ? "line-through text-gray-500" : ""}
                >
                  {goal.text}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
