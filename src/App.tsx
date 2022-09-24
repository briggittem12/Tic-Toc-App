import { useState } from "react" 
import Square from "./Square"

let initial_game_state = ["", "", "", "", "", "", "", "", ""]

function App() {
  
  const [gameStatus, setGameStatus] = useState(initial_game_state)
  const [currentPlayer, setCurrentPlayer] = useState("X")

  let handleClick = (event: any) => {
    let cellIndex = Number(event.target.getAttribute("data-cell-index"))
  
    let currentValue = gameStatus[cellIndex]
    if (currentValue){
      return
    }

    let newValues = [...gameStatus];
    newValues[cellIndex] = currentPlayer;
    setGameStatus(newValues);
  }

  return (
    <div className='h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to blue-500'>
      <h1 className='text-center text-xl mb-4 font-display text-white'>Tic tac toe game page</h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">{gameStatus.map((player, index) => (
        <Square 
        key={index} 
        onClick={handleClick}
        {... { index, player }}/>
        ))}
        </div>
        <div>Scores Go Here</div>
      </div>
    </div>
  )
}

export default App
