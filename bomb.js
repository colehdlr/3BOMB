function withinBounds(x, y, xMin, xMax, yMin, yMax) {
  return xMin <= x && x < xMax && yMin <= y && y < yMax;
}

class Bomb {
  constructor(spawn) {
    this.x = spawn.x - (spawn.x % 3) + 1;
    this.y = spawn.y - (spawn.y % 3) + 1;
    this.ticksTillBoom = 30;
    this.range = 20;
    this.explosionCells = [];
  }

  update(worldGrid) {
    if (this.ticksTillBoom == 0) {
      for (let x = this.x - 1; x <= this.x + 1; x++) {
        for (let y = this.y - 1; y <= this.y + 1; y++) {
          this.explosionCells.push({x: x, y: y});
        }
      }
      let activeCells = [{x: this.x, y: this.y + 2, direction: Direction.DOWN}, {x: this.x, y: this.y - 2, direction: Direction.UP}, {x: this.x - 2, y: this.y, direction: Direction.LEFT}, {x: this.x + 2, y: this.y, direction: Direction.RIGHT}];

      let distanceToCover = this.range;
      while (activeCells.length > 0 && distanceToCover > 0) {
        const next = [];

        activeCells.forEach((cell, i) => {
          // TODO: If player then kill
          if (worldGrid[cell.x] && worldGrid[cell.x][cell.y] && worldGrid[cell.x][cell.y] != chars.WALL) {
            this.explosionCells.push({x: cell.x, y: cell.y});
            switch (cell.direction) {
              case Direction.UP:
                this.explosionCells.push({x: cell.x - 1, y: cell.y}, {x: cell.x + 1, y: cell.y});
                next.push({...cell, y: cell.y - 1});
                break;
              case Direction.DOWN:
                this.explosionCells.push({x: cell.x - 1, y: cell.y}, {x: cell.x + 1, y: cell.y});
                next.push({...cell, y: cell.y + 1});
                break;
              case Direction.LEFT:
                this.explosionCells.push({x: cell.x, y: cell.y - 1}, {x: cell.x, y: cell.y + 1});
                next.push({...cell, x: cell.x - 1});
                break;
              case Direction.RIGHT:
                this.explosionCells.push({x: cell.x, y: cell.y - 1}, {x: cell.x, y: cell.y + 1});
                next.push({...cell, x: cell.x + 1});
                break;
            }
          }
        });

        activeCells = next;
        distanceToCover--;
      }
    }
    else if (this.ticksTillBoom == -20) {
      return true;
    }

    this.ticksTillBoom--;
    return false;
  }

  draw(screenBuff, xMin, xMax, yMin, yMax, screenWidth) {
    const screenBuffPosition = (this.y - yMin) * screenWidth + (this.x - xMin);
    if (this.ticksTillBoom <= 0) {
      this.explosionCells.forEach((cell) => {
        if (withinBounds(cell.x, cell.y, xMin, xMax, yMin, yMax)) screenBuff[(cell.y - yMin) * screenWidth + (cell.x - xMin)] = `<span class='explosion'>${chars.EXPLOSION}</span>`;
      });
    }
    else if (this.ticksTillBoom % 3 != 0) {
      if (withinBounds(this.x, this.y, xMin, xMax, yMin, yMax)) screenBuff[screenBuffPosition] = `<span class='bomb-1'>${chars.BOMB_1}</span>`;
    }
    else {
      if (withinBounds(this.x, this.y, xMin, xMax, yMin, yMax)) screenBuff[screenBuffPosition] = `<span class='bomb-2'>${chars.BOMB_2}</span>`;
    }
  }
}
