import ResourceStorageBase from "./resource_storage_base";
import { TypesOfResources } from "../../constants/constants";

export default function TownHall({ 
    level, 
    quantityResource, 
    quantityVillagers, 
    handleUpdateStorageValues,
    upgrateLevel
 }) {

    let name = "Town Hall";

    const upgradeLevels = {

        1: {
            lifePoints: 960,
            storageCapacity: 500,
            image: 'town_level_1'
        },
        2: {
            lifePoints: 480, //1440
            storageCapacity: 7500, //10000
            image: 'town_level_2'
        },
        3: {
            lifePoints: 480, //1920,
            storageCapacity: 20000, //30000,
            image: 'town_level_3'
        }

    };

    const requirementsByLevel = {

        1: {
            resourceRequired: 0,
            villagersRequired: 0,
            upgradeTime: 0
        },
        2: {
            resourceRequired: 1400,
            villagersRequired: 4,
            upgradeTime: 900000 //15min
        },
        3: {
            resourceRequired: 5600,
            villagersRequired: 4,
            upgradeTime: 1800000 //30min
        }

    };

    function updateValues(plusStorageCapacity) {

        //Funcion en el padre que va a actualizar el limite actual del recurso
        handleUpdateStorageValues(TypesOfResources.GOLD, plusStorageCapacity);
    }

    function upgrateTownHall(currentUpgradeLevel) {
        
        //TODO manejar en el padre
        upgrateLevel(currentUpgradeLevel);

    }

    return (
        <>
            <ResourceStorageBase
                level={level}
                upgradeLevels={upgradeLevels}
                requirementsByLevel={requirementsByLevel}
                quantityResource={quantityResource}
                quantityVillagers={quantityVillagers}
                handleUpdateStorageValues={updateValues}
                name={name}
                handleDisableCollectBotton={false}
                handleUpgrate={upgrateTownHall}
            />
        </>
    );
}