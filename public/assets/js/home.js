// Google Authentication for the user-login

// var provider = new firebase.auth.GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// firebase.auth().languageCode = 'pt';

// provider.setCustomParameters({
//     'login_hint': 'youremail@gmail.com'
// });
// firebase.auth().signInWithPopup(provider).then(function (result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
// }).catch(function (error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // Provides a notice of error with credentials/verification
// });


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.removeChild(element.childNodes[0]);
}
// Get the modal
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var parentElement = document.getElementById("parent");


// Get the button that opens the modal
var btn = ""


$(".myBtn").click(function () {
    modal.style.display = "flex";
    btn = $(this);
    if (btn.val() == 1) {
        createSnake();
    }
    else if (btn.val() == 2) {
        createT();
    }
    else if (btn.val() == 3) {
        createMemory();
    }
    else if (btn.val() == 4) {
        createPong();
    }


})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    removeElement("parent")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        removeElement("parent")
    }
}
// If you are using jQuery, use < $(document).ready(function(){ ... }) > instead


var createSnake = function () {
    // User defined settings overrides default settings.
    // See snake-js.js for all available options.
    var settings = {
        frameInterval: 120,
        backgroundColor: "#f3e698"
    };
    // Create the game object. The settings object is NOT required.
    // The parentElement however is required
    var game = new SnakeJS(parentElement, settings);

};

var createT = function () {
    parentElement.innerHTML =
        '<div id="tetris">\
        <div id="menu">\
            <p id="start"><a href="javascript:play();">Press Space to Play.</a></p>\
            <p><canvas id="upcoming"></canvas></p>\
            <p>score <span id="score">00000</span></p>\
            <p>rows <span id="rows">0</span></p>\
        </div>\
        <canvas id="canvas">\
        </canvas>\
    </div>'
    tetrisCreate();
};

var createMemory = function () {
    parentElement.innerHTML =
        '<div class="gameContainer">\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    <div class="card unmatched"></div>\
    </div>'
    runMemory();
}

var createPong = function () {

    parentElement.innerHTML =
        '<canvas id="gameCanvas" width="600" height="400"></canvas>'
    console.log("test123")
    runPong();

}

