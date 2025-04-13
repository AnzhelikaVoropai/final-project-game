let lastShotTime = 0;
let shotCooldown = 800;
let laserMode = "single"; // 'single' | 'double' | 'triple'

export function shootLaser(scoreCallback) {
  const ship = document.getElementById("ship");
  if (!ship) return;

  const currentTime = Date.now();
  if (currentTime - lastShotTime < shotCooldown) return;

  lastShotTime = currentTime;

  createLaser(ship, scoreCallback);

  if (laserMode !== "single") {
    lastShotTime -= shotCooldown / 2;
  }
}

function createLaser(ship, scoreCallback) {
  const shipRect = ship.getBoundingClientRect();

  function spawnLaser(offsetX = 0) {
    const laser = document.createElement("div");
    laser.classList.add("laser");

    laser.style.position = "absolute";
    laser.style.width = "4px";
    laser.style.height = "20px";
    laser.style.backgroundColor = "yellow";
    laser.style.left = `${shipRect.left + shipRect.width / 2 - 2 + offsetX}px`;
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

  if (laserMode === "double") {
    spawnLaser(-10);
    spawnLaser(10);
  } else if (laserMode === "triple") {
    spawnLaser(-12);
    spawnLaser(0);
    spawnLaser(12);
  } else {
    spawnLaser();
  }
}

export function activateDoubleLasers() {
  laserMode = "double";
  shotCooldown = 400;
}

export function activateTripleLasers() {
  laserMode = "triple";
  shotCooldown = 300;
}

export function deactivateLasers() {
  laserMode = "single";
  shotCooldown = 800;
}
