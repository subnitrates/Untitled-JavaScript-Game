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
    // Get the number of buildings already owned for the given building.
const buildingCount = buildings[buildingName];

    // check if player has enough resources
    for (let resource in cost) {
        if (resources[resource] < (cost[resource] * multiplier ** buildingCount)) {
            console.log(`Not enough ${resource} to purchase ${buildingName}.`);
            return false;
        } else {
            resources[resource] -= (cost[resource] * multiplier);
        }
    }

    // increment building count
    buildings[buildingName]++;

    console.log(`${buildingName} purchased.`);

    // log current building counts
    console.log(`Current building counts:`);
    for (let building in buildings) {
        console.log(`${building} : ${buildings[building]}`);
    }

    return true;


}


// This function takes in the name of a building and calculates the current cost to purchase another one.
function getBuildingCost(buildingName) {
    // Get the base cost and cost multiplier for the given building.
    const cost = buildingCosts[buildingName];
    const multiplier = buildingCostMultipliers[buildingName];
    // Create an empty array to hold the string representation of each resource cost.
const costStringArray = [];

// Get the number of buildings already owned for the given building.
const buildingCount = buildings[buildingName];

// Iterate over each resource required to purchase the building and calculate its current cost.
for (const resource in cost) {
    const resourceCost = Math.round(cost[resource] * multiplier ** buildingCount);
    // Add the string representation of the current resource cost to the costStringArray.
    costStringArray.push(`<strong>${resource}</strong> ${resourceCost}`);
}

// Join the elements of the costStringArray into a comma-separated string and return it.
return costStringArray.join(", ");
}



// update building cost display
function updateBuildingCosts() {
    document.getElementById("farm-cost").innerHTML = getBuildingCost("farm");
    document.getElementById("well-cost").innerHTML = getBuildingCost("well");
    document.getElementById("lumber-mill-cost").innerHTML = getBuildingCost("lumberMill");
    document.getElementById("quarry-cost").innerHTML = getBuildingCost("quarry");
    document.getElementById("hunters-lodge-cost").innerHTML = getBuildingCost("huntersLodge");
}



// get building generation values
function getpassiveGainsValues(buildingName) {
    //console.log(`Calculating generation values for ${buildingName}...`);
    const building = buildings[buildingName];
    const generationValues = [];

    // loop through each resource and calculate its generation value
    for (const resource in passiveGains[buildingName]) {
        const baseValue = passiveGains[buildingName][resource];
        const valuePerLevel = passiveGains[buildingName][resource];
        const generationValue = baseValue + (valuePerLevel * building);
        generationValues.push(`<strong>${resource}</strong> ${generationValue}`);
    }
    //console.log(`Generation values for ${buildingName}: ${generationValues.join(", ")}`);
    return generationValues;
}



// update building generation values display
function updatepassiveGainsValues() {
    document.getElementById("farm-gain").innerHTML = getpassiveGainsValues("farm");
    document.getElementById("well-gain").innerHTML = getpassiveGainsValues("well");
    document.getElementById("lumber-mill-gain").innerHTML = getpassiveGainsValues("lumberMill");
    document.getElementById("quarry-gain").innerHTML = getpassiveGainsValues("quarry");
    document.getElementById("hunters-lodge-gain").innerHTML = getpassiveGainsValues("huntersLodge");
}