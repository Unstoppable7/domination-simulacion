import React, { useEffect, useState } from "react";
import ResourceStorageBase from "./resource_storage_base";

export default function AutomaticCollector({
  level,
  upgradeLevels,
  requirementsByLevel,
  quantityResource,
  quantityVillagers,
  handleUpdateStorageValues,
  name,
  handleResourceUpdate,
  handleVillagersUpdate,
  handleResourceRequiredUpdate,
  typeOfResource
}) {

  const [currentAccumulatedResource, setCurrentAccumulatedResource] = useState(0);
  const [resourcesPerMinute, setResourcesPerMinute] = useState(upgradeLevels[1].plusResourcesPerMinute);

  const [collectBottonState, setCollectBottonState] = useState(false);


  //Solo se ejecuta cuando se crea por primera vez el componente
  useEffect(() => {

    // Iniciar un intervalo que incrementa el contador cada segundo
    const interval = setInterval(() => {
      setCurrentAccumulatedResource((prevCurrentAccumulatedResource) => {
        console.log("Resource Collected By", name, ":", prevCurrentAccumulatedResource + resourcesPerMinute);
        return prevCurrentAccumulatedResource + resourcesPerMinute;

      });
    }, 3000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };

  }, []);

  useEffect(() => {

    if (currentAccumulatedResource >= resourcesPerMinute) {
      setCollectBottonState(false);
    } else {
      setCollectBottonState(true);
    }

  }, [currentAccumulatedResource]);

  function upgradeCollector(currentUpgradeLevel) {
    setResourcesPerMinute((prev) => prev + upgradeLevels[currentUpgradeLevel].plusResourcesPerMinute);
  }

  function collectReward() {

    handleResourceUpdate(currentAccumulatedResource);
    setCurrentAccumulatedResource(0);
  }

  return (
    <>
      <ResourceStorageBase
        level={level}
        upgradeLevels={upgradeLevels}
        requirementsByLevel={requirementsByLevel}
        quantityResource={quantityResource}
        quantityVillagers={quantityVillagers}
        handleUpdateStorageValues={handleUpdateStorageValues}
        handleUpgrade={upgradeCollector}
        name={name}
        handleCollect={collectReward}
        handleDisableCollectBotton={collectBottonState}
        handleVillagersUpdate={handleVillagersUpdate}
        handleResourceRequiredUpdate={handleResourceRequiredUpdate}
        typeOfResource={typeOfResource}
        resourceCollected={currentAccumulatedResource}
      />
    </>
  );
}
