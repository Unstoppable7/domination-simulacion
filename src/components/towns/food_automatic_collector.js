import AutomaticCollector from "./automatic_collector";
import { TypesOfResources } from "../../constants/constants";

export default function FoodAutomaticCollector({
    level,
    quantityResource,
    quantityVillagers,
    handleUpdateStorageValues,
    handleResourceUpdate,
    handleResourceRequiredUpdate,
    handleVillagersUpdate
}) {

    let name = "Farm";

    const upgradeLevels = {

        1: {
            lifePoints: 960,
            storageCapacity: 200,
            plusResourcesPerMinute: 100,
            image: '/assets/images/farm_1.png'
        },
        2: {
            lifePoints: 480, //1440
            storageCapacity: 7500, //10000
            plusResourcesPerMinute: 200,
            image: '/assets/images/farm_2.png'
        },
        3: {
            lifePoints: 480, //1920,
            storageCapacity: 20000, //30000,
            plusResourcesPerMinute: 300,
            image: '/assets/images/farm_3.png'
        }

    };

    const requirementsByLevel = {

        1: {
            resourceRequired: 0,
            villagersRequired: 0,
            upgradeTime: 0,
            level: 0
        },
        2: {
            resourceRequired: 100,
            villagersRequired: 4,
            upgradeTime: 5000 ,
            level: 0
        },
        3: {
            resourceRequired: 5600,
            villagersRequired: 4,
            upgradeTime: 1800000,
            level: 0 
        }

    };

    function updateValues(plusStorageCapacity) {

        //Funcion en el padre que va a actualizar el limite actual del recurso
        handleUpdateStorageValues((prev) => prev + plusStorageCapacity);
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
                handleVillagersUpdate={handleVillagersUpdate}
                handleResourceRequiredUpdate={handleResourceRequiredUpdate}
                typeOfResource={TypesOfResources.GOLD}
            />
        </>
    );
}