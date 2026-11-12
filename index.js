const CELL_SIZE = 20;
const TICK_DURATION = 30;
const WALL_GAP = 5;

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
    x: Math.floor(document.body.clientWidth/CELL_SIZE),
    y: Math.floor(window.innerHeight/CELL_SIZE),
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
  player = new Player({x: 39, y: 20});
  world = new World({x: 81, y: 41});

  window.requestAnimationFrame(run);
}

function update() {
  player.update(keys, world.grid, bombs);
}

function draw() {
  const xMin = Math.floor(player.x - screenDimensions.x/2);
  const xMax = Math.floor(player.x + screenDimensions.x/2);
  const yMin = Math.floor(player.y - screenDimensions.y/2);
  const yMax = Math.floor(player.y + screenDimensions.y/2);

  const screenBuff = new Array(screenDimensions.x * screenDimensions.y).fill('\u00A0');

  world.draw(screenBuff, xMin, xMax, yMin, yMax, screenDimensions.x);
  bombs.forEach((bomb) => {
    if (bomb.withinBounds(xMin, xMax, yMin, yMax)) {
      bomb.draw(screenBuff, xMin, yMin, screenDimensions.x);
    }
  });
  player.draw(screenBuff, xMin, yMin, screenDimensions.x);
  
  canvas.innerHTML = screenBuff.join('');
}

function run(timestamp) {
  if (timestamp - lastTick > TICK_DURATION) {
    update();
    draw();
    
    lastTick = timestamp;
  }
  window.requestAnimationFrame(run);
}
