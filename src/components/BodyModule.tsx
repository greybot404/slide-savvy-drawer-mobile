import { useState } from "react";
import { Upload, Camera, Scan, Eye, Droplets, Scissors, User, ExternalLink, Clock } from "lucide-react";

interface BodyModuleProps {
  selectedGender: string | null;
}

export const BodyModule = ({ selectedGender }: BodyModuleProps) => {
  const [activeTab, setActiveTab] = useState('face');
  const [uploadState, setUploadState] = useState<'upload' | 'scanning' | 'results'>('upload');
  const [showScanner, setShowScanner] = useState(true);
  const [showOralScanner, setShowOralScanner] = useState(false);

  const ToothIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 12h8v6c0 1-1 2-2 2h-4c-1 0-2-1-2-2v-6z"/>
      <path d="M8 12c0-2 1-4 4-4s4 2 4 4"/>
      <rect x="10" y="14" width="1" height="2" fill="currentColor"/>
      <rect x="12" y="14" width="1" height="2" fill="currentColor"/>
      <rect x="14" y="14" width="1" height="2" fill="currentColor"/>
      <path d="M9 8c0-1.5 1-3 3-3s3 1.5 3 3"/>
    </svg>
  );

  const tabs = [
    { id: 'face', label: 'Face', icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
        <path d="M8 10h.01M16 10h.01"/>
        <path d="M10 14s1 1 2 1 2-1 2-1"/>
      </svg>
    )},
    { id: 'skin', label: 'Skin', icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
        <path d="M8.5 8.5c.5 0 1-.5 1-1s-.5-1-1-1-.5.5-.5 1 .5 1 1 1z"/>
        <path d="M15.5 13.5c.5 0 1-.5 1-1s-.5-1-1-1-.5.5-.5 1 .5 1 1 1z"/>
      </svg>
    )},
    { id: 'hair', label: 'Hair', icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.5 3 1.5 4C7.5 12 6 14 6 16.5V20h12v-3.5c0-2.5-1.5-4.5-3-6 1-.5 1.5-2.5 1.5-4C16.5 4 14.5 2 12 2z"/>
        <path d="M8 10c.5-1 1.5-2 2.5-2s2 1 2.5 2"/>
      </svg>
    )},
    { id: 'oral', label: 'Oral', icon: ToothIcon },
    ...(selectedGender === 'male' ? [{ id: 'beard', label: 'Beard', icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2c-4 0-7 3-7 7v2c0 3 2 6 5 7 1 0 2 0 3 0s2 0 3 0c3-1 5-4 5-7v-2c0-4-3-7-7-7z"/>
        <path d="M8 12c1 2 2 3 4 3s3-1 4-3"/>
        <circle cx="9" cy="9" r="1"/>
        <circle cx="15" cy="9" r="1"/>
      </svg>
    )}] : []),
  ];

  const scores = {
    face: { 
      score: 76, 
      details: [
        { metric: "Facial Symmetry", score: 82 },
        { metric: "Golden Ratio", score: 74 },
        { metric: "Jawline Definition", score: 68 },
        { metric: "Eye Area", score: 85 },
      ],
      products: [
        { name: "Jawline Exerciser", price: "$24.99", link: "#", description: "Improve jaw definition" },
        { name: "Eye Cream", price: "$45.00", link: "#", description: "Reduce puffiness" },
        { name: "Face Moisturizer", price: "$32.00", link: "#", description: "Improve skin texture" },
      ]
    },
    skin: { 
      score: 68, 
      details: [
        { metric: "Texture Quality", score: 72 },
        { metric: "Tone Evenness", score: 65 },
        { metric: "Hydration Level", score: 70 },
        { metric: "Clarity", score: 66 },
      ],
      products: [
        { name: "Vitamin C Serum", price: "$38.00", link: "#", description: "Brighten skin tone" },
        { name: "Hyaluronic Acid", price: "$28.50", link: "#", description: "Boost hydration" },
        { name: "Exfoliating Scrub", price: "$22.00", link: "#", description: "Improve texture" },
      ],
      routine: [
        { time: "6:00 AM", step: "Gentle cleanser", icon: "🧼" },
        { time: "6:05 AM", step: "Vitamin C serum", icon: "🍊" },
        { time: "6:10 AM", step: "Moisturizer + SPF", icon: "☀️" },
        { time: "10:00 PM", step: "Evening cleanser", icon: "🌙" },
        { time: "10:05 PM", step: "Retinol treatment", icon: "✨" },
        { time: "10:10 PM", step: "Night moisturizer", icon: "🌜" },
      ]
    },
    hair: { 
      score: 84, 
      details: [
        { metric: "Density", score: 88 },
        { metric: "Health", score: 82 },
        { metric: "Style Suitability", score: 86 },
        { metric: "Color Match", score: 80 },
      ],
      products: [
        { name: "Hair Growth Serum", price: "$56.00", link: "#", description: "Stimulate growth" },
        { name: "Protein Treatment", price: "$34.99", link: "#", description: "Strengthen hair" },
        { name: "Styling Pomade", price: "$18.50", link: "#", description: "Perfect styling" },
      ]
    },
    oral: { 
      score: 72, 
      details: [
        { metric: "Teeth Alignment", score: 78 },
        { metric: "Whiteness Level", score: 65 },
        { metric: "Gum Health", score: 75 },
        { metric: "Breath Quality", score: 70 },
      ],
      products: [
        { name: "Whitening Kit", price: "$89.99", link: "#", description: "Professional whitening" },
        { name: "Electric Toothbrush", price: "$124.00", link: "#", description: "Superior cleaning" },
        { name: "Mouthwash Set", price: "$28.99", link: "#", description: "Fresh breath" },
      ]
    },
    beard: { 
      score: 79, 
      details: [
        { metric: "Coverage", score: 85 },
        { metric: "Shape Definition", score: 76 },
        { metric: "Grooming", score: 82 },
        { metric: "Color Uniformity", score: 74 },
      ],
      products: [
        { name: "Beard Oil Set", price: "$42.00", link: "#", description: "Nourishment & shine" },
        { name: "Beard Trimmer", price: "$78.99", link: "#", description: "Precision grooming" },
        { name: "Styling Balm", price: "$24.50", link: "#", description: "Shape & hold" },
      ]
    },
  };

  const handleUpload = () => {
    setUploadState('scanning');
    setTimeout(() => {
      setUploadState('results');
      setShowScanner(false);
    }, 3000);
  };

  const renderSkinRoutine = () => {
    if (activeTab !== 'skin') return null;
    
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg mt-4">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Daily Skincare Routine</h3>
        </div>
        <div className="space-y-3">
          {scores.skin.routine.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{step.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{step.step}</div>
                  <div className="text-sm text-gray-600">{step.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProducts = (tabId: string) => {
    const currentScore = scores[tabId as keyof typeof scores];
    if (!currentScore.products) return null;

    return (
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Products</h3>
        <div className="space-y-3">
          {currentScore.products.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-600">{product.description}</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-bold text-green-600">{product.price}</div>
                </div>
                <a
                  href={product.link}
                  className="p-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderScoreCard = (tabId: string) => {
    const currentScore = scores[tabId as keyof typeof scores];
    return (
      <div className="space-y-4">
        {/* Main Score */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{tabs.find(tab => tab.id === tabId)?.label} Score</h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#000000"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="351.86"
                  strokeDashoffset={351.86 - (351.86 * currentScore.score) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{currentScore.score}</div>
                  <div className="text-xs text-gray-500">/ 100</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {currentScore.score >= 80 ? 'Excellent' : 
               currentScore.score >= 70 ? 'Good' : 
               currentScore.score >= 60 ? 'Average' : 'Needs Improvement'}
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Analysis</h3>
          <div className="space-y-3">
            {currentScore.details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{detail.metric}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full" 
                      style={{ width: `${detail.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{detail.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Enhancement Protocol</h3>
          <ul className="text-gray-600 text-sm space-y-2">
            {tabId === 'face' && (
              <>
                <li>• Consider jaw exercises to improve definition</li>
                <li>• Skincare routine for improved texture</li>
                <li>• Eyebrow shaping for better symmetry</li>
                <li>• Posture adjustment for better angles</li>
              </>
            )}
            {tabId === 'skin' && (
              <>
                <li>• Daily moisturizing routine with hyaluronic acid</li>
                <li>• Weekly exfoliation for improved texture</li>
                <li>• SPF protection for UV damage prevention</li>
                <li>• Vitamin C serum for tone evenness</li>
              </>
            )}
            {tabId === 'hair' && (
              <>
                <li>• Scalp massage to improve circulation</li>
                <li>• Protein treatment for strength</li>
                <li>• Regular trimming schedule</li>
                <li>• Style consultation for face shape</li>
              </>
            )}
            {tabId === 'oral' && (
              <>
                <li>• Brush twice daily with fluoride toothpaste</li>
                <li>• Daily flossing and mouthwash routine</li>
                <li>• Professional whitening treatment</li>
                <li>• Regular dental checkups every 6 months</li>
                <li>• Tongue scraping for breath freshness</li>
                <li>• Avoid foods that cause bad breath</li>
              </>
            )}
            {tabId === 'beard' && (
              <>
                <li>• Daily beard oil application</li>
                <li>• Weekly deep conditioning treatment</li>
                <li>• Professional shaping every 3-4 weeks</li>
                <li>• Consistent trimming routine</li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (uploadState === 'upload' && showScanner) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {tabs.find(tab => tab.id === activeTab)?.label} Analysis
            </h3>
            <p className="text-gray-600">Upload a clear photo for comprehensive analysis</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 transition-all duration-300">
            <div className="w-20 h-20 bg-black rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Scan className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-600 mb-6">Drop your photo here or click to browse</p>
            <div className="space-y-3">
              <button
                onClick={handleUpload}
                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload Photo
              </button>
              <button className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground py-3 rounded-xl font-medium transition-all duration-200">
                <Camera className="w-4 h-4 inline mr-2" />
                Use Camera
              </button>
              {activeTab === 'oral' && (
                <button
                  onClick={() => setShowOralScanner(true)}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-xl font-medium transition-colors"
                >
                  Scan Teeth Separately
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (uploadState === 'scanning') {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Analyzing {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
            <p className="text-gray-600">Processing features and characteristics...</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-12 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Scan className="w-8 h-8 text-black" />
              </div>
            </div>
            <p className="text-gray-600">Analyzing multiple parameters...</p>
          </div>
        </div>
      );
    }

    // Results view with scores and products
    return (
      <div className="space-y-4">
        {renderScoreCard(activeTab)}
        {renderProducts(activeTab)}
        {renderSkinRoutine()}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Aesthetic Analysis</h2>
        {!showScanner && uploadState === 'results' && (
          <button
            onClick={() => {
              setUploadState('upload');
              setShowScanner(true);
            }}
            className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Scan className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-2 shadow-lg">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 min-w-0 ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100/50'
              }`}
            >
              <tab.icon />
              <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};
