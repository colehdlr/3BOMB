const cellDimensions = {
  x: 12,
  y: 20,
}
const worldDimensions = {
  x: 80,
  y: 40,
}
const MOVEMENT_DELTA = 50;

let canvas;
let world;
let lastMovement = 0;

const cells = {
  x: undefined,
  y: undefined,
};
const player = {
  x: 20,
  y: 10,
};
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
}

function updateCells() {
  cells.x = Math.floor(document.body.clientWidth/cellDimensions.x);
  cells.y = Math.floor(window.innerHeight/cellDimensions.y);
}

window.onload = init;
window.addEventListener("resize", updateCells);

window.onkeydown = function(e) {
    switch (e.key) {  
      case 'w':
        keys.up = true;
        break;
      case 's': 
        keys.down = true;
        break;
      case 'a':
        keys.left = true;
        break;
      case 'd': 
        keys.right = true;
        break;
    }
};

window.onkeyup = function(e) {
    switch (e.key) {  
      case 'w':
        keys.up = false;
        break;
      case 's': 
        keys.down = false;
        break;
      case 'a':
        keys.left = false;
        break;
      case 'd': 
        keys.right = false;
        break;
    }
};


function init() {
  world = new Array(worldDimensions.x).fill(0).map(() => new Array(worldDimensions.y).fill(0));

  for (let x = 0; x < worldDimensions.x; x++) {
    for (let y = 0; y < worldDimensions.y; y++) {
      if (x % 5 == 0 && y % 5 == 0) {
        world[x][y] = '■';
      }
      else {
        let random = Math.floor(Math.random() * 20);
        if (random == 0) {
          world[x][y] = '~';
        }
        else if (random <= 2) {
          world[x][y] = '^';
        }
        else if (random <= 19) {
          world[x][y] = '\u00A0';
        }
      }
    }
  }

  updateCells();
  canvas = document.getElementById("game");

  window.requestAnimationFrame(run);
}

function update(timestamp) {
  if (timestamp - lastMovement > MOVEMENT_DELTA) {
    if (keys.up && player.y > 0) {
      player.y--;
      lastMovement = timestamp;
    }
    if (keys.down && player.y < worldDimensions.y - 1) {
      player.y++;
      lastMovement = timestamp;
    }
    if (keys.left && player.x > 0) {
      player.x--;
      lastMovement = timestamp;
    }
    if (keys.right && player.x < worldDimensions.x - 1) {
      player.x++;
      lastMovement = timestamp;
    }
  }
}

function draw() {
  const cellBuff = [];

  for (let y = Math.floor(player.y - cells.y/2); y < Math.floor(player.y + cells.y/2); y++) {
    for (let x = Math.floor(player.x - cells.x/2); x < Math.floor(player.x + cells.x/2); x++) {
      if (x == player.x && y == player.y) {
        cellBuff.push('@');
      }
      else if (world[x] && world[x][y]) {
        switch (world[x][y]) {
          case '■':
            cellBuff.push(`<span class='wall'>${world[x][y]}</span>`);
            break;
          case ' ':
            cellBuff.push(world[x][y]);
            break;
          default:
            cellBuff.push(`<span class='world'>${world[x][y]}</span>`);
        }
      }
      else {
        cellBuff.push('\u00A0');
      }
    }
  }

  canvas.innerHTML = cellBuff.join('');
}

function run(timestamp) {
  update(timestamp);

  draw();

  window.requestAnimationFrame(run);
}
