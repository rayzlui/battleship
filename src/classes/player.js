

export function createPlayer(options) {
    const {name, computer, board} = options
    if (computer){
        let attackOptions = []
        for (var i = 0; i<=80;i++){
            attackOptions.push(i)
        }
        
        //if computer gets a hit, it'll store it as targetHit so it'll guess around the location again
        return{
            attackOptions: attackOptions,
            targetHit: null,
            name: name,
            ships: [],
            board: board,
            computer: computer,
        }
    }
    return{
        name: name,
        ships: [],
        board: board,
        computer: computer,
    }


}
