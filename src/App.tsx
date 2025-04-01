import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board/Board";
import { Controls } from "./components/controls/Controls";
import { TValue, PlayerNames, boardState, IWinner } from "./types";

const intialBoard: boardState = Array(9).fill(null);
const intialNames: PlayerNames = { player1: "player1", player2: "player2" };

function App() {

  const [board, setBoard] = useState<boardState>(() => {
    const savedBoard = localStorage.getItem("board");
    return savedBoard ? JSON.parse(savedBoard) : intialBoard;
  });

  //which player is the current?
  const [isXNext, setIsXNext] = useState<boolean>(() => {
    const savedIsXNext = localStorage.getItem("isXNext");
    return savedIsXNext ? JSON.parse(savedIsXNext) : true;
  });

  //player names...
  const [names, setNames] = useState<PlayerNames>(() => {
    const savedNames = localStorage.getItem("names");
    return savedNames ? JSON.parse(savedNames) : true;
  });

  //check board function

  // const [winner, setWinner] = useState<TValue>(null);
  const [winnerObj, setWinnerObj] = useState<IWinner | null>(null);

  useEffect(() => {
    const currentWinner = calculateWinner(board);
    // currentWinner && setWinner(currentWinner.sign);
    currentWinner && setWinnerObj(currentWinner);
  }, [board]);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("isXNext", JSON.stringify(isXNext));
    localStorage.setItem("names", JSON.stringify(names));
  }, [board, isXNext, names]);

  const handleClick = (index: number) => {
    if (board[index] || winnerObj) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext); //...'O'
  };

  const resetGame = () => {
    if (confirm("Reset board and start a new game?")) {
      setNames(intialNames);
      setBoard(intialBoard);
      setIsXNext(true); //important
      setWinnerObj(null);
      //I use setTimeout 0ms to call changeNames function
      //only after the reset states have been updated
      setTimeout(() => changeNames(), 0);
    }
  };

  const changeNames = () => {
    const player1 = prompt("Enter name for player 1:", names.player1);
    const player2 = prompt("Enter name for player 2:", names.player2);

    if (player1 && player2) {
      setNames({ player1, player2 });
    }
  };

  return (
    <div>
      {winnerObj?.sign && (
        <h2>{winnerObj.sign === "X" ? names.player1 : names.player2} Wins!</h2>
      )}
      {!winnerObj && <div>{isXNext ? `${names.player1} X` : `${names.player2} O`}</div>}
      <Board squares={board} onClick={handleClick} winnerSet={winnerObj?.set} />
      <Controls onChangeNames={changeNames} onReset={resetGame} />
    </div>
  );
}

const calculateWinner = (squares: boardState): IWinner | null => {
  //lines array copied from https://www.geeksforgeeks.org/simple-tic-tac-toe-game-using-javascript/
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  for (let i = 0; i < lines.length; i++) {
    //find combinations...
    const [one, two, three] = lines[i];

    if (
      squares[one] &&
      squares[one] === squares[two] &&
      squares[two] === squares[three]
    ) {
      return { sign: squares[one], set: lines[i] }
    }
  }
  return null;
};

export default App;
