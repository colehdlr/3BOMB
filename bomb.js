class Bomb {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
    this.ticksTillBoom = 30;
  }

  update() {
    this.ticksTillBoom--;
  }

  draw(screenBuff, xMin, yMin, screenWidth) {
    const screenBuffPos = (this.y - yMin) * screenWidth + (this.x - xMin);
    if (this.ticksTillBoom % 3 != 0) {
      screenBuff[screenBuffPos] = `<span class='bomb-1'>${chars.BOMB_1}</span>`;
    }
    else {
      screenBuff[screenBuffPos] = `<span class='bomb-2'>${chars.BOMB_2}</span>`;
    }
  }

  withinBounds(xMin, xMax, yMin, yMax) {
    return xMin <= this.x && this.x < xMax && yMin <= this.y && this.y < yMax;
  }
}
