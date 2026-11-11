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

  for (let y = Math.floor(player.y - cells.y/2); y < Math.floor(player.y + cells.y/2); y++) {
    for (let x = Math.floor(player.x - cells.x/2); x < Math.floor(player.x + cells.x/2); x++) {
      if (x == player.x && y == player.y) {
        cellBuff.push('@');
      }
      else if (world[x] && world[x][y]) {
        cellBuff.push('.');
      }
      else {
        cellBuff.push('\u00A0');
      }
    }
  }

  canvas.textContent = cellBuff.join('');
  window.requestAnimationFrame(run);
}
