import React from "react";
import { MinoPreview } from "./MinoPreview";
import { Tetrimino } from "../models/tetrimino";

export const GamePanel = (): JSX.Element => {


  return (<div id="gamepanel">
    <MinoPreview
      mino={new Tetrimino("J")}
      id={"111"}
      size={300}
    />
  </div>);
};
