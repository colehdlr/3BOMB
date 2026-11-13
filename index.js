const chars = {
  GRASS_1: '~',
  GRASS_2: '^',
  BLANK: '\u00A0',
  PLAYER: '@',
  WALL: '■',
  BOMB_1: 'O',
  BOMB_2: 'o',
}

const CELL_PIXELS = 20;
const TICK_MS = 50;
const WALL_GAP = 5;
const BOMB_RELOAD_TICKS = 5;

let canvas;
let world;
let player;
let bombs = [];
let lastTick = 0;
let screenDimensions;

const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
}

function updateScreenDimensions() {
  screenDimensions = {
    x: Math.floor(document.body.clientWidth/CELL_PIXELS),
    y: Math.floor(window.innerHeight/CELL_PIXELS),
  }
}

window.addEventListener("resize", updateScreenDimensions);
window.onload = init;

window.onkeydown = function(e) {
  switch (e.key) {  
    case 'ArrowUp':
    case 'w':
      keys.up = true;
      break;
    case 'ArrowDown':
    case 's': 
      keys.down = true;
      break;
    case 'ArrowLeft':
    case 'a':
      keys.left = true;
      break;
    case 'ArrowRight':
    case 'd':
      keys.right = true;
      break;
    case ' ':
      keys.space = true;
      break;
  }
};

window.onkeyup = function(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      keys.up = false;
      break;
    case 'ArrowDown':
    case 's':
      keys.down = false;
      break;
    case 'ArrowLeft':
    case 'a':
      keys.left = false;
      break;
    case 'ArrowRight':
    case 'd':
      keys.right = false;
      break;
  }
};


function init() {
  updateScreenDimensions();
  canvas = document.getElementById("game");
  player = new Player({x: 42, y: 20});
  world = new World({x: 81, y: 41});

  window.requestAnimationFrame(game);
}

function update() {
  player.update(keys, world.grid, bombs);
  bombs.forEach((bomb) => {
    bomb.update();
  });
}

function draw() {
  const xMin = Math.floor(player.x - screenDimensions.x/2);
  const xMax = xMin + screenDimensions.x;
  const yMin = Math.floor(player.y - screenDimensions.y/2);
  const yMax = yMin + screenDimensions.y;

  const screenBuff = new Array(screenDimensions.x * screenDimensions.y).fill(chars.BLANK);

  world.draw(screenBuff, xMin, xMax, yMin, yMax, screenDimensions.x);
  bombs.forEach((bomb) => {
    if (bomb.withinBounds(xMin, xMax, yMin, yMax)) {
      bomb.draw(screenBuff, xMin, yMin, screenDimensions.x);
    }
  });
  player.draw(screenBuff, xMin, yMin, screenDimensions.x);
  
  canvas.innerHTML = screenBuff.join('');
}

function game(timestamp) {
  if (timestamp - lastTick > TICK_MS) {
    update();
    draw();
    
    lastTick = timestamp;
  }
  window.requestAnimationFrame(game);
}
