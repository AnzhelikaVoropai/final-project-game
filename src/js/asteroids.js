import { ship, isPaused } from "./ship.js";
import { stopGameFromOutside } from "./game.js";

const asteroidContainer = document.getElementById("asteroid-container");

let asteroidInterval;
let asteroidFrequency = 5000;
let asteroidSpeed = 7;

function createAsteroid() {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");

  const img = document.createElement("img");
  img.src = "src/images/asteroid.png";
  img.style.width = "100%";
  img.style.height = "100%";
  asteroid.appendChild(img);

  const minX = window.innerWidth * 0.3;
  const maxX = window.innerWidth * 0.7;
  asteroid.style.left = Math.random() * (maxX - minX) + minX + "px";
  asteroid.style.animationDuration = asteroidSpeed + "s";

  asteroidContainer.appendChild(asteroid);

  asteroid.addEventListener("animationend", () => {
    if (!isPaused) asteroid.remove();
  });

  const asteroidFallCheck = setInterval(() => {
    const asteroidRect = asteroid.getBoundingClientRect();
    const shipRect = ship.getBoundingClientRect();

    // Якщо метеорит зіштовхується з кораблем
    const isCollision =
      asteroidRect.bottom >= shipRect.top &&
      asteroidRect.top <= shipRect.bottom &&
      asteroidRect.left < shipRect.right &&
      asteroidRect.right > shipRect.left;

    // Якщо метеорит долетів до низу екрану
    const isMissed = asteroidRect.top >= window.innerHeight;

    if (isCollision || isMissed) {
      clearInterval(asteroidFallCheck);
      stopGame(); // Гра завершується і при зіткненні, і при падінні повз
    }
  }, 100);
}

export function startAsteroids() {
  clearInterval(asteroidInterval);
  asteroidInterval = setInterval(createAsteroid, asteroidFrequency);
}

export function stopGame() {
  clearInterval(asteroidInterval);
  stopGameFromOutside();
}

export function setDifficulty(frequency, speed) {
  asteroidFrequency = frequency;
  asteroidSpeed = speed;
  startAsteroids();
}
