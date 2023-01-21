import React, { useEffect, useState } from "react";
import { BoardViewer } from "./Board";
import { Board } from "../models/board";

export const Game = (): JSX.Element => {
  const board = new Board();

  // TODO: Gameコンポーネント内のStateを書き換えることでre-renderingしているが、これが実用サービスで通用するとは思えないからもっと考える。
  const [, setCells] = useState(board.renderCells);

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      console.log(ev.code);
      const renderKeyList = ["KeyR", "Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
      if (ev.code == "KeyR" || ev.code == "Space") {
        board.rotate();
      } else if (ev.code == "ArrowLeft") {
        board.horizontalMove("left");
      } else if (ev.code == "ArrowRight") {
        board.horizontalMove("right");
      } else if (ev.code == "ArrowUp") {
        board.confirm();
      } else if (ev.code == "ArrowDown") {
        board.verticalMove(-1);
      }
      if (renderKeyList.includes(ev.code)) setCells(board.renderCells);
    });
  }, []);

  return (
    <BoardViewer
      board={board}
    ></BoardViewer>
  );
};
