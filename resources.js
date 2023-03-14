// define resources
let resources = {
  food: 0,
  water: 0,
  wood: 0,
  stone: 0,
  animalHides: 0,
};

// update resource display
function updateResources() {
  for (var [resource, value] of Object.entries(resources)) {
      document.getElementById(resource).innerHTML = value;
  }
}
// define upgrades object
var upgrades = {
  clickUpgrade: {
    name: "Click Upgrade",
    description: "Increases resource generation per click",
    cost: 100,
    perClickIncrease: 1,
    owned: 0
  },
  autoUpgrade: {
    name: "Auto Upgrade",
    description: "Automatically generates resources over time",
    cost: 500,
    perSecond: 1,
    owned: 0
  }
};

// generate resources from clicking
function generateResource(resourceType) {
  var baseIncrement = 5;
  var incrementMultiplier = 1;

  // Check for any upgrades that increase the per click increment
  for (var upgradeType in upgrades) {
    if (upgrades.hasOwnProperty(upgradeType)) {
      var upgrade = upgrades[upgradeType];
      if (upgrade.perClickIncrease > 1 && upgrade.owned > 0) {
        incrementMultiplier += upgrade.perClickIncrease * upgrade.owned;
      }
    }
  }

  resources[resourceType] += baseIncrement * incrementMultiplier;
  updateResources();
}



// buy upgrades
function buyUpgrade(upgradeType) {
  if (upgrades && upgrades.hasOwnProperty(upgradeType)) {
    var upgrade = upgrades[upgradeType];
    if (resources.money >= upgrade.cost) {
      resources.money -= upgrade.cost;
      upgrade.owned++;
      if (upgrade.perSecond) {
        setInterval(function() {
          resources[upgradeType] += upgrade.perSecond;
          updateResources();
        }, 1000);
      }
      if (upgrade.perClickIncrease) {
        generateResource(upgradeType);
      }
      updateResources();
    } else {
      console.log("Insufficient funds");
    }
  } else {
    console.error(`Invalid upgrade type: ${upgradeType}`);
  }
}
