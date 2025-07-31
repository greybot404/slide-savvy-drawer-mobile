import { ArrowLeft, Bookmark, Clock, Flame, CheckCircle2, Play } from "lucide-react";

interface WorkoutDetailProps {
  onBack: () => void;
}

export const WorkoutDetail = ({ onBack }: WorkoutDetailProps) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header with background image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src="/lovable-uploads/8c6cb712-ec99-4e30-8631-262e4a4f1421.png"
          alt="Boxing gloves workout"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Navigation buttons */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <button
            onClick={onBack}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-20 relative z-10 space-y-6">
        {/* Stats Cards */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500 rounded-full">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Time</p>
              <p className="text-white font-semibold">15 mins</p>
            </div>
          </div>
          
          <div className="w-px h-8 bg-gray-600" />
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500 rounded-full">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Burn</p>
              <p className="text-white font-semibold">75 kcal</p>
            </div>
          </div>
        </div>

        {/* Difficulty Tags */}
        <div className="flex space-x-3">
          <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium">
            Easy
          </span>
          <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium">
            Boxing
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">JAB AND STRAIGHT</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Let's get down and dirty learning the jab and the straight rear hand.
          </p>
        </div>

        {/* Coach Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-700 rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png"
                alt="Jocelyn Levin"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Jocelyn Levin</h3>
              <p className="text-gray-400">Coach</p>
            </div>
          </div>
          <button className="bg-gray-700 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-600 transition-colors">
            Follow
          </button>
        </div>

        {/* Rounds Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Rounds</h2>
            <span className="text-gray-400">1 / 10</span>
          </div>

          {/* Round Items */}
          <div className="space-y-3">
            {/* Traditional Jab */}
            <div className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png"
                  alt="Traditional Jab"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">Traditional Jab</h3>
                <p className="text-gray-400 text-sm">00:30</p>
              </div>
              <div className="p-2 bg-pink-500 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Up Jab */}
            <div className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/aa5baaf6-b22b-44dc-b182-4eb79dd302fc.png"
                  alt="Up Jab"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">Up Jab</h3>
                <p className="text-gray-400 text-sm">01:00</p>
              </div>
              <div className="p-2 bg-gray-600 rounded-full">
                <Play className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Resume Workout Button */}
        <div className="pb-8">
          <button className="w-full bg-white text-black py-4 rounded-2xl text-lg font-semibold hover:bg-gray-100 transition-colors">
            Resume workout
          </button>
        </div>
      </div>
    </div>
  );
};