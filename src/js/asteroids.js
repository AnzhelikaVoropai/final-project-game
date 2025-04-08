import { ship, isPaused } from "./ship.js";

const asteroidContainer = document.getElementById("asteroid-container");
let asteroidInterval;
let asteroidFrequency = 5000;
let asteroidSpeed = 7;

function createAsteroid() {
  const asteroid = document.createElement("div");
  asteroid.classList.add("asteroid");

  const img = document.createElement("img");
  img.src = "/src/images/asteroid.png";
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

    if (asteroidRect.top >= shipRect.bottom) {
      clearInterval(asteroidFallCheck);
      stopGame();
    }
  }, 100);
}

export function startAsteroids() {
  clearInterval(asteroidInterval);
  asteroidInterval = setInterval(createAsteroid, asteroidFrequency);
}

export function stopGame() {
  clearInterval(asteroidInterval);
  document.querySelectorAll(".asteroid").forEach((asteroid) => asteroid.remove());
  document.querySelectorAll(".laser").forEach((laser) => laser.remove());
  document.body.innerHTML += "<h1 style='color: red; text-align: center;'>Game Over</h1>";
}

export function setDifficulty(frequency, speed) {
  asteroidFrequency = frequency;
  asteroidSpeed = speed;
  startAsteroids();
}