import { Box, TextField, Button, IconButton } from "@mui/material";
import { Ingredient } from "../../types/recipe";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type IngredientsListProps = {
  ingredients: Ingredient[];
  onChange: (updated: Ingredient[]) => void;
};

export default function IngredientsList({
  ingredients,
  onChange,
}: IngredientsListProps) {
  const handleIngredientField = <K extends keyof Ingredient>(
    index: number,
    field: K,
    value: Ingredient[K]
  ) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...ingredients, { name: "", quantity: "", measure: "" }]);
  };

  const handleRemove = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <Box>
      {ingredients.map((ingredient, i) => (
        <Box key={i} display="flex" gap={1} mt={1}>
          <TextField
            label="Nazwa"
            value={ingredient.name}
            onChange={(e) => handleIngredientField(i, "name", e.target.value)}
          />
          <TextField
            label="Ilość"
            value={ingredient.quantity}
            onChange={(e) =>
              handleIngredientField(i, "quantity", e.target.value)
            }
          />
          <TextField
            label="Miara"
            value={ingredient.measure}
            onChange={(e) =>
              handleIngredientField(i, "measure", e.target.value)
            }
          />
          <IconButton color="error" onClick={() => handleRemove(i)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button startIcon={<AddCircleIcon />} sx={{ mt: 1 }} onClick={handleAdd}>
        Dodaj składnik
      </Button>
    </Box>
  );
}
