class Bomb {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.ticksTillBoom = 10;
  }

  update() {
    this.ticksTillBoom--;
  }

  draw(screenBuff, xMin, yMin, screenWidth) {
    if (this.ticksTillBoom % 2 == 0) {
      screenBuff[(this.y - yMin) * screenWidth + (this.x - xMin)] = `<span class='bomb-1'>${chars.BOMB}</span>`;
    }
    else {
      screenBuff[(this.y - yMin) * screenWidth + (this.x - xMin)] = `<span class='bomb-2'>${chars.BOMB}</span>`;
    }
  }

  withinBounds(xMin, xMax, yMin, yMax) {
    return xMin <= this.x && this.x < xMax && yMin <= this.y && this.y < yMax;
  }
}
