import * as T from "./types";

export const takeTurn = (
  squareIdx: number,
  state: T.GameState
): T.GameState => {
  const grid = state.grid.map((sq, idx) =>
    idx === squareIdx && sq.kind === "empty"
      ? T.foldPlayer({
          onNaught: () => T.o,
          onCross: () => T.x,
        })(state.turn)
      : sq
  );

  const holds = squaresHeld(grid, state.turn);

  const winner = winningStates.some((positions) =>
    positions.every((sq) => holds.includes(sq))
  );

  return {
    winner: winner ? state.turn : null,
    turn: !winner ? T.switchPlayer(state.turn) : state.turn,
    grid,
  };
};

const squaresHeld = (grid: Array<T.Square>, player: T.Player) =>
  grid.reduce(
    (acc, sq, idx) => (T.holds(sq, player) ? acc.concat(idx) : acc),
    Array<number>(0)
  );

// Make this generic to any grid size
const winningStates: Array<Array<number>> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
