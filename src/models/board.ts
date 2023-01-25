import { Coordinate, add } from "./coordinate";
import { Tetrimino, TetriminoType, tetriminoColors } from "./tetrimino";

export type Color = string;
type Cell = TetriminoType | "ghost";

export const cellColors: {[key in Cell]: string} = {
  ...tetriminoColors,
  "ghost": "#444444",
};

export class Board {
  cells: TetriminoType[][];
  colCount: number;
  rowCount: number;

  nextMinos: Tetrimino[] = [];
  minoAvailableSet: Set<TetriminoType> = new Set();

  mino: Tetrimino = new Tetrimino();
  minoPos: Coordinate = {x: 0, y: 0};

  holdMino?: Tetrimino;

  canHold = true;

  isOver = false;

  score = 0;

  constructor(colCount = 10, rowCount = 20) {
    this.cells = Array(rowCount);
    for (let y = 0; y < rowCount; y++) {
      this.cells[y] = Array(colCount);
      for (let x = 0; x < colCount; x++) {
        this.cells[y][x] = "_";
      }
    }
    this.colCount = colCount;
    this.rowCount = rowCount;

    this.resetAvailableTetrimino();

    // TODO: give first mino
    this.setNewMino();
  }

  setNewMino(type?: TetriminoType) {
    let minoToAdd: Tetrimino;
    if (type) {
      minoToAdd = new Tetrimino(type);
    } else {
      const mino = this.nextMinos.shift();
      if (mino) minoToAdd = mino;
      else {
        minoToAdd = new Tetrimino(undefined, this.minoAvailableSet);
        this.removeAvailableTetrimino(this.mino.type);
      }
    }
    while (this.nextMinos.length < 3) {
      const mino = new Tetrimino(undefined, this.minoAvailableSet);
      this.nextMinos.push(mino);
      this.removeAvailableTetrimino(mino.type);
    }

    // TODO: 一番上にきてほしい
    const x = Math.floor(this.colCount / 2) - 1;
    const y = this.rowCount - Math.max(...this.mino.pattern.map(c => c.y)) - 1;
    const minoPos = {x: 4, y: 17};

    console.log(minoPos);

    if (this.canPutMino(minoPos, minoToAdd, true)) {
      this.mino = minoToAdd;
      this.minoPos = minoPos;
    } else {
      this.isOver = true;
    }
  }

  removeAvailableTetrimino(type: TetriminoType) {
    this.minoAvailableSet.delete(type);
    if (this.minoAvailableSet.size == 0) this.resetAvailableTetrimino();
  }

  resetAvailableTetrimino() {
    this.minoAvailableSet = new Set();
    this.minoAvailableSet.add("I").add("J").add("L").add("O").add("S").add("T").add("Z");
  }

  // FIXME: 実装し直し
  rotate() {
    const mino = new Tetrimino(this.mino.type);
    mino.rotateState = this.mino.rotateState;
    mino.rotate();

    if (this.canPutMino(this.minoPos, mino)) {
      this.mino = mino;
      return true;
    }

    const r = mino.rotateState;

    // https://tetrisch.github.io/main/srs.html の通りに実装
    if (mino.type == "I") {
      // step 1
      let p = {...this.minoPos};
      if (r == 0) p.x -= 2;
      else if (r == 1) p.x -= 2;
      else if (r == 2) p.x -= 1;
      else if (r == 3) p.x += 2;
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }

      // step2
      p = {...this.minoPos};
      if (r == 0) p.x += 1;
      else if (r == 1) p.x += 1;
      else if (r == 2) p.x += 2;
      else if (r == 3) p.x -= 1;
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }

      // step3
      p = {...this.minoPos};
      if (r == 0) {
        p.x += 1;
        p.y -= 2;
      } else if (r == 1) {
        p.x -= 2;
        p.y -= 1;
      } else if (r == 2) {
        p.x -= 1;
        p.y += 2;
      } else if (r == 3) {
        p.x += 2;
        p.y += 1;
      }
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }

      // step4
      p = {...this.minoPos};
      if (r == 0) {
        p.x -= 2;
        p.y += 1;
      } else if (r == 1) {
        p.x += 1;
        p.y += 2;
      } else if (r == 2) {
        p.x += 2;
        p.y -= 1;
      } else if (r == 3) {
        p.x -= 1;
        p.y -= 2;
      }
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }
    } else {
      let p = {...this.minoPos};

      // step 1
      if (r == 0) p.x -= 1;
      else if (r == 1) p.x -= 1;
      else if (r == 2) p.x += 1;
      else if (r == 3) p.x += 1;
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }

      // step 2
      if (r == 1 || r == 3) p.y += 1;
      else if (r == 2 || r == 4) p.y -= 1;
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }

      // step 3
      p = {...this.minoPos};
      if (r == 1 || r == 3) p.y += 2;
      else if (r == 2 || r == 4) p.y -= 2;
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }

      // step 4
      if (r == 0) p.x -= 1;
      else if (r == 1) p.x -= 1;
      else if (r == 2) p.x += 1;
      else if (r == 3) p.x += 1;
      if (this.canPutMino(p, mino)) {
        this.mino = mino;
        this.minoPos = p;
        return true;
      }
    }

    return false;
  }

  canPutMino(at: Coordinate, mino: Tetrimino = this.mino, acceptOverflow = false) {
    for(const c of mino.pattern) {
      const p = add(c, at);
      const [x, y] = [p.x, p.y];
      if (x < 0 || x >= this.colCount + (acceptOverflow ? 3 : 0)) return false;
      if (y < 0 || y >= this.rowCount + (acceptOverflow ? 3 : 0)) return false;
      if (this.cells[y][x] != "_") return false;
    }
    return true;
  }

  ghostMinoPos() {
    let bestPos;
    for (let y = this.minoPos.y; y > -3; y--) {
      const putAt = {x: this.minoPos.x, y: y};
      if (this.canPutMino(putAt)) bestPos = putAt;
      else break;
    }
    return bestPos;
  }

  horizontalMove(direction: "left" | "right") {
    const dx = direction == "right" ? 1 : -1;
    const to = {
      x: this.minoPos.x + dx,
      y: this.minoPos.y,
    };
    if (this.canPutMino(to)) {
      this.minoPos = to;
      return true;
    }
    return false;
  }

  hold() {
    if (!this.canHold) return false;
    if (this.holdMino) {
      const temp = this.mino;
      this.setNewMino(this.holdMino.type);
      this.holdMino = temp;
    } else {
      this.holdMino = this.mino;
      this.setNewMino();
    }
    this.canHold = false;
    return true;
  }

  verticalMove(dy: number): boolean {
    if (dy >= 0) return false;
    const go = this.ghostMinoPos();
    if (!go) return false;
    if (this.minoPos.y + dy < go.y) {
      this.minoPos.y = go.y;
      return false;
    }
    this.minoPos.y += dy;
    return true;
  }

  confirm() {
    const go = this.ghostMinoPos();
    if (!go) {
      this.isOver = true;
      return;
    }
    for (const c of this.mino.pattern) {
      this.cells[go.y + c.y][go.x + c.x] = this.mino.type;
    }
    this.clearLines();
    this.setNewMino();
    this.canHold = true;
  }

  clearLines() {
    this.cells = this.cells.filter(row => row.includes("_"));
    const linesToAddCount = this.rowCount - this.cells.length;
    for (let i = 0; i < linesToAddCount; i++) {
      this.cells.push(new Array(this.colCount).fill("_"));
    }
    this.score += Math.floor(Math.pow(linesToAddCount, 1.5));
  }

  #isInBoard(c: Coordinate) {
    return c.x >= 0 && c.x < this.colCount && c.y >= 0 && c.y < this.rowCount;
  }

  get renderCells() {
    const cells: Color[][] = new Array(this.rowCount);
    for (let y = 0; y < this.rowCount; y++) {
      cells[y] = new Array(this.colCount);
      for (let x = 0; x < this.colCount; x++) {
        cells[y][x] = cellColors[this.cells[y][x]];
      }
    }

    // ゴーストのほうが優先順位ひくい
    const go = this.ghostMinoPos();
    if (go) for (const c of this.mino.pattern) {
      const p = add(go, c);
      if (this.#isInBoard(p))
        cells[p.y][p.x] = cellColors["ghost"];
    }

    const o = this.minoPos;
    for (const c of this.mino.pattern) {
      const p = add(o, c);
      if (this.#isInBoard(p))
        cells[p.y][p.x] = this.mino.color;
    }

    return cells.reverse();
  }

  private updateCell(c: Coordinate, tetrimino: Tetrimino) {
    if (c.x >= 0 && c.x < this.colCount && c.y >= 0 && c.y < this.rowCount) {
      this.cells[c.y][c.x] = tetrimino.type;
    }
  }
}
