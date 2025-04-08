import { initStars } from "./stars.js";
import { moveShip } from "./ship.js";
import { startAsteroids, setDifficulty } from "./asteroids.js";
import { shootLaser } from "./shooting.js";
import { setupUpgrades } from "./upgrades-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  // Ініціалізація гри
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

    // Знімаємо клас 'active' з усіх
    modeButtons.forEach((btn) => btn.classList.remove("active"));

    // Додаємо клас 'active' до натиснутої кнопки
    button.classList.add("active");

    // Обираємо складність
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

// 🎮 Основні змінні гри
let score = 0;
let isShooting = false;
let isGameRunning = true;

window.shipSpeed = 5;
window.laserSpeed = 1;
window.doubleLaserCount = 1;
window.shootCooldown = 400;

// 📦 Рахунок та апгрейди
const scoreElement = document.getElementById("score");
const scoreRef = { value: score, el: scoreElement };
const { updateUI } = setupUpgrades(scoreRef);

function increaseScore() {
  scoreRef.value++;
  updateUI();
}

// 🔫 Стрільба
document.addEventListener("keydown", (event) => {
  if (!isGameRunning || event.code !== "Space" || isShooting) return;
  isShooting = true;
  shootLaser(increaseScore);
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") isShooting = false;
});
