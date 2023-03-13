// define buildings
let buildings = {
    farm: 1,
    well: 1,
    lumberMill: 1,
    quarry: 1,
    huntersLodge: 1,
};

// update building display
function updateBuildings() {
    for (var [building, value] of Object.entries(buildings)) {
        document.getElementById(building).innerHTML = value;
    }
};

// define passive gain for each building
const passiveGains = {
    farm: {
        food: 10
    },
    well: {
        water: 15
    },
    lumberMill: {
        wood: 5
    },
    quarry: {
        stone: 3
    },
    huntersLodge: {
        food: 5,
        animalHides: 5
    },
};

function addPassiveResources() {
    for (let building in buildings) {
        const numBuildings = buildings[building];
        const gains = passiveGains[building]
        for (let resource in gains) {
            const amount = gains[resource] * numBuildings;
            resources[resource] += amount;
        }
    }
};

// define costs for each building
const buildingCosts = {
    farm: {
        food: 50,
        water: 20,
        wood: 30,
        animalHides: 10
    },
    well: {
        wood: 30,
        stone: 40
    },
    lumberMill: {
        wood: 50,
        stone: 20,
        animalHides: 10
    },
    quarry: {
        wood: 60,
        stone: 80,
        animalHides: 5
    },
    huntersLodge: {
        food: 40,
        water: 20,
        wood: 60,
        animalHides: 20
    },
};

// define the cost multiplier for each building
const buildingCostMultipliers = {
    farm: 1.2,
    well: 1.1,
    lumberMill: 1.3,
    quarry: 1.4,
    huntersLodge: 1.2,
}


// purchase buildings
function purchaseBuildings(buildingName) {
    // check existing costs
    const cost = buildingCosts[buildingName];
    const multiplier = buildingCostMultipliers[buildingName];

    // check if player has enough resources
    for (let resource in cost) {
        if (resources[resource] < cost[resource] * multiplier) {
            console.log(`Not enough ${resource} to purchase ${buildingName}.`);
            return false;
        }
    }
    // remove resources from player
    for (let resource in cost) {
        resources[resource] -= cost[resource] * multiplier;

        // increment building count
        buildings[buildingName]++;

        console.log(`${buildingName} purchased.`);

        // log current building counts
        console.log(`Current building counts:`);
        for (let building in buildings) {
            console.log(`${building} : ${buildings[building]}`);
    }
    return true;
    
}}


// get building costs
function getBuildingCost(buildingName) {
    const cost = buildingCosts[buildingName];
    const multiplier = buildingCostMultipliers[buildingName];
    const costStringArray = [];
    const buildingCount = buildings[buildingName];

    for (const resource in cost) {
        const resourceCost = Math.round(cost[resource] * multiplier ** buildingCount);
        costStringArray.push(`${resource} : ${resourceCost}`);
    }

    return costStringArray.join(", ");
}



// update building cost display
function updateBuildingCosts() {
    document.getElementById("farm-cost").textContent = getBuildingCost("farm");
    document.getElementById("well-cost").textContent = getBuildingCost("well");
    document.getElementById("lumber-mill-cost").textContent = getBuildingCost("lumberMill");
    document.getElementById("quarry-cost").textContent = getBuildingCost("quarry");
    document.getElementById("hunters-lodge-cost").textContent = getBuildingCost("huntersLodge");
  }