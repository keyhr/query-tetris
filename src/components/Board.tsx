import React, { useState, useEffect } from "react";
import { Board } from "../models/board";
import { tetriminoColors } from "../models/tetrimino";

interface BoardProps {
  board: Board;
  size: {
    width: number,
    height: number,
  },
}

export const BoardViewer = (props: BoardProps): JSX.Element => {
  const [board, setBoard] = useState(props.board);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");

    canvas.width = props.size.width;
    canvas.height = props.size.height;

    setContext(canvasContext);
  }, []);

  useEffect(() => {
    if (context !== null) {
      renderBoard();
    }
  }, [context, board.renderCells]);

  useEffect(() => {
    setBoard(props.board);
  }, [props.board]);

  const renderBoard = () => {
    if (!context) return;

    const cells = board.renderCells;

    const blockSize = {
      width: props.size.width / board.colCount,
      height: props.size.height / board.rowCount,
    };

    for (let y = 0; y < board.rowCount; y++)
      for (let x = 0; x < board.colCount; x++) {
        const color = cells[y][x];

        context.fillStyle = color;
        context.strokeStyle = "#bbbbbb";
        context.lineWidth = 0.1;
        if (cells[y][x] != tetriminoColors._) {
          context.strokeStyle = tetriminoColors._;
          context.lineWidth = 0.5;
        }
        context.fillRect(
          x * blockSize.width,
          y * blockSize.height,
          blockSize.width,
          blockSize.height,
        );
        context.strokeRect(
          x * blockSize.width,
          y * blockSize.height,
          blockSize.width,
          blockSize.height,
        );
      }
  };

  return <canvas id="game-canvas" className="outline"></canvas>;
};
