import { Coordinate as C } from "./coordinate";

export type TetriminoType = "I" | "O" | "S" | "Z" | "J" | "L" | "T" | "_";

export const tetriminoColors: {[key in TetriminoType]: string} = {
  "I": "#a9ceec",
  "J": "#0067c0",
  "L": "#fd7e00",
  "O": "#ffd900",
  "S": "#4db56a",
  "T": "#a260bf",
  "Z": "#d7003a",
  "_": "#111111",
};

export const tetriminoBlockPatterns: {[key in TetriminoType]: C[][]} = {
  "I": [
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
    [{x: 1, y: 3}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}],
    [{x: 2, y: 3}, {x: 2, y: 2}, {x: 2, y: 1}, {x: 2, y: 0}],
  ],
  "J": [
    [{x: 0, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 1, y: 2}, {x: 2, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}],
    [{x: 1, y: 2}, {x: 1, y: 1}, {x: 0, y: 0}, {x: 1, y: 0}],
  ],
  "L": [
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}],
    [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
  ],
  "O": [
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}],
  ],
  "S": [
    [{x: 1, y: 2}, {x: 2, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}],
    [{x: 1, y: 2}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}],
    [{x: 1, y: 1}, {x: 2, y: 1}, {x: 0, y: 0}, {x: 1, y: 0}],
    [{x: 0, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 0}],
  ],
  "T": [
    [{x: 1, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 1, y: 2}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}],
  ],
  "Z": [
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 2, y: 2}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 1, y: 2}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 0}],
  ],
  "_": [[], [], [], []],
};

export class Tetrimino {
  type: TetriminoType = "_";
  rotateState = 0;

  get pattern() {
    return tetriminoBlockPatterns[this.type][this.rotateState];
  }

  get color() {
    return tetriminoColors[this.type];
  }

  constructor(type?: TetriminoType, available?: Set<TetriminoType>) {
    if (type) {
      this.type = type;
    } else {
      let avl: TetriminoType[];
      if (!available) {
        avl = ["I", "J", "L", "O", "S", "T", "Z"];
      } else {
        avl = [...available.values()];
      }
      const s = avl.length;
      const r = Math.floor(Math.random() * (s - 0.01));

      this.type = avl[r];
    }
  }

  rotate() {
    this.rotateState = (this.rotateState + 1) % 4;
  }
}

