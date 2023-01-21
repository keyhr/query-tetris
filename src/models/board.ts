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

  mino: Tetrimino = new Tetrimino();
  minoPos: Coordinate = {x: 0, y: 0};

  holdMino?: Tetrimino;

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

    // TODO: give first mino
    this.generateMino();
  }

  generateMino(type?: TetriminoType) {
    this.mino = new Tetrimino(type);
    this.minoPos = {x: 2, y: 16};
  }

  rotate() {
    this.mino.rotate();
    console.log(this.renderCells);
  }

  canPutMino(at: Coordinate) {
    for(const c of this.mino.pattern) {
      const p = add(c, at);
      const [x, y] = [p.x, p.y];
      if (x < 0 || x >= this.colCount) return false;
      if (y < 0 || y >= this.rowCount) return false;
      if (this.cells[y][x] != "_") return false;
    }
    return true;
  }

  // FIXME: すりぬけ問題
  ghostMinoPos() {
    let bestPos = this.minoPos;
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
      y: this.minoPos.y
    };
    if (this.canPutMino(to)) {
      this.minoPos = to;
    }
  }

  hold() {
    if (this.holdMino) {
      const temp = this.mino;
      this.generateMino(this.holdMino.type);
      this.holdMino = temp;
    } else {
      this.holdMino = this.mino;
      this.generateMino();
    }
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
    if (!go) return;
    for (const c of this.mino.pattern) {
      this.cells[go.y + c.y][go.x + c.x] = this.mino.type;
    }
    this.clearLines();
    this.generateMino();
  }

  clearLines() {
    this.cells = this.cells.filter(row => row.includes("_"));
    const linesToAddCount = this.rowCount - this.cells.length;
    for (let i = 0; i < linesToAddCount; i++) {
      this.cells.push(new Array(this.colCount).fill("_"));
    }
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
      cells[go.y + c.y][go.x + c.x] = cellColors["ghost"];
    }

    const o = this.minoPos;
    for (const c of this.mino.pattern) {
      cells[o.y + c.y][o.x + c.x] = this.mino.color;
    }

    return cells.reverse();
  }

  private updateCell(c: Coordinate, tetrimino: Tetrimino) {
    if (c.x >= 0 && c.x < this.colCount && c.y >= 0 && c.y < this.rowCount) {
      this.cells[c.y][c.x] = tetrimino.type;
    }
  }
}
