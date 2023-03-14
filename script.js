
// define game state object
var gameState = {
    version: "0.0.3",
    resources: resources,
    buildings: buildings,

};

// save game state to local storage
function saveGame() {
    console.log("Saving game...");
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

// load game state from local storage
function loadGame() {
    console.log("Loading game...");
    var savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState !== null && savedState.version === gameState.version) {
        // load saved data if version matches
        resources = savedState.resources;
        buildings = savedState.buildings;
        gameState.resources = resources;
        gameState.buildings = buildings;
        updateResources();
        updateBuildings();
    }
}

// update game state object as needed
gameState.resources = resources;
gameState.buildings = buildings;

// add event listener for save button
document.getElementById("save-button").addEventListener("click", function() {
    saveGame();
});

// add event listener for load button
document.getElementById("load-button").addEventListener("click", function() {
    loadGame();
});

// auto-save every 1 seconds
setInterval(function() {
    saveGame();
}, 1000);

// auto-load on page load
loadGame();
updateResources();
updateBuildings();

// delete save function
function deleteSave() {
    console.log("Deleting save...");
    localStorage.removeItem("gameState");
}

// listener event for delete function
document.getElementById("delete-save-button").addEventListener("click", function() {
    deleteSave();
    location.reload();
});

// update displays regularly
setInterval(function() {
    updateBuildings();
    updateResources();
    updateBuildingCosts();
    updatepassiveGainsValues();
}, 50);

// The game loop
const loop = new GameLoop();

// The onUpdate function updates the resources each frame
loop.onUpdate = function(dt, t) {
// Update the passive resource gains
addPassiveResources(dt, t);
// Update any other resource gains here
// ...
};

// The onRender function updates the game screen each frame
loop.onRender = function(i) {
// Update the game screen here
// ...
};

// The onPanic function is called when the loop is behind schedule
loop.onPanic = function() {
// Handle the panic situation here
// ...
};

// Start the game loop
loop.start();