import React, { useEffect, useState } from "react";
import { Tetrimino } from "../models/tetrimino";

interface DevMinoPreviewProps {
  mino: Tetrimino;
  id: string;
}

export const DevMinoPreview = (props: DevMinoPreviewProps): JSX.Element => {
  const size = 200;

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("dev-minopreview-" + props.id) as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");

    canvas.width = size;
    canvas.height = size;
    setContext(canvasContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (context !== null) render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, props.mino.rotateState]);

  const render = () => {
    if (!context) return;

    const minoBlockCount = 8;
    const unitBlockSize = size / minoBlockCount;

    const cells = new Array(minoBlockCount);
    for (let y = 0; y < minoBlockCount; y++) {
      cells[y] = new Array(minoBlockCount);
      for (let x = 0; x < minoBlockCount; x++) {
        cells[y][x] = "#000000";
      }
    }

    for (const c of props.mino.pattern) {
      cells[c.y + 2][c.x + 2] = props.mino.color;
    }

    context.clearRect(0, 0, unitBlockSize * 5, unitBlockSize * 5);

    cells.reverse();

    for (let y = 0; y < minoBlockCount; y++) for (let x = 0; x < minoBlockCount; x++) {
      context.fillStyle = cells[y][x];
      context.fillRect(
        (x) * unitBlockSize,
        y * unitBlockSize,
        unitBlockSize,
        unitBlockSize,
      );
      context.strokeRect(
        (x) * unitBlockSize,
        y * unitBlockSize,
        unitBlockSize,
        unitBlockSize,
      );
    }
  };

  return <canvas id={"dev-minopreview-" + props.id}></canvas>;
};
