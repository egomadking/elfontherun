


if (document.getElementById("marquee")) {
/*
Snow credit: https: //codepen.io/loktar00/
Code found at: https: //codepen.io/loktar00/pen/CHpGo?page=1&
*/

    var flakes = [],
        canvas = document.getElementById("snow"),
        ctx = canvas.getContext("2d"),
        flakeCount = 400,
        mX = -100,
        mY = -100;

    var container = document.getElementById("marquee");
    var dimensions = container.getBoundingClientRect();

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    var snow = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < flakeCount; i++) {
            var flake = flakes[i],
                x = mX,
                y = mY,
                minDist = 150,
                x2 = flake.x,
                y2 = flake.y;

            var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                dx = x2 - x,
                dy = y2 - y;

            if (dist < minDist) {
                var force = minDist / (dist * dist),
                    xcomp = (x - x2) / dist,
                    ycomp = (y - y2) / dist,
                    deltaV = force / 2;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;

            } else {
                flake.velX *= 0.98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed;
                }
                flake.velX += Math.cos(flake.step += 0.05) * flake.stepSize;
            }

            ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= canvas.height || flake.y <= 0) {
                resetFlake(flake);
            }


            if (flake.x >= canvas.width || flake.x <= 0) {
                resetFlake(flake);
            }

            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(snow);
    };

    var resetFlake = function (flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = (Math.random() * 3) + 2;
        flake.speed = (Math.random() * 1) + 0.5;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + 0.3;
    };

    var snowInit = function () {
        for (var i = 0; i < flakeCount; i++) {
            var x = Math.floor(Math.random() * canvas.width),
                y = Math.floor(Math.random() * canvas.height),
                size = (Math.random() * 3) + 2,
                speed = (Math.random() * 1) + 0.5,
                opacity = (Math.random() * 0.5) + 0.3;

            flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: (Math.random()) / 30,
                step: 0,
                opacity: opacity
            });
        }

        snow();
    };

    /*
    Video header words - Elves stays static so it says:
        Elves
    are running here(swipe)
    Elves
    are running there(swipe)
    Elves
    are running everywhere(swipe)

    Wipes to Elf on the Run Logo - wipes to:
        Elves
    volunteer here(swipe)
    Elves
    volunteer there(swipe)
    Elves
    volunteer everywhere(swipe)
    Wipes to Elf logo and loops
    */
    elvesRunning = [
        'are running here',
        'are running there',
        'are running everywhere'
    ];

    elvesVolunteering = [
        'volunteer here',
        'volunteer there',
        'volunteer everywhere'
    ];

    window.addEventListener("resize", function () {
        container = document.getElementById('marquee');
        dimensions = container.getBoundingClientRect();
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
    });

    snowInit();
}


