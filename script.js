// current version
var currentVersion = "1.0"

// save game state to local storage
function saveGame() {
    console.log("Saving game...");
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("generators", JSON.stringify(generators));
}

// load game state from local storage
function loadGame() {
    var savedVersion = localStorage.getItem("version");
    var savedResources = JSON.parse(localStorage.getItem("resources"));
    var savedGenerators = JSON.parse(localStorage.getItem("generators"));
    Version = "1.0"; // set this to the current version or timestamp of your JavaScript file
    if (savedVersion === null || savedVersion !== currentVersion) {
        // clear saved data if version doesn't match
        localStorage.removeItem("resources");
        localStorage.removeItem("generators");
        localStorage.setItem("version", currentVersion);
    } else if (savedResources !== null && savedGenerators !== null) {
        resources = savedResources;
        generators = savedGenerators;
        updateResources();
        for (var generatorType in generators) {
            updateGenerator(generatorType);
        }
    }
}


// add event listener for save button
document.getElementById("save-button").addEventListener("click", function () {
    saveGame();
});

// add event listener for load button
document.getElementById("load-button").addEventListener("click", function () {
    loadGame();
});

// auto-save every 30 seconds
setInterval(function () {
    saveGame();
}, 30000);

// auto-load on page load
loadGame();

// delete save function
function deleteSave() {
    console.log("Deleting save...");
    localStorage.removeItem("resources");
    localStorage.removeItem("generators");
}

// listener event for delete function
document.getElementById("delete-save-button").addEventListener("click", function () {
    deleteSave();
});


document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with class "resource-btn"
    var resourceBtns = document.querySelectorAll('.resource-btn');

    // Loop through all resource buttons and add mouseover event listener
    resourceBtns.forEach(function (btn) {
        btn.addEventListener('mouseover', function () {
            // Get the resource name from the data-resource attribute
            var resource = this.getAttribute('data-resource');

            // Generate HTML for the tooltip content based on the resource name
            var tooltipContent = '<p>Level: <span id="' + resource + '-level"></span></p>'
                + '<p>Cost: <span id="' + resource + '-cost"></span> ' + resource + '</p>'
                + '<p>Per Click: <span id="' + resource + '-perclick"></span></p>'
                + '<p>Per Second: <span id="' + resource + '-persecond"></span></p>';

            // Set the tooltip content as the data-tooltip attribute on the container div
            var tooltipContainer = document.querySelector('.tooltip-container');
            tooltipContainer.setAttribute('data-tooltip', tooltipContent);

            // Show the tooltip by triggering the mouseenter event on the container div
            var mouseEnterEvent = new Event('mouseenter');
            tooltipContainer.dispatchEvent(mouseEnterEvent);
        });
    });
});

$('.resource-btn').on('mouseover', function () {
    // Get the resource name from the data-resource attribute
    var resource = $(this).data('resource');

    // Update the tooltip content
    updateTooltipContent(resource);

    // Show the tooltip by triggering the mouseenter event on the container div
    $('.tooltip-container').tooltip('show');
});


// Get all generator divs on the page
var generatorDivs = document.querySelectorAll('.generator');

// Loop through all generator divs and set their width to the width of the viewport
generatorDivs.forEach(function (generatorDiv) {
    generatorDiv.style.width = window.innerWidth * 0.3 + 'px';
});
