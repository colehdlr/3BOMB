class Bomb {
  constructor(spawn) {
    this.x = spawn.x;
    this.y = spawn.y;
  }

  draw(screenBuff, xMin, yMin, screenWidth) {
    screenBuff[(this.y - yMin) * screenWidth + (this.x - xMin)] = `<span class='bomb'>${chars.BOMB}</span>`;
  }

  withinBounds(xMin, xMax, yMin, yMax) {
    return xMin <= this.x && this.x < xMax && yMin <= this.y && this.y < yMax;
  }
}
