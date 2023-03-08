// current version
var currentVersion = "1.0"

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