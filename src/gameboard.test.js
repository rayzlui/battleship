import Gameboard from './gameboard'
import React from 'react'
import {shallow} from 'enzyme'

describe('Gameboard', () => {
    //set board and test if they are getting the correct click function. 
    //That's essentially the whole purpose of this component is to set the correct click.

    var mockBoard = []
    for (var i = 0; i < 81; i++){
        mockBoard.push(`I'm ${i}!!`)
    }

    var mockSelectGridForShip = jest.fn(x=>"Hi I'm mockSelectGridForShip")
    var mockReceiveAttack = jest.fn(x=> "Hi I'm mockReceiveAttack")
  
    it ('should receive gridForShip function when placedships === true', () => {
        var testBoard = shallow(<Gameboard selectGridForShip = {mockSelectGridForShip} receiveAttack = {mockReceiveAttack} isOwnBoard = {false} placedships = {true}/>)
    })
})