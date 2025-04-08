const starContainer = document.getElementById("star-container");

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  const randomX = Math.random() * starContainer.offsetWidth;
  const randomSize = Math.random() * 1.5 + 0.5; // менші зірки
  const randomDuration = Math.random() * 5 + 3;

  star.style.left = randomX + "px";
  star.style.width = randomSize + "px";
  star.style.height = randomSize + "px";
  star.style.animationDuration = randomDuration + "s";

  starContainer.appendChild(star);

  star.addEventListener("animationend", () => {
    star.remove();
    createStar(); // заміна по завершенню
  });
}

export function initStars() {
  for (let i = 0; i < 500; i++) { // більше зірок
    setTimeout(createStar, Math.random() * 3000);
  }
}

