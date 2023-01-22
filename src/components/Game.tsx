import React, { useEffect, useRef, useState } from "react";
import { BoardViewer } from "./Board";
import { Board } from "../models/board";
import { GamePanel } from "./GamePanel";

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export const Game = (): JSX.Element => {
  const board = new Board();

  // TODO: Gameコンポーネント内のStateを書き換えることでre-renderingしているが、これが実用サービスで通用するとは思えないからもっと考える。
  const [, setCells] = useState(board.renderCells);
  const isStuck = useRef(false);
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      const renderKeyList = ["KeyR", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (ev.code == "KeyR" || ev.code == "Space") {
        board.rotate();
      } else if (ev.code == "KeyH") {
        if (!board.hold()) return;
        resetDrop();
      } else if (ev.code == "ArrowLeft") {
        board.horizontalMove("left");
        if (isStuck) resetDrop();
      } else if (ev.code == "ArrowRight") {
        board.horizontalMove("right");
        if (isStuck) resetDrop();
      } else if (ev.code == "ArrowUp") {
        // hard-drop
        board.confirm();
        resetDrop();
      } else if (ev.code == "ArrowDown") {
        // soft-drop
        board.verticalMove(-1);
      }
      if (renderKeyList.includes(ev.code)) setCells(board.renderCells);
    });

    startDrop();
  }, []);

  const startDrop = () => {
    isStuck.current = false;
    intervalId.current = setInterval(() => {
      if (!board.verticalMove(-1)) {
        stopDrop();
        isStuck.current = true;
        sleep(500).then(() => {
          if (isStuck) {
            board.confirm();
            setCells(board.renderCells);
            resetDrop();
          }
        });
      }
      setCells(board.renderCells);
    }, 1000);
  };

  const stopDrop = () => {
    clearInterval(intervalId.current);
  };

  const resetDrop = () => {
    stopDrop();
    setCells(board.renderCells);
    startDrop();
  };

  return (
    <div id="game">
      <BoardViewer
        board={board}
      />
      {/* <GamePanel /> */}
    </div>
  );
};
