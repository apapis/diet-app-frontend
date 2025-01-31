import { Container, Typography } from "@mui/material";
import UploadPdf from "../components/UploadPdf";

const Upload = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Prześlij PDF z przepisami
      </Typography>
      <UploadPdf />
    </Container>
  );
};

export default Upload;
