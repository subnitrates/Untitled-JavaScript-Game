
// define game state object
var gameState = {
    version: "0.0.3",
    resources: resources,
    buildings: buildings,
    timestate: {
        totalProgress: 0,
        lastUpdateTime: Date.now()
      },

};

// save game state to local storage
function saveGame() {
    console.log("Saving game...");
    localStorage.setItem("gameState", JSON.stringify(gameState));
    console.log(gameState.timestate.totalProgress)
}

// load game state from local storage
function loadGame() {
    console.log("Loading game...");
    var savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState !== null && savedState.version === gameState.version) {
        // load saved data if version matches
        resources = savedState.resources;
        buildings = savedState.buildings;
        timestate = savedState.timestate;
        gameState.resources = resources;
        gameState.buildings = buildings;
        gameState.timestate = timestate;
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

// update resources based on buildings every second
setInterval(function() {
    addPassiveResources();
}, 1000);

// update displays regularly
setInterval(function() {
    updateBuildings();
    updateResources();
    updateBuildingCosts();
    updatepassiveGainsValues();
}, 250);

