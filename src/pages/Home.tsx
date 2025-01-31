import { Container, Typography } from "@mui/material";
import UploadPdf from "../components/UploadPdf";

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Diet App - Dodaj przepis
      </Typography>
      <UploadPdf />
    </Container>
  );
};

export default Home;
