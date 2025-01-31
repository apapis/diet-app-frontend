export type Ingredient = {
  name: string;
  quantity: string;
  measure: string;
};

export type Recipe = {
  meal_type: "breakfast" | "lunch" | "dinner";
  recipe_name: string;
  ingredients: Ingredient[];
  instructions: string[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  incomplete: boolean;
};
