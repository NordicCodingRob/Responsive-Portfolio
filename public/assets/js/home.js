// GOOGLE AUTH

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

var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

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

firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

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
        createPong();
    }
    console.log(CurrentGame)

})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    highscore = getGameHighScore();
    console.log(CurrentGame)
    UploadAndCheck(CurrentGame, highscore);
    removeElement("parent")
    


    
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";;
        highscore = getGameHighScore();
        console.log(highscore)
        UploadAndCheck(CurrentGame, highscore);
        removeElement("parent");
        

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

var createPong = function () {

    parentElement.innerHTML =
    '<div id="pong"></div>\
	<div class="panel">\
		Move with [ UP ], [ DOWN ]\
	</div>'
    runPong();

}


var getGameHighScore = function() {
   
        return game.getHighScore();
    
}

var UploadAndCheck = function(CurrentGame, highscore) {
    var  newScore = {
        GameName: CurrentGame,
        scoreHolder: "me",
        score: highscore
    };
    $.post("/api/scores", newScore,getScores);
}

var games = [];

function getScores() {
    $.get("/api/scores", function(data) {
      games = data;
      console.log(games)
    });
  }
