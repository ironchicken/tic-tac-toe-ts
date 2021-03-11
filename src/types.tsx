export interface Naught {
  readonly kind: "naught";
}
export interface Cross {
  readonly kind: "cross";
}

export type Player = Naught | Cross;

export const naught: Player = { kind: "naught" };
export const cross: Player = { kind: "cross" };

export const foldPlayer = <T,>(fns: {
  onNaught: (p: Naught) => T;
  onCross: (p: Cross) => T;
}) => (player: Player): T => {
  switch (player.kind) {
    case "naught":
      return fns.onNaught(player);
    case "cross":
      return fns.onCross(player);
    default:
      return undefined as never;
  }
};

export const showPlayer = foldPlayer({
  onNaught: () => "O",
  onCross: () => "X",
});

export const switchPlayer = foldPlayer<Player>({
  onNaught: () => cross,
  onCross: () => naught,
});

export interface O {
  readonly kind: "o";
}
export interface X {
  readonly kind: "x";
}
export interface Empty {
  readonly kind: "empty";
}
export type Square = O | X | Empty;

export const o: Square = { kind: "o" };
export const x: Square = { kind: "x" };
export const empty: Square = { kind: "empty" };

export const foldSquare = <T,>(fns: {
  onO: (s: Square) => T;
  onX: (s: Square) => T;
  onEmpty: (s: Square) => T;
}) => (square: Square): T => {
  switch (square.kind) {
    case "o":
      return fns.onO(square);
    case "x":
      return fns.onX(square);
    case "empty":
      return fns.onEmpty(square);
    default:
      return undefined as never;
  }
};

export const showSquare = foldSquare({
  onO: () => "O",
  onX: () => "X",
  onEmpty: () => " ",
});

export const holds = (sq: Square, player: Player): boolean =>
  (sq.kind === "o" && player.kind === "naught") ||
  (sq.kind === "x" && player.kind === "cross");

export interface GameState {
  winner: Player | null;
  turn: Player;
  grid: Array<Square>;
}

export const emptyState = (): GameState => ({
  winner: null,
  turn: naught,
  grid: Array(9).fill(empty),
});
