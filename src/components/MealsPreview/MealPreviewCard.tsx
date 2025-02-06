import { Box, TextField, Typography, Divider } from "@mui/material";
import { Meal } from "../../types/recipe";
import IngredientsList from "./IngredientsList";
import InstructionsList from "./InstructionsList";

type MealPreviewCardProps = {
  meal: Meal;
  index: number;
  onChange: (updatedMeal: Meal) => void;
};

export default function MealPreviewCard({
  meal,
  index,
  onChange,
}: MealPreviewCardProps) {
  const handleFieldChange = <K extends keyof Meal>(
    field: K,
    value: Meal[K]
  ) => {
    onChange({ ...meal, [field]: value });
  };

  return (
    <Box mb={2} p={2} border="1px solid #ccc">
      <Typography variant="subtitle1" gutterBottom>
        Posiłek {index + 1} – {meal.meal_type.toUpperCase()}
      </Typography>

      <TextField
        label="Nazwa przepisu"
        value={meal.recipe_name}
        onChange={(e) => handleFieldChange("recipe_name", e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Kalorie"
        type="number"
        value={meal.calories}
        onChange={(e) => handleFieldChange("calories", Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Białko"
        type="number"
        value={meal.protein}
        onChange={(e) => handleFieldChange("protein", Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Tłuszcz"
        type="number"
        value={meal.fat}
        onChange={(e) => handleFieldChange("fat", Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Węglowodany"
        type="number"
        value={meal.carbs}
        onChange={(e) => handleFieldChange("carbs", Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <Typography variant="body2" sx={{ mt: 2 }}>
        Instrukcje:
      </Typography>
      <InstructionsList
        instructions={meal.instructions}
        onChange={(newInstructions) =>
          handleFieldChange("instructions", newInstructions)
        }
      />

      <Divider sx={{ my: 2 }} />

      <IngredientsList
        ingredients={meal.ingredients}
        onChange={(updatedIngr) =>
          handleFieldChange("ingredients", updatedIngr)
        }
      />
    </Box>
  );
}
