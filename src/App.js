import { Box, Button } from "@mui/material";
import Town from "./components/towns/main-town";
import GoldMine from "./components/towns/gold-mine";
import House from "./components/towns/house";
import Farm from "./components/towns/farm";
import Castle from "./components/towns/castle";
import NavBar from "./components/navbar";
import { Fragment, useState } from "react";
import CreateTownModal from "./components/createTownModal";
import BuildProgressBar from "./components/progressBar";

function App() {
  //TODO estructura de objetos con los datos al subir de nivel
  //TODO funcion para recoleccion de recursos

  //Fuction to upgrade level
  const [level, setLevel] = useState(1);

  //Variables para contabilizar recursos u estructuras actuales
  const [currentAmountFood, setCurrentAmountFood] = useState(0);
  const [currentAmountGold, setCurrentAmountGold] = useState(0);
  const [currentAmountVillagers, setCurrentAmountVillagers] = useState(5);
  const [totalAmountVillagers, setTotalAmountVillagers] = useState(5);
  const [currentNumberMills, setCurrentNumberMills] = useState(0);
  const [currentNumberMarkets, setCurrentNumberMarkets] = useState(0);
  const [currentNumberHouses, setCurrentNumberHouses] = useState(0);

  //Variables que definen limites de cada recurso/estructura
  const [foodLimit, setFoodLimit] = useState(0);
  const [goldLimit, setGoldLimit] = useState(0);
  const [villagersLimit, setVillagersLimit] = useState(0);
  const [millsLimit, setMillsLimit] = useState(0);
  const [marketsLimit, setMarketsLimit] = useState(0);
  const [housesLimit, setHousesLimit] = useState(0);
  const [barracksLimit, setBarracksLimit] = useState(0);
  const [townHallsLimit, setTownHallsLimit] = useState(0);

  //Funciones que validan la recoleccion de recursos

  const [openBuildModal, setOpenBuildModal] = useState(false);

  const [townlevelOneList, setTownLevelOnelist] = useState([
    {
      id: 1,
      name: "Casa",
      image: "/assets/images/house.jpg",
      quantity: 1,
      show: false,
      buildTime: 1000,
      villagerAmount: 2,
    },
    {
      id: 2,
      name: "Mina de oro",
      image: "/assets/images/gold-mine.jpg",
      quantity: 1,
      show: false,
      buildTime: 1500,
      villagerAmount: 1,
    },
    {
      id: 3,
      name: "Granja",
      image: "/assets/images/farm.webp",
      quantity: 1,
      show: false,
      buildTime: 500,
      villagerAmount: 1,
    },
  ]);

  const [buildProgress, setBuildProgress] = useState({
    id: null,
    progress: 0,
  });
  const [showProgressBar, setShowProgressBar] = useState({
    townId: null,
    open: false,
  });

  const handleCreateItem = (value) => {
    setTownLevelOnelist((prev) => {
      return prev.map((item) => {
        if (item.id === value.id && value.quantity > 0) {
          setOpenBuildModal(false);

          setShowProgressBar({
            townId: item.id,
            open: true,
          });

          setCurrentAmountVillagers((prev) => prev - item.villagerAmount);

          return {
            ...item,
            show: true,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });
    });
  };

  return (
    <Box mb={10}>
      <NavBar
        currentAmountVillagers={currentAmountVillagers}
        totalAmountVillagers={totalAmountVillagers}
      />
      <Box mt={5} mb={10} display="flex" justifyContent="space-around">
        {townlevelOneList.map((item) => (
          <Fragment key={item.id}>
            {item.show && item.name === "Casa" && (
              <Box display="flex" flexDirection="column" alignItems="center">
                {showProgressBar.townId === item.id && (
                  <BuildProgressBar
                    setBuildProgress={setBuildProgress}
                    setShowProgressBar={setShowProgressBar}
                    id={showProgressBar.townId}
                    buildTime={item.buildTime}
                    setCurrentAmountVillagers={setCurrentAmountVillagers}
                  />
                )}
                <div
                  style={{
                    opacity:
                      showProgressBar.townId === item.id
                        ? buildProgress.progress / 100
                        : 1,
                  }}
                >
                  <House disabled={showProgressBar.open} />
                </div>
              </Box>
            )}
            {item.show && item.name === "Mina de oro" && (
              <Box display="flex" flexDirection="column" alignItems="center">
                {showProgressBar.townId === item.id && (
                  <BuildProgressBar
                    setBuildProgress={setBuildProgress}
                    setShowProgressBar={setShowProgressBar}
                    id={showProgressBar.townId}
                    buildTime={item.buildTime}
                    setCurrentAmountVillagers={setCurrentAmountVillagers}
                  />
                )}
                <div
                  style={{
                    opacity:
                      showProgressBar.townId === item.id
                        ? buildProgress.progress / 100
                        : 1,
                  }}
                >
                  <GoldMine disabled={showProgressBar.open} />
                </div>
              </Box>
            )}
            {item.show && item.name === "Granja" && (
              <Box display="flex" flexDirection="column" alignItems="center">
                {showProgressBar.townId === item.id && (
                  <BuildProgressBar
                    setBuildProgress={setBuildProgress}
                    setShowProgressBar={setShowProgressBar}
                    id={showProgressBar.townId}
                    buildTime={item.buildTime}
                    setCurrentAmountVillagers={setCurrentAmountVillagers}
                  />
                )}
                <div
                  style={{
                    opacity:
                      showProgressBar.townId === item.id
                        ? buildProgress.progress / 100
                        : 1,
                  }}
                >
                  <Farm disabled={showProgressBar.open} />
                </div>
              </Box>
            )}
          </Fragment>
        ))}
      </Box>

      <Box display="flex" justifyContent="center">
        <Town />
      </Box>

      <Box display="flex" justifyContent="end" mr={20} mt={20}>
        <Button
          variant="contained"
          style={{
            borderRadius: 9,
            padding: "10px 20px",
          }}
          onClick={() => setOpenBuildModal(true)}
          disabled={showProgressBar.open}
        >
          Construir
        </Button>
      </Box>

      <CreateTownModal
        handleClose={() => setOpenBuildModal(false)}
        name={"Crea un edificio"}
        open={openBuildModal}
        list={townlevelOneList}
        handleCreateItem={handleCreateItem}
      />
    </Box>
  );
}

export default App;
