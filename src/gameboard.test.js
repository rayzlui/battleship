import Gameboard from './gameboard'
import React from 'react'
import {shallow} from 'enzyme'

describe('Gameboard', () => {
    //set board and test if they are getting the correct click function. 
    //That's essentially the whole purpose of this component is to set the correct click.
    //we only need to test what data grid component will be receiving, the grid tests will handle what they do with the info.

    var mockBoard = []
    for (var i = 0; i < 81; i++){
        mockBoard.push(`I'm ${i}!!`)
    }

    var mockSelectGridForShip = jest.fn(x=>"Hi I'm mockSelectGridForShip")
    var mockReceiveAttack = jest.fn(x=> "Hi I'm mockReceiveAttack")

    it('should have 9 rows', () => {
        var testBoard = shallow(<Gameboard value = {mockBoard} selectGridForShip = {mockSelectGridForShip} receiveAttack = {mockReceiveAttack} isOwnBoard = {true} placedships = {false}/>)
        var testRows = testBoard.find('li')
        expect(testRows.length).toBe(9)
        var rowData = testRows.map(x=>x.props())
        rowData.forEach(row =>expect(row.children.length).toEqual(9))
    })
  
    it ('should receive gridForShip function when placedships === false and isOwnboard === true', () => {
        var testBoard = shallow(<Gameboard value = {mockBoard} selectGridForShip = {mockSelectGridForShip} receiveAttack = {mockReceiveAttack} isOwnBoard = {true} placedships = {false}/>)
        var test = testBoard.find(`Grid`)
        var gridData = test.map(grid => grid.props())
        for (var i = 0; i < gridData.length; i++) {
            var grid = gridData[i]
            expect(grid.selectGridForShip).toBeTruthy()
            expect(grid.receiveAttack).toEqual(undefined)

        }
        expect(gridData.length).toEqual(81)
        
    })

    it ('should receive gridForShip function when placedships === false and isOwnboard === false', () => {
        var testBoard = shallow(<Gameboard value = {mockBoard} selectGridForShip = {mockSelectGridForShip} receiveAttack = {mockReceiveAttack} isOwnBoard = {false} placedships = {false}/>)
        var test = testBoard.find(`Grid`)
        var gridData = test.map(grid => grid.props())
        for (var i = 0; i < gridData.length; i++) {
            var grid = gridData[i]
            expect(grid.selectGridForShip).toBeTruthy()
            expect(grid.receiveAttack).toEqual(undefined)

        }
        expect(gridData.length).toEqual(81)
        
    })

    it ('should receive receiveAttack function when placedships === true and isOwnBoard is false. Should not have selectGridForShip', () => {
        var testBoard = shallow(<Gameboard value = {mockBoard} selectGridForShip = {mockSelectGridForShip} receiveAttack = {mockReceiveAttack} isOwnBoard = {false} placedships = {true}/>)
        var test = testBoard.find(`Grid`)
        var gridData = test.map(grid => grid.props())
        for (var i = 0; i < gridData.length; i++) {
            var grid = gridData[i]
            expect(grid.receiveAttack).toBeTruthy()
            expect(grid.selectGridForShip).toEqual(undefined)

        }
        expect(gridData.length).toEqual(81)
        
    })

    it ('should not receive receiveAttack function or selectGridForShip when placedships === true and isOwnBoard is true.', () => {
        var testBoard = shallow(<Gameboard value = {mockBoard} selectGridForShip = {mockSelectGridForShip} receiveAttack = {mockReceiveAttack} isOwnBoard = {true} placedships = {true}/>)
        var test = testBoard.find(`Grid`)
        var gridData = test.map(grid => grid.props())
        for (var i = 0; i < gridData.length; i++) {
            var grid = gridData[i]
            expect(grid.receiveAttack).toEqual(undefined)
            expect(grid.selectGridForShip).toEqual(undefined)

        }
        expect(gridData.length).toEqual(81)
        
    })
})