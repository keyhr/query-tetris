import React, { useEffect, useRef, useState } from "react";
import { BoardViewer } from "./Board";
import { Board } from "../models/board";
import { GamePanel } from "./GamePanel";

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

interface GameProps {
  board: Board;
  setCells: React.Dispatch<React.SetStateAction<string[][]>>;
}

export const Game = (props: GameProps): JSX.Element => {
  const board = props.board;
  const setCells = props.setCells;

  // unit: 1/60 G
  const [speed, setSpeed] = useState(1);

  const acceptKeyInput = useRef(true);

  const isStuck = useRef(false);
  const isSoftDropping = useRef(false);
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      if (!acceptKeyInput.current) return;

      const renderKeyList = ["KeyR", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (ev.code == "KeyR") {
        board.rotate();
      } else if (ev.code == "KeyH") {
        if (!board.hold()) return;
        resetDrop();
      } else if (ev.code == "ArrowLeft") {
        board.horizontalMove("left");
        if (isStuck.current) resetDrop();
      } else if (ev.code == "ArrowRight") {
        board.horizontalMove("right");
        if (isStuck.current) resetDrop();
      } else if (ev.code == "ArrowUp") {
        // hard-drop
        board.confirm();
        resetDrop();
      } else if (ev.code == "ArrowDown") {
        // soft-drop
        if (!isSoftDropping.current) startSoftDrop();
      }
      if (renderKeyList.includes(ev.code)) setCells(board.renderCells);
    });

    document.addEventListener("keyup", (ev) => {
      if (ev.code == "ArrowDown") {
        stopSoftDrop();
      }
    });

    startDrop();
  }, []);

  useEffect(() => resetDrop, [speed]);

  useEffect(() => {
    if (board.isOver) {
      console.log("Game Over");
      stopDrop();
    }
  });

  const startSoftDrop = () => {
    isSoftDropping.current = true;
    stopDrop();
    intervalId.current = setInterval(() => {
      if (!board.verticalMove(-1)) {
        handleStuck();
      }
      setCells(board.renderCells);
    }, 20000 / speed);
  };

  const stopSoftDrop = () => {
    isSoftDropping.current = false;
    clearInterval(intervalId.current);
    startDrop();
  };

  const startDrop = () => {
    isStuck.current = false;
    intervalId.current = setInterval(() => {
      if (!board.verticalMove(-1)) {
        handleStuck();
      }
      setCells(board.renderCells);
    }, 1000 / speed);
  };

  const stopDrop = () => {
    clearInterval(intervalId.current);
  };

  const resetDrop = () => {
    stopDrop();
    setCells(board.renderCells);
    startDrop();
  };

  const handleStuck = () => {
    console.log("stuck!");
    stopDrop();
    isStuck.current = true;
    sleep(500).then(() => {
      if (isStuck) {
        board.confirm();
        setCells(board.renderCells);
        resetDrop();
      }
    });
  };

  return (
    <div id="game" style={{
      display: "flex",
      justifyContent: "stretch",
    }}>
      <BoardViewer
        board={board}
        viewWidth={300}
      />
      <GamePanel
        board={board}
        viewWidth={120}
      />
    </div>
  );
};
