import ResourceStorageBase from "./resource_storage_base";
import { TypesOfResources } from "../../constants/constants";

export default function GoldStorage({ level, quantityResource, quantityVillagers, handleUpdateStorageValues, handleVillagersUpdate,handleResourceRequiredUpdate }) {

    let name = "Market";

    const upgradeLevels = {

        1: {
            lifePoints: 960,
            storageCapacity: 2500,
            image: '/assets/images/gold_storage_1.png'
        },
        2: {
            lifePoints: 480, //1440
            storageCapacity: 7500, //10000
            image: '/assets/images/gold_storage_2.png'
        },
        3: {
            lifePoints: 480, //1920,
            storageCapacity: 20000, //30000,
            image: '/assets/images/gold_storage_3.png'
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
            resourceRequired: 150,
            villagersRequired: 4,
            upgradeTime: 5000,
            level: 1
        },
        3: {
            resourceRequired: 5600,
            villagersRequired: 4,
            upgradeTime: 1800000,
            level: 1
        }

    };

    function updateValues(plusStorageCapacity) {

        //Funcion en el padre que va a actualizar el limite actual del recurso
        handleUpdateStorageValues((prev) => { return prev + plusStorageCapacity});
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
                handleDisableCollectBotton={true}
                handleVillagersUpdate={handleVillagersUpdate}
                handleResourceRequiredUpdate={handleResourceRequiredUpdate}
                typeOfResource={TypesOfResources.FOOD}

            />
        </>
    );
}