import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  Moon, 
  Sun, 
  Globe,
  Palette,
  Volume2,
  VolumeX
} from 'lucide-react';
import { UserPreferences } from '../App';

interface SettingsPanelProps {
  userPreferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function SettingsPanel({ userPreferences, onUpdatePreferences }: SettingsPanelProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    onUpdatePreferences({
      ...userPreferences,
      [key]: value
    });
  };

  const exportData = () => {
    // In a real app, this would gather all user data
    const userData = {
      preferences: userPreferences,
      exportDate: new Date().toISOString(),
      // Add other user data here
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindful-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Settings & Preferences</h2>
        <p className="text-gray-600">
          Customize your experience and manage your data
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile & Personalization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm mb-2 block">Display Name</Label>
            <Input
              value={userPreferences.name || ''}
              onChange={(e) => handlePreferenceChange('name', e.target.value)}
              placeholder="How would you like to be addressed?"
            />
          </div>

          <div>
            <Label className="text-sm mb-3 block">AI Companion Style</Label>
            <RadioGroup
              value={userPreferences.persona}
              onValueChange={(value) => handlePreferenceChange('persona', value)}
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="friendly-peer" id="friendly-peer-setting" />
                <div>
                  <Label htmlFor="friendly-peer-setting" className="text-sm">Friendly Peer</Label>
                  <p className="text-xs text-gray-600">Casual, understanding friend</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="calm-coach" id="calm-coach-setting" />
                <div>
                  <Label htmlFor="calm-coach-setting" className="text-sm">Calm Coach</Label>
                  <p className="text-xs text-gray-600">Gentle guide with structured support</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="expert-guide" id="expert-guide-setting" />
                <div>
                  <Label htmlFor="expert-guide-setting" className="text-sm">Expert Guide</Label>
                  <p className="text-xs text-gray-600">Professional, evidence-based insights</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm mb-3 block">Interaction Style</Label>
            <RadioGroup
              value={userPreferences.interactionStyle}
              onValueChange={(value) => handlePreferenceChange('interactionStyle', value)}
              className="grid grid-cols-1 gap-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="text-only" id="text-only-setting" />
                <div>
                  <Label htmlFor="text-only-setting" className="text-sm">Text Only</Label>
                  <p className="text-xs text-gray-600">Traditional chat interface</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="voice-enabled" id="voice-enabled-setting" />
                <div>
                  <Label htmlFor="voice-enabled-setting" className="text-sm">Voice Enabled</Label>
                  <p className="text-xs text-gray-600">Speech input and audio responses</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border">
                <RadioGroupItem value="multimodal" id="multimodal-setting" />
                <div>
                  <Label htmlFor="multimodal-setting" className="text-sm">Multimodal</Label>
                  <p className="text-xs text-gray-600">Text, voice, and emotion detection</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance & Display
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Dark Mode</Label>
              <p className="text-xs text-gray-600">Switch to dark theme for reduced eye strain</p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="ml-4"
            />
          </div>

          <div>
            <Label className="text-sm mb-3 block">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm mb-3 block">Language</Label>
            <Select value={userPreferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Audio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications & Audio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Daily Check-in Reminders</Label>
              <p className="text-xs text-gray-600">Get gentle reminders to track your mood</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Sound Effects</Label>
              <p className="text-xs text-gray-600">Play calming sounds during exercises</p>
            </div>
            <Switch
              checked={soundEffects}
              onCheckedChange={setSoundEffects}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm">Save Conversation History</Label>
              <p className="text-xs text-gray-600">Remember conversations for continuity</p>
            </div>
            <Switch
              checked={userPreferences.personalization}
              onCheckedChange={(checked) => handlePreferenceChange('personalization', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Data Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm mb-2">🔒 Your Privacy Matters</h3>
            <ul className="text-xs space-y-1 text-gray-700">
              <li>• All data is encrypted and stored securely</li>
              <li>• You can export or delete your data at any time</li>
              <li>• No personal information is shared with third parties</li>
              <li>• Sessions can be kept anonymous if preferred</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={exportData}
              className="flex-1 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export My Data
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1 flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Data</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your conversation history, mood entries, 
                    preferences, and progress. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearAllData}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm mb-3">Data Usage Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-lg">12</p>
                <p className="text-xs text-gray-600">Conversations</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-lg">8</p>
                <p className="text-xs text-gray-600">Mood Entries</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-lg">3</p>
                <p className="text-xs text-gray-600">CBT Sessions</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-lg">7</p>
                <p className="text-xs text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About & Support */}
      <Card>
        <CardHeader>
          <CardTitle>About & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Version</span>
            <Badge variant="secondary">1.0.0</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Last Updated</span>
            <span className="text-sm text-gray-600">September 2025</span>
          </div>

          <Separator />

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Mindful</strong> is designed to support your mental health journey 
              with empathy, privacy, and evidence-based techniques.
            </p>
            <p>
              If you're experiencing a mental health crisis, please contact your local 
              emergency services or mental health helpline immediately.
            </p>
          </div>

          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}