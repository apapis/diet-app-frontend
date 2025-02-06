// MealsPreview.tsx
import { useState } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import agent from "../../api/agent";
import { Meal, BulkMeal } from "../../types/recipe";
import MealPreviewCard from "./MealPreviewCard";

type MealsPreviewProps = {
  meals: Meal[];
  onSaveSuccess: (message: string) => void; // nowy callback
};

export default function MealsPreview({
  meals,
  onSaveSuccess,
}: MealsPreviewProps) {
  const [editedMeals, setEditedMeals] = useState<Meal[]>(meals);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleMealUpdate = (index: number, updatedMeal: Meal) => {
    setEditedMeals((prev) => {
      const newMeals = [...prev];
      newMeals[index] = updatedMeal;
      return newMeals;
    });
  };

  const transformToBulk = (): BulkMeal[] => {
    return editedMeals.map((meal) => ({
      meal_type: meal.meal_type,
      name: meal.recipe_name,
      instructions: meal.instructions,
      calories: meal.calories,
      protein: meal.protein,
      fat: meal.fat,
      carbs: meal.carbs,
      ingredient_variations: [{ ingredients: meal.ingredients }],
    }));
  };

  const handleSave = async () => {
    setErrorMessage(null);

    try {
      const payload = transformToBulk();
      const createdMeals = await agent.Meals.createBulk(payload);

      // Pobieramy nazwy posiłków, które zostały zapisane:
      const mealNames = createdMeals.map((meal) => meal.recipe_name).join(", ");

      // Informujemy rodzica o pomyślnym zapisie, przekazując komunikat
      onSaveSuccess(`Pomyślnie zapisano posiłki: ${mealNames}`);
    } catch (error) {
      console.error("Błąd zapisu posiłków:", error);
      setErrorMessage("Wystąpił błąd podczas zapisu. Sprawdź konsolę.");
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Podgląd i edycja posiłków
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {editedMeals.map((meal, i) => (
        <MealPreviewCard
          key={i}
          meal={meal}
          onChange={(updated) => handleMealUpdate(i, updated)}
          index={i}
        />
      ))}

      <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
        Zapisz w bazie
      </Button>
    </Box>
  );
}
