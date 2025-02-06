import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import agent from "../api/agent";
import { Meal } from "../types/recipe";
import { AxiosError } from "axios";

type UploadPdfProps = {
  onPdfProcessed: (meals: Meal[]) => void;
};

const UploadPdf = ({ onPdfProcessed }: UploadPdfProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Proszę wybrać plik w formacie PDF.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      setError("Najpierw wybierz plik.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await agent.Process.uploadPdf(file);
      setSuccess("Plik został pomyślnie przesłany.");
      onPdfProcessed(response.preview_meals);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(`Błąd przesyłania pliku: ${error.message}`);
      } else if (error instanceof Error) {
        setError(`Błąd przesyłania pliku: ${error.message}`);
      } else {
        setError("Wystąpił nieznany błąd przesyłania pliku.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <Box
        {...getRootProps()}
        sx={{
          width: "100%",
          maxWidth: 400,
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px dashed #1976d2",
          borderRadius: 2,
          backgroundColor: isDragActive ? "#e3f2fd" : "transparent",
          cursor: "pointer",
          textAlign: "center",
          p: 2,
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <Typography>{file.name}</Typography>
        ) : (
          <Typography>
            Przeciągnij i upuść plik PDF tutaj lub kliknij
          </Typography>
        )}
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? <CircularProgress size={24} /> : "Wyślij PDF"}
      </Button>
    </Box>
  );
};

export default UploadPdf;
