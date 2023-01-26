import React, { useEffect, useState } from "react";
import { Tetrimino } from "../models/tetrimino";

interface MinoPreviewProps {
  id: string;
  size: {
    width: number,
    height: number,
  };
  mino?: Tetrimino
}

export const MinoPreview = (props: MinoPreviewProps): JSX.Element => {
  const domId = "mino-preview-" + props.id;

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = document.getElementById(domId) as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");

    canvas.width = props.size.width;
    canvas.height = props.size.width * 0.8;
    setContext(canvasContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (context !== null) {
      render();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, props.mino]);

  const render = () => {
    if (!context || !props.mino) return;

    props.mino.rotateState = 0;

    const type = props.mino.type;
    const minoBlockCount = type == "I" ? 4 : 3;
    const unitBlockSize = props.size.width / (minoBlockCount + 2);

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

    cells.reverse();

    context.clearRect(0, 0, unitBlockSize * 5, unitBlockSize * 5);

    for (let y = 0; y < minoBlockCount + 2; y++) for (let x = 0; x < minoBlockCount + 2; x++) {
      context.fillStyle = cells[y][x];
      if (cells[y][x] == props.mino.color) {
        context.fillRect(
          (x + (type == "O" ? 0.5 : 0)) * unitBlockSize,
          y * unitBlockSize,
          unitBlockSize,
          unitBlockSize,
        );
        context.strokeRect(
          (x + (type == "O" ? 0.5 : 0)) * unitBlockSize,
          y * unitBlockSize,
          unitBlockSize,
          unitBlockSize,
        );
      }
    }
  };

  return <canvas id={domId}></canvas>;
};
