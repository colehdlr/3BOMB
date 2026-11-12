const worldDimensions = {
  x: 81,
  y: 41,
}
const CELL_SIZE = 20;
const TICK_DURATION = 30;

let canvas;
let world;
let lastTick = 0;

const cells = {
  x: undefined,
  y: undefined,
};
const player = {
  x: 40,
  y: 20,
};
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
}

function updateCells() {
  cells.x = Math.floor(document.body.clientWidth/CELL_SIZE);
  cells.y = Math.floor(window.innerHeight/CELL_SIZE);
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
        let random = Math.floor(Math.random() * 6);
        if (random == 0) {
          world[x][y] = '\u00A0';
        }
        else {
          world[x][y] = '■';
        }
      }
      else {
        let random = Math.floor(Math.random() * 20);
        if (random == 0) {
          world[x][y] = '~';
        }
        else if (random <= 2) {
          world[x][y] = '^';
        }
        else {
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
  if (keys.up || keys.down) {
    if (keys.up && player.y > 0 && world[player.x][player.y - 1] != '■') {
      player.y--;
    }
    if (keys.down && player.y < worldDimensions.y - 1 && world[player.x][player.y + 1] != '■') {
      player.y++;
    }
  }
  else {
    if (keys.left && player.x > 0 && world[player.x - 1][player.y] != '■') {
      player.x--;
      lastMovement = timestamp;
    }
    if (keys.right && player.x < worldDimensions.x - 1 && world[player.x + 1][player.y] != '■') {
      player.x++;
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
  if (timestamp - lastTick > TICK_DURATION) {
    update();
    draw();
    
    lastTick = timestamp;
  }
  window.requestAnimationFrame(run);
}
