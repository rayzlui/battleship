export function randomAdjacentValues(value, attackOptions){
  var adjacents = [value +1,value -1, value -9, value+9]
  var targets = adjacents.map(x=>attackOptions.indexOf(x)).filter(y=>y!== -1)
  //see footnote
  return targets
}


export function computerAttackLocation(computer){
  //oppponnet is computer in this situation

  let {attackOptions, targetHit} = computer
  let target

  if (targetHit !== null){
      //if computer gets a hit, it'll store it as targetHit so it'll guess around the location again
      const targets = randomAdjacentValues(targetHit, attackOptions)
      const index = targets[Math.floor(Math.random()*targets.length)]
      if (targets.length <= 1){
          targetHit = null
      }
      target = attackOptions.splice(index,1)[0]

  }else{
      target = Math.floor(Math.random()*attackOptions.length)
      target = attackOptions.splice(target,1)[0]
  }

  return target
}

/*  Note for randomAdjacentValues

    in targets, we cross reference the adjacent spots of where the comp knows there's a hit (value)
        to it's attack options (its an array that started as from 0-80) that haven't been targetted. since 
        we remove targets that computer has attempted, adjacent values do not corespond directly to their 
        respective index in compattack. we filter -1 to remove any options that are outside of the board 
        limits or have been shot already. and we return those indices for the comp to randomly select out of.
    */