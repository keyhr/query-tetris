import React from "react";
import "./style.scss";
import { Game } from "./components/Game";
import { MinoPreview } from "./components/MinoPreview";
import { Tetrimino } from "./models/tetrimino";

export const App: React.FC = () => {
  return <div id="app"><Game /></div>;
};
