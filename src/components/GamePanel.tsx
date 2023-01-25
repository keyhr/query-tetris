import React from "react";
import { MinoPreview } from "./MinoPreview";
import { Board } from "../models/board";

interface GamePanelProps {
  board: Board;
  size: {
    width: number,
    height: number,
  };
}

export const GamePanel = (props: GamePanelProps): JSX.Element => {
  return (<div id="gamepanel" className="outline"
    style={{
      width: props.size.width,
      height: props.size.height,
      display: "flex",
      flexDirection: "column",
      background: "white",
    }}
  >
    <div className="text-center bg-1">NEXT</div>
    <MinoPreview
      mino={props.board.nextMinos[0]}
      id={"next-1"}
      size={{
        width: props.size.width,
        height: props.size.width,
      }}
    />
    <MinoPreview
      mino={props.board.nextMinos[1]}
      id={"next-2"}
      size={{
        width: props.size.width,
        height: props.size.width,
      }}
    />
    <MinoPreview
      mino={props.board.nextMinos[2]}
      id={"next-3"}
      size={{
        width: props.size.width,
        height: props.size.width,
      }}
    />
    <div className="text-center bg-1">HOLD</div>
    <MinoPreview
      mino={props.board.holdMino}
      id={"hold"}
      size={{
        width: props.size.width,
        height: props.size.width,
      }}
    />
    <div className="text-center bg-1">SCORE</div>
    <div className="text-center" style={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}><div
        style={{
          fontSize: props.size.width * 0.3,
        }}
      >{props.board.score}</div></div>
  </div>
  );
};
