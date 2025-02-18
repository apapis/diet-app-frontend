// src/components/Ingredients/IngredientVariationsList.tsx
import React from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IngredientVariation, Ingredient } from "../../types/recipe";
import IngredientsList from "./IngredientsList";

type IngredientVariationsListProps = {
  variations: IngredientVariation[];
  onChange: (variations: IngredientVariation[]) => void;
};

const IngredientVariationsList: React.FC<IngredientVariationsListProps> = ({
  variations,
  onChange,
}) => {
  const handleVariationChange = (
    index: number,
    updatedVariation: IngredientVariation
  ) => {
    const newVariations = [...variations];
    newVariations[index] = updatedVariation;
    onChange(newVariations);
  };

  const handleAddVariation = () => {
    let newIngredients: Ingredient[] = [];
    let newLabel = "default";
    // Jeśli istnieje przynajmniej jedna wariacja, kopiujemy składniki z pierwszej (domyślnej)
    if (variations.length > 0) {
      newIngredients = variations[0].ingredients.map((ingredient) => ({
        ...ingredient,
      }));
      newLabel = "Kopia wariacji domyślnej";
    }
    onChange([
      ...variations,
      {
        variation_label: newLabel,
        ingredients: newIngredients,
      },
    ]);
  };

  const handleRemoveVariation = (index: number) => {
    const newVariations = variations.filter((_, i) => i !== index);
    onChange(newVariations);
  };

  return (
    <Box>
      {variations.map((variation, index) => (
        <Box key={index} border="1px solid #ddd" p={2} mb={2} borderRadius={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <TextField
              label="Etykieta wariantu"
              value={variation.variation_label}
              onChange={(e) =>
                handleVariationChange(index, {
                  ...variation,
                  variation_label: e.target.value,
                })
              }
              fullWidth
            />
            <IconButton
              color="error"
              onClick={() => handleRemoveVariation(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Typography variant="subtitle2" gutterBottom>
            Składniki:
          </Typography>
          <IngredientsList
            ingredients={variation.ingredients}
            onChange={(updatedIngredients) =>
              handleVariationChange(index, {
                ...variation,
                ingredients: updatedIngredients,
              })
            }
          />
        </Box>
      ))}
      <Button startIcon={<AddCircleIcon />} onClick={handleAddVariation}>
        Dodaj wariację składników
      </Button>
    </Box>
  );
};

export default IngredientVariationsList;
