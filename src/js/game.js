import { moveShip, stopShipMovement, resumeShipMovement } from "./ship.js";
import { initStars } from "./stars.js";
import { startAsteroids, setDifficulty } from "./asteroids.js";
import { shootLaser } from "./shooting.js";
import { setupUpgrades } from "./upgrades-handler.js";

// 🎮 Основні змінні гри
let score = 0;
let isShooting = false;
let isGameRunning = true;

window.shipSpeed = 5;
window.laserSpeed = 1;
window.doubleLaserCount = 1;
window.shootCooldown = 400;

const scoreElement = document.getElementById("score");
const scoreRef = {
  value: score,
  el: scoreElement,
  increase() {
    this.value++;
    this.el.textContent = this.value;
  },
};

const { updateUI } = setupUpgrades(scoreRef);

// 📦 Збільшення рахунку
function increaseScore() {
  scoreRef.increase();
  updateUI();
}

// 📊 Робота з localStorage
function getBestScore() {
  return parseInt(localStorage.getItem("bestScore")) || 0;
}

function updateBestScore(currentScore) {
  const best = getBestScore();
  if (currentScore > best) {
    localStorage.setItem("bestScore", currentScore);
  }
}

// 🔁 Перезапуск гри
function restartGame() {
  const overlay = document.getElementById("game-over-overlay");
  if (overlay) overlay.remove();

  // Скинути змінні
  scoreRef.value = 0;
  scoreElement.textContent = "0";
  isGameRunning = true;
  isShooting = false;

  // Скидаємо паузу корабля
  resumeShipMovement();

  // Запуск заново
  startAsteroids();
  updateUI();

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

// 🎯 Зупинка гри
export function stopGameFromOutside() {
  isGameRunning = false;
  stopShipMovement();
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);

  document.querySelectorAll(".asteroid").forEach((el) => el.remove());
  document.querySelectorAll(".laser").forEach((el) => el.remove());

  const overlay = document.createElement("div");
  overlay.id = "game-over-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  overlay.style.color = "red";
  overlay.style.fontSize = "3rem";
  overlay.style.zIndex = "9999";

  const bestScore = getBestScore();
  updateBestScore(scoreRef.value);

  overlay.innerHTML = `
    <h1>GAME OVER</h1>
    <p style="color:white; font-size: 1.5rem;">Your score: ${scoreRef.value}</p>
    <p style="color:white; font-size: 1.2rem;">Your best score: ${Math.max(bestScore, scoreRef.value)}</p>
    <button id="restart-btn" style="
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 10px;
      cursor: pointer;
    ">
      START AGAIN
    </button>
  `;

  document.body.appendChild(overlay);
  document.getElementById("restart-btn").addEventListener("click", restartGame);
}

// 🎮 Керування стрільбою
function handleKeyDown(event) {
  if (!isGameRunning || event.code !== "Space" || isShooting) return;
  isShooting = true;
  shootLaser(increaseScore);
}

function handleKeyUp(event) {
  if (event.code === "Space") isShooting = false;
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// 🚀 Старт гри
document.addEventListener("DOMContentLoaded", () => {
  initStars();
  moveShip(); // Перший запуск корабля
  startAsteroids();

  const modePanel = document.getElementById("mode-panel");
  const modeButtons = modePanel.querySelectorAll("button");

  if (!modeButtons.length) {
    console.error("❌ Кнопки режиму складності не знайдено!");
    return;
  }

  modePanel.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    switch (button.id) {
      case "easy-mode":
        setDifficulty(2000, 4);
        break;
      case "medium-mode":
        setDifficulty(1500, 3);
        break;
      case "hard-mode":
        setDifficulty(735, 1.5);
        break;
    }
  });
});
