import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Diet App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Przepisy
        </Button>
        <Button color="inherit" component={Link} to="/upload">
          Dodaj PDF
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
