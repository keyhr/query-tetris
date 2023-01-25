import React, { useEffect, useRef, useState } from "react";
import { BoardViewer } from "./Board";
import { GamePanel } from "./GamePanel";
import { Action, State } from "../App";

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

interface GameProps {
  state: State;
  dispatch: React.Dispatch<Action>
}

export const Game = (props: GameProps): JSX.Element => {
  const speed = props.state.fallSpeed;

  // console.log(board);

  const acceptKeyInput = useRef(true);

  const isStuck = useRef(false);
  const isSoftDropping = useRef(false);
  const intervalId = useRef<NodeJS.Timer>();

  const rerenderBoard = () => {
    props.dispatch({ type: "noticeBoardChange" });
  };

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      if (!acceptKeyInput.current) return;

      const board = props.state.board;

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
      if (renderKeyList.includes(ev.code)) rerenderBoard();
    });

    document.addEventListener("keyup", (ev) => {
      if (ev.code == "ArrowDown") {
        stopSoftDrop();
      }
    });

    startDrop();
  }, [props.state.board]);

  useEffect(() => resetDrop(), [props.state.board, speed]);

  useEffect(() => {
    if (props.state.board.isOver) {
      stopDrop();
      if (!props.state.isOver){
        props.dispatch({
          type: "setIsOver",
          payload: { isOver: true },
        });
      }
    }
  });

  const startSoftDrop = () => {
    isSoftDropping.current = true;
    stopDrop();
    intervalId.current = setInterval(() => {
      if (!props.state.board.verticalMove(-1)) {
        handleStuck();
      }
      rerenderBoard();
    }, 50 / speed);
  };

  const stopSoftDrop = () => {
    isSoftDropping.current = false;
    clearInterval(intervalId.current);
    startDrop();
  };

  const startDrop = () => {
    isStuck.current = false;
    intervalId.current = setInterval(() => {
      // console.log(props.state.board);
      if (!props.state.board.verticalMove(-1)) {
        handleStuck();
      }
      rerenderBoard();
    }, 1000 / speed);
  };

  const stopDrop = () => {
    clearInterval(intervalId.current);
  };

  const resetDrop = () => {
    stopDrop();
    rerenderBoard();
    startDrop();
  };

  const handleStuck = () => {
    stopDrop();
    isStuck.current = true;
    sleep(500).then(() => {
      if (isStuck) {
        props.state.board.confirm();
        rerenderBoard();
        if (!props.state.isOver) resetDrop();
      }
    });
  };

  const restart = () => {
    props.dispatch({ type: "restart" });
    isStuck.current = false;
  };

  return (<div>
    {props.state.isOver && <div style={{
      position: "fixed",
      backgroundColor: "rgba(0,0,0,0.7)",
      width: 480,
      height: "100%",
      left: -20,
      color: "white",
    }}>
      <div style={{
        fontSize: 40,
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        marginRight: "50%",
        textAlign: "center",
      }}>
        <div>GAME OVER</div>
        <div className="button" onClick={restart} style={{
          marginTop: 20,
          borderRadius: 20,
        }}>Retry</div>
      </div>
    </div>}
    <div id="game" style={{
      display: "flex",
      justifyContent: "stretch",
    }}>
      <BoardViewer
        board={props.state.board}
        size={{
          width: 300,
          height: 600,
        }}
      />
      <GamePanel
        board={props.state.board}
        size={{
          width: 120,
          height: 600,
        }}
      />
    </div>
  </div>);
};
