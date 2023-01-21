export interface Coordinate {
  x: number;
  y: number;
}

export const compare = (lhs: Coordinate, rhs: Coordinate) => {
  return lhs.x == rhs.x && lhs.y == rhs.y;
};

export const add = (lhs: Coordinate, rhs: Coordinate) => {
  return {
    x: lhs.x + rhs.x,
    y: lhs.y + rhs.y,
  };
};
