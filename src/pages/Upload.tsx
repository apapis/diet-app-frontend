// Upload.tsx
import { Container, Typography, Alert } from "@mui/material";
import { useState } from "react";
import UploadPdf from "../components/UploadPdf";
import MealsPreview from "../components/MealsPreview/MealsPreview";
import { Meal } from "../types/recipe";

const Upload = () => {
  const [previewMeals, setPreviewMeals] = useState<Meal[] | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleSaveSuccess = (message: string) => {
    setSaveMessage(message);
    setPreviewMeals(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Prześlij PDF z przepisami
      </Typography>

      {saveMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {saveMessage}
        </Alert>
      )}

      {!previewMeals && (
        <UploadPdf
          onPdfProcessed={(meals) => {
            setSaveMessage(null);
            setPreviewMeals(meals);
          }}
        />
      )}

      {previewMeals && (
        <MealsPreview meals={previewMeals} onSaveSuccess={handleSaveSuccess} />
      )}
    </Container>
  );
};

export default Upload;
