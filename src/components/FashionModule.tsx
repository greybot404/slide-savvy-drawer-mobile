import { useState } from "react";
import { Upload, Search, Sparkles, Palette, Eye, Shirt, Scan } from "lucide-react";

export const FashionModule = () => {
  const [mode, setMode] = useState<'select' | 'review' | 'results' | 'scanner' | 'care-results' | 'fragrance'>('select');
  const [showScanner, setShowScanner] = useState(true);

  const styleAnalysis = [
    { category: "Color Harmony", score: 88, feedback: "Excellent color coordination" },
    { category: "Fit Assessment", score: 76, feedback: "Good fit, minor adjustments needed" },
    { category: "Style Consistency", score: 92, feedback: "Cohesive personal style" },
    { category: "Occasion Appropriateness", score: 84, feedback: "Well-suited for the context" },
  ];

  const thriftStoreItems = [
    { name: "Vintage Leather Jacket", price: "$45", original: "$120", isThrift: true },
    { name: "Classic White Shirt", price: "$15", original: "$60", isThrift: true },
    { name: "Designer Jeans", price: "$89", original: "$200", isThrift: false },
  ];

  const fragranceRecommendations = [
    { name: "Tom Ford Oud Wood", type: "Cologne", price: "$350", occasion: "Formal Evening", link: "#" },
    { name: "Creed Aventus", type: "Eau de Parfum", price: "$435", occasion: "Business Meeting", link: "#" },
    { name: "Dior Sauvage", type: "Eau de Toilette", price: "$98", occasion: "Casual Day", link: "#" },
  ];

  const fabricCareData = {
    fabric: "Cotton Blend (60% Cotton, 40% Polyester)",
    washTemp: "30°C / 86°F",
    dryMethod: "Tumble dry low",
    ironTemp: "Medium heat",
    bleach: "Do not bleach",
    dryClean: "Not required",
    careInstructions: [
      "Turn inside out before washing",
      "Wash with similar colors",
      "Remove promptly from dryer",
      "Iron while slightly damp for best results",
      "Store on hangers to prevent wrinkles"
    ]
  };

  if (mode === 'select') {
    return (
      <div className="p-6 min-h-full">
        {/* Header with scanner */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Featured Attire</h1>
          {showScanner && (
            <button
              onClick={() => setMode('scanner')}
              className="p-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-colors"
            >
              <Scan className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Wardrobe Card - Top */}
        <div className="mb-8">
          <div 
            className="relative h-48 bg-gradient-to-br from-muted to-muted-foreground/20 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Shirt className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Wardrobe</h2>
              </div>
              <p className="text-white/80 text-sm">Manage your clothing collection</p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Categories</h2>
          
          <div className="space-y-4">
            {/* First Row - Horizontally Scrollable */}
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {/* Outfit Review */}
              <button
                onClick={() => setMode('review')}
                className="relative flex-shrink-0 w-64 h-32 bg-primary rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group hover:bg-primary/90"
              >
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                    <h3 className="font-semibold text-primary-foreground text-sm">Outfit Review</h3>
                  </div>
                  <p className="text-primary-foreground/80 text-xs">Get style feedback</p>
                </div>
              </button>

              {/* Fragrance */}
              <button
                onClick={() => setMode('fragrance')}
                className="relative flex-shrink-0 w-64 h-32 bg-secondary rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group hover:bg-secondary/90"
              >
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg className="w-4 h-4 text-secondary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17v5h10v-5"/>
                      <path d="M12 2l4 4-4 4-4-4z"/>
                      <path d="M12 10v7"/>
                    </svg>
                    <h3 className="font-semibold text-secondary-foreground text-sm">Fragrance</h3>
                  </div>
                  <p className="text-secondary-foreground/80 text-xs">Scent recommendations</p>
                </div>
              </button>
            </div>

            {/* Second Row - Horizontally Scrollable */}
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {/* Outfit Finder */}
              <button className="relative flex-shrink-0 w-64 h-32 bg-primary rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group hover:bg-primary/90">
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <Search className="w-4 h-4 text-primary-foreground" />
                    <h3 className="font-semibold text-primary-foreground text-sm">Outfit Finder</h3>
                  </div>
                  <p className="text-primary-foreground/80 text-xs">Find similar items</p>
                </div>
              </button>

              {/* Personal Stylist */}
              <button className="relative flex-shrink-0 w-64 h-32 bg-secondary rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group hover:bg-secondary/90">
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <Eye className="w-4 h-4 text-secondary-foreground" />
                    <h3 className="font-semibold text-secondary-foreground text-sm">Personal Stylist</h3>
                  </div>
                  <p className="text-secondary-foreground/80 text-xs">Style consultation</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'fragrance') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Fragrance Recommendations</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Enter Occasion</h3>
          <input
            type="text"
            placeholder="e.g., Business Meeting, Date Night, Casual Day..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent mb-4"
          />
          <button className="w-full bg-black text-white py-3 rounded-xl font-medium">
            Get Recommendations
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Fragrances</h3>
          <div className="space-y-4">
            {fragranceRecommendations.map((fragrance, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{fragrance.name}</h4>
                    <p className="text-sm text-gray-600">{fragrance.type} • {fragrance.occasion}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-black">{fragrance.price}</div>
                    <a href={fragrance.link} className="text-sm text-blue-600 hover:underline">
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMode('select')}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Back to Options
        </button>
      </div>
    );
  }

  if (mode === 'scanner') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Fabric Care Scanner</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18"/>
                <circle cx="6" cy="6" r="1"/>
                <circle cx="6" cy="12" r="1"/>
                <circle cx="6" cy="18" r="1"/>
                <path d="M12 6v12"/>
                <path d="M18 6v12"/>
              </svg>
            </div>
            <p className="text-gray-600 mb-4">Scan Clothing Tag</p>
            <p className="text-sm text-gray-500 mb-6">Point your camera at the care label</p>
            <button
              onClick={() => setMode('care-results')}
              className="bg-black text-white px-6 py-3 rounded-xl font-medium"
            >
              Start Scanning
            </button>
          </div>

          <button
            onClick={() => setMode('select')}
            className="w-full text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            Back to Options
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'care-results') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Fabric Care Guide</h2>
        </div>

        {/* Fabric Information */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Fabric Composition</h3>
          <p className="text-gray-700 font-medium">{fabricCareData.fabric}</p>
        </div>

        {/* Care Instructions Grid */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Wash Temperature</div>
              <div className="text-lg font-bold text-black">{fabricCareData.washTemp}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Drying Method</div>
              <div className="text-lg font-bold text-black">{fabricCareData.dryMethod}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Iron Temperature</div>
              <div className="text-lg font-bold text-black">{fabricCareData.ironTemp}</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-1">Bleach</div>
              <div className="text-lg font-bold text-black">{fabricCareData.bleach}</div>
            </div>
          </div>
        </div>

        {/* Detailed Care Tips */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h3m12 0h3m-9 6c.5 0 1-.5 1-1V7c0-.5-.5-1-1-1s-1 .5-1 1v4c0 .5.5 1 1 1z"/>
              <path d="M21 12H3"/>
              <path d="M12 3v2m0 14v2"/>
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">Care Tips</h3>
          </div>
          <ul className="text-gray-600 text-sm space-y-2">
            {fabricCareData.careInstructions.map((instruction, index) => (
              <li key={index}>• {instruction}</li>
            ))}
          </ul>
        </div>

        {/* Dry Cleaning Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Care</h3>
          <p className="text-gray-600 text-sm">
            <strong>Dry Cleaning:</strong> {fabricCareData.dryClean}
          </p>
        </div>

        <button
          onClick={() => setMode('select')}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Scan Another Item
        </button>
      </div>
    );
  }

  if (mode === 'review') {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Outfit Review</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Upload Your Outfit</p>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-medium">
              Choose Photo
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specify Occasion</h3>
            <input
              type="text"
              placeholder="e.g., Board Meeting, Casual Weekend, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setMode('results')}
            className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-gray-800 transition-all duration-200"
          >
            Analyze Outfit
          </button>
        </div>
      </div>
    );
  }

  // Results view with enhanced style analysis
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Style Analysis</h2>
        {!showScanner && (
          <button
            onClick={() => setMode('scanner')}
            className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Scan className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Overall Score as Meter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Style Score</h3>
        <div className="relative w-48 h-24 mx-auto mb-4">
          <svg className="w-48 h-24" viewBox="0 0 200 100">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              stroke="#000000"
              strokeWidth="12"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * 82) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center mt-4">
              <div className="text-4xl font-bold text-black">82</div>
              <div className="text-sm text-gray-500">Excellent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Style Analysis - Same as before */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Style Breakdown</h3>
        </div>
        <div className="space-y-4">
          {styleAnalysis.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">{item.category}</span>
                <span className="text-sm font-bold text-black">{item.score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-gray-700 to-black h-2 rounded-full" 
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Items with Thrift Labels */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Items</h3>
        <div className="space-y-3">
          {thriftStoreItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                {item.isThrift && (
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    T
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  {item.isThrift && <div className="text-xs text-green-600">Thrift Store Find</div>}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">{item.price}</div>
                {item.isThrift && <div className="text-xs text-gray-500 line-through">{item.original}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Elements Analysis */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Eye className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Visual Impact</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Silhouette</div>
            <div className="text-lg font-bold text-black">A+</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Proportions</div>
            <div className="text-lg font-bold text-black">B+</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Color Balance</div>
            <div className="text-lg font-bold text-black">A</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Accessories</div>
            <div className="text-lg font-bold text-black">B</div>
          </div>
        </div>
      </div>

      {/* Original sections */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Stylist's Critique</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Excellent color coordination and fit. The navy blazer pairs well with your complexion. Consider a more structured shoe for formal occasions.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Enhancement Protocol</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Swap the leather belt for a woven one to add texture</li>
          <li>• Consider a pocket square for added sophistication</li>
          <li>• Oxford shoes would elevate the overall look</li>
        </ul>
      </div>
    </div>
  );
};
