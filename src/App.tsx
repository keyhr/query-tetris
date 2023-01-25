import React, { useEffect, useState } from "react";
import "./style.scss";
import { Game } from "./components/Game";
import { MinoPreview } from "./components/MinoPreview";
import { Tetrimino } from "./models/tetrimino";
import { Board } from "./models/board";

export const App: React.FC = () => {
  const [board, setBoard] = useState(new Board());
  // TODO: Gameコンポーネント内のStateを書き換えることでre-renderingしているが、これが実用サービスで通用するとは思えないからもっと考える。
  const [, setCells] = useState(board.renderCells);

  return <div id="app">
    <Game board={board} setCells={setCells}/>
  </div>;
};
