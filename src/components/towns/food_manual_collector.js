import React, { useEffect } from "react";
import manualCollectorBase from "./manual_collector_base";
import { TypesOfResources } from "../../constants/constants";

export default function FoodManualCollector({
  level,
  quantityVillagers,
  handleResourceUpdate,
}) {
  const upgradeLevels = {
    1: {
      plusReward: 50,
      plusCollectionTime: 5000, //5sec
      plusRefillTime: 300000, //5min
      plusCitizenRequired: 2,
      image: "fruit_tree_level_1",
    },
    2: {
      plusReward: 200,
      plusCollectionTime: 5000, //5sec
      plusRefillTime: 600000, //10min
      plusCitizenRequired: 2,
      image: "fruit_tree_level_2",
    },
    3: {
      plusReward: 450,
      plusCollectionTime: 5000, //55sec
      plusRefillTime: 900000, //15min
      plusCitizenRequired: 2,
      image: "fruit_tree_level_3",
    },
  };

  let name = "Fruit Tree";

  function updateValues(currentReward) {
    //Funcion en el padre que va a actualizar los recursos disponibles
    handleResourceUpdate(TypesOfResources.FOOD, currentReward);
  }

  return (
    <>
      <manualCollectorBase
        level={level}
        quantityVillagers={quantityVillagers}
        handleResourceUpdate={updateValues}
        upgradeLevels={upgradeLevels}
        name={name}
      />
    </>
  );
}
