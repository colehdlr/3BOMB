class Player {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.ticksTillBomb = 0;
  }

  update(keys, worldGrid, bombs) {
    // Movement
    if (keys.up || keys.down) {
      if (keys.up && this.y > 0 && worldGrid[this.x][this.y - 1] != chars.WALL) {
        this.y--;
      }
      if (keys.down && worldGrid[this.x][this.y + 1] && worldGrid[this.x][this.y + 1] != chars.WALL) {
        this.y++;
      }
    }
    else {
      if (keys.left && this.x > 0 && worldGrid[this.x - 1][this.y] != chars.WALL) {
        this.x--;
      }
      if (keys.right && worldGrid[this.x + 1] && worldGrid[this.x + 1][this.y] != chars.WALL) {
        this.x++;
      }
    }

    // Bomb
    if (this.ticksTillBomb > 0) this.ticksTillBomb--;
    if (keys.space && this.ticksTillBomb == 0) {
      bombs.push(new Bomb({x: this.x, y: this.y}));
      keys.space = false;
      this.ticksTillBomb = BOMB_RELOAD_TICKS;
    }
  }

  
  draw(screenBuff, xMin, yMin, screenWidth) {
    screenBuff[(this.y - yMin) * screenWidth + (this.x - xMin)] = chars.PLAYER;
  }
}
