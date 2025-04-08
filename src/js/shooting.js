let lastShotTime = 0;
let shotCooldown = 800;
let doubleLasersActive = false; 

export function shootLaser(scoreCallback) {
  const ship = document.getElementById("ship");
  if (!ship) return;

  const currentTime = Date.now();
  if (currentTime - lastShotTime < shotCooldown) return;

  lastShotTime = currentTime;

  createLaser(ship, scoreCallback);

  if (doubleLasersActive) {
    lastShotTime -= shotCooldown / 2;
  }
}

function createLaser(ship, scoreCallback) {
  const laser = document.createElement("div");
  laser.classList.add("laser");

  const shipRect = ship.getBoundingClientRect();
  laser.style.position = "absolute";
  laser.style.width = "4px";
  laser.style.height = "20px";
  laser.style.backgroundColor = "yellow";
  laser.style.left = `${shipRect.left + shipRect.width / 2 - 2}px`;
  laser.style.bottom = `${window.innerHeight - shipRect.bottom}px`;

  document.body.appendChild(laser);

  function moveLaser() {
    if (!laser.parentElement) return;

    let laserRect = laser.getBoundingClientRect();
    let asteroids = document.querySelectorAll(".asteroid");

    asteroids.forEach((asteroid) => {
      let asteroidRect = asteroid.getBoundingClientRect();
      if (
        laserRect.top <= asteroidRect.bottom &&
        laserRect.left >= asteroidRect.left &&
        laserRect.right <= asteroidRect.right
      ) {
        asteroid.remove();
        laser.remove();
        if (typeof scoreCallback === "function") {
          scoreCallback();
        }
        return; 
      }
    });

    if (laserRect.top <= 0) {
      laser.remove(); 
      return; 
    }

    let laserSpeed = Math.max(5, window.laserSpeed || 8);
    laser.style.bottom = `${parseInt(laser.style.bottom) + laserSpeed}px`;

    requestAnimationFrame(moveLaser);
  }

  requestAnimationFrame(moveLaser);
}

export function activateDoubleLasers() {
  doubleLasersActive = true;
  shotCooldown = 400; 
}

export function deactivateDoubleLasers() {
  doubleLasersActive = false;
  shotCooldown = 800; 
}
