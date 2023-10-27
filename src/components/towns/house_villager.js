import ResourceStorageBase from "./resource_storage_base";
import { TypesOfResources } from "../../constants/constants";

export default function HouseVillager({
    level,
    quantityResource,
    quantityVillagers,
    handleUpdateStorageValues,
}) {

    let name = "House";

    const upgradeLevels = {

        1: {
            lifePoints: 100,
            storageCapacity: 1,
            image: '/assets/images/house_villager_1.png'
        },
        2: {
            lifePoints: 150,
            storageCapacity: 1,
            image: '/assets/images/house_villager_2.png'
        },
        3: {
            lifePoints: 200,
            storageCapacity: 1,
            image: '/assets/images/house_villager_2.png'
        }

    };

    const requirementsByLevel = {

        1: {
            resourceRequired: 50,
            villagersRequired: 1,
            upgradeTime: 10000
        },
        2: {
            resourceRequired: 100,
            villagersRequired: 1,
            upgradeTime: 15000
        },
        3: {
            resourceRequired: 200,
            villagersRequired: 1,
            upgradeTime: 20000
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
                handleDisableUpgradeBotton={true}
                typeOfResource={TypesOfResources.FOOD}
            />
        </>
    );
}