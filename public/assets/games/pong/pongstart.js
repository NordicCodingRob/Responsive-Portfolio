var runPong = function () {
    var pong = new Pong(document.getElementById('pong'));
    pong.onclick = function () {        
        function resize() {
            var gameHeight = window.innerHeight - 40 + 'px';
            document.getElementById('pong').style.height = gameHeight;

            pong.resize();
        }

        resize();
        window.onresize = resize;

        pong.players.a.addControls({
            'up': 'up',
            'down': 'down',
        });

        pong.on('update', function () {
            if (pong.players.b.y < pong.balls[0].y) {
                pong.players.b.move(1);
            } else if (pong.players.b.y > pong.balls[0].y) {
                pong.players.b.move(-1);
            }
        });
    };
}

