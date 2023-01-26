import React, { useEffect, useState } from "react";
import { DevMinoPreview } from "./minoshow";
import { Tetrimino } from "../models/tetrimino";

export const RotateSimulator = () => {
  const [, setCount] = useState(0);

  const [minos] = useState([
    new Tetrimino("I"),
    new Tetrimino("J"),
    new Tetrimino("L"),
    new Tetrimino("O"),
    new Tetrimino("S"),
    new Tetrimino("T"),
    new Tetrimino("Z"),
  ]);

  useEffect(() => {
    document.addEventListener("keydown", ev => {
      if (ev.code == "KeyR") {
        minos.forEach(mino => mino.rotateState = (mino.rotateState + 1) % 4);
      }
      if (ev.code == "KeyL") {
        minos.forEach(mino => mino.rotateState = (mino.rotateState - 1) % 4);
      }
      rerender();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rerender = () => {
    setCount(c => {
      return 1 - c;
    });
  };

  return (<div style={{
  }}>
    <DevMinoPreview id={minos[0].type} mino={minos[0]} />
    <DevMinoPreview id={minos[1].type} mino={minos[1]} />
    <DevMinoPreview id={minos[2].type} mino={minos[2]} />
    <DevMinoPreview id={minos[3].type} mino={minos[3]} />
    <DevMinoPreview id={minos[4].type} mino={minos[4]} />
    <DevMinoPreview id={minos[5].type} mino={minos[5]} />
    <DevMinoPreview id={minos[6].type} mino={minos[6]} />
  </div>);
};
