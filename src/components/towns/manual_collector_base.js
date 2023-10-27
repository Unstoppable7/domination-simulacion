import React, { useEffect, useState } from "react";
import Structure from "../structure";

export default function ManualCollectorBase({
  level,
  quantityVillagers,
  handleResourceUpdate,
  upgradeLevels,
  name,
  handleVillagersUpdate,
  typeOfResource
}) {
  const [currentReward, setCurrentReward] = useState(0);
  const [currentCollectionTime, setCurrentCollectionTime] = useState(0);
  const [currentRefillTime, setCurrentRefillTime] = useState(0);
  const [currentCitizensRequired, setCurrentCitizensRequired] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const [remainingTimeToCollect, setRemainingTimeToCollect] = useState(0);
  const [remainingTimeToRefill, setRemainingTimeToRefill] = useState(0);
  const [isCollectible, setIsCollectible] = useState(true);

  const [collectBottonState, setCollectBottonState] = useState(false);

  //Level upgrade
  useEffect(() => {

    setCurrentReward(upgradeLevels[level].plusReward);
    setCurrentCollectionTime(upgradeLevels[level].plusCollectionTime);
    setCurrentRefillTime(upgradeLevels[level].plusRefillTime);
    setCurrentCitizensRequired(upgradeLevels[level].plusCitizenRequired);
    setCurrentImage(upgradeLevels[level].image);

  }, [level]);

  useEffect(() => {

    if (quantityVillagers >= currentCitizensRequired && isCollectible) {
      setCollectBottonState(false);
    } else {
      setCollectBottonState(true);
    }

  }, [quantityVillagers, isCollectible]);

  function collectReward() {

    setIsCollectible(false);

    handleVillagersUpdate((prev) => prev - currentCitizensRequired);

    const timerToCollect = setTimeout(() => {

      //Llama el componente padre para manejar la recoleccion del recurso
      handleResourceUpdate(currentReward);

      refillReward();
      handleVillagersUpdate((prev) => prev + currentCitizensRequired);

    }, currentCollectionTime);  

    setRemainingTimeToCollect(currentCollectionTime);

    // Actualiza el tiempo restante cada segundo
    const intervalToCollect = setInterval(() => {
      setRemainingTimeToCollect((prevTime) => {
        console.log("Collect Time", name, ":", prevTime / 1000);
        if (prevTime <= 1000) {
          clearInterval(intervalToCollect); // Detiene el intervalo cuando el tiempo llega a 0
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);
    
    return () => {
      clearTimeout(timerToCollect);
      clearInterval(intervalToCollect);
    };
  }

  function refillReward() {
    const timerToRefill = setTimeout(() => {

      setIsCollectible(true);

    }, currentRefillTime);

    setRemainingTimeToRefill(currentRefillTime);

    // Actualiza el tiempo restante cada segundo
    const intervalToRefill = setInterval(() => {
      setRemainingTimeToRefill((prevTime) => {
        console.log("Refill Time", name, ":", prevTime / 1000);
        if (prevTime <= 1000) {
          clearInterval(intervalToRefill); // Detiene el intervalo cuando el tiempo llega a 0
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);


    return () => {
      clearTimeout(timerToRefill);
      clearInterval(intervalToRefill);
    };
  }

  return (
    <>
      <Structure
        name={name}
        image={currentImage}
        handleCollect={collectReward}
        handleDisableUpgradeBotton={true}
        handleDisableCollectBotton={collectBottonState}
        typeOfResource={typeOfResource}
        villagersRequiredToCollect={currentCitizensRequired}
        resourceCollected={currentReward}
        timeForCollect={`${currentCollectionTime/1000}s`}
      />
    </>
  );
}