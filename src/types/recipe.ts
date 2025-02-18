export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface Ingredient {
  name: string;
  quantity: string;
  measure: string;
}

export interface IngredientVariation {
  variation_label: string;
  ingredients: Ingredient[];
}

export interface Meal {
  meal_type: MealType;
  name: string;
  ingredient_variations: IngredientVariation[];
  instructions: string[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface MealOut extends Meal {
  id: number;
}

export interface PdfUploadResponse {
  message: string;
  original_pdf: string;
  preview_meals: Meal[];
}

export interface BulkMeal {
  meal_type: MealType;
  name: string;
  instructions: string[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredient_variations: IngredientVariation[];
}
