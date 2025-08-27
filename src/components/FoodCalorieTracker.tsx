import { useState } from "react";
import { Search, Plus, X, ChefHat, Camera, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  quantity: number;
}

interface ConsumedFood extends FoodItem {
  timestamp: Date;
}

// Mock food database
const foodDatabase: FoodItem[] = [
  { id: "1", name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: "1 medium", quantity: 1 },
  { id: "2", name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: "1 medium", quantity: 1 },
  { id: "3", name: "Chicken Breast", calories: 231, protein: 43.5, carbs: 0, fat: 5, serving: "100g", quantity: 100 },
  { id: "4", name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: "1 cup cooked", quantity: 1 },
  { id: "5", name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "1 cup", quantity: 1 },
  { id: "6", name: "Salmon", calories: 208, protein: 22, carbs: 0, fat: 12, serving: "100g", quantity: 100 },
  { id: "7", name: "Oatmeal", calories: 147, protein: 5.4, carbs: 25, fat: 2.8, serving: "1 cup cooked", quantity: 1 },
  { id: "8", name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0, serving: "1 cup", quantity: 1 },
  { id: "9", name: "Avocado", calories: 234, protein: 2.9, carbs: 12, fat: 21, serving: "1 medium", quantity: 1 },
  { id: "10", name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "2 large", quantity: 2 }
];

interface FoodCalorieTrackerProps {
  onClose: () => void;
}

export const FoodCalorieTracker = ({ onClose }: FoodCalorieTrackerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([]);
  const [dailyGoal] = useState(2000); // Default daily calorie goal

  // Filter foods based on search query
  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add food to consumed list
  const addFood = (food: FoodItem) => {
    const consumedFood: ConsumedFood = {
      ...food,
      timestamp: new Date()
    };
    setConsumedFoods(prev => [...prev, consumedFood]);
    setSearchQuery("");
  };

  // Remove food from consumed list
  const removeFood = (index: number) => {
    setConsumedFoods(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate totals
  const totalCalories = consumedFoods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = consumedFoods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = consumedFoods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = consumedFoods.reduce((sum, food) => sum + food.fat, 0);

  const progressPercentage = Math.min((totalCalories / dailyGoal) * 100, 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ChefHat className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-xl font-semibold">Food Calorie Tracker</h2>
              <p className="text-sm text-muted-foreground">Track your daily nutrition</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Daily Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Calories</span>
                <span className="font-medium">{totalCalories} / {dailyGoal}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{totalProtein.toFixed(1)}g</p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{totalCarbs.toFixed(1)}g</p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{totalFat.toFixed(1)}g</p>
                  <p className="text-xs text-muted-foreground">Fat</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Food Search */}
          <Card>
            <CardHeader>
              <CardTitle>Add Food</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Quick Scan Button */}
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Camera className="w-4 h-4 mr-2" />
                Scan Food Label
              </Button>

              {/* Search Results */}
              {searchQuery && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => addFood(food)}
                      >
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {food.calories} cal per {food.serving}
                          </p>
                        </div>
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No foods found. Try a different search term.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Consumed Foods */}
          {consumedFoods.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Today's Food Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consumedFoods.map((food, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{food.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {food.calories} cal • {food.serving} • {food.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFood(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};