import { initStars } from "./stars.js";
import { moveShip, stopShipMovement } from "./ship.js";
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

// 🎯 Зупинка гри
export function stopGameFromOutside() {
  isGameRunning = false;
  stopShipMovement();
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);

  // Видалити всі астероїди та лазери
  document.querySelectorAll(".asteroid").forEach((el) => el.remove());
  document.querySelectorAll(".laser").forEach((el) => el.remove());

  // Показати GAME OVER
  const overlay = document.createElement("div");
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

  overlay.innerHTML = `
    <h1>GAME OVER</h1>
    <p style="color:white; font-size: 1.5rem;">Your score: ${scoreRef.value}</p>
  `;

  document.body.appendChild(overlay);
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
  moveShip();
  startAsteroids();

  // Налаштування режимів
  const modePanel = document.getElementById("mode-panel");
  const modeButtons = modePanel.querySelectorAll("button");

  if (!modeButtons.length) {
    console.error("❌ Кнопки режиму складності не знайдено!");
    return;
  }

  modePanel.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    // Активний режим
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    switch (button.id) {
      case "easy-mode":
        setDifficulty(5000, 7);
        break;
      case "medium-mode":
        setDifficulty(3000, 5);
        break;
      case "hard-mode":
        setDifficulty(1500, 3);
        break;
    }
  });
});
