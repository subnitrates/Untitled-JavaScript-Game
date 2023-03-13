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