import ResourceStorageBase from "./resource_storage_base";

export default function TownHall({
    level,
    quantityResource,
    quantityVillagers,
    handleUpdateStorageValues,
    upgradeLevel
}) {

    let name = "Town Hall";

    const upgradeLevels = {

        1: {
            lifePoints: 960,
            storageCapacity: 500,
            image: '/assets/images/town_hall_1.png'
        },
        2: {
            lifePoints: 480, 
            storageCapacity: 500, 
            image: '/assets/images/town_hall_2.png'
        },
        3: {
            lifePoints: 480, 
            storageCapacity: 500, 
            image: '/assets/images/town_hall_3.png'
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
            resourceRequired: 200,
            villagersRequired: 4,
            upgradeTime: 5000,
            level: 1
        },
        3: {
            resourceRequired: 5600,
            villagersRequired: 4,
            upgradeTime: 1800000,
            level: 1 
        },
        

    };

    function updateValues(plusStorageCapacity) {

        if (plusStorageCapacity) {
            
            //Funcion en el padre que va a actualizar el limite actual del recurso
            handleUpdateStorageValues((prev) => { return prev + plusStorageCapacity});
        }
    }

    function upgradeTownHall(currentUpgradeLevel) {
        
        upgradeLevel(currentUpgradeLevel);

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
                handleUpgrade={upgradeTownHall}
            />
        </>
    );
}