import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Heart, Shield, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Empathetic Support",
      description: "AI companion designed to understand and support your emotional well-being"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations are encrypted and you maintain full control over your data"
    },
    {
      icon: Users,
      title: "Personalized Care",
      description: "Adapts to your communication style and cultural preferences"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Welcome to Mindful
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your compassionate AI companion for mental health support and personal growth
          </p>
        </motion.div>

        {showContent && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100"
                >
                  <feature.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                onClick={onComplete}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-xl"
              >
                Begin Your Journey
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                Free to use • No signup required • Complete privacy
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}