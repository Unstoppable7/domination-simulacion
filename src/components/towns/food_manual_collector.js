import React, { useEffect } from "react";
import ManualCollectorBase from "./manual_collector_base";
import { TypesOfResources } from "../../constants/constants";

export default function FoodManualCollector({
  level,
  quantityVillagers,
  handleResourceUpdate,
  handleVillagersUpdate
}) {
  const upgradeLevels = {
    1: {
      plusReward: 50,
      plusCollectionTime: 4000, 
      plusRefillTime: 5000, 
      plusCitizenRequired: 2,
      image: "/assets/images/fruit_tree_1.png",
    },
    2: {
      plusReward: 200,
      plusCollectionTime: 5000,
      plusRefillTime: 600000, 
      plusCitizenRequired: 2,
      image: "/assets/images/fruit_tree_2.png",
    },
    3: {
      plusReward: 450,
      plusCollectionTime: 5000, //55sec
      plusRefillTime: 900000, //15min
      plusCitizenRequired: 2,
      image: "/assets/images/fruit_tree_2.png",
    },
  };

  let name = "Fruit Tree";

  function updateValues(currentReward) {
    //Funcion en el padre que va a actualizar los recursos disponibles
    handleResourceUpdate(currentReward);
  }

  return (
    <>
      <ManualCollectorBase
        level={level}
        quantityVillagers={quantityVillagers}
        handleResourceUpdate={updateValues}
        upgradeLevels={upgradeLevels}
        name={name}
        handleVillagersUpdate={handleVillagersUpdate}
        typeOfResource={TypesOfResources.GOLD}
      />
    </>
  );
}
