import { Box, Button } from "@mui/material";
import TownHall from "./components/towns/town_hall";
import GoldStorage from "./components/towns/gold_storage";
import FoodStorage from "./components/towns/food_storage";
import NavBar from "./components/navbar";
import { Fragment, useState, useEffect } from "react";
import CreateTownModal from "./components/createTownModal";
import BuildProgressBar from "./components/progressBar";
import CustomizedSnackbars from "./components/snackBar";
import { TypesOfResources } from "./constants/constants";
import GoldManualCollector from "./components/towns/gold_manual_collector";
import FoodManualCollector from "./components/towns/food_manual_collector";
import HouseVillager from "./components/towns/house_villager";

function App() {

  //Fuction to upgrade level
  const [level, setLevel] = useState(1);

  //Variables para contabilizar recursos u estructuras actuales
  const [currentAmountFood, setCurrentAmountFood] = useState(500);
  // const [totalAmountFood, setTotalAmountFood] = useState(1000);
  const [currentAmountGold, setCurrentAmountGold] = useState(250);
  // const [totalAmountGold, seTtotalAmountGold] = useState(500);
  const [currentAmountVillagers, setCurrentAmountVillagers] = useState(5);
  // const [totalAmountVillagers, setTotalAmountVillagers] = useState(5);
  const [currentNumberMills, setCurrentNumberMills] = useState(0);
  const [currentNumberMarkets, setCurrentNumberMarkets] = useState(0);
  const [currentNumberHouses, setCurrentNumberHouses] = useState(0);

  //Variables que definen limites de cada recurso/estructura
  const [foodLimit, setFoodLimit] = useState(1000);
  const [goldLimit, setGoldLimit] = useState(500);
  const [villagersLimit, setVillagersLimit] = useState(5);
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
      name: "Market",
      image: "/assets/images/gold_storage_1.png",
      quantity: 1,
      show: false,
      buildTime: 500,
      villagerAmount: 1,
      typeResource: "food",
      resourceAmount: 100,
    },
    {
      id: 3,
      name: "Gold Mine",
      image: "/assets/images/gold_mine_1.png",
      quantity: 1,
      show: false,
      buildTime: 500,
      villagerAmount: 1,
      typeResource: "food",
      resourceAmount: 250,
    },
    {
      id: 2,
      name: "Mill",
      image: "/assets/images/food_storage_1.png",
      quantity: 1,
      show: false,
      buildTime: 500,
      villagerAmount: 1,
      typeResource: "gold",
      resourceAmount: 125,
    },
    {
      id: 4,
      name: "Fruit Tree",
      image: "/assets/images/fruit_tree_1.png",
      quantity: 1,
      show: false,
      buildTime: 500,
      villagerAmount: 1,
      typeResource: "gold",
      resourceAmount: 50,
    },
    {
      id: 5,
      name: "House",
      image: "/assets/images/house_villager_1.png",
      quantity: 1,
      show: false,
      buildTime: 500,
      villagerAmount: 1,
      typeResource: "gold",
      resourceAmount: 50,
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

  const [openAlert, setOpenAlert] = useState({
    type: "",
    open: false,
  });

  const handleCreateItem = (value) => {

    setTownLevelOnelist((prev) => {

      return prev.map((item) => {

        if (item.id === value.id && value.quantity > 0) {
          // valida el total de comida

          if (
            item.typeResource === "food" && (
            currentAmountFood === 0 ||
            currentAmountFood < value.resourceAmount)
          ) {
            setOpenAlert({
              type: "food",
              open: true,
            });

            setTimeout(() => {
              setOpenAlert({
                type: "",
                open: false,
              });
            }, 3000);

            return item;
          }

          // valida el total de oro
          if (
            item.typeResource === "gold" && (
            currentAmountGold === 0 ||
              currentAmountGold < value.resourceAmount)
          ) {
            setOpenAlert({
              type: "gold",
              open: true,
            });

            setTimeout(() => {
              setOpenAlert({
                type: "",
                open: false,
              });
            }, 3000);

            return item;
          }

          setOpenBuildModal(false);

          setShowProgressBar({
            townId: item.id,
            open: true,
          });

          setCurrentAmountVillagers((prev) => prev - item.villagerAmount);

          if (item.typeResource === "food") {
            setCurrentAmountFood((prev) => prev - item.resourceAmount);
          } else {
            setCurrentAmountGold((prev) => prev - item.resourceAmount);
          }

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
  // useEffect(() => {

    

  // },[villagersLimit]);
  return (
    <Box mb={10}>
      <NavBar
        currentAmountVillagers={currentAmountVillagers}
        totalAmountVillagers={villagersLimit}
        currentAmountFood={currentAmountFood}
        totalAmountFood={foodLimit}
        currentAmountGold={currentAmountGold}
        totalAmountGold={goldLimit}
        level={level}
      />

      {/* Renderiza luego de construir */}
      <Box mt={5} mb={10} display="flex" justifyContent="space-around">
        {townlevelOneList.map((item) => (

          <Fragment key={item.id}>

            {item.show && item.name === "Market" && (
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
                  <GoldStorage
                    level={level}
                    quantityResource={currentAmountFood}
                    quantityVillagers={currentAmountVillagers}
                    handleUpdateStorageValues={setGoldLimit}
                    handleVillagersUpdate={setCurrentAmountVillagers}
                    handleResourceRequiredUpdate={setCurrentAmountFood}
                  />
                </div>
              </Box>
            )}
            {item.show && item.name === "Gold Mine" && (
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
                  <GoldManualCollector
                    level={level}
                    quantityVillagers={currentAmountVillagers}
                    handleResourceUpdate={setCurrentAmountGold}
                    handleVillagersUpdate={setCurrentAmountVillagers}
                  />
                </div>
              </Box>
            )}
            {item.show && item.name === "Mill" && (
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
                  <FoodStorage
                    level={level}
                    quantityResource={currentAmountGold}
                    quantityVillagers={currentAmountVillagers}
                    handleUpdateStorageValues={setFoodLimit}
                    handleVillagersUpdate={setCurrentAmountVillagers}
                    handleResourceRequiredUpdate={setCurrentAmountGold}
                  />

                </div>
              </Box>
            )}
            {item.show && item.name === "Fruit Tree" && (
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
                  <FoodManualCollector
                    level={level}
                    quantityVillagers={currentAmountVillagers}
                    handleResourceUpdate={setCurrentAmountFood}
                    handleVillagersUpdate={setCurrentAmountVillagers}
                  />

                </div>
              </Box>
            )}

            {item.show && item.name === "House" && (
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
                  <HouseVillager
                    level={level}
                    quantityVillagers={currentAmountVillagers}
                    handleResourceUpdate={setCurrentAmountFood}
                    handleUpdateStorageValues={setVillagersLimit}
                  />
                  {setCurrentAmountVillagers((prev)=>prev+1)}
                </div>
              </Box>
            )}
          </Fragment>
        ))}

      </Box>

      <Box display="flex" justifyContent="center">

        <TownHall
          level={level}
          quantityResource={currentAmountGold}
          quantityVillagers={currentAmountVillagers}
          handleUpdateStorageValues={setGoldLimit}
          upgradeLevel={setLevel}
          handleVillagersUpdate={setCurrentAmountVillagers}
          handleResourceRequiredUpdate={setCurrentAmountGold}
        />
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

      <CustomizedSnackbars
        handleClose={() => setOpenAlert(false)}
        message={`No tienes suficiente ${openAlert.type === "food" ? "Comida" : "Oro"
          }`}
        open={openAlert.open}
      />
    </Box>
  );
}

export default App;
