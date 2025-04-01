//square: gets a sign X || O, onclick action change value
import classes from  './Square.module.scss';

interface ISquareProps {
  value: "X" | "O" | null;
  winnerSquare: boolean | undefined;
  onClick: () => void;
}

export const Square: React.FC<ISquareProps> = ({ value, onClick, winnerSquare }) => {
  //condition color of square..
  return (
    <div
      className={`
        ${classes.box}
        ${winnerSquare? classes.winner : classes.empty}
        ${value === "X" ? classes.player1Color : value === "O" ? classes.player2Color : ""}
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};
