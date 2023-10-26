import React, { useEffect, useState } from "react";
import Structure from "../structure";

export default function ResourceStorageBase({
  level,
  upgradeLevels,
  requirementsByLevel,
  quantityResource,
  quantityVillagers,
  handleUpdateStorageValues,
  handleUpgrate = () => { },
  name,
  handleDisableCollectBotton,
  handleDisableUpgradeBotton = true,
  handleCollect = () => { }
}) {
  const [currentImage, setCurrentImage] = useState("");

  const [currentLifePoints, setCurrentLifePoints] = useState(0);
  const [currentStorageCapacity, setCurrentStorageCapacity] = useState(0);
  const [currentUpgradeLevel, setCurrentUpgradeLevel] = useState(0);
  const [upgradeBottonState, setUpgradeBottonState] = useState(false);


  const [remainingTime, setRemainingTime] = useState(
    requirementsByLevel[level].upgradeTime
  );

  //Solo se ejecuta cuando se crea por primera vez el componente
  useEffect(() => {
    improveBuilding();
  }, []);

  //Building level upgrade
  useEffect(() => {
    if (
      quantityResource >= requirementsByLevel[level].resourceRequired &&
      quantityVillagers >= requirementsByLevel[level].villagersRequired &&
      handleDisableUpgradeBotton
    ) {
      setUpgradeBottonState(true);
    } else {
      setUpgradeBottonState(false)
    }
  }, [level, quantityResource, quantityVillagers]);

  function improveBuilding(upgradeLevelBooster = 1) {
    const timer = setTimeout(() => {
      setCurrentUpgradeLevel(currentUpgradeLevel + upgradeLevelBooster);

      setCurrentLifePoints(
        currentLifePoints + upgradeLevels[currentUpgradeLevel].lifePoints
      );
      setCurrentStorageCapacity(
        currentStorageCapacity +
        upgradeLevels[currentUpgradeLevel].storageCapacity
      );
      setCurrentImage(upgradeLevels[currentUpgradeLevel].image);

      handleUpdateStorageValues(
        upgradeLevels[currentUpgradeLevel].storageCapacity
      );

      //Funcion de mejora especifica
      if (handleUpgrate) {
        handleUpgrate(currentUpgradeLevel);
      }

    }, requirementsByLevel[level].upgradeTime);

    setRemainingTime(requirementsByLevel[level].upgradeTime);

    // Actualiza el tiempo restante cada segundo
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
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
