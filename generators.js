// define generators
var generators = {
    food: {
        name: "Farm",
        level: 1,
        cost: 10,
        perClick: 1,
        perSecond: 0.2,
        type: "food"
    },
    water: {
        name: "Well",
        level: 1,
        cost: 10,
        perClick: 1,
        perSecond: 0.1,
        type: "water"
    },
    wood: {
        name: "Lumber Mill",
        level: 1,
        cost: 50,
        perClick: 1,
        perSecond: 0,
        type: "wood"
    },
    stone: {
        name: "Quarry",
        level: 1,
        cost: 50,
        perClick: 1,
        perSecond: 0,
        type: "stone"
    },
    animalHides: {
        name: "Hunting Lodge",
        level: 1,
        cost: 100,
        perClick: 1,
        perSecond: 0,
        type: "animalHides"
    }
};

// generate resources from clicking
function generateResource(generatorType) {
    var generator = generators[generatorType];
    resources[generatorType] += generator.perClick;
    updateResources();
}

// update generator display
function updateGenerator(generatorType) {
    var generator = generators[generatorType];
    document.getElementById(generatorType + "-level").innerHTML = generator.level;
    document.getElementById(generatorType + "-cost").innerHTML = generator.cost;
    document.getElementById(generatorType + "-perclick").innerHTML = generator.perClick;
    document.getElementById(generatorType + "-persecond").innerHTML = generator.perSecond;
}

// generate resources automatically
function autoGenerateResource(generatorType) {
    var generator = generators[generatorType];
    resources[generatorType] += generator.perSecond;
    updateResources();
}

// upgrade generator
function upgradeGenerator(generatorType) {
    var generator = generators[generatorType];
    if (resources[generatorType] >= generator.cost) {
        resources[generatorType] -= generator.cost;
        generator.level++;
        generator.cost *= 2;
        generator.perClick = generator.level;
        updateGenerator(generatorType);
        updateResources();
    }
}

// set initial generator display
for (var generatorType in generators) {
    updateGenerator(generatorType);
}

// auto-generate resources for each generator
for (var generatorType in generators) {
    setInterval(function() {
        autoGenerateResource(generatorType);
    }, 1000);
}
