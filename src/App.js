import { Box } from "@mui/material";
import Town from "./components/towns/main-town";
import GoldMine from "./components/towns/gold-mine";
import House from "./components/towns/house";
import Farm from "./components/towns/farm";
import Castle from "./components/towns/castle";
import NavBar from "./components/navbar";
import { useState } from "react";

function App() {

  //TODO estructura de objetos con los datos al subir de nivel
  //TODO funcion para recoleccion de recursos
  
  //Fuction to upgrade level
  const [level, setLevel] = useState(1);

  //Variables para contabilizar recursos u estructuras actuales
  const [currentAmountFood, setCurrentAmountFood] = useState(0);
  const [currentAmountGold, setCurrentAmountGold] = useState(0);
  const [currentAmountVillagers  , setCurrentAmountVillagers] = useState(0);
  const [currentNumberMills  , setCurrentNumberMills] = useState(0);
  const [currentNumberMarkets  , setCurrentNumberMarkets] = useState(0);
  const [currentNumberHouses  , setCurrentNumberHouses] = useState(0);

  //Variables que definen limites de cada recurso/estructura
  const [foodLimit, setFoodLimit] = useState(0);
  const [goldLimit, setGoldLimit] = useState(0);
  const [villagersLimit  , setVillagersLimit] = useState(0);
  const [millsLimit  , setMillsLimit] = useState(0);
  const [marketsLimit  , setMarketsLimit] = useState(0);
  const [housesLimit  , setHousesLimit] = useState(0);
  const [barracksLimit  , setBarracksLimit] = useState(0);
  const [townHallsLimit  , setTownHallsLimit] = useState(0);

  //Funciones que validan la recoleccion de recursos

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
