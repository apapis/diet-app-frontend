import { Card, CardContent, Typography, Box } from "@mui/material";
import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router-dom";

type RecipeCardProps = {
  recipe: Recipe;
  index: number;
};

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${index}`);
  };

  return (
    <Card
      sx={{
        height: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h6" sx={{ minHeight: 50 }}>
          {recipe.recipe_name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {recipe.meal_type.toUpperCase()}
        </Typography>
        <Typography variant="body2">Kalorie: {recipe.calories} kcal</Typography>
      </CardContent>
      <Box sx={{ p: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
        <Typography variant="body2">
          Białko: {recipe.protein}g | Tłuszcz: {recipe.fat}g | Węglowodany:{" "}
          {recipe.carbs}g
        </Typography>
      </Box>
    </Card>
  );
};

export default RecipeCard;
