//version count, matters for save function
var version = "1.0.1";

// define resources
var resources = {
    food: 0,
    water: 0,
    wood: 0,
    stone: 0,
    animalHides: 0
};

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


// update resource display
function updateResources() {
    for (var resource in resources) {
        document.getElementById(resource).innerHTML = resources[resource];
    }
}

// update generator display
function updateGenerator(generatorType) {
    var generator = generators[generatorType];
    document.getElementById(generatorType + "-level").innerHTML = generator.level;
    document.getElementById(generatorType + "-cost").innerHTML = generator.cost;
    document.getElementById(generatorType + "-perclick").innerHTML = generator.perClick;
    document.getElementById(generatorType + "-persecond").innerHTML = generator.perSecond;
}

// generate resources from clicking
function generateResource(generatorType) {
    var generator = generators[generatorType];
    resources[generatorType] += generator.perClick;
    updateResources();
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


// event listeners for buttons
document.getElementById("food-generate").addEventListener("click", function () {
    generateResource("food");
});
document.getElementById("food-upgrade").addEventListener("click", function () {
    upgradeGenerator("food");
});

document.getElementById("water-generate").addEventListener("click", function () {
    generateResource("water");
});
document.getElementById("water-upgrade").addEventListener("click", function () {
    upgradeGenerator("water");
});

document.getElementById("wood-generate").addEventListener("click", function () {
    generateResource("wood");
});
document.getElementById("wood-upgrade").addEventListener("click", function () {
    upgradeGenerator("wood");
});

document.getElementById("stone-generate").addEventListener("click", function () {
    generateResource("stone");
});
document.getElementById("stone-upgrade").addEventListener("click", function () {
    upgradeGenerator("stone");
});

document.getElementById("animalHides-generate").addEventListener("click", function () {
    generateResource("animalHides");
});
document.getElementById("animalHides-upgrade").addEventListener("click", function () {
    upgradeGenerator("animalHides");
});

// set initial generator display
for (var generatorType in generators) {
    updateGenerator(generatorType);
}

// save game state to local storage
function saveGame() {
    console.log("Saving game...");
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("generators", JSON.stringify(generators));
}

// load game state from local storage
function loadGame() {
    var savedVersion = localStorage.getItem("version");
    var savedResources = JSON.parse(localStorage.getItem("resources"));
    var savedGenerators = JSON.parse(localStorage.getItem("generators"));
    var currentVersion = "1.0"; // set this to the current version or timestamp of your JavaScript file
    if (savedVersion === null || savedVersion !== currentVersion) {
        // clear saved data if version doesn't match
        localStorage.removeItem("resources");
        localStorage.removeItem("generators");
        localStorage.setItem("version", currentVersion);
    } else if (savedResources !== null && savedGenerators !== null) {
        resources = savedResources;
        generators = savedGenerators;
        updateResources();
        for (var generatorType in generators) {
            updateGenerator(generatorType);
        }
    }
}


// add event listener for save button
document.getElementById("save-button").addEventListener("click", function () {
    saveGame();
});

// add event listener for load button
document.getElementById("load-button").addEventListener("click", function () {
    loadGame();
});

// auto-save every 30 seconds
setInterval(function () {
    saveGame();
}, 30000);

// auto-load on page load
loadGame();