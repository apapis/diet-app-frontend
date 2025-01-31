import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { fetchRecipes } from "../services/recipeService";
import { Recipe } from "../types/recipe";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.error("Błąd pobierania przepisów:", error);
      }
    };

    loadRecipes();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista Przepisów
      </Typography>
      <Grid2 container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <RecipeCard recipe={recipe} index={index} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Home;
