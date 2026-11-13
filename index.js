const chars = {
  GRASS_1: '~',
  GRASS_2: '^',
  BLANK: '\u00A0',
  PLAYER: '@',
  WALL: '■',
  BOMB_1: 'O',
  BOMB_2: 'o',
  EXPLOSION: '#',
}

const Direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
}

const CELL_PIXELS = 12;
const TICK_MS = 50;
const WALL_GAP = 6;
const BOMB_RELOAD_TICKS = 5;

let canvas;
let world;
let player;
let bombs = [];
let lastTick = 0;
let screenDimensions;

function updateScreenDimensions() {
  screenDimensions = {
    x: Math.floor(document.body.clientWidth/CELL_PIXELS),
    y: Math.floor(window.innerHeight/CELL_PIXELS),
  }
}

window.onkeydown = function(e) {
  switch (e.key) {  
    case 'ArrowUp':
    case 'w':
      player.direction.add(Direction.UP);
      break;
    case 'ArrowDown':
    case 's': 
      player.direction.add(Direction.DOWN);
      break;
    case 'ArrowLeft':
    case 'a':
      player.direction.add(Direction.LEFT);
      break;
    case 'ArrowRight':
    case 'd':
      player.direction.add(Direction.RIGHT);
      break;
    case ' ':
      player.dropBomb = true;
      break;
  }
};

window.onkeyup = function(e) {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      player.direction.delete(Direction.UP);
      break;
    case 'ArrowDown':
    case 's':
      player.direction.delete(Direction.DOWN);
      break;
    case 'ArrowLeft':
    case 'a':
      player.direction.delete(Direction.LEFT);
      break;
    case 'ArrowRight':
    case 'd':
      player.direction.delete(Direction.RIGHT);
      break;
  }
};

window.addEventListener("resize", updateScreenDimensions);
window.onload = init;

function init() {
  updateScreenDimensions();
  canvas = document.getElementById("game");
  player = new Player({x: 43, y: 25});
  world = new World({x: 87, y: 51});

  window.requestAnimationFrame(game);
}

function update() {
  player.update(world.grid, bombs);
  bombs.forEach((bomb, i) => {
    if (bomb.update(world.grid)) bombs.splice(i, 1);
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
    bomb.draw(screenBuff, xMin, xMax, yMin, yMax, screenDimensions.x);
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
