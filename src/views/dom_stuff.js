import React from 'react'
function IntroPage(props){
  const { startOne, startTwo } = props
  
    return(
      <div className = "startGame" style = {{textAlign: "center", display: "inline-block"}}>
        <button className = "oneplayer" onClick = {startOne}>One Player</button>
        <button className = "twoplayer" onClick = {startTwo}>Two Player</button>
      </div>
    )
  
}

function GameOverHeader(props){
  const { name } = props
  return(
    <div className = "game-over">
      {alert(`Game Over! ${name} Wins!`)}
      <h1 id = "game-over-banner">{`Game Over! ${name}  Wins!`}</h1>
    </div>
  )
}

function StartNextRoundButton(props){
  const { startTurn, currentPlayer } = props
  return (
    <div className = "change-players-cutscreen">
      <h2 className = "start-next-player-button" onClick = {startTurn}>{`Click to Start ${currentPlayer.name}'s Turn`}</h2>
    </div>
  )
}

export {IntroPage, GameOverHeader, StartNextRoundButton} 
