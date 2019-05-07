

class Player {
  constructor(options){
        this.name = options.name
        this.ships = []
        this.board = options.board
        this.computer = options.computer
        if (options.computer){
            this.attackOptions = []
            for (var i = 0; i<=80;i++){
                this.attackOptions.push(i)
            }
            this.targetHit = null
            //if computer gets a hit, it'll store it as targetHit so it'll guess around the location again
        }

    }


}

export default Player