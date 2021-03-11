import * as T from "./types";
import { Square } from "./Square";

interface BoardProps {
  grid: Array<T.Square>;
  onTurn: (squareIdx: number) => void;
}

export const Board = (props: BoardProps) => {
  return (
    <div className="board">
      {props.grid.map((sq, idx) => (
        <Square square={sq} pos={idx} onClick={props.onTurn} />
      ))}
    </div>
  );
};
