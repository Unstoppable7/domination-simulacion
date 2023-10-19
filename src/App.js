import { Box } from "@mui/material";
import Town from "./components/towns/main-town";
import GoldMine from "./components/towns/gold-mine";
import House from "./components/towns/house";
import Farm from "./components/towns/farm";
import Castle from "./components/towns/castle";
import NavBar from "./components/navbar";

function App() {
  return (
    <Box mb={10}>
      <NavBar />
      <Box mt={5} mb={0} display="flex" justifyContent="space-around">
        <House />
        <GoldMine />
      </Box>

      <Box display="flex" justifyContent="center">
        <Town />
      </Box>

      <Box mt={5} mb={0} display="flex" justifyContent="space-around">
        <Farm />
        <Castle />
      </Box>
    </Box>
  );
}

export default App;
