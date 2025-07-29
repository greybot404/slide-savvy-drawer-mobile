import { useState } from "react";
import { Search, BookOpen, Brain, TrendingUp, Package, Headphones, FileText, Lightbulb, ArrowLeft } from "lucide-react";

export const PresenceModule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simulate search results
      setSearchResults({
        topic: searchQuery,
        overview: "Understanding body language, confidence building, and social presence mastery.",
        categories: [
          {
            id: 'learn',
            title: 'Learn & Articles',
            icon: BookOpen,
            items: [
              "The Psychology of Presence",
              "Body Language Fundamentals",
              "Confidence Building Techniques",
              "Social Dynamics Mastery"
            ]
          },
          {
            id: 'books',
            title: 'Books',
            icon: FileText,
            items: [
              "Presence by Amy Cuddy",
              "The Like Switch by Jack Schafer",
              "Charisma on Command by Charlie Houpert",
              "Never Eat Alone by Keith Ferrazzi"
            ]
          },
          {
            id: 'research',
            title: 'Research',
            icon: Brain,
            items: [
              "Harvard Studies on Power Posing",
              "MIT Research on Social Presence",
              "Stanford Leadership Psychology",
              "Princeton First Impressions Study"
            ]
          },
          {
            id: 'theories',
            title: 'Theories',
            icon: Lightbulb,
            items: [
              "Social Learning Theory",
              "Self-Perception Theory",
              "Impression Management",
              "Nonverbal Communication Theory"
            ]
          },
          {
            id: 'probability',
            title: 'Probability',
            icon: TrendingUp,
            items: [
              "Success Rate: 85% with proper posture",
              "Confidence Boost: 67% improvement",
              "First Impression: 93% accuracy",
              "Leadership Perception: 78% increase"
            ]
          },
          {
            id: 'products',
            title: 'Products',
            icon: Package,
            items: [
              "Posture Correction Devices",
              "Voice Training Apps",
              "Confidence Building Courses",
              "Body Language Analysis Tools"
            ]
          },
          {
            id: 'podcasts',
            title: 'Podcasts',
            icon: Headphones,
            items: [
              "The Science of Success",
              "Charisma on Command Podcast",
              "The Tim Ferriss Show",
              "Jordan Harbinger Show"
            ]
          }
        ]
      });
    }
  };

  const CategoryDetail = ({ category }: { category: any }) => (
    <div className="p-6 space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <category.icon className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">{category.title}</h2>
      </div>
      
      <div className="space-y-3">
        {category.items.map((item: string, index: number) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <p className="text-gray-900 font-medium">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (selectedCategory && searchResults) {
    const category = searchResults.categories.find((cat: any) => cat.id === selectedCategory);
    return <CategoryDetail category={category} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Presence Research</h2>
        <p className="text-gray-600">Search for topics to get comprehensive learning resources, research, and recommendations</p>
        
        {/* Search Bar */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for presence topics (e.g., body language, confidence, charisma...)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            className="bg-primary text-primary-foreground p-3 rounded-2xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!searchResults ? (
        <div className="text-center text-gray-500 mt-12">
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Start your presence research journey</p>
          <p className="text-sm">Search for any topic related to confidence, body language, or social presence</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Topic: {searchResults.topic}</h3>
            <p className="text-gray-600 text-sm">{searchResults.overview}</p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            {searchResults.categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <category.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-gray-900">{category.title}</h4>
                </div>
                <p className="text-xs text-gray-500">{category.items.length} items</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSearchResults(null);
              setSearchQuery('');
            }}
            className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-medium hover:bg-primary/90 transition-colors"
          >
            New Search
          </button>
        </div>
      )}
    </div>
  );
};