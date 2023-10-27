import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

function NavBar({
  currentAmountVillagers,
  totalAmountVillagers,
  currentAmountFood,
  totalAmountFood,
  currentAmountGold,
  totalAmountGold,
  level
}) {
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
                {currentAmountVillagers}/{totalAmountVillagers} 👨
              </Button>

              <Button
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1rem",
                }}
              >
                {currentAmountGold}/{totalAmountGold} 💰
              </Button>

              <Button
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontSize: "1rem",
                }}
              >
                {currentAmountFood}/{totalAmountFood} 🍟
              </Button>
            </Box>

            <Box>
              <Typography color="black">Edad 🌟{level}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
