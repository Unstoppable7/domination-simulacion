import React, { useEffect } from "react";
import Structure from "../structure";
import { TypesOfResources } from "../../constants/constants";

function resourceStorage({ resource, level, quantityResource, quantityVillagers, updateStorageHandle }) {

  const [currentImage, setCurrentImage] = useState("");
  const [currentLifePoints, setCurrentLifePoints] = useState(0);
  const [currentStorageCapacity, setCurrentStorageCapacity] = useState(0);
  const [currentUpgradeLevel, setCurrentUpgradeLevel] = useState(0);

  let name;

  const upgradeLevels = {

    [TypesOfResources.GOLD]: {
      1: {
        lifePoints: 960,
        storageCapacity: 2500,
        image: 'market_level_1'
      },
      2: {
        lifePoints: 480, //1440
        storageCapacity: 7500, //10000
        image: 'market_level_2'
      },
      3: {
        lifePoints: 480, //1920,
        storageCapacity: 20000, //30000,
        image: 'market_level_3'
      }
    },

    [TypesOfResources.FOOD]: {
      1: {
        lifePoints: 960,
        storageCapacity: 2500,
        image: 'mill_level_1'
      },
      2: {
        lifePoints: 480, //1440
        storageCapacity: 7500, //10000
        image: 'mill_level_2'
      },
      3: {
        lifePoints: 480, //1920,
        storageCapacity: 20000, //30000,
        image: 'mill_level_3'
      }
    }
  };

  const requirementsByLevel = {
    [TypesOfResources.GOLD]: {
      1: {
        resourceRequired: 500,
        villagersRequired: 4,
      },
      2: {
        resourceRequired: 1400,
        villagersRequired: 4,
      },
      3: {
        resourceRequired: 5600,
        villagersRequired: 4,
      }
    },

    [TypesOfResources.FOOD]: {
      1: {
        resourceRequired: 500,
        villagersRequired: 4,
      },
      2: {
        resourceRequired: 1400,
        villagersRequired: 4,
      },
      3: {
        resourceRequired: 5600,
        villagersRequired: 4,
      }
    }
  };

  //Solo se ejecuta cuando se crea por primera vez el componente
  useEffect(() => {

    improveBuilding(1);

    switch (resource) {
      case TypesOfResources.GOLD:
        name = 'Market';
        break;
      case TypesOfResources.FOOD:
        name = 'Mill';
        break;
      default:
        console.log('Unknown resource');
        break;
    }
  }, []);

  //Building level upgrade
  useEffect(() => {

    if (quantityResource >= requirementsByLevel[resource][level].resourceRequired &&
      quantityVillagers >= requirementsByLevel[resource][level].villagersRequired) {

      // Habilito/inhabilito el boton de mejorar
    }

  }, [level, quantityResource, quantityVillagers]);

  //TODO Llamar en el onclick del boton mejorar
  function improveBuilding(upgradeLevelBooster) {

    setCurrentUpgradeLevel(currentUpgradeLevel + upgradeLevelBooster);

    setCurrentLifePoints(currentLifePoints + upgradeLevels[resource][currentUpgradeLevel].lifePoints);
    setCurrentStorageCapacity(currentStorageCapacity + upgradeLevels[resource][currentUpgradeLevel].storageCapacity);
    setCurrentImage(upgradeLevels[resource][currentUpgradeLevel].image);

    updateValues(resource, upgradeLevels[resource][currentUpgradeLevel].storageCapacity);
  }

  function updateValues(resource, plusStorageCapacity) {
    
    //Funcion en el padre que va a actualizar el limite actual del recurso
    updateStorageHandle(resource, plusStorageCapacity);
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