const cellDimensions = {
  x: 12,
  y: 20,
}
const worldDimensions = {
  x: 20,
  y: 20,
}

let canvas;
let world;

const cells = {
  x: undefined,
  y: undefined,
};
const player = {
  x: 10,
  y: 10,
};

function updateCells() {
  cells.x = Math.floor(document.body.clientWidth/cellDimensions.x);
  cells.y = Math.floor(window.innerHeight/cellDimensions.y);
}

window.onload = init;
window.addEventListener("resize", updateCells);

function init() {
  world = new Array(worldDimensions.x).fill(0).map(() => new Array(worldDimensions.y).fill('.'));

  updateCells();
  canvas = document.getElementById("game");

  window.requestAnimationFrame(run);
}

function run() {
  const cellBuff = [];

  for (let y = 0; y < cells.y; y++) {
    for (let x = 0; x < cells.x; x++) {
      if (x == player.x && y == player.y) {
        cellBuff.push('i');
      }
      else if (world[x] && world[x][y]) {
        cellBuff.push('.');
      }
      else {
        cellBuff.push('-');
      }
    }
  }

  canvas.textContent = cellBuff.join('');
  window.requestAnimationFrame(run);
}
