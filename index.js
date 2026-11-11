const cell = {
  w: 12,
  h: 20,
}
let canvas;

window.onload = init;

function init() {
  canvas = document.getElementById("game");

  window.requestAnimationFrame(run);
}

function run() {
  const w = Math.floor(document.body.clientWidth/cell.w);
  const h = Math.floor(window.innerHeight/cell.h);
  const numChars = w*h;
  canvas.textContent = ".".repeat(numChars);

  window.requestAnimationFrame(run);
}
