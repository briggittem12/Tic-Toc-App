import { useEffect, useState } from "react" 
import Square from "./Square"

// status initial of the x or o 
let initial_game_state = ["", "", "", "", "", "", "", "", ""]
// set de playing
let winning_combos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6] 
]


function App() {
  
  const [gameStatus, setGameStatus] = useState(initial_game_state)
  const [currentPlayer, setCurrentPlayer] = useState("X")

  useEffect(() => {
    checkForWinner()
  }, [gameStatus])

  // reset the board after winner
  let resetBoard = () => setGameStatus(initial_game_state)
 
  // show alert for the winner
  let handleWin = () => {
    window.alert(`Congrats player ${currentPlayer}! you are the winner`)
    resetBoard()
  }
  
  // show alert for the draw
  let handleDraw = () => {
    window.alert("the game ended in a draw")
    resetBoard()
  }

  // function for ejecute funcionalitys for the game 
  let checkForWinner = () => {
    let roundWon = false //inital state round

      for (let i = 0 ; i < winning_combos.length ; i++) {
        let winCombo = winning_combos[i]
          // recorrido y seleccionn de los indices
        let a = gameStatus[winCombo[0]]
        let b = gameStatus[winCombo[1]]
        let c = gameStatus[winCombo[2]]

          // sentencias para la ejecucion segun las variables globales
        if ([a, b, c].includes("")){
          continue
        }

        if (a === b && b === c) {
          roundWon = true
          break
        }
      }
      if (roundWon) {
        setTimeout(() => handleWin(), 500)
        return
      }
      if (!gameStatus.includes("")){
        setTimeout(() => handleDraw(), 500)
        return
      }

      changePlayer() //
  }

  let changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? " O" : "X")
  }
  
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
