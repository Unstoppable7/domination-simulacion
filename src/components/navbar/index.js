import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function NavBar() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex">
              <Button
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1rem",
                }}
              >
                1/3 👨
              </Button>

              <Button
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1rem",
                }}
              >
                100/500 💰
              </Button>

              <Button
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1rem",
                }}
              >
                200/1000 🍟
              </Button>
            </Box>

            <Box>
              <Typography color="black">Edad de piedra - 🌟1</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
