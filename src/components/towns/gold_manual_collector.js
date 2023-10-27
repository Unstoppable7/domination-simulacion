import React, { useEffect } from "react";
import ManualCollectorBase from "./manual_collector_base";
import { TypesOfResources } from "../../constants/constants";

export default function GoldManualCollector({
  level,
  quantityVillagers,
  handleResourceUpdate,
  handleVillagersUpdate
}) {
  const upgradeLevels = {
    1: {
      plusReward: 50,
      plusCollectionTime: 3000, 
      plusRefillTime: 5000, 
      plusCitizenRequired: 2,
      image: "/assets/images/gold_mine_1.png",
    },
    2: {
      plusReward: 200,
      plusCollectionTime: 10000, //10sec
      plusRefillTime: 600000, //10min
      plusCitizenRequired: 2,
      image: "/assets/images/gold_mine_2.png",
    },
    3: {
      plusReward: 500,
      plusCollectionTime: 15000, //15sec
      plusRefillTime: 900000, //15min
      plusCitizenRequired: 2,
      image: "/assets/images/gold_mine_3.png",
    },
  };

  let name = "Gold Mine";

  function updateValues(currentReward) {
    //Funcion en el padre que va a actualizar los recursos disponibles
    handleResourceUpdate((prev) => prev + currentReward);
  }

  return (
    <>
      <ManualCollectorBase
        level={level}
        quantityVillagers={quantityVillagers}
        handleResourceUpdate={updateValues}
        upgradeLevels={upgradeLevels}
        name={name}
        handleVillagersUpdate = {handleVillagersUpdate}
        typeOfResource = {TypesOfResources.FOOD}
      />
    </>
  );
}
