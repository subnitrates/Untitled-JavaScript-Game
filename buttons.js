// event listeners for buttons
document.getElementById("food-generate").addEventListener("click", function () {
    generateResource("food");
});
document.getElementById("food-upgrade").addEventListener("click", function () {
    upgradeGenerator("food");
});

document.getElementById("water-generate").addEventListener("click", function () {
    generateResource("water");
});
document.getElementById("water-upgrade").addEventListener("click", function () {
    upgradeGenerator("water");
});

document.getElementById("wood-generate").addEventListener("click", function () {
    generateResource("wood");
});
document.getElementById("wood-upgrade").addEventListener("click", function () {
    upgradeGenerator("wood");
});

document.getElementById("stone-generate").addEventListener("click", function () {
    generateResource("stone");
});
document.getElementById("stone-upgrade").addEventListener("click", function () {
    upgradeGenerator("stone");
});

document.getElementById("animalHides-generate").addEventListener("click", function () {
    generateResource("animalHides");
});
document.getElementById("animalHides-upgrade").addEventListener("click", function () {
    upgradeGenerator("animalHides");
});