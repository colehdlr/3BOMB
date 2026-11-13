class World {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.grid = new Array(this.dimensions.x).fill(0).map(() => new Array(this.dimensions.y).fill(0));

    for (let x = 0; x < this.dimensions.x; x++) {
      for (let y = 0; y < this.dimensions.y; y++) {
        if (x % WALL_GAP == 4 && y % WALL_GAP == 4) {
          this.grid[x][y] = chars.WALL;
          this.grid[x+1][y] = chars.WALL;
          this.grid[x][y+1] = chars.WALL;
          this.grid[x+1][y+1] = chars.WALL;
          this.grid[x-1][y+1] = chars.WALL;
          this.grid[x-1][y] = chars.WALL;
          this.grid[x][y-1] = chars.WALL;
          this.grid[x-1][y-1] = chars.WALL;
          this.grid[x+1][y-1] = chars.WALL;
        }
        else if (this.grid[x][y] != chars.WALL) {
          let random = Math.floor(Math.random() * 20);
          if (random == 0) {
            this.grid[x][y] = chars.GRASS_1;
          }
          else if (random <= 2) {
            this.grid[x][y] = chars.GRASS_2;
          }
          else {
            this.grid[x][y] = chars.BLANK;
          }
        }
      }
    }
  }

  draw(screenBuff, xMin, xMax, yMin, yMax, screenWidth) {
    for (let x = Math.max(0, xMin); x < Math.min(this.dimensions.x, xMax); x++) {
      for (let y = Math.max(0, yMin); y < Math.min(this.dimensions.y, yMax); y++) {
        const screenBuffPos = (y - yMin) * screenWidth + (x - xMin);
        switch (this.grid[x][y]) {
          case chars.WALL:
            screenBuff[screenBuffPos] = `<span class='wall'>${this.grid[x][y]}</span>`;
            break;
          case chars.BLANK:
            screenBuff[screenBuffPos] = this.grid[x][y];
            break;
          default:
            screenBuff[screenBuffPos] = `<span class='world'>${this.grid[x][y]}</span>`;
        }
      }
    }
  }
}
