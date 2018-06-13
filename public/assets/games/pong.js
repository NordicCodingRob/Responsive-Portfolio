var runPong = function () {
    var canvas;
    var canvasContext;
    var ballX = 50;
    var ballY = 50;
    var ballSpeedX = 10;
    var ballSpeedY = 4;
    var player1Score = 0;
    var player2Score = 0;
    var WINNING_SCORE = 3;
    var showingWinScreen = false;
    var paddle1Y = 250;
    var paddle2Y = 250;
    var PADDLE_HEIGHT = 100;
    var PADDLE_WIDTH = 10;
    canvas = document.getElementById('gameCanvas');
    function calculateMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        // account for where on page from side or top canvas element is and how far scrolled.
        // returns relative position
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        }
    }
    function handleMouseClick(evt) {
        if (showingWinScreen) {
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;
        }
    }
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    // calls drawEverything in intervals of 1000 ms
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove',
        function (evt) {
            var mousePos = calculateMousePos(evt);
            // center paddle position with mouse
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
    function ballReset() {
        if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
        }
        // change ball direction
        ballSpeedX = -ballSpeedX
        // place ball in center position
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
    function computerMovement() {
        var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2
        if (paddle2YCenter < ballY - 35) {
            paddle2Y += 6;
        }
        else if (paddle2YCenter > ballY + 35) {
            paddle2Y -= 6;
        }
    }
    function moveEverything() {
        if (showingWinScreen) {
            return;
        }
        computerMovement();
        ballX += ballSpeedX;
        // if ball reaches left side of screen (player 1 side)
        if (ballX < 0) {
            // if ball lands in paddle range, reverse ball direction
            if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                // change angle of ball depending on where on paddle hit
                var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
                // 0.35 as offset could be very large number
                ballSpeedY = deltaY * 0.35;
            }
            // if ball is outside paddle range, player 2 scores a point
            else {
                player2Score++;
                ballReset();
            }
        }
        if (ballX > canvas.width) {
            if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.35;
            }
            else {
                player1Score++;
                ballReset();
            }
        }
        ballY += ballSpeedY;
        if (ballY > canvas.height || ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
    }
    function drawNet() {
        // for canvas height, draw lines of 20 px long, 2 wide, at the center
        for (var i = 0; i < canvas.height; i += 40) {
            colorRect((canvas.width / 2) - 1, i, 2, 20, 'green');
        }
    }
    function drawEverything() {
        // draws black screen
        colorRect(0, 0, canvas.width, canvas.height, 'purple');
        if (showingWinScreen) {
            canvasContext.fillStyle = 'yellow'
            if (player1Score >= WINNING_SCORE) {
                canvasContext.fillText("Left Player Wins", 350, 200);
            }
            else if (player2Score >= WINNING_SCORE) {
                canvasContext.fillText("Right Player Wins", 350, 200);
            }
            canvasContext.fillText("Click to continue", 350, 500);
            return;
        }
        drawNet();
        // draws player 1 (left) paddle
        colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'yellow');
        // draws player 2 (right) paddle
        colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'red');
        // draws ball
        colorCircle(ballX, ballY, 10, 'white');
        // text, x, y
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, canvas.width - 100, 100);
    }
    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
    function colorCircle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        // X ( center of circle), Y, Radius, angles, radians, clockwise/counter-clockwise
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }
};