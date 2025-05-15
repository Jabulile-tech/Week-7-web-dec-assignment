// Sakura Petal Animation
const createPetal = () => {
  const petal = document.createElement("div");
  petal.classList.add("sakura-petal");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 2 + Math.random() * 3 + "s";
  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 5000);
};

setInterval(createPetal, 300);

// Add basic petal style
const style = document.createElement("style");
style.innerHTML = `
.sakura-petal {
  position: fixed;
  top: -20px;
  width: 20px;
  height: 20px;
  background: pink no-repeat center/contain;
  pointer-events: none;
  z-index: 10;
  animation: fall linear forwards;
}

@keyframes fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
