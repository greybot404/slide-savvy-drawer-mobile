import { useState } from "react";
import { Upload, Camera, Target, Calendar, TrendingUp, Award, DollarSign, Utensils, Pill, Dumbbell, Scan, AlertTriangle } from "lucide-react";
import { WorkoutDetail } from "./WorkoutDetail";

export const FitnessModule = () => {
  const [step, setStep] = useState<'plan' | 'upload-current' | 'upload-goal' | 'goal-options' | 'results' | 'workout-detail'>('plan');
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [goalPhoto, setGoalPhoto] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showWeeklyScanner, setShowWeeklyScanner] = useState(true); // Shows once per week
  const [showGoalWarning, setShowGoalWarning] = useState(false);
  const [photoConfirmation, setPhotoConfirmation] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Tue');

  const weeklyPlan = [
    { day: "Mon", workout: "Morning Stretch", duration: "10 mins", difficulty: "Easy", type: "Flexibility", completed: false },
    { day: "Tue", workout: "Jab and Straight", duration: "15 mins", difficulty: "Easy", type: "Boxing", completed: false },
    { day: "Wed", workout: "Core Blast", duration: "20 mins", difficulty: "Medium", type: "Strength", completed: false },
    { day: "Thu", workout: "Cardio HIIT", duration: "25 mins", difficulty: "Hard", type: "Cardio", completed: false },
    { day: "Fri", workout: "Upper Body", duration: "30 mins", difficulty: "Medium", type: "Strength", completed: false },
    { day: "Sat", workout: "Yoga Flow", duration: "45 mins", difficulty: "Easy", type: "Flexibility", completed: false },
    { day: "Sun", workout: "Rest Day", duration: "Recovery", difficulty: "Rest", type: "Recovery", completed: false },
  ];

  const dailyWorkouts = {
    "Mon": [
      {
        title: "Morning Stretch & Flow",
        duration: "20 mins",
        tags: ["Easy", "Flexibility"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-green-500 to-teal-600"
      },
      {
        title: "Light Cardio Walk",
        duration: "30 mins",
        tags: ["Easy", "Cardio"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-blue-500 to-cyan-600"
      }
    ],
    "Tue": [
      {
        title: "Push Day: Chest & Triceps",
        duration: "60 mins",
        tags: ["Medium", "Strength"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-blue-600 to-blue-800"
      },
      {
        title: "Boxing Fundamentals",
        duration: "45 mins",
        tags: ["Easy", "Boxing"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-red-600 to-orange-700"
      }
    ],
    "Wed": [
      {
        title: "Core Blast & Abs",
        duration: "40 mins",
        tags: ["Medium", "Core"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-purple-600 to-purple-800"
      },
      {
        title: "Functional Movement",
        duration: "35 mins",
        tags: ["Medium", "Functional"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-indigo-600 to-purple-700"
      }
    ],
    "Thu": [
      {
        title: "HIIT Cardio Blast",
        duration: "45 mins",
        tags: ["Hard", "Cardio"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-red-600 to-pink-700"
      },
      {
        title: "Sprint Intervals",
        duration: "25 mins",
        tags: ["Hard", "Speed"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-orange-600 to-red-600"
      }
    ],
    "Fri": [
      {
        title: "Pull Day: Back & Biceps",
        duration: "65 mins",
        tags: ["Medium", "Strength"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-green-600 to-emerald-700"
      },
      {
        title: "Upper Body Power",
        duration: "50 mins",
        tags: ["Hard", "Power"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-slate-600 to-gray-800"
      }
    ],
    "Sat": [
      {
        title: "Leg Day: Quads & Glutes",
        duration: "70 mins",
        tags: ["Hard", "Legs"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-yellow-600 to-orange-700"
      },
      {
        title: "Lower Body Burn",
        duration: "55 mins",
        tags: ["Medium", "Strength"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-amber-600 to-yellow-700"
      }
    ],
    "Sun": [
      {
        title: "Recovery Yoga",
        duration: "60 mins",
        tags: ["Easy", "Recovery"],
        image: "/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png",
        gradient: "from-teal-500 to-green-600"
      },
      {
        title: "Meditation & Stretch",
        duration: "30 mins",
        tags: ["Easy", "Mindfulness"],
        image: "/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png",
        gradient: "from-sky-500 to-blue-600"
      }
    ]
  };

  const supplementStack = [
    { name: "Whey Protein", dosage: "25g post-workout", cost: "$0.80/day", benefit: "Muscle recovery & growth" },
    { name: "Creatine Monohydrate", dosage: "5g daily", cost: "$0.15/day", benefit: "Strength & power increase" },
    { name: "L-Carnitine", dosage: "2g pre-workout", cost: "$0.50/day", benefit: "Fat burning support" },
    { name: "Multivitamin", dosage: "1 tablet daily", cost: "$0.30/day", benefit: "Overall health support" },
  ];

  const dietPlan = [
    {
      meal: "Breakfast",
      time: "7:00 AM",
      foods: ["3 whole eggs + 2 egg whites", "1 cup oatmeal", "1 banana", "1 tbsp almond butter"],
      calories: 520,
      protein: "28g",
      cost: "$2.50"
    },
    {
      meal: "Mid-Morning Snack",
      time: "10:00 AM",
      foods: ["Greek yogurt (200g)", "1 tbsp honey", "Mixed berries"],
      calories: 280,
      protein: "20g",
      cost: "$1.80"
    },
    {
      meal: "Lunch",
      time: "1:00 PM",
      foods: ["150g chicken breast", "1 cup brown rice", "Mixed vegetables", "Olive oil (1 tbsp)"],
      calories: 650,
      protein: "45g",
      cost: "$3.20"
    },
    {
      meal: "Pre-Workout",
      time: "4:00 PM",
      foods: ["1 apple", "1 tbsp peanut butter"],
      calories: 190,
      protein: "4g",
      cost: "$0.80"
    },
    {
      meal: "Post-Workout",
      time: "6:00 PM",
      foods: ["Protein shake", "1 banana"],
      calories: 250,
      protein: "25g",
      cost: "$1.20"
    },
    {
      meal: "Dinner",
      time: "8:00 PM",
      foods: ["150g salmon", "Sweet potato (200g)", "Green salad", "Avocado (1/2)"],
      calories: 580,
      protein: "35g",
      cost: "$4.50"
    }
  ];

  const goalOptions = [
    { id: 'gain', label: 'Gain Weight', icon: TrendingUp, description: 'Build muscle mass and increase body weight' },
    { id: 'lose', label: 'Lose Weight', icon: Target, description: 'Reduce body fat and achieve lean physique' },
    { id: 'conditioning', label: 'Conditioning', icon: Award, description: 'Improve overall fitness and endurance' }
  ];

  const totalDailyCosts = {
    food: dietPlan.reduce((sum, meal) => sum + parseFloat(meal.cost.replace('$', '')), 0),
    supplements: supplementStack.reduce((sum, supp) => sum + parseFloat(supp.cost.replace('$', '').split('/')[0]), 0),
  };

  const handleCurrentPhotoUpload = () => {
    if (currentPhoto) {
      setPhotoConfirmation(true);
      return;
    }
    setCurrentPhoto("current-photo-uploaded");
    if (!goalPhoto) {
      setStep('upload-goal');
    } else {
      setStep('results');
    }
  };

  const handleGoalPhotoUpload = () => {
    if (goalPhoto && goalPhoto !== "goal-photo-uploaded") {
      setShowGoalWarning(true);
    }
    setGoalPhoto("goal-photo-uploaded");
    setStep('results');
  };

  const handleSkipGoal = () => {
    setStep('goal-options');
  };

  const handleGoalSelection = (goalId: string) => {
    setSelectedGoal(goalId);
    setStep('results');
  };

  const confirmPhotoAnalysis = () => {
    setPhotoConfirmation(false);
    setStep('results');
  };

  const handleWorkoutClick = () => {
    console.log('Workout click triggered, changing step to workout-detail');
    setStep('workout-detail');
  };

  if (step === 'workout-detail') {
    return <WorkoutDetail onBack={() => setStep('plan')} />;
  }

  if (step === 'plan') {
    return (
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        {/* Top Section with Greeting and Scanner */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Hi, Alberto</p>
            <h1 className="text-3xl font-bold text-black leading-tight">LET'S KICK OFF YOUR DAY</h1>
          </div>
          {showWeeklyScanner && (
            <button
              onClick={() => setStep('upload-current')}
              className="p-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-colors"
            >
              <Scan className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Main Layout with Vertical Weekday Selector */}
        <div className="flex space-x-4">
          {/* Left Side Vertical Weekday Selector */}
          <div className="bg-white rounded-2xl p-3 flex flex-col justify-center space-y-2 w-[80px] shadow-sm">
            {weeklyPlan.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-200 ${
                  selectedDay === day.day 
                    ? 'bg-black text-white shadow-lg' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                <span className="text-xs font-medium">{day.day}</span>
                <div className={`w-2 h-2 rounded-full mt-1 ${
                  day.completed 
                    ? 'bg-green-500' 
                    : selectedDay === day.day 
                      ? 'bg-red-500' 
                      : 'bg-gray-300'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Side Content */}
          <div className="flex-1 space-y-4">
            {/* Your Plan Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Your Plan</h2>
                <button className="text-sm text-gray-600 hover:text-gray-900">See all</button>
              </div>

              {/* Workout Cards */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {dailyWorkouts[selectedDay]?.map((workout, index) => (
                  <button 
                    key={index}
                    onClick={handleWorkoutClick}
                    className={`relative min-w-[260px] h-[160px] bg-gradient-to-br ${workout.gradient} rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer flex-shrink-0`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <img 
                      src={workout.image}
                      alt={workout.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {workout.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{workout.title}</h3>
                      <p className="text-sm opacity-90">{workout.duration}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Collections Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Collections</h2>
                <button className="text-sm text-gray-600 hover:text-gray-900">See all</button>
              </div>

              <div className="flex space-x-3 overflow-x-auto pb-2">
                {/* Full Body Collection */}
                <div className="relative min-w-[220px] h-[140px] bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-black/20" />
                  <img 
                    src="/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png"
                    alt="Full Body workout"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                      Easy
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                      Medium
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">Full Body</h3>
                  </div>
                </div>

                {/* Leg Day Collection */}
                <div className="relative min-w-[220px] h-[140px] bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-black/20" />
                  <img 
                    src="/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png"
                    alt="Leg Day workout"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                      Strength
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">Leg Day</h3>
                  </div>
                </div>

                {/* Core Focus Collection */}
                <div className="relative min-w-[220px] h-[140px] bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl overflow-hidden flex-shrink-0">
                  <div className="absolute inset-0 bg-black/20" />
                  <img 
                    src="/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png"
                    alt="Core Focus workout"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                      Medium
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">Core Focus</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (photoConfirmation) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Confirm Analysis</h2>
            <p className="text-gray-600">
              Are you sure you want to analyze your current progress?
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={confirmPhotoAnalysis}
              className="w-full bg-black text-white py-3 rounded-xl font-medium"
            >
              Yes, Analyze
            </button>
            <button
              onClick={() => setPhotoConfirmation(false)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'goal-options') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Choose Your Goal</h2>
            <p className="text-gray-600">
              Select your primary fitness objective
            </p>
          </div>

          <div className="space-y-4">
            {goalOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleGoalSelection(option.id)}
                className="w-full bg-white border border-gray-200 rounded-2xl p-6 text-left hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'upload-current') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Upload Current Photo</h2>
            <p className="text-gray-600">
              Take a clear, full-body photo in good lighting.
            </p>
          </div>

          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 transition-all duration-300">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Take or upload your current photo</p>
            <button
              onClick={handleCurrentPhotoUpload}
              className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200"
            >
              Upload Current Photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'upload-goal') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-full">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Upload Goal Photo</h2>
            <p className="text-gray-600">
              Upload a reference photo of your desired physique.
            </p>
          </div>

          {showGoalWarning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-800 text-sm font-medium">Goal Change Warning</p>
                <p className="text-yellow-700 text-sm">Changing goals frequently may affect your progress. Stay consistent for better results.</p>
              </div>
            </div>
          )}

          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 transition-all duration-300">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Upload your goal physique photo</p>
            <div className="space-y-3">
              <button
                onClick={handleGoalPhotoUpload}
                className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200"
              >
                Upload Goal Photo
              </button>
              <button
                onClick={handleSkipGoal}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800"
              >
                Skip and Choose Goal Type
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results view - renamed to "Trainer"
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">Trainer</h2>
          <p className="text-gray-600">Your personalized fitness plan</p>
        </div>
        {!showWeeklyScanner && (
          <button
            onClick={() => setStep('upload-current')}
            className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Scan className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Photos Analysis */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Photo Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium">Current Photo</p>
          </div>
          <div className="text-center">
            <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium">Goal Photo</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Analysis:</strong> To achieve your goal, focus on building lean muscle while reducing body fat by approximately 8-12%. Estimated timeline: 12-16 weeks with consistent effort.
          </p>
        </div>
      </div>

      {/* Weekly Workout Plan */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Dumbbell className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Customized Workout Plan</h3>
        </div>
        <div className="space-y-3">
          {weeklyPlan.map((day, index) => (
            <div key={index} className={`p-4 rounded-xl border ${
              day.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {day.day}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{day.workout}</div>
                    <div className="text-sm text-gray-600">{day.duration}</div>
                  </div>
                </div>
                {day.completed && <Award className="w-5 h-5 text-green-500" />}
              </div>
              <div className="ml-11">
                <div className="text-sm text-gray-600">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-700">
                    {day.difficulty} • {day.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplement Stack */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Pill className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Supplement Stack</h3>
        </div>
        <div className="space-y-3">
          {supplementStack.map((supplement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{supplement.name}</div>
                <div className="text-sm text-gray-600">{supplement.dosage}</div>
                <div className="text-xs text-blue-600">{supplement.benefit}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">{supplement.cost}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="font-medium text-green-800">Daily Supplement Cost:</span>
            <span className="font-bold text-green-600">${totalDailyCosts.supplements.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Customized Diet Plan */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Utensils className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Customized Diet Plan</h3>
        </div>
        <div className="space-y-4">
          {dietPlan.map((meal, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{meal.meal}</h4>
                  <p className="text-sm text-gray-600">{meal.time}</p>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium text-gray-900">{meal.calories} cal</div>
                  <div className="text-gray-600">{meal.protein} protein</div>
                  <div className="text-green-600 font-medium">{meal.cost}</div>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                {meal.foods.map((food, idx) => (
                  <li key={idx}>• {food}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Budget Summary</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-700">Daily Food Cost</span>
            <span className="font-medium text-gray-900">${totalDailyCosts.food.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-gray-700">Daily Supplements</span>
            <span className="font-medium text-gray-900">${totalDailyCosts.supplements.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
            <span className="font-medium text-blue-800">Total Daily Cost</span>
            <span className="font-bold text-blue-600">${(totalDailyCosts.food + totalDailyCosts.supplements).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
            <span className="font-medium text-green-800">Monthly Investment</span>
            <span className="font-bold text-green-600">${((totalDailyCosts.food + totalDailyCosts.supplements) * 30).toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>💡 This budget-friendly plan provides optimal nutrition for your transformation goals</p>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expected Progress</h3>
        <div className="text-4xl font-bold text-black mb-2">12-16 weeks</div>
        <p className="text-gray-600 mb-4">Estimated transformation timeline</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-black h-2 rounded-full" style={{ width: '15%' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Week 2 of 16 - Stay consistent!</p>
      </div>
    </div>
  );
};
