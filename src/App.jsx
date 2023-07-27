import React, { useState } from "react";
import "./App.css";

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const checkWinner = (board) => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const winner = checkWinner(newBoard);
      if (winner) {
        setWinner(winner);
        updateWinCount(winner);
      } else {
        const isBoardFull = newBoard.every((cell) => cell !== null);
        if (isBoardFull) {
          setWinner("Draw");
          setDraws((prevDraws) => prevDraws + 1);
        } else {
          setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
  };

  const updateWinCount = (winner) => {
    if (winner === "X") {
      setXWins((prevXWins) => prevXWins + 1);
    } else if (winner === "O") {
      setOWins((prevOWins) => prevOWins + 1);
    }
  };

  const renderCell = (index) => (
    <div className="cell" onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
      {winner && <p className="winner">Winner: {winner}</p>}
      <div className="counters">
        <p>X Wins: {xWins}</p>
        <p>O Wins: {oWins}</p>
        <p>Draws: {draws}</p>
      </div>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default App;
