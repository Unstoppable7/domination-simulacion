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
  handleCollect = () => { },
  handleVillagersUpdate = () => { },
  handleResourceRequiredUpdate = () => { },
  typeOfResource,
  villagersRequiredToCollect = 0, 
  resourceCollected = 0, 
  timeForCollect = 0
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
    if (
      quantityResource >= requirementsByLevel[currentUpgradeLevel + 1]?.resourceRequired &&
      quantityVillagers >= requirementsByLevel[currentUpgradeLevel + 1]?.villagersRequired &&
      level >= requirementsByLevel[currentUpgradeLevel + 1]?.level &&
      handleDisableUpgradeBotton
    ) {
      setUpgradeBottonState(false);

    } else {
      setUpgradeBottonState(true);

    }

  }, [level, quantityResource, quantityVillagers, currentUpgradeLevel]);

  useEffect(() => {

    handleUpdateStorageValues(
      upgradeLevels[currentUpgradeLevel]?.storageCapacity
    );

    if (handleUpgrade) {
      handleUpgrade(currentUpgradeLevel);
    }
  }, [currentUpgradeLevel]);

  function improveBuilding() {

    handleVillagersUpdate((prev) => prev - requirementsByLevel[currentUpgradeLevel + 1]?.villagersRequired);
    handleResourceRequiredUpdate((prev) => prev - requirementsByLevel[currentUpgradeLevel + 1]?.resourceRequired);

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

      handleVillagersUpdate((prev) => prev + requirementsByLevel[currentUpgradeLevel + 1]?.villagersRequired);

    }, requirementsByLevel[currentUpgradeLevel + 1].upgradeTime);

    setRemainingTime(requirementsByLevel[currentUpgradeLevel + 1].upgradeTime);

    // Actualiza el tiempo restante cada segundo
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        console.log("Upgrade Time", name, ":", prevTime / 1000);
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
        typeOfResource={typeOfResource}
        resourceRequired={requirementsByLevel[currentUpgradeLevel + 1]?.resourceRequired}
        villagersRequiredToUpgrade={requirementsByLevel[currentUpgradeLevel + 1]?.villagersRequired}
        villagersRequiredToCollect={villagersRequiredToCollect}
        resourceCollected={resourceCollected}
        timeForCollect={timeForCollect}
      />
    </>
  );
}
