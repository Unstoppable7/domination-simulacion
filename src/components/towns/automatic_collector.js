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
  handleResourceUpdate
}) {

  const [currentAccumulatedResource, setCurrentAccumulatedResource] = useState(0);
  const [resourcesPerMinute, setResourcesPerMinute] = useState(0);

  const [collectBottonState, setCollectBottonState] = useState(false);


  //Solo se ejecuta cuando se crea por primera vez el componente
  useEffect(() => {

    // Iniciar un intervalo que incrementa el contador cada segundo
    const interval = setInterval(() => {
      setCurrentAccumulatedResource((prevCurrentAccumulatedResource) => prevCurrentAccumulatedResource + resourcesPerMinute);
    }, 10000);//Cada 10sec

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };

  }, []);

  useEffect(() => {

    if(currentAccumulatedResource >= resourcesPerMinute){
      setCollectBottonState(true);
    } else {
      setCollectBottonState(false);
    }

  }, [currentAccumulatedResource]);

  function upgrateCollector(currentUpgradeLevel) {
    setResourcesPerMinute(
      resourcesPerMinute + upgradeLevels[currentUpgradeLevel].plusResourcesPerMinute
    );
  }

  function collectReward() {

    //TODO llamar en el componente padre para manejar la recoleccion del recurso
    handleResourceUpdate(currentAccumulatedResource);
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
        handleUpgrate = {upgrateCollector}
        name={name}
        handleCollect={collectReward}
        handleDisableCollectBotton={collectBottonState}
      />
    </>
  );
}
