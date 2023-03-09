// Define the resources object
var resources = {
    food: 0,
    water: 0,
    wood: 0,
    stone: 0,
    animalHides: 0,
    population: 0
};

// Define the buildings object
var buildings = {
    farm: {
        name: "Farm",
        resource: "Food",
        owned: 1,
        level: 0
    },
    well: {
        name: "Well",
        resource: "Water",
        owned: 1,
        level: 0
    },
    lumberMill: {
        name: "Lumber Mill",
        resource: "Wood",
        owned: 1,
        level: 0
    },
    stoneQuarry: {
        name: "Stone Quarry",
        resource: "Stone",
        owned: 1,
        level: 0
    },
    huntingLodge: {
        name: "Hunting Lodge",
        resource: "Animal Hides",
        owned: 1,
        level: 0
    }
};





function updateResources(resource, quantity) {
    console.log(`Updating ${resource} with quantity ${quantity}`);

    // check if the resource exists in the resources object
    if (!(resource in resources)) {
        console.error('Resource not found!', resource);
        return;
    }

    // update the quantity of the matching resource
    resources[resource] += quantity;

    // update the display of the resource quantity on the UI
    const resourceEl = document.getElementById(resource + '-quantity');
    if (resourceEl === null) {
        console.error('Resource element not found!', resource);
        return;
    }
    
    resourceEl.textContent = resources[resource];

    console.log(`Updated ${resource} with quantity ${quantity}.`);
}

// update the display of all resource quantities on the UI
function updateResourceUI(resource) {
    const resourceEl = document.getElementById(resource);
    resourceEl.textContent = resources[resource];
}

// update inital resource display
for (const resource in resources) {
    const resourceDisp = document.getElementById(resource + '-quantity');
    if (resourceDisp) {
        resourceDisp.textContent = resources[resource]
    }
}

// add click event listeners to all resource buttons
for (const resource in resources) {
    const resourceButton = document.getElementById(resource + '-btn');
    resourceButton.addEventListener('click', function () {
        updateResources(resource, 10); // call the function and pass the resource name and quantity
    });
}

// update the display of building levels
function updateBuildingLevels() {
    for (const building in buildings) {
        const levelEl = document.getElementById(building + '-level');
        if (levelEl) {
            levelEl.textContent = buildings[building].level;
        }
    }
}

// update the display of all buildings owned on the UI
for (const building in buildings) {
    const ownedEl = document.getElementById(building + '-owned');
    if (ownedEl) {
        ownedEl.textContent = buildings[building].owned;
    }
}


function updateBuilding(building, quantity) {
    // check if the building exists in the buildings object
    if (!(building in buildings)) {
        console.log("Buildings:", buildings);
        console.error(`First check. Building '${building}' not found!`);
        return;
    }
    console.log(`Updating building '${building}' with quantity ${quantity}...`);
    // update the quantity of the matching building
    buildings[building].owned += quantity;
    console.log(`Building '${building}' now has ${buildings[building].owned} owned.`);
    // update the display of the building quantity on the UI
    const ownedEl = document.getElementById(building + '-owned');
    if (!ownedEl) {
        console.error(`Element for building '${building}' not found!`);
        return;
    }
    console.log(`Updating building '${building}' element...`);
    ownedEl.textContent = buildings[building].owned;
}



// save game state to local storage
function saveGame() {
    var save = {
        resources: resources,
        buildings: buildings
    };
    console.log("Saving game...");
    console.log("Saved resources:", resources);
    console.log("Saved buildings:", buildings);
    localStorage.setItem("save", JSON.stringify(save));
}


// load game state from local storage
function loadGame() {
    console.log ("Loading game...")
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.resources !== "undefined") resources = savegame.resources;
    console.log("Loaded resources:", resources);
    console.log("Loaded buildings:", buildings);
    console.log("Save data loaded.")
}

// delete save from local storage
function deleteSave() {
    localStorage.removeItem("save")
    console.log("Save data deleted.");
}


// add event listener for save button
document.getElementById("save-button").addEventListener("click", function () {
    saveGame();
});

// add event listener for load button
document.getElementById("load-button").addEventListener("click", function () {
    loadGame();
});

// add event listener for delete button
document.getElementById("delete-button").addEventListener("click", function () {
    deleteSave();
});

// auto-save every 30 seconds
setInterval(function () {
    saveGame();
}, 30000);

// auto-load on page load
loadGame();
updateBuilding();
updateBuildingLevels();
updateResourceUI();
updateResources();

