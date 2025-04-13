import { activateDoubleLasers, activateTripleLasers } from "./shooting.js";

export function setupUpgrades(scoreRef) {
  const upgrades = {
    speed: { level: 0, baseCost: 10, cost: 10, maxLevel: 5 },
    laserSpeed: { level: 0, baseCost: 10, cost: 10, maxLevel: 5 },
    doubleLaser: { level: 0, baseCost: 50, cost: 50, maxLevel: 2 },
    fireRate: { level: 0, baseCost: 10, cost: 10, maxLevel: 5 },
  };

  const buttons = {
    speed: document.getElementById("upgrade-speed"),
    laserSpeed: document.getElementById("upgrade-laser-speed"),
    doubleLaser: document.getElementById("upgrade-double-laser"),
    fireRate: document.getElementById("fireRate-upgrade"),
  };

  const labels = {
    speed: "Upgrade Speed",
    laserSpeed: "Upgrade Laser Speed",
    doubleLaser: "Upgrade Laser Mode",
    fireRate: "Upgrade Fire Rate",
  };

  function canUpgrade(type) {
    const upgrade = upgrades[type];
    return (
      upgrade &&
      scoreRef.value >= upgrade.cost &&
      upgrade.level < upgrade.maxLevel
    );
  }

  function applyUpgrade(type) {
    const upgrade = upgrades[type];
    if (!canUpgrade(type)) return;

    scoreRef.value -= upgrade.cost;
    upgrade.level++;

    // Наступна ціна: 1-й рівень — 100, потім MAX
    if (type === "doubleLaser") {
      upgrade.cost = upgrade.level === 1 ? 100 : Infinity;
    } else {
      upgrade.cost = (upgrade.level + 1) * upgrade.baseCost;
    }

    switch (type) {
      case "speed":
        window.shipSpeed += 1.5;
        break;
      case "laserSpeed":
        window.laserSpeed += 1;
        break;
      case "doubleLaser":
        if (upgrade.level === 1) {
          activateDoubleLasers();
        } else if (upgrade.level === 2) {
          activateTripleLasers();
        }
        break;
      case "fireRate":
        if (window.shootCooldown > 100) {
          window.shootCooldown -= 40;
        }
        break;
    }

    updateUI();
  }

  function updateUI() {
    if (scoreRef.el) {
      scoreRef.el.textContent = `Score: ${scoreRef.value}`;
    }

    Object.keys(upgrades).forEach((key) => {
      const btn = buttons[key];
      const upgrade = upgrades[key];

      if (!btn) return;

      if (upgrade.level >= upgrade.maxLevel) {
        btn.textContent = `${labels[key]} (MAX)`;
        btn.disabled = true;
        return;
      }

      btn.disabled = scoreRef.value < upgrade.cost;
      btn.textContent = `${labels[key]} (${upgrade.cost})`;
    });
  }

  Object.keys(buttons).forEach((key) => {
    const btn = buttons[key];
    if (!btn) return;
    btn.addEventListener("click", () => applyUpgrade(key));
  });

  return { updateUI };
}
