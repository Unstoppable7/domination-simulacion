import React, { useEffect } from "react";
import Structure from "../structure";

function manualCollectorBase({ level, quantityVillagers, handleResourceUpdate, upgradeLevels, name }) {
  const [currentReward, setCurrentReward] = useState(0);
  const [currentCollectionTime, setCurrentCollectionTime] = useState(0);
  const [currentRefillTime, setCurrentRefillTime] = useState(0);
  const [currentCitizensRequired, setCurrentCitizensRequired] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  const [remainingTimeToCollect, setRemainingTimeToCollect] = useState(currentCollectionTime);
  const [remainingTimeToRefill, setRemainingTimeToRefill] = useState(currentRefillTime);
  const [isCollectible, setIsCollectible] = useState(true);


  //Level upgrade
  useEffect(() => {

    setCurrentReward(currentReward + upgradeLevels[level].plusReward);
    setCurrentCollectionTime(currentCollectionTime + upgradeLevels[level].plusCollectionTime);
    setCurrentRefillTime(currentRefillTime + upgradeLevels[level].plusRefillTime);
    setCurrentCitizensRequired(currentCitizensRequired + upgradeLevels[level].plusCitizenRequired);
    setCurrentImage(upgradeLevels[level].image);

  }, [level]);

  useEffect(() => {

    if (quantityVillagers >= currentCitizensRequired && isCollectible) {

      // Habilito/inhabilito el boton de recoger
    }

  }, [quantityVillagers, isCollectible]);

  //TODO Llamar en el onclick del boton recoger
  function collectReward() {

    setIsCollectible(false);

    const timerToCollect = setTimeout(() => {

      //TODO llamar en el componente padre para manejar la recoleccion del recurso
      handleResourceUpdate(currentReward);

    }, currentCollectionTime);

    setRemainingTimeToCollect(currentCollectionTime);

    // Actualiza el tiempo restante cada segundo
    const intervalToCollect = setInterval(() => {
      setRemainingTimeToCollect((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalToCollect); // Detiene el intervalo cuando el tiempo llega a 0
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);

    const timerToRefill = setTimeout(() => {

      setIsCollectible(true);

    }, currentRefillTime);

    setRemainingTimeToRefill(currentRefillTime);

    // Actualiza el tiempo restante cada segundo
    const intervalToRefill = setInterval(() => {
      setRemainingTimeToRefill((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalToRefill); // Detiene el intervalo cuando el tiempo llega a 0
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timerToCollect);
      clearInterval(intervalToCollect);
      clearInterval(timerToRefill);
      clearInterval(intervalToRefill);
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