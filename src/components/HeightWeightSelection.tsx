import { ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Switch } from "./ui/switch";

interface HeightWeightSelectionProps {
  onComplete: (data: { height: string; weight: string; unit: string }) => void;
  onBack: () => void;
}

export default function App() {
  const handleComplete = (data: { height: string; weight: string; unit: string }) => {
    // console.log("Completed:", data); // Removed for cleaner console
    // You can add logic here to navigate or save the data
  };

  const handleBack = () => {
    // console.log("Go back"); // Removed for cleaner console
    // You can add logic here to navigate back
  };

  return (
    <div className="font-sans">
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
      <HeightWeightSelection onComplete={handleComplete} onBack={handleBack} />
    </div>
  );
}

export const HeightWeightSelection = ({ onComplete, onBack }: HeightWeightSelectionProps) => {
  const [isMetric, setIsMetric] = useState(false);
  const [selectedHeightFeet, setSelectedHeightFeet] = useState(5);
  const [selectedHeightInches, setSelectedHeightInches] = useState(6); // Re-added inches state
  const [selectedHeightCm, setSelectedHeightCm] = useState(170);
  const [selectedWeight, setSelectedWeight] = useState(isMetric ? 70 : 120);

  // Generate weight values
  const imperialWeights = Array.from({ length: 200 }, (_, i) => i + 80); // 80lb to 279lb
  const metricWeights = Array.from({ length: 150 }, (_, i) => i + 30); // 30kg to 179kg

  // Generate height values
  const feetOptions = Array.from({ length: 7 }, (_, i) => i + 2); // 2ft to 8ft
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0in to 11in
  const cmOptions = Array.from({ length: 121 }, (_, i) => i + 120); // 120cm to 240cm

  // Ensure initial values are set correctly based on unit toggle
  useEffect(() => {
    if (isMetric) {
      setSelectedWeight(70); // Default metric weight
      setSelectedHeightCm(170); // Default metric height
    } else {
      setSelectedWeight(120); // Default imperial weight
      setSelectedHeightFeet(5); // Default imperial feet
      setSelectedHeightInches(6); // Default imperial inches
    }
  }, [isMetric]);

  const handleContinue = () => {
    let heightString = "";
    if (isMetric) {
      heightString = `${selectedHeightCm}cm`;
    } else {
      heightString = `${selectedHeightFeet}'${selectedHeightInches}"`; // Use both feet and inches
    }

    onComplete({
      height: heightString,
      weight: `${selectedWeight}${isMetric ? 'kg' : 'lb'}`,
      unit: isMetric ? 'metric' : 'imperial'
    });
  };

  const IOSPicker = ({
    values,
    selectedValue,
    onValueChange,
    unit
  }: {
    values: number[],
    selectedValue: number,
    onValueChange: (value: number) => void,
    unit: string
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);

    const itemHeight = 44;
    const visibleItems = 5;
    const containerHeight = visibleItems * itemHeight;

    useEffect(() => {
      const scrollToSelected = () => {
        if (containerRef.current) {
          const selectedIndex = values.indexOf(selectedValue);
          if (selectedIndex !== -1) {
            const scrollPosition = selectedIndex * itemHeight;
            containerRef.current.scrollTop = Math.max(0, scrollPosition);
          }
        }
      };
      scrollToSelected();

      return () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      };
    }, [selectedValue, values, itemHeight]);


    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      if (isDragging) return;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (containerRef.current) {
            const currentScrollTop = containerRef.current.scrollTop;
            const selectedIndex = Math.round(currentScrollTop / itemHeight);
            const clampedIndex = Math.max(0, Math.min(values.length - 1, selectedIndex));

            containerRef.current.scrollTo({
              top: Math.max(0, clampedIndex * itemHeight),
              behavior: 'smooth'
            });

            if (values[clampedIndex] !== selectedValue) {
              onValueChange(values[clampedIndex]);
            }
        }
        scrollTimeoutRef.current = null;
      }, 150);
    }, [isDragging, values, selectedValue, onValueChange, itemHeight]);


    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const deltaY = startY - e.touches[0].clientY;
      const newScrollTop = (containerRef.current?.scrollTop || 0) - deltaY;
      containerRef.current.scrollTop = newScrollTop;
      setStartY(e.touches[0].clientY);
    }, [isDragging, startY]);


    const handleTouchEnd = useCallback(() => {
      setIsDragging(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
          if (containerRef.current) {
              const currentContainer = containerRef.current;
              const currentScrollTop = currentContainer.scrollTop;
              const selectedIndex = Math.round(currentScrollTop / itemHeight);
              const clampedIndex = Math.max(0, Math.min(values.length - 1, selectedIndex));

              currentContainer.scrollTo({
                  top: Math.max(0, clampedIndex * itemHeight),
                  behavior: 'smooth'
              });

              if (values[clampedIndex] !== selectedValue) {
                  onValueChange(values[clampedIndex]);
              }
          }
          scrollTimeoutRef.current = null;
      }, 50);
    }, [values, onValueChange, itemHeight, selectedValue]);


    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (containerRef.current && containerRef.current.contains(document.activeElement)) {
            let newIndex = values.indexOf(selectedValue);

            if (e.key === 'ArrowUp') {
              newIndex = Math.max(0, newIndex - 1);
              e.preventDefault();
            } else if (e.key === 'ArrowDown') {
              newIndex = Math.min(values.length - 1, newIndex + 1);
              e.preventDefault();
            }

            if (newIndex !== values.indexOf(selectedValue)) {
              onValueChange(values[newIndex]);
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  top: newIndex * itemHeight,
                  behavior: 'smooth'
                });
              }
            }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [values, selectedValue, onValueChange, itemHeight]);


    return (
      <div
        tabIndex={0}
        // Removed borders, shadows, and backgrounds from the main picker container
        className="relative w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-300"
        style={{ height: `${containerHeight}px` }}
      >
        {/* Highlight for the selected item (now a rounded box without shadow-inner) */}
        <div
          className="absolute left-0 right-0 z-10 pointer-events-none flex justify-center items-center"
          style={{
            top: `${(containerHeight - itemHeight) / 2}px`,
            height: `${itemHeight}px`,
          }}
        >
          {/* The actual rounded background box, now without shadow-inner */}
          <div className="w-3/4 h-full bg-gray-100 rounded-xl flex items-center justify-center">
            {/* Display the selected value text directly inside the highlight box */}
            <span className="text-gray-900 font-semibold text-xl">
              {selectedValue} {unit}
            </span>
          </div>
        </div>

        {/* Gradient overlays for fading effect */}
        {/* Adjusted from-gray-50 to from-white to match the background */}
        <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />

        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="overflow-y-scroll hide-scrollbar scroll-smooth snap-y snap-mandatory"
          style={{ height: `${containerHeight}px`, WebkitOverflowScrolling: 'touch' }}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Padding to allow initial and final items to center */}
          <div style={{ paddingTop: `${(containerHeight - itemHeight) / 2}px`, paddingBottom: `${(containerHeight - itemHeight) / 2}px` }}>
            {values.map((value, index) => {
              const selectedIndex = values.indexOf(selectedValue);
              const distance = Math.abs(index - selectedIndex);

              const normalizedDistance = distance / (visibleItems / 2);
              const opacity = Math.max(0.05, 1 - Math.pow(normalizedDistance, 2.5)); // Set min opacity to 0.05 for near-invisible
              const scale = Math.max(0.7, 1 - normalizedDistance * 0.25);

              return (
                <div
                  key={value}
                  className={`flex items-center justify-center transition-all duration-150 ease-out text-gray-900 snap-center`}
                  style={{
                    height: `${itemHeight}px`,
                    opacity: opacity,
                    transform: `scale(${scale})`,
                    // Make selected item effectively invisible here to avoid duplication
                    fontWeight: distance === 0 ? 'normal' : 'normal',
                    fontSize: distance === 0 ? '0rem' : '1rem',
                    color: 'inherit',
                  }}
                  onClick={() => onValueChange(value)}
                >
                  {value} {unit}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 mx-8">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-gray-400 h-1 rounded-full w-2/3"></div>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-1">
          <span className="text-xs">🇺🇸</span>
          <span className="text-sm font-medium text-gray-900">EN</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Height & weight
          </h1>
          <p className="text-gray-600">
            This will be used to calibrate your custom plan.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-center mb-8">
          <span className={`text-lg font-medium mr-4 ${!isMetric ? 'text-gray-900' : 'text-gray-400'}`}>
            Imperial
          </span>
          <Switch
            checked={isMetric}
            onCheckedChange={(checked) => {
              setIsMetric(checked);
            }}
            className="data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-300"
          />
          <span className={`text-lg font-medium ml-4 ${isMetric ? 'text-gray-900' : 'text-gray-400'}`}>
            Metric
          </span>
        </div>

        {/* Height and Weight Selectors */}
        <div className="flex-1 flex justify-around items-center">
          {/* Height Section */}
          <div className="flex flex-col items-center w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Height</h3>
            {isMetric ? (
              <IOSPicker
                values={cmOptions}
                selectedValue={selectedHeightCm}
                onValueChange={setSelectedHeightCm}
                unit="cm"
              />
            ) : (
              // Two pickers for feet and inches in Imperial mode
              <div className="flex justify-center space-x-2 w-full">
                <div className="w-1/2">
                  <IOSPicker
                    values={feetOptions}
                    selectedValue={selectedHeightFeet}
                    onValueChange={setSelectedHeightFeet}
                    unit="ft"
                  />
                </div>
                <div className="w-1/2">
                  <IOSPicker
                    values={inchesOptions}
                    selectedValue={selectedHeightInches}
                    onValueChange={setSelectedHeightInches}
                    unit="in"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Weight Section */}
          <div className="flex flex-col items-center w-1/2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Weight</h3>
            <IOSPicker
              values={isMetric ? metricWeights : imperialWeights}
              selectedValue={selectedWeight}
              onValueChange={setSelectedWeight}
              unit={isMetric ? "kg" : "lb"}
            />
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6 pb-8">
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 rounded-full text-lg font-medium bg-black text-white hover:bg-gray-800 transition-all duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
