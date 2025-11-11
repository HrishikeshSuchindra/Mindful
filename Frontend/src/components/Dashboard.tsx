import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Heart, Brain, Smile, Frown, Meh, Plus, Award } from 'lucide-react';
import { MoodEntry, Message } from './MainInterface';
import { UserPreferences } from '../App';

interface DashboardProps {
  moodEntries: MoodEntry[];
  onAddMoodEntry: (mood: number, notes?: string, activities?: string[]) => void;
  messages: Message[];
  userPreferences: UserPreferences;
}

const moodEmojis = {
  1: '😢', 2: '😔', 3: '😕', 4: '😐', 5: '😶',
  6: '🙂', 7: '😊', 8: '😄', 9: '😁', 10: '🤩'
};

const activities = [
  'exercise', 'meditation', 'journaling', 'socializing', 
  'reading', 'music', 'nature', 'therapy', 'sleep', 'nutrition'
];

export function Dashboard({ moodEntries, onAddMoodEntry, messages, userPreferences }: DashboardProps) {
  const [showMoodEntry, setShowMoodEntry] = useState(false);
  const [currentMood, setCurrentMood] = useState([7]);
  const [moodNotes, setMoodNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Prepare mood chart data
  const moodChartData = moodEntries
    .slice(-14) // Last 14 entries
    .map(entry => ({
      date: entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood,
      fullDate: entry.date
    }))
    .reverse();

  // Calculate stats
  const averageMood = moodEntries.length > 0 
    ? moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length 
    : 0;
  
  const lastWeekEntries = moodEntries.filter(
    entry => entry.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  
  const moodTrend = lastWeekEntries.length >= 2 
    ? lastWeekEntries[0].mood - lastWeekEntries[lastWeekEntries.length - 1].mood
    : 0;

  const conversationCount = messages.filter(m => m.sender === 'user').length;
  const streakDays = 7; // Mock streak data

  // Activity frequency data
  const activityData = activities.map(activity => {
    const count = moodEntries.reduce((sum, entry) => 
      sum + (entry.activities?.includes(activity) ? 1 : 0), 0
    );
    return { activity, count };
  }).filter(item => item.count > 0);

  const handleMoodSubmit = () => {
    onAddMoodEntry(currentMood[0], moodNotes, selectedActivities);
    setShowMoodEntry(false);
    setMoodNotes('');
    setSelectedActivities([]);
    setCurrentMood([7]);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const achievements = [
    { title: '7-Day Streak', description: 'Checked in for 7 consecutive days', icon: Award, earned: true },
    { title: 'Mindful Week', description: 'Completed 5 mindfulness exercises', icon: Brain, earned: true },
    { title: 'Mood Warrior', description: 'Tracked mood for 30 days', icon: Heart, earned: false },
    { title: 'Progress Champion', description: 'Maintained positive trend for 2 weeks', icon: TrendingUp, earned: false }
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Average Mood</p>
                <p className="text-2xl">{averageMood.toFixed(1)}</p>
              </div>
              <Smile className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">Weekly Trend</p>
                <p className="text-2xl">{moodTrend > 0 ? '+' : ''}{moodTrend.toFixed(1)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Conversations</p>
                <p className="text-2xl">{conversationCount}</p>
              </div>
              <Heart className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Current Streak</p>
                <p className="text-2xl">{streakDays} days</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mood Entry Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Mood Tracking</CardTitle>
            <Button 
              onClick={() => setShowMoodEntry(!showMoodEntry)}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Log Mood
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showMoodEntry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-blue-50 rounded-lg space-y-4"
            >
              <div>
                <label className="block text-sm mb-2">How are you feeling today?</label>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{moodEmojis[currentMood[0] as keyof typeof moodEmojis]}</span>
                  <Slider
                    value={currentMood}
                    onValueChange={setCurrentMood}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">{currentMood[0]}/10</span>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Activities today:</label>
                <div className="flex flex-wrap gap-2">
                  {activities.map(activity => (
                    <Button
                      key={activity}
                      variant={selectedActivities.includes(activity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleActivity(activity)}
                      className="text-xs capitalize"
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Notes (optional):</label>
                <Textarea
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  placeholder="What's contributing to your mood today?"
                  className="w-full"
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={handleMoodSubmit} className="bg-blue-500 hover:bg-blue-600">
                  Save Entry
                </Button>
                <Button variant="outline" onClick={() => setShowMoodEntry(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {moodChartData.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {activityData.length > 0 ? (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="activity" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Start logging activities to see insights here
              </p>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <achievement.icon className={`w-6 h-6 ${
                    achievement.earned ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <h4 className={`text-sm ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{moodEmojis[entry.mood as keyof typeof moodEmojis]}</span>
                  <div>
                    <p className="text-sm">{entry.date.toLocaleDateString()}</p>
                    {entry.notes && (
                      <p className="text-xs text-gray-600">{entry.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{entry.mood}/10</Badge>
                  {entry.activities && entry.activities.length > 0 && (
                    <div className="flex gap-1">
                      {entry.activities.slice(0, 3).map((activity, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                      {entry.activities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{entry.activities.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}