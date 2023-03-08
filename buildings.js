var buildings = {
    farm: {
        name: "Farm",
        level: 1,
        cost: 10,
        perSecond: 0.5,
        type: "food"
    },
    well: {
        name: "Well",
        level: 1,
        cost: 10,
        perSecond: 1,
        type: "water"
    },
    lumberMill: {
        name: "Lumber Mill",
        level: 1,
        cost: 50,
        perSecond: 5,
        type: "wood"
    },
    quarry: {
        name: "Quarry",
        level: 1,
        cost: 50,
        perSecond: 8.5,
        type: "stone"
    },
    huntingLodge: {
        name: "Hunting Lodge",
        level: 1,
        cost: 100,
        perSecond: 2,
        type: "animalHides"
    }
};


// update buildings display
function updateBuilding() {
    for (var building in buildings) {
        document.getElementById(building + '-level').innerHTML = buildings[building].level;
        document.getElementById(building + '-cost').innerHTML = buildings[building].cost;
        document.getElementById(building + '-perclick').innerHTML = buildings[building].perClick;
        document.getElementById(building + '-persecond').innerHTML = buildings[building].perSecond;
    }
}


// upgrade building
function upgradeBuilding(buildingType) {
    var building = buildings[buildingType];
    if (buildings[buildingType] >= building.cost) {
        buildings[buildingType] -= building.cost;
        building.level++;
        building.cost *= 2;
        updateBuilding(buildingType);
        updateResources();
    }
}

// set initial building display
for (var buildingType in buildings) {
    updateBuilding();
}

// auto-generate resources for each building
for (var buildingType in buildings) {
    (function (buildingType) {
        setInterval(function () {
            autoGenerateResource(buildingType);
        }, 1000);
    })(buildingType);
}


// generate resources automatically
function autoGenerateResource(generatorType) {
    var generator = generators[generatorType];
    resources[generatorType] += generator.perSecond;
    updateResources();
}