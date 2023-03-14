let resources = {
  food: 0,
  water: 0,
  wood: 0,
  stone: 0,
  animalHides: 0,
};

let lastResources = { ...resources };
let lastUpdateTime = Date.now();
let rollingTotalTime = 0;
let currentSecondGain = 0;

function updateResources() {
  console.log('updateResources called');
  const now = Date.now();
  if (now - lastUpdateTime >= 1000) {
    updateResourceValues();
    lastUpdateTime = now;
  }
}

// Define a function called `updateResourceValues`
function updateResourceValues() {
  // Loop over each key-value pair in the `resources` object
  Object.entries(resources).forEach(([resource, value]) => {
    // Get the last value of the resource from the `lastResources` object
    const lastValue = lastResources[resource];

    // Calculate the increase in the resource's value
    const resourceIncrease = value - lastValue;

    // Calculate the change per second
    const changePerSecond = (resourceIncrease / 1000) * 60;

    // Update the last value of the resource in the `lastResources` object
    lastResources[resource] = value;

    // Get the DOM element that displays the resource's value
    const resourceElement = document.getElementById(resource);

    // Get the DOM element that displays the resource's increase in value
    const resourceIncreaseElement = document.getElementById(`${resource}Increase`);

    // Remove the 'increase' and 'decrease' classes from the resource increase element
    resourceIncreaseElement.classList.remove('increase', 'decrease');

    // Add the 'increase' class to the resource increase element if the resource increase is positive
    // Add the 'decrease' class to the resource increase element if the resource increase is negative
    if (resourceIncrease > 0) {
      resourceIncreaseElement.classList.add('increase');
      resourceIncreaseElement.style.color = 'green';
    } else if (resourceIncrease < 0) {
      resourceIncreaseElement.classList.add('decrease');
      resourceIncreaseElement.style.color = 'red';
    } else {
      resourceIncreaseElement.style.color = 'white';
    }

    // Set the text content of the resource increase element
    resourceIncreaseElement.textContent = `${changePerSecond.toFixed(1)}/s`;
    
    // Set the text content of the resource element
    resourceElement.textContent = Math.round(value);
  });

  // Calculate the current second gain in resources
  currentSecondGain += Object.values(resources).reduce((sum, value) => sum + value, 0);
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

// buy upgrades function
function buyUpgrade(upgradeType) {
  // check if the upgrade exists
  if (upgrades && upgrades.hasOwnProperty(upgradeType)) {
      // get the upgrade object
      var upgrade = upgrades[upgradeType];
      // check if there is enough money to buy the upgrade
      if (resources.money >= upgrade.cost) {
          // deduct the cost of the upgrade from the resources
          resources.money -= upgrade.cost;
          // increment the number of owned upgrades of this type
          upgrade.owned++;
          // if the upgrade provides additional resources per second
          if (upgrade.perSecond) {
              // set an interval to add the additional resources to the total every second
              setInterval(function() {
                  resources[upgradeType] += upgrade.perSecond;
                  // update the displayed resources
                  updateResources();
              }, 1000);
          }
          // if the upgrade provides a bonus to clicking the resource
          if (upgrade.perClickIncrease) {
              // generate the additional resource when the user clicks
              generateResource(upgradeType);
          }
          // update the displayed resources
          updateResources();
      } else {
          console.log("Insufficient funds");
      }
  } else {
      // if the upgrade type is invalid, log an error
      console.error("Invalid upgrade type: " + upgradeType);

  }
}