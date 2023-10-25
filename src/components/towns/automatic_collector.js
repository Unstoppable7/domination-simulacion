import React, { useEffect, useState } from "react";
import resourceStorageBase from "./resource_storage_base";
import { TypesOfResources } from "../../constants/constants";

function Automatic_collector({
  resource,
  level,
  quantityResource,
  quantityVillagers,
  updateStorageHandle,
}) {
  const [currentImage, setCurrentImage] = useState("");

  const [currentAccumulatedResource, setCurrentAccumulatedResource] =
    useState(0);
  const [resourcesPerMinute, setResourcesPerMinute] = useState(5);

  let name;

  //Solo se ejecuta cuando se crea por primera vez el componente
  useEffect(() => {
    // Iniciar un intervalo que incrementa el contador cada segundo
    const interval = setInterval(() => {
      setCurrentAccumulatedResource(
        (prevCurrentAccumulatedResource) =>
          prevCurrentAccumulatedResource + resourcesPerMinute
      );
    }, 60000); //Cada minuto

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <resourceStorageBase
        resource={resource}
        level={level}
        quantityResource={quantityResource}
        quantityVillagers={quantityVillagers}
        updateStorageHandle={updateStorageHandle}
      />
    </>
  );
}

export default Automatic_collector;
