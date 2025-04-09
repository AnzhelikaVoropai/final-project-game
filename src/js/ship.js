export const ship = document.querySelector("#ship");
const mouseControlBtn = document.querySelector("#mouse-control");
const keyboardControlBtn = document.querySelector("#keyboard-control");

let controlMode = "mouse";
let shipX = window.innerWidth / 2;
let targetX = shipX;

let speed = 3;
let acceleration = 0;
const accelerationStep = 0.2;
const maxSpeed = 6;

let movingLeft = false;
let movingRight = false;
export let isPaused = false;

let animationFrameId = null;

export function moveShip() {
  if (isPaused) return;

  if (controlMode === "mouse") {
    shipX += (targetX - shipX) * 0.2;
  } else if (controlMode === "keyboard") {
    if (movingLeft) {
      acceleration = Math.min(acceleration + accelerationStep, maxSpeed);
      shipX -= speed + acceleration;
    } else if (movingRight) {
      acceleration = Math.min(acceleration + accelerationStep, maxSpeed);
      shipX += speed + acceleration;
    } else {
      acceleration = Math.max(acceleration - accelerationStep, 0);
    }
  }

  shipX = Math.max(
    0 + ship.offsetWidth / 2,
    Math.min(window.innerWidth - ship.offsetWidth / 2, shipX)
  );
  ship.style.transform = `translateX(${shipX - ship.offsetWidth / 2}px)`;

  animationFrameId = requestAnimationFrame(moveShip);
}

export function stopShipMovement() {
  isPaused = true;
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
}

export function resumeShipMovement() {
  isPaused = false;
  moveShip();
}

// --- Кнопки управління ---
mouseControlBtn.addEventListener("click", () => {
  controlMode = "mouse";
});

keyboardControlBtn.addEventListener("click", () => {
  controlMode = "keyboard";
});

// --- Мишка ---
window.addEventListener("mousemove", (e) => {
  if (controlMode === "mouse") {
    targetX = e.clientX;
  }
});

// --- Клавіатура ---
document.addEventListener("keydown", (e) => {
  if (controlMode !== "keyboard") return;
  if (e.key === "ArrowLeft" || e.key === "a") movingLeft = true;
  if (e.key === "ArrowRight" || e.key === "d") movingRight = true;
});

document.addEventListener("keyup", (e) => {
  if (controlMode !== "keyboard") return;
  if (e.key === "ArrowLeft" || e.key === "a") movingLeft = false;
  if (e.key === "ArrowRight" || e.key === "d") movingRight = false;
});
