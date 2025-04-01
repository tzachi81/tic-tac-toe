import classes from './Board.module.scss';

import { TPlayer } from "../../types";
import { Square } from "../square/Square";

interface IBoardProps {
  squares: TPlayer[];
  winnerSet: number[] | undefined;
  onClick: (index: number) => void;
}

export const Board: React.FC<IBoardProps> = ({ squares, onClick, winnerSet }) => {
  return <div className={classes.board}>
    {squares.map((value: TPlayer, index: number) => {
      return <Square key={index} value={value} onClick={() => onClick(index)} winnerSquare={winnerSet?.includes(index)} />
    })
    }
  </div>;
};
