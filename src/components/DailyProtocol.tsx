import { useState } from "react";
import { Search, Utensils, Power, Check, Activity, Heart, Brain, Dumbbell } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FoodCalorieTracker } from "./FoodCalorieTracker";

export const DailyProtocol = () => {
  const [scannedFood, setScannedFood] = useState<string | null>(null);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showFoodTracker, setShowFoodTracker] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([
    { task: "Morning Hydration", description: "Drink 500ml of water upon waking", completed: false },
    { task: "Skincare Routine", description: "Complete morning skincare regimen", completed: false },
    { task: "Workout Session", description: "30-45 minutes of physical activity", completed: false },
  ]);

  // Mock data for the spider web chart - these would come from actual app data
  const overallScoreData = [
    { subject: 'Fitness', score: 75, fullMark: 100 },
    { subject: 'Fashion', score: 60, fullMark: 100 },
    { subject: 'Body', score: 80, fullMark: 100 },
    { subject: 'Presence', score: 70, fullMark: 100 },
    { subject: 'Daily', score: 85, fullMark: 100 },
  ];

  const shortcuts = [
    { icon: Activity, label: "Quick Workout", color: "bg-black" },
    { icon: Heart, label: "Meditation", color: "bg-black" },
    { icon: Brain, label: "Learning", color: "bg-black" },
    { icon: Utensils, label: "Meal Prep", color: "bg-black" },
  ];

  const quitOptions = [
    "Smoking",
    "Drinking",
    "Porn",
    "Procrastinating", 
    "Lack of Consistency",
    "Social Media Addiction",
    "Junk Food",
    "Negative Thinking"
  ];

  const handleFoodScan = () => {
    setShowFoodTracker(true);
  };

  const toggleTaskCompletion = (index: number) => {
    setDailyTasks(prev => prev.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const calculateOverallScore = () => {
    const totalScore = overallScoreData.reduce((sum, item) => sum + item.score, 0);
    return Math.round(totalScore / overallScoreData.length);
  };

  const chartConfig = {
    score: {
      label: "Score",
      color: "#000000",
    },
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Ask me a question?"
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      {/* Header with Icons */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Daily Protocol</h2>
          <p className="text-gray-600">Stay on track with your goals</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowQuitModal(true)}
            className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
          >
            <Power className="w-6 h-6" />
          </button>
          <button
            onClick={handleFoodScan}
            className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg relative"
          >
            <Utensils className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Daily Progress - Checkbox Style */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Progress</h3>
        <div className="space-y-4">
          {dailyTasks.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <button
                onClick={() => toggleTaskCompletion(index)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  item.completed 
                    ? 'bg-black border-black text-white' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {item.completed && <Check className="w-4 h-4" />}
              </button>
              <div className="flex-1">
                <h4 className={`font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {item.task}
                </h4>
                <p className={`text-sm ${item.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions/Shortcuts */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {shortcuts.map((shortcut, index) => (
            <button
              key={index}
              className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <div className={`p-2 ${shortcut.color} text-white rounded-lg`}>
                <shortcut.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-900">{shortcut.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overall Score Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Overall Score</h3>
            <p className="text-gray-600">Your performance across all areas</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-black">{calculateOverallScore()}</div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </div>
        
        <div className="h-64">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={overallScoreData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" className="text-xs" />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={false}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#000000"
                  fill="#000000"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Quit Section Modal */}
      {showQuitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Quit Section</h3>
              <button
                onClick={() => setShowQuitModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Power className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Choose what you want to quit:</p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {quitOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowQuitModal(false)}
              className="w-full mt-4 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Food Calorie Tracker Modal */}
      {showFoodTracker && (
        <FoodCalorieTracker onClose={() => setShowFoodTracker(false)} />
      )}
    </div>
  );
};