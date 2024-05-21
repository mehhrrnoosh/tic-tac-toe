
import Player from './Components/Player';
import GameBoard from './Components/GameBoard';
import { useState } from 'react';
import Log from './Components/log';
import  { WINNING_COMBINATIONS } from './Components/winning-combinations';
import GameOver from './Components/GameOver';

const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

function deriveActivePlayer (gameTurns)
{
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function App() {
  let winner = null;

// const [activePlayer, setActivePlayer] = useState ('X')
const [gameTurns, setGameTurns] = useState ([])
const [players,setPlayers]=useState({
  O:'Player 1',
  Y:'Player 2',
});

const activePlayer = deriveActivePlayer (gameTurns)

let gameBoard = [...initialGameBoard.map(array  => [...array])];

    for (const turn of gameTurns)
    {
        const { square, player } = turn
        const { row, col } = square
        gameBoard [row][col] = player

    } 

    for ( const combination of WINNING_COMBINATIONS)
    {
      const fistSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];
      if ( fistSquareSymbol && fistSquareSymbol == secondSquareSymbol && fistSquareSymbol == thirdSquareSymbol)
      {
        winner = fistSquareSymbol;
        
      }
    }

   const hasDraw = gameTurns.length === 9 && !winner;
    

function handleSelectSquare(rowIndex, colIndex) {
 
  setGameTurns((prevTurns) => {
   
    const currentPlayer = deriveActivePlayer (prevTurns)
    
    const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
    return updatedTurns;
  });
}
function handleRematch ()
{
  setGameTurns ([]);
}
function handlePlayerNameChange (symbol, newName)
{
  setPlayers(...prevPlayers => {
    return{
      ...prevPlayers,
      [symbol] : newName

    }
  })
}
  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName="player1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="player2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={ winner } onRestart={handleRematch}/>}
     
   
        <GameBoard onSelectSquare={handleSelectSquare} 
       board={gameBoard}
        />

      </div>
      <Log turns={gameTurns}/>
    </main>
  )

}

export default App
