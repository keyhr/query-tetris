import React, { useEffect, useState } from "react";
import { Tetrimino } from "../models/tetrimino";

interface MinoPreviewProps {
  size: number;
  id: string;
  mino: Tetrimino
}

export const MinoPreview = (props: MinoPreviewProps): JSX.Element => {
  const domId = "mino-preview-" + props.id;

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = document.getElementById(domId) as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");

    canvas.width = props.size;
    canvas.height = props.size;
    setContext(canvasContext);
  }, []);

  useEffect(() => {
    if (context !== null) {
      render();
    }
  });

  const render = () => {
    if (!context) return;

    const minoBlockCount = props.mino.type == "I" ? 4 : 3;
    const unitBlockSize = props.size / (minoBlockCount + 2);

    const cells = new Array(minoBlockCount + 2);
    for (let y = 0; y < minoBlockCount + 2; y++) {
      cells[y] = new Array(minoBlockCount + 2);
      for (let x = 0; x < minoBlockCount + 2; x++) {
        cells[y][x] = "#FFFFFF";
      }
    }

    for (const c of props.mino.pattern) {
      cells[c.y + 1][c.x + 1] = props.mino.color;
    }

    console.log(cells);

    for (let y = 0; y < minoBlockCount + 2; y++) for (let x = 0; x < minoBlockCount + 2; x++) {
      context.fillStyle = cells[y][x];
      // context.strokeStyle = tetriminoColors._;
      context.fillRect(
        x * props.size,
        y * props.size,
        unitBlockSize,
        unitBlockSize,
      );
      // context.strokeRect(
      //   x * props.size,
      //   y * props.size,
      //   unitBlockSize,
      //   unitBlockSize
      // );
    }
  };

  return <canvas id={domId}></canvas>;
};
