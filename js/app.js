(function() {
  if (document.getElementById('marquee')) {
    /*
  Snow credit: https: //codepen.io/loktar00/
  Code found at: https: //codepen.io/loktar00/pen/CHpGo?page=1&
  */

    var flakes = [],
      canvas = document.getElementById('snow'),
      ctx = canvas.getContext('2d'),
      mX = -100,
      mY = -100;

    var container = document.getElementById('marquee');
    var dimensions = container.getBoundingClientRect();

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    var flakeCount = Math.round(canvas.width / 2.5);

    var snow = function() {
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
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
          flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
        }

        ctx.fillStyle = 'rgba(255,255,255,' + flake.opacity + ')';
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
      //requestAnimationFrame(snow);
    };

    var resetFlake = function(flake) {
      flake.x = Math.floor(Math.random() * canvas.width);
      flake.y = 0;
      flake.size = Math.random() * 3 + 2;
      flake.speed = Math.random() * 1 + 0.5;
      flake.velY = flake.speed;
      flake.velX = 0;
      flake.opacity = Math.random() * 0.5 + 0.3;
    };

    var snowInit = function() {
      for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
          y = Math.floor(Math.random() * canvas.height),
          size = Math.random() * 3 + 2,
          speed = Math.random() * 1 + 0.5,
          opacity = Math.random() * 0.5 + 0.3;

        flakes.push({
          speed: speed,
          velY: speed,
          velX: 0,
          x: x,
          y: y,
          size: size,
          stepSize: Math.random() / 30,
          step: 0,
          opacity: opacity
        });
      }
      animateScreen();
      //snow();
    };

    /*
  Video header words - Elves stays static so it says:
      Elves
          are running here(swipe)
          are running there(swipe)
          are running everywhere(swipe)

  Wipes to Elf on the Run Logo - wipes to:
      Elves
          volunteer here(swipe)
          volunteer there(swipe)
          volunteer everywhere(swipe)
  Wipes to Elf logo and loops
  */
    var textX = 370,
      textY = 280; 
    var textAlign = 'left';
    var elfX = textX - 45,
      elfY = 300;
    var textSize = 96,
      elfSize = 128;
    var predOpacity = 1;
    var text = 'are running here';
    var oldTime = Date.now();
    var cycle = 1;
    var elvesDoing = [
      'are running here',
      'are running there',
      'are running \neverywhere',
      'volunteer here',
      'volunteer there',
      'make a difference \neverywhere'
    ];

    //outside writeText to avoid rAF
    var measureText = function() {
      var titleBar = document.getElementsByClassName('title-bar')[0];
      if (titleBar.style.display === 'none') {
        elfY = 280; //reset when title-bar re-hides
        textAlign = 'left';
        if (canvas.width >= 925) {
          textX = 370 + (canvas.width / 2 - 463);
          elfX = textX - 325;
        } else {
          textX = canvas.width / 3 + 50;
          elfX = textX - canvas.width / 3;
          textSize = Math.round(96 * (canvas.width / 925));
          elfSize = Math.round(128 * (canvas.width / 925));
        }
      } else {
        textSize = 52;
        textY = 240;
        elfSize = 96;
        elfY = 120;
        //get rid of crazy math by centering text
        textAlign = 'center';
        elfX = canvas.width / 2;
        textX = canvas.width / 2;

        console.log('titlebar activated!');
      }
    };

    var writeText = function() {
      var black = 'rgba(0,0,0,1)';
      var green = 'rgba(255,255,255, 1)';  //var green = 'rgba(28, 237,83, 1)';

      //write elf
      ctx.font = elfSize + 'px Roboto';
      ctx.fillStyle = green;
      ctx.textAlign = textAlign;
      ctx.fillText('Elves', elfX, elfY);
      ctx.fillStyle = black;

      //write predicate
      ctx.font = textSize + 'px Sacramento';
      ctx.fillStyle = 'rgba(255,255,255, ' + predOpacity + ')';
      ctx.textAlign = textAlign;
      if (text.length === 2) {
        for (var i = 0; i < text.length; i++) {
          var pixels = 100;
          if (textAlign === 'left') {
            ctx.fillText(
              text[i],
              textX + pixels * i,
              textY - pixels / 2 + pixels * i
            );
          } else {
            ctx.fillText(text[i], textX, textY - pixels / 2 + pixels * i);
          }
        }
      } else {
        ctx.fillText(text, textX, textY);
      }
      ctx.fillStyle = black;
    };

    var flashPredicate = function() {
      var time = Date.now();
      if (time - oldTime > 2500 && predOpacity === 1) {
        predOpacity = 0;
        oldTime = time;
        cycleText();
      }
      if (time - oldTime > 300 && predOpacity === 0) {
        predOpacity = 1;
        oldTime = time;
      }
    };

    var cycleText = function() {
      text = elvesDoing[cycle];
      text = text.split('\n');
      if (cycle < 5) {
        cycle++;
      } else {
        cycle = 0;
      }
    };

    var animateScreen = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flashPredicate();
      snow();
      writeText();
      requestAnimationFrame(animateScreen);
    };

    window.addEventListener('resize', function() {
      container = document.getElementById('marquee');
      dimensions = container.getBoundingClientRect();
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      measureText();
    });

    measureText();
    snowInit();
  }
})();


const toggleModal = (()=>{

  const archiveModal = document.querySelector(".archive-modal")
  const body = document.querySelector("body")
  const navMenu = document.querySelector("#nav-menu")
  
  return ()=> {
    archiveModal.setAttribute("style", `top: ${window.scrollY + 300}px`)
    archiveModal.classList.toggle("is-hidden")
    body.classList.toggle("overflow-hidden")
    navMenu.classList.toggle("is-blurred-and-disabled")
  }
})()