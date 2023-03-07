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
      level: 1,
      cost: 10,
      perClick: 1,
      perSecond: 0.2
    },
    water: {
      level: 1,
      cost: 10,
      perClick: 1,
      perSecond: 0.1
    },
    wood: {
      level: 1,
      cost: 10,
      perClick: 1,
      perSecond: 0.05
    },
    stone: {
      level: 1,
      cost: 10,
      perClick: 1,
      perSecond: 0.02
    },
    animalHides: {
      level: 1,
      cost: 10,
      perClick: 1,
      perSecond: 0.01
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
      updateResources();
      updateGenerator(generatorType);
    }
  }
  
  // set up event listeners
  document.getElementById("food-generate").addEventListener("click", function() { generateResource("food"); });
  document.getElementById("water-generate").addEventListener("click", function() { generateResource("water"); });
  document.getElementById("wood-generate").addEventListener("click", function() { generateResource("wood"); });
  document.getElementById("stone-generate").addEventListener("click", function() { generateResource("stone"); });
  document.getElementById("animalhides-generate").addEventListener("click", function() { generateResource("animalHides"); });
  
  document.getElementById("food-upgrade").addEventListener("click", function() { upgradeGenerator("food"); });
  document.getElementById("water-upgrade").addEventListener("click", function() { upgradeGenerator("water"); });
  document.getElementById("wood-upgrade").addEventListener("click", function() { upgradeGenerator("wood"); });
  document.getElementById("stone-upgrade").addEventListener("click", function() { upgradeGenerator("stone"); });
  document.getElementById("animalhides-upgrade").addEventListener("click", function() { upgradeGenerator("animalHides"); });
  
  // start auto-generation
  setInterval(function() {
    autoGenerateResource("food");
    autoGenerateResource("water");
    autoGenerateResource("wood");
    autoGenerateResource("stone");
  
//Old Code:
/*var resources = 0;
var generatorLevel = 1;
var generatorCost = 10;
var resourcesPerClick = 1;

var generateButton = document.getElementById("generate");
generateButton.addEventListener("click", function() {
    resources += resourcesPerClick;
    document.getElementById("resources").innerHTML = resources;
});

var upgradeButton = document.getElementById("upgrade");
upgradeButton.addEventListener("click", function() {
    if (resources >= generatorCost) {
        resources -= generatorCost;
        generatorLevel++;
        generatorCost *= 2;
        resourcesPerClick = generatorLevel;
        document.getElementById("resources").innerHTML = resources;
        document.getElementById("level").innerHTML = generatorLevel;
        document.getElementById("cost").innerHTML = generatorCost;
        document.getElementById("perclick").innerHTML = resourcesPerClick;
    }
});
*/