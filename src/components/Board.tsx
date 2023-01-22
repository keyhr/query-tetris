import React, { useState, useEffect } from "react";
import { Board, cellColors } from "../models/board";
import { tetriminoColors } from "../models/tetrimino";

interface BoardProps {
  viewWidth?: number;
  board: Board;
  blockSize?: number;
}

export const BoardViewer = (props: BoardProps): JSX.Element => {
  const blockSize = props.viewWidth ? props.viewWidth / props.board.colCount : 30;

  const [board] = useState(props.board);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");

    canvas.width = blockSize * board.colCount;
    canvas.height = blockSize * board.rowCount;

    setContext(canvasContext);
  }, []);

  useEffect(() => {
    if (context !== null) {
      renderBoard();
    }
  }, [context, board.renderCells]);

  const renderBoard = () => {
    if (!context) return;

    for (let y = 0; y < board.rowCount; y++)
      for (let x = 0; x < board.colCount; x++) {
        const color = board.renderCells[y][x];

        context.fillStyle = color;
        context.strokeStyle = tetriminoColors._;
        context.fillRect(
          x * blockSize,
          y * blockSize,
          blockSize,
          blockSize,
        );
        context.strokeRect(
          x * blockSize,
          y * blockSize,
          blockSize,
          blockSize
        );
      }
  };

  return <canvas id="game-canvas"></canvas>;
};
