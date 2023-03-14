// event listeners for buttons
document.getElementById("food-generate").addEventListener("click", function() {
    generateResource("food");
});
document.getElementById("build-a-farm").addEventListener("click", function() {
    purchaseBuildings("farm");
});

document.getElementById("water-generate").addEventListener("click", function() {
    generateResource("water");
});
document.getElementById("water-upgrade").addEventListener("click", function() {
    purchaseBuildings("well");
});

document.getElementById("wood-generate").addEventListener("click", function() {
    generateResource("wood");
});
document.getElementById("wood-upgrade").addEventListener("click", function() {
    purchaseBuildings("lumberMill");
});

document.getElementById("stone-generate").addEventListener("click", function() {
    generateResource("stone");
});
document.getElementById("stone-upgrade").addEventListener("click", function() {
    purchaseBuildings("quarry");
});

document.getElementById("animalHides-generate").addEventListener("click", function() {
    generateResource("animalHides");
});
document.getElementById("animalHides-upgrade").addEventListener("click", function() {
    purchaseBuildings("huntersLodge");
    updateBuildingCosts()
});