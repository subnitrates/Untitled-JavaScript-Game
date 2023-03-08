// current version
var currentVersion = "1.0"


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
    Version = "1.0"; // set this to the current version or timestamp of your JavaScript file
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