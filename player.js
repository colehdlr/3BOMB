class Player {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.ticksTillBomb = 0;
    this.direction = new Set();
    this.dropBomb = false;
  }

  update(worldGrid, bombs) {
    // Movement
    let direction = Array.from(this.direction).pop();
    if (direction == Direction.UP && worldGrid[this.x][this.y - 2] && worldGrid[this.x][this.y - 2] != chars.WALL) {
      switch (this.x % 6) {
        case 0:
          this.x++;
          this.y--;
          break;
        case 1:
          this.y--;
          break;
        case 2:
          this.x--;
          this.y--;
          break;
      }
    }
    if (direction == Direction.DOWN && worldGrid[this.x][this.y + 2] && worldGrid[this.x][this.y + 2] != chars.WALL) {
      switch (this.x % 6) {
        case 0:
          this.x++;
          this.y++;
          break;
        case 1:
          this.y++;
          break;
        case 2:
          this.x--;
          this.y++;
          break;
      }
    }
    if (direction == Direction.LEFT && worldGrid[this.x - 2] && worldGrid[this.x - 2][this.y] != chars.WALL) {
      switch (this.y % 6) {
        case 0:
          this.x--;
          this.y++;
          break;
        case 1:
          this.x--;
          break;
        case 2:
          this.x--;
          this.y--;
          break;
      }
    }
    if (direction == Direction.RIGHT && worldGrid[this.x + 2] && worldGrid[this.x + 2][this.y] != chars.WALL) {
      switch (this.y % 6) {
        case 0:
          this.x++;
          this.y++;
          break;
        case 1:
          this.x++;
          break;
        case 2:
          this.x++;
          this.y--;
          break;
      }
    }

    // Bomb
    if (this.ticksTillBomb > 0) this.ticksTillBomb--;
    if (this.dropBomb && this.ticksTillBomb == 0) {
      bombs.push(new Bomb({x: this.x, y: this.y}));
      this.dropBomb = false;
      this.ticksTillBomb = BOMB_RELOAD_TICKS;
    }
  }

  
  draw(screenBuff, xMin, yMin, screenWidth) {
    screenBuff[(this.y - yMin) * screenWidth + (this.x - xMin)] = chars.PLAYER;
  }
}
