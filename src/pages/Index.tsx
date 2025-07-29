import { useState, useEffect } from "react";
import { MobileDrawer } from "@/components/MobileDrawer";
import { GenderSelection } from "@/components/GenderSelection";
import { HeightWeightSelection } from "@/components/HeightWeightSelection";
import { DailyProtocol } from "@/components/DailyProtocol";
import { FitnessModule } from "@/components/FitnessModule";
import { FashionModule } from "@/components/FashionModule";
import { BodyModule } from "@/components/BodyModule";
import { PresenceModule } from "@/components/PresenceModule";
import { RankingModal } from "@/components/RankingModal";
import { Menu, Home as HomeIcon, Dumbbell, Shirt, Scan, Brain, Trophy } from "lucide-react";

const Index = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [heightWeightData, setHeightWeightData] = useState<{height: string; weight: string; unit: string} | null>(null);
  const [activeModule, setActiveModule] = useState("home");
  const [activeTab, setActiveTab] = useState("");
  const [startX, setStartX] = useState<number | null>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleRanking = () => {
    setIsRankingOpen(!isRankingOpen);
  };

  const handleCategorySelect = (tab: string, module: string) => {
    setActiveModule(module);
    setActiveTab(tab);
  };

  const bottomNavItems = [
    { id: "home", icon: HomeIcon, label: "Home" },
    { id: "fitness", icon: Dumbbell, label: "Fitness" },
    { id: "fashion", icon: Shirt, label: "Fashion" },
    { id: "body", icon: Scan, label: "Body" },
    { id: "presence", icon: Brain, label: "Presence" },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX) return;

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
      const currentIndex = bottomNavItems.findIndex(item => item.id === activeModule);
      
      if (diffX > 0 && currentIndex < bottomNavItems.length - 1) {
        setActiveModule(bottomNavItems[currentIndex + 1].id);
      } else if (diffX < 0 && currentIndex > 0) {
        setActiveModule(bottomNavItems[currentIndex - 1].id);
      }
    }
    
    setStartX(null);
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case "home":
        return (
          <div className="space-y-6">
            <DailyProtocol />
          </div>
        );
      case "fitness":
        return <FitnessModule />;
      case "fashion":
        return <FashionModule />;
      case "body":
        return <BodyModule selectedGender={selectedGender} />;
      case "presence":
        return <PresenceModule />;
      default:
        return (
          <div className="space-y-6">
            <DailyProtocol />
          </div>
        );
    }
  };

  if (!selectedGender) {
    return <GenderSelection onGenderSelect={setSelectedGender} />;
  }

  if (selectedGender && !heightWeightData) {
    return (
      <HeightWeightSelection 
        onComplete={setHeightWeightData}
        onBack={() => setSelectedGender(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={toggleDrawer}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <h1 className="text-xl font-medium text-gray-900">
            Chesel
          </h1>
          
          <button
            onClick={toggleRanking}
            className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
            aria-label="View rankings"
          >
            <Trophy className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content with Swipe Navigation */}
      <main 
        className="flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full overflow-y-auto">
          {renderActiveModule()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 transition-all duration-200 ${
                activeModule === item.id
                  ? 'bg-black text-white rounded-full px-4 py-2'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium mt-1">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        onCategorySelect={handleCategorySelect}
      />

      {/* Ranking Modal */}
      <RankingModal 
        isOpen={isRankingOpen} 
        onClose={() => setIsRankingOpen(false)}
      />
    </div>
  );
};

export default Index;