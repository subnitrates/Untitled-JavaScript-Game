// define generators
var generators = {
    food: {
        name: "Farm",
        level: 1,
        cost: 10,
        perClick: 1,
        perSecond: 0.5,
        type: "food"
    },
    water: {
        name: "Well",
        level: 1,
        cost: 10,
        perClick: 1,
        perSecond: 1,
        type: "water"
    },
    wood: {
        name: "Lumber Mill",
        level: 1,
        cost: 50,
        perClick: 1,
        perSecond: 5,
        type: "wood"
    },
    stone: {
        name: "Quarry",
        level: 1,
        cost: 50,
        perClick: 1,
        perSecond: 8.5,
        type: "stone"
    },
    animalHides: {
        name: "Hunting Lodge",
        level: 1,
        cost: 100,
        perClick: 1,
        perSecond: 2,
        type: "animalHides"
    }
};

// generate resources from clicking
function generateResource(generatorType) {
    var generator = generators[generatorType];
    resources[generatorType] += generator.perClick;
    updateResources();
}

/*// OLD: update generator display
function updateGenerator(generatorType) {
    var generator = generators[generatorType];
    document.getElementById(generatorType + "-level").innerHTML = generator.level;
    document.getElementById(generatorType + "-cost").innerHTML = generator.cost;
    document.getElementById(generatorType + "-perclick").innerHTML = generator.perClick;
    document.getElementById(generatorType + "-persecond").innerHTML = generator.perSecond;
}
*/

// update generator display dynamic
function updateBuilding(generator) {
    console.log('updateGenerator called with generator:', generator);
    var levelEl = document.getElementById(generator.id + '-level');
    if (levelEl) {
        console.log('levelEl found:', levelEl);
        levelEl.innerHTML = generator.level;
        console.log('levelEl.innerHTML set to:', generator.level);
    }

    var costEl = document.getElementById(generator.id + '-cost');
    if (costEl) {
        console.log('costEl found:', costEl);
        costEl.innerHTML = generator.cost;
        console.log('costEl.innerHTML set to:', generator.cost);
    }

    var perClickEl = document.getElementById(generator.id + '-perclick');
    if (perClickEl) {
        console.log('perClickEl found:', perClickEl);
        perClickEl.innerHTML = generator.perClick;
        console.log('perClickEl.innerHTML set to:', generator.perClick);
    }

    var perSecondEl = document.getElementById(generator.id + '-persecond');
    if (perSecondEl) {
        console.log('perSecondEl found:', perSecondEl);
        perSecondEl.innerHTML = generator.perSecond;
        console.log('perSecondEl.innerHTML set to:', generator.perSecond);
    }
}







