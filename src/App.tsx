import { useEffect, useState } from "react" 
import Square from "./Square"

type Scores = {
  [key: string]: number
}

// status initial of the x or o 
let initial_game_state = ["", "", "", "", "", "", "", "", ""]
// initial score of the game
let initial_score: Scores = {X:0, O: 0}
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
  const [scores, setScores] = useState(initial_score)

  useEffect(() => {
    let storedScores = localStorage.getItem("scores")
      if(storedScores){
        setScores(JSON.parse(storedScores))
      }
  }, [])

  useEffect(() => {
    if(gameStatus === initial_game_state){
      return
    }
    checkForWinner()
  }, [gameStatus])


  // reset the board after winner
  let resetBoard = () => setGameStatus(initial_game_state)
 
  // show alert for the winner
  let handleWin = () => {
    window.alert(`Congrats player ${currentPlayer}! you are the winner`)
    
    let newPlayerScore = scores[currentPlayer] + 1
    let newScores = {...scores}
    newScores[currentPlayer] = newPlayerScore
    setScores(newScores)

    localStorage.setItem("scores", JSON.stringify(newScores));

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

  //change ternario = ? :
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
    <div className='h-screen p-8 text-slate-800 bg-red-300'>
      <h1 className='text-center text-5xl pb-2.5 mb-4 font-display italic text-orange-200 hover:text-sky-400'>Tic tac toe game page</h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">{gameStatus.map((player, index) => (
        <Square 
        key={index} 
        onClick={handleClick}
        {... { index, player }}/>
        ))}
        </div>

        <div className="mx-auto w-96 text-2xl text-serif pr-2.5">
          
          <p className="text-white mt-5">Next Player: 
          <span>{currentPlayer}</span>
          </p>
          <p className="text-white mt-5">Next X wins: 
          <span>{scores["X"]}</span>
          </p>
          <p className="text-white mt-5">Next O wins: 
          <span>{scores["O"]}</span>
          </p>

        </div>

      </div>
    </div>
  )
}

export default App
