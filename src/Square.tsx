import * as T from "./types";
import "./Square.css";

interface SquareProps {
  square: T.Square;
  pos: number;
  onClick: (squareIdx: number) => void;
}

export const Square = (props: SquareProps) => {
  return (
    <button
      id={`square-${props.pos}`}
      className="square"
      onClick={() => props.onClick(props.pos)}
    >
      {T.showSquare(props.square)}
    </button>
  );
};
