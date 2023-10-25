import React, { useEffect } from "react";
import Structure from "../structure";

function resourceStorageBase({level, upgradeLevels, requirementsByLevel, quantityResource, quantityVillagers, handleUpdateStorageValues, name}) {

  const [currentImage, setCurrentImage] = useState("");

  const [currentLifePoints, setCurrentLifePoints] = useState(0);
  const [currentStorageCapacity, setCurrentStorageCapacity] = useState(0);
  const [currentUpgradeLevel, setCurrentUpgradeLevel] = useState(0);

  const [remainingTime, setRemainingTime] = useState(requirementsByLevel[level].upgradeTime);

  //Solo se ejecuta cuando se crea por primera vez el componente
  useEffect(() => {

    improveBuilding();
    
  }, []);

  //Building level upgrade
  useEffect(() => {

    if (quantityResource >= requirementsByLevel[level].resourceRequired &&
      quantityVillagers >= requirementsByLevel[level].villagersRequired) {

      // Habilito/inhabilito el boton de mejorar
    }

  }, [level, quantityResource, quantityVillagers]);

  //TODO Llamar en el onclick del boton mejorar
  function improveBuilding(upgradeLevelBooster = 1) {

    const timer = setTimeout(() => {

      setCurrentUpgradeLevel(currentUpgradeLevel + upgradeLevelBooster);
  
      setCurrentLifePoints(currentLifePoints + upgradeLevels[currentUpgradeLevel].lifePoints);
      setCurrentStorageCapacity(currentStorageCapacity + upgradeLevels[currentUpgradeLevel].storageCapacity);
      setCurrentImage(upgradeLevels[currentUpgradeLevel].image);
  
      handleUpdateStorageValues(upgradeLevels[currentUpgradeLevel].storageCapacity);

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
      />
    </>
  );
}