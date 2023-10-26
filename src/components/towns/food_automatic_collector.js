import AutomaticCollector from "./automatic_collector";
import { TypesOfResources } from "../../constants/constants";

export default function FoodAutomaticCollector({
    level,
    quantityResource,
    quantityVillagers,
    handleUpdateStorageValues,
    handleResourceUpdate
}) {

    let name = "Farm";

    const upgradeLevels = {

        1: {
            lifePoints: 960,
            storageCapacity: 2500,
            plusResourcesPerMinute: 100,
            image: 'farm_level_1'
        },
        2: {
            lifePoints: 480, //1440
            storageCapacity: 7500, //10000
            plusResourcesPerMinute: 200,
            image: 'farm_level_2'
        },
        3: {
            lifePoints: 480, //1920,
            storageCapacity: 20000, //30000,
            plusResourcesPerMinute: 300,
            image: 'farm_level_3'
        }

    };

    const requirementsByLevel = {

        1: {
            resourceRequired: 500,
            villagersRequired: 4,
            upgradeTime: 900000 //15min
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

    return (
        <>
            <AutomaticCollector
                level={level}
                upgradeLevels={upgradeLevels}
                requirementsByLevel={requirementsByLevel}
                quantityResource={quantityResource}
                quantityVillagers={quantityVillagers}
                handleUpdateStorageValues={updateValues}
                name={name}
                handleResourceUpdate={handleResourceUpdate}
            />
        </>
    );
}