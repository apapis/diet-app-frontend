import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { fetchRecipes } from "../services/recipeService";
import { Recipe } from "../types/recipe";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      const data = await fetchRecipes();
      const recipeIndex = Number(id);

      if (!isNaN(recipeIndex) && data[recipeIndex]) {
        setRecipe(data[recipeIndex]);
      } else {
        navigate("/");
      }
    };

    loadRecipe();
  }, [id, navigate]);

  if (!recipe) {
    return null;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        {recipe.recipe_name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {recipe.meal_type.toUpperCase()}
      </Typography>

      <Typography variant="h5" sx={{ mt: 2 }}>
        Składniki:
      </Typography>
      <List>
        {recipe.ingredients.map((ingredient, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`${ingredient.name} - ${ingredient.quantity} (${ingredient.measure})`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ mt: 2 }}>
        Instrukcje:
      </Typography>
      <List>
        {recipe.instructions.map((step, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`${idx + 1}. ${step}`} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="body2">
          Kalorie: {recipe.calories} kcal | Białko: {recipe.protein}g | Tłuszcz:{" "}
          {recipe.fat}g | Węglowodany: {recipe.carbs}g
        </Typography>
      </Box>

      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/")}>
        Wróć do listy przepisów
      </Button>
    </Container>
  );
};

export default RecipeDetails;
