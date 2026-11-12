class World {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.grid = new Array(this.dimensions.x).fill(0).map(() => new Array(this.dimensions.y).fill(0));

    for (let x = 0; x < this.dimensions.x; x++) {
      for (let y = 0; y < this.dimensions.y; y++) {
        if (x % WALL_GAP == 0 && y % WALL_GAP == 0) {
          let random = Math.floor(Math.random() * 6);
          if (random == 0) {
            this.grid[x][y] = '\u00A0';
          }
          else {
            this.grid[x][y] = '■';
          }
        }
        else {
          let random = Math.floor(Math.random() * 20);
          if (random == 0) {
            this.grid[x][y] = '~';
          }
          else if (random <= 2) {
            this.grid[x][y] = '^';
          }
          else {
            this.grid[x][y] = '\u00A0';
          }
        }
      }
    }
  }

  draw(screenBuff, xMin, xMax, yMin, yMax, screenWidth) {
    for (let x = 0; x < this.dimensions.x; x++) {
      for (let y = 0; y < this.dimensions.y; y++) {
        if (this.withinBounds(x, y, xMin, xMax, yMin, yMax)) {
          const screenBuffLoc = (y - yMin) * screenWidth + (x - xMin);
          switch (this.grid[x][y]) {
            case '■':
              screenBuff[screenBuffLoc] = `<span class='wall'>${this.grid[x][y]}</span>`;
              break;
            case '\u00A0':
              screenBuff[screenBuffLoc] = this.grid[x][y];
              break;
            default:
              screenBuff[screenBuffLoc] = `<span class='world'>${this.grid[x][y]}</span>`;
          }
        }
      }
    }
  }

  withinBounds(x, y, xMin, xMax, yMin, yMax) {
    return xMin <= x && x < xMax && yMin <= y && y < yMax;
  }
}
