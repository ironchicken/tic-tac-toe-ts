import { useState } from "react";
import * as T from "./types";
import { takeTurn } from "./gamePlay";
import { Board } from "./Board";

export const Game = () => {
  const [state, setState] = useState(T.emptyState);

  const onTurn = (squareIdx: number) =>
    setState((st) => takeTurn(squareIdx, st));

  if (state.winner) {
    return (
      <div>
        Player <span>{T.showPlayer(state.turn)}</span> wins!
      </div>
    );
  } else {
    return (
      <div>
        <div>
          Player <span>{T.showPlayer(state.turn)}</span>'s turn.
        </div>
        <Board grid={state.grid} onTurn={onTurn} />
      </div>
    );
  }
};
