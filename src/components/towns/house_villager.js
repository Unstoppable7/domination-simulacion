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
            storageCapacity: 50,
            image: 'house_level_1'
        },
        2: {
            lifePoints: 150, 
            storageCapacity: 100, 
            image: 'house_level_2'
        },
        3: {
            lifePoints: 200, 
            storageCapacity: 150,
            image: 'house_level_3'
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
        handleUpdateStorageValues(TypesOfResources.FOOD, plusStorageCapacity);
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
                handleDisableUpgradeBotton = {false}
            />
        </>
    );
}