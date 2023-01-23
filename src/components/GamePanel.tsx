import React from "react";
import { MinoPreview } from "./MinoPreview";
import { Board } from "../models/board";

interface GamePanelProps {
  viewWidth: number;
  board: Board;
}

export const GamePanel = (props: GamePanelProps): JSX.Element => {
  return (<div id="gamepanel" className="outline"
    style={{
      width: props.viewWidth,
      display: "flex",
      flexDirection: "column",
      background: "white",
    }}
  >
    <div className="text-center bg-1">NEXT</div>
    <MinoPreview
      mino={props.board.nextMinos[0]}
      id={"next-1"}
      width={props.viewWidth}
    />
    <MinoPreview
      mino={props.board.nextMinos[1]}
      id={"next-2"}
      width={props.viewWidth}
    />
    <MinoPreview
      mino={props.board.nextMinos[2]}
      id={"next-3"}
      width={props.viewWidth}
    />
    <div className="text-center bg-1 pos-rel">HOLD</div>
    <MinoPreview
      mino={props.board.holdMino}
      id={"hold"}
      width={props.viewWidth}
    />
    <div className="text-center bg-1">SCORE</div>
    <div className="text-center" style={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}><div
        style={{
          fontSize: props.viewWidth * 0.3,
        }}
      >{props.board.score}</div></div>
  </div>
  );
};
