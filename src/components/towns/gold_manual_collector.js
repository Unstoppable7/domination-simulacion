import React, { useEffect } from "react";
import ManualCollectorBase from "./manual_collector_base";
import { TypesOfResources } from "../../constants/constants";

export default function GoldManualCollector({
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
      image: "gold_mine_level_1",
    },
    2: {
      plusReward: 200,
      plusCollectionTime: 10000, //10sec
      plusRefillTime: 600000, //10min
      plusCitizenRequired: 2,
      image: "gold_mine_level_2",
    },
    3: {
      plusReward: 500,
      plusCollectionTime: 15000, //15sec
      plusRefillTime: 900000, //15min
      plusCitizenRequired: 2,
      image: "gold_mine_level_3",
    },
  };

  let name = "Gold Mine";

  function updateValues(currentReward) {
    //Funcion en el padre que va a actualizar los recursos disponibles
    handleResourceUpdate(TypesOfResources.GOLD, currentReward);
  }

  return (
    <>
      <ManualCollectorBase
        level={level}
        quantityVillagers={quantityVillagers}
        handleResourceUpdate={updateValues}
        upgradeLevels={upgradeLevels}
        name={name}
      />
    </>
  );
}
