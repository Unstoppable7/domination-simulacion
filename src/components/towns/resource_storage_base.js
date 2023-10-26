import React, { useEffect, useState } from "react";
import Structure from "../structure";

export default function ResourceStorageBase({
  level,
  upgradeLevels,
  requirementsByLevel,
  quantityResource,
  quantityVillagers,
  handleUpdateStorageValues,
  handleUpgrade = () => { },
  name,
  handleDisableCollectBotton,
  handleDisableUpgradeBotton = true,
  handleCollect = () => { }
}) {
  const [currentUpgradeLevel, setCurrentUpgradeLevel] = useState(1);

  const [currentImage, setCurrentImage] = useState(
    upgradeLevels[currentUpgradeLevel]?.image
  );
  const [currentLifePoints, setCurrentLifePoints] = useState(
    upgradeLevels[currentUpgradeLevel]?.lifePoints
  );
  const [currentStorageCapacity, setCurrentStorageCapacity] = useState(
    upgradeLevels[currentUpgradeLevel]?.storageCapacity
  );
  const [upgradeBottonState, setUpgradeBottonState] = useState(true);

  const [remainingTime, setRemainingTime] = useState(
    requirementsByLevel[currentUpgradeLevel]?.upgradeTime
  );

  //Building level upgrade
  useEffect(() => {
    console.log("quantityResource: ", quantityResource);
    console.log("resourceRequired: ", requirementsByLevel[currentUpgradeLevel + 1]?.resourceRequired);
    console.log("quantityVillagers: ", quantityVillagers);
    console.log("villagersRequired: ", requirementsByLevel[currentUpgradeLevel + 1]?.villagersRequired);
    console.log("currentUpgradeLevel: ", currentUpgradeLevel);
    if (
      quantityResource >= requirementsByLevel[currentUpgradeLevel + 1]?.resourceRequired &&
      quantityVillagers >= requirementsByLevel[currentUpgradeLevel + 1]?.villagersRequired &&
      level >= requirementsByLevel[currentUpgradeLevel + 1]?.level &&
      handleDisableUpgradeBotton
    ) {
      setUpgradeBottonState(false);

      console.log("upgradeBottonState", upgradeBottonState);

    } else {
      setUpgradeBottonState(true);

    }

    console.log("LEVEL: ", level);

  }, [level, quantityResource, quantityVillagers, currentUpgradeLevel]);

  //Solo se ejecuta cuando se crea por primera vez el componente
  // useEffect(() => {
  //   improveBuilding();
  // }, []);

  useEffect(() => {
    
    handleUpdateStorageValues(
      upgradeLevels[currentUpgradeLevel]?.storageCapacity
    );
    
    if (handleUpgrade) {
      handleUpgrade(currentUpgradeLevel);
    }
  }, [currentUpgradeLevel]);

  function improveBuilding() {

    const timer = setTimeout(() => {

      setCurrentUpgradeLevel((prev) => { 
        const updateUpgradeLevel = prev + 1;
        setCurrentLifePoints(
          currentLifePoints + upgradeLevels[updateUpgradeLevel]?.lifePoints
        );
        setCurrentStorageCapacity(
          currentStorageCapacity +
          upgradeLevels[updateUpgradeLevel]?.storageCapacity
        );
        setCurrentImage(upgradeLevels[updateUpgradeLevel]?.image);
  
        

        return updateUpgradeLevel;
      });

    }, requirementsByLevel[currentUpgradeLevel + 1].upgradeTime);

    setRemainingTime(requirementsByLevel[currentUpgradeLevel + 1].upgradeTime);

    // Actualiza el tiempo restante cada segundo
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        console.log("Upgrade Time",name,":",prevTime/1000);
        if (prevTime <= 1000) {
          clearInterval(interval); // Detiene el intervalo cuando el tiempo llega a 0
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }

  return (
    <>
      <Structure
        name={name}
        image={currentImage}
        data={{}}
        handleUpgrade={improveBuilding}
        handleCollect={handleCollect}
        handleDisableUpgradeBotton={upgradeBottonState}
        handleDisableCollectBotton={handleDisableCollectBotton}
      />
    </>
  );
}
