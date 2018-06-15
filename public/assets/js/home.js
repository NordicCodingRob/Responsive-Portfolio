// GOOGLE AUTH
<<<<<<< HEAD

=======
var username = "";
var loggedin = false;
>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMYryrvvx8YYsuZXFbopqiWs-Ipe3BOIQ",
    authDomain: "gamesite-f3ba7.firebaseapp.com",
    databaseURL: "https://gamesite-f3ba7.firebaseio.com",
    projectId: "gamesite-f3ba7",
    storageBucket: "gamesite-f3ba7.appspot.com",
    messagingSenderId: "67111225887"
};
firebase.initializeApp(config);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

<<<<<<< HEAD
firebase.auth().languageCode = 'pt';

provider.setCustomParameters({
    'login_hint': 'youremail@gmail.com'
});
firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // Provides a notice of error with credentials/verification
});

firebase.auth().signOut().then(function () {
    // Sign-out successful.
}).catch(function (error) {
    // An error happened.
});
=======
firebase.auth().useDeviceLanguage();



var uiConfig = {
    callbacks: {
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      },
        signInSuccess: function (currentUser, credential, redirectUrl) {
            username = currentUser.displayName;
            loggedin = true;
            modal.style.display = "none";
            removeElement("parent");
            $("#signin").html("Log out")
            return false;
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
  };

$("#signin").click(function(){
    if (loggedin == false) {
        modal.style.display = "flex";
        parentElement.innerHTML = 
        '<div id="firebaseui-auth-container"></div>\
        <div id="loader">Loading...</div>'
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    else if (loggedin == true){
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            username = "";
            loggedin = false;
            $("#signin").html("Log in")
            modal.style.display = "flex";
            parentElement.innerHTML = "<p>You've logged out!</p>"
        }).catch(function (error) {
            // An error happened.
        });

    }

})



>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc

//MODAL AND THE GAMES CODE

var highscore;
var game;

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
var CurrentGame = ""


$(".myBtn").click(function () {
    modal.style.display = "flex";
    btn = $(this);
    if (btn.val() == 1) {
        createSnake();
        CurrentGame = "Snake"
    }
    else if (btn.val() == 2) {
        createT();
        CurrentGame = "Tetris"
    }
    else if (btn.val() == 3) {
        createMemory();
        CurrentGame = "Memory"
    }
    else if (btn.val() == 4) {
        createWhack();
        CurrentGame = "Whack-a-mole"
    }

})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
<<<<<<< HEAD
    modal.style.display = "none";
    highscore = getGameHighScore();
    console.log(CurrentGame)
    UploadAndCheck(CurrentGame, highscore);
    removeElement("parent")




=======
    if (CurrentGame != ""){
        modal.style.display = "none";
        highscore = getGameHighScore();
        console.log(CurrentGame);
        UploadAndCheck(CurrentGame, highscore, username);
        removeElement("parent");
        CurrentGame= "";
    }
    else {
        modal.style.display = "none";
        removeElement("parent");
    }




>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
<<<<<<< HEAD
        modal.style.display = "none";;
        highscore = getGameHighScore();
        console.log(highscore)
        UploadAndCheck(CurrentGame, highscore);
        removeElement("parent");
=======
        if (CurrentGame != ""){
            modal.style.display = "none";
            highscore = getGameHighScore();
            console.log(highscore)
            UploadAndCheck(CurrentGame, highscore, username);
            removeElement("parent");
            CurrentGame= "";
        }
        else {
            modal.style.display = "none";
            removeElement("parent");
        }
>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc


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
    game = new SnakeJS(parentElement, settings);
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
    game = new TetrisJS();
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

var createWhack = function () {

    parentElement.innerHTML =
<<<<<<< HEAD
=======
        '<div id="pong"></div>\
	<div class="panel">\
		Move with [ UP ], [ DOWN ]\
	</div>'
    runPong();
>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc

        '<div class="gameContainer2">\
        <h1>Whack-a-mole!\
        <span class="score">0</span>\
        </h1>\
        <button id = "start">Whack It!</button>\
        <div class="game">\
            <div class="hole hole1">\
                <div class="mole"></div>\
            </div>\
            <div class="hole hole2">\
                <div class="mole"></div>\
            </div>\
            <div class="hole hole3">\
                <div class="mole"></div>\
            </div>\
            <div class="hole hole4">\
                <div class="mole"></div>\
            </div>\
            <div class="hole hole5">\
                <div class="mole"></div>\
            </div>\
            <div class="hole hole6">\
                <div class="mole"></div>\
            </div>\
        </div>\
        </div>'
    Whack();


<<<<<<< HEAD

};





=======
>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc
var getGameHighScore = function () {

    return game.getHighScore();

}

<<<<<<< HEAD
var UploadAndCheck = function (CurrentGame, highscore) {
=======
var UploadAndCheck = function (CurrentGame, highscore, player) {
>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc
    var newScore = {
        GameName: CurrentGame,
        scoreHolder: player,
        score: highscore
    };
    $.post("/api/scores", newScore, getScores);
}

var games = [];

function getScores() {
    $.get("/api/scores", function (data) {
        games = data;
<<<<<<< HEAD
        console.log(games)
=======
        
>>>>>>> a5701a8a18b6ef1d88ad1ba9069f59301a3399cc
    });
}
