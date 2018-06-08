function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    removeElement("snake-js");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        removeElement("snake-js");
    }
}
// If you are using jQuery, use < $(document).ready(function(){ ... }) > instead


btn.addEventListener("click", function () {
    console.log(btn.value);
    // If you are using jQuery, you can use < var element = $("#parent"); > instead
    var parentElement = document.getElementById("parent");
    // User defined settings overrides default settings.
    // See snake-js.js for all available options.
    var settings = {
        frameInterval: 120,
        backgroundColor: "#f3e698"
    };
    // Create the game object. The settings object is NOT required.
    // The parentElement however is required
    var game = new SnakeJS(parentElement, settings);

}, false);