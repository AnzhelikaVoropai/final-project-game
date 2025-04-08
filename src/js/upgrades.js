// const upgrades = { 
//     speed: { level: 0, baseCost: 10, cost: 10, maxLevel: 5 },
//     fireRate: { level: 0, baseCost: 10, cost: 10, maxLevel: 5 },
//     shield: { level: 0, baseCost: 10, cost: 10, maxLevel: 5 },
// };

// let playerScore = 0;

// // Функція для оновлення кнопок після прокачки
// export function updateUpgradeButtons() {
//     console.log("🔄 Оновлення кнопок...");

//     Object.keys(upgrades).forEach((upgrade) => {
//         const button = document.getElementById(`${upgrade}-upgrade`);
//         if (!button) return;

//         const upgradeData = upgrades[upgrade];

//         console.log(`🔹 [${upgrade}] Level: ${upgradeData.level}, Cost: ${upgradeData.cost}, Player Score: ${playerScore}`);

//         if (upgradeData.level >= upgradeData.maxLevel) {
//             button.textContent = "Fully Upgraded";
//             button.disabled = true; 
//         } else {
//             button.textContent = `Upgrade (${upgradeData.cost} points)`;
//             button.disabled = playerScore < upgradeData.cost;
//         }
//     });
// }

// export function upgradeShip(stat) {
//     const upgradeData = upgrades[stat];

//     if (!upgradeData) {
//         console.warn(`❌ Невідома характеристика: ${stat}`);
//         return;
//     }

//     console.log(`🆙 Прокачуємо ${stat}... (Level: ${upgradeData.level}, Cost: ${upgradeData.cost}, Player Score: ${playerScore})`);

//     if (playerScore < upgradeData.cost) {
//         console.warn(`❌ Не вистачає очок!`);
//         return;
//     }

//     if (upgradeData.level >= upgradeData.maxLevel) {
//         console.warn(`❌ Досягнуто максимального рівня!`);
//         return;
//     }

//     playerScore -= upgradeData.cost;
//     upgradeData.level += 1;
//     upgradeData.cost = (upgradeData.level + 1) * 10;

//     console.log(`✅ Прокачано ${stat} до рівня ${upgradeData.level}. Нова вартість: ${upgradeData.cost}. Очки: ${playerScore}`);

//     updateUpgradeButtons();
// }

// export function addScore(points) {
//     playerScore += points;
//     console.log(`➕ Додано ${points} очок. Загальний рахунок: ${playerScore}`);
//     updateUpgradeButtons();
// }

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("🎮 Гра завантажена. Очки: ", playerScore);
//     updateUpgradeButtons();

//     document.getElementById("speed-upgrade")?.addEventListener("click", () => upgradeShip("speed"));
//     document.getElementById("fireRate-upgrade")?.addEventListener("click", () => upgradeShip("fireRate"));
//     document.getElementById("shield-upgrade")?.addEventListener("click", () => upgradeShip("shield"));
// });
