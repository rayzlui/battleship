import React from 'react'
class IntroPage extends React.Component{

  render(){
    return(
      <div className = "startGame" style = {{textAlign: "center", display: "inline-block"}}>
        <button className = "oneplayer" onClick = {this.props.startOne}>One Player</button>
        <button className = "twoplayer" onClick = {this.props.startTwo}>Two Player</button>
      </div>
    )
  }
}

function GameOverHeader(options){
  return(
    <div className = "game-over">
      {alert("Game Over! " + options.name + " Wins!")}
      <h1 id = "game-over-banner">{"Game Over! " + options.name + " Wins!"}</h1>
    </div>
  )
}

function StartNextRoundButton(options){
  return (
    <div className = "change-players-cutscreen">
      <h2 className = "start-next-player-button" onClick = {options.startTurn}>{`Click to Start ${options.currentPlayer.name}'s Turn`}</h2>
    </div>
  )
}

export {IntroPage, GameOverHeader, StartNextRoundButton} 
