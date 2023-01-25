import React, { useReducer } from "react";
import "./style.scss";
import { Game } from "./components/Game";
import { Board } from "./models/board";

export interface State {
  board: Board;
  cells: string[][];
  fallSpeed: number;  // unit: 1/60 G
  isOver: boolean;
}

const createNewState = (): State => {
  return {
    board: new Board(),
    cells: [],
    fallSpeed: 1,
    isOver: false,
  };
};

export type Action =
  | {
    type: "noticeBoardChange",
  }
  | {
    type: "setIsOver",
    payload: { isOver: boolean }
  }
  | {
    type: "changeFallSpeed",
    payload: { to: number }
  }
  | {
    type: "restart",
  }


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case "noticeBoardChange":
    return {
      ...state,
      cells: state.board.renderCells,
    };
  case "changeFallSpeed":
    return {
      ...state,
      fallSpeed: action.payload.to,
    };
  case "setIsOver":
    return {
      ...state,
      isOver: action.payload.isOver,
    };
  case "restart":
    return createNewState();
  }
};

export const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, createNewState());

  return <div id="app">
    <Game state={state} dispatch={dispatch}/>
  </div>;
};
