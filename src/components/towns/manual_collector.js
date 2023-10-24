import React, { useEffect } from "react";
import Structure from "../structure";
import { TypesOfResources } from "../../constants/constants";

function manualCollector({resource, level, handleLevelUpgrade, handleCollect}) {
    const [currentReward, setCurrentReward] = useState(0);
    const [currentCollectionTime, setCurrentCollectionTime] = useState(0);
    const [currentRefillTime, setCurrentRefillTime] = useState(0);
    const [currentImage, setCurrentImage] = useState("");
    const citizensRequired = 2;
    let name;
    
    switch (resource) {
      case TypesOfResources.GOLD:
        name = 'Gold Mine';
        break;
      case TypesOfResources.FOOD:
        name = 'Fruit Tree';
        break;
      default:
        console.log('Unknown resource');
        break;
    }

    //Level upgrade
    useEffect(() => {
      levelValues = handleLevelUpgrade(level, resource);
  
      setCurrentReward(currentReward + levelValues.plusReward);
      setCurrentCollectionTime(currentCollectionTime + levelValues.plusCollectionTime);
      setCurrentRefillTime(currentRefillTime + levelValues.plusRefillTime);
      setCurrentImage(levelValues.image);
    }, [level]);
  
    //TODO Llamar en el onclick del boton recoger
    function collectReward(){
      //TODO llamar en el componente padre, este de tambien hacer una accion com re-renderizado o algo similar de manera que se evaluen los recursos y las condiciones sobre si se puede mejorar alguna estructura
      handleCollect(citizensRequired, currentReward, currentCollectionTime, currentRefillTime);
    }

    //TODO manejar currentCollectionTime y currentRefillTime para mostrar los temporizadores

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