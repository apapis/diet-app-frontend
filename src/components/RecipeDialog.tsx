import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Recipe } from "../types/recipe";

type RecipeDialogProps = {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
};

const RecipeDialog = ({ recipe, open, onClose }: RecipeDialogProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{recipe.recipe_name}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" color="textSecondary">
          {recipe.meal_type.toUpperCase()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
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
        <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
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
            Kalorie: {recipe.calories} kcal | Białko: {recipe.protein}g |
            Tłuszcz: {recipe.fat}g | Węglowodany: {recipe.carbs}g
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Zamknij
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeDialog;
