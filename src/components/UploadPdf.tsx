import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import { uploadPdf } from "../services/uploadService";

const UploadPdf = () => {
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
      await uploadPdf(file);
      setSuccess("Plik został pomyślnie przesłany.");
    } catch (error) {
      setError(`Wystąpił błąd podczas przesyłania. ${error}`);
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
          <Typography variant="body1">{file.name}</Typography>
        ) : (
          <Typography variant="body1">
            Przeciągnij i upuść plik PDF tutaj lub kliknij
          </Typography>
        )}
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? <CircularProgress size={24} /> : "Wyślij PDF"}
      </Button>
    </Box>
  );
};

export default UploadPdf;
