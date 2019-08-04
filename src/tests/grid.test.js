import {Grid, gridForShipPlacement, gridForOwnBoard, gridForAttackBoard, generateGridDisplay} from './grid'
import {shallow} from 'enzyme'
//test when its placement mode, own board, attack board
describe("gridForShipPlacement", () => {
    it("should return color = blue, ship = null, click = selectGridForShip when ship === null", ()=>{
        var mockFunc = jest.fn
        var options = {value: {ship: null}, selectGridForShip: mockFunc}
        var test = gridForShipPlacement(options)
        expect(test.color).toEqual("blue")
        expect(test.click).toEqual(mockFunc)
        expect(test.ship).toEqual(null)
    })
    it("should return color = grey, click = null, ship = ship.img when ship !=== null",() => {
        var mockFunc = jest.fn
        var ship = "Yay I'm something"
        var options = {value:{ship: {image: ship}}, selectGridForShip: mockFunc}
        
        var test = gridForShipPlacement(options)
        expect(test.color).toEqual("grey")
        expect(test.click).toEqual(null)
        expect(test.ship.props.src).toEqual(ship)
        

    })
})

describe("gridForOwnBoard", () => {
    it("should have white grid when there's no ship and been shot at", () => {
        var value = {value: {ship: null, hit: true}}
        var test = gridForOwnBoard(value)
        expect(test.ship).toEqual(null)
        expect(test.color).toEqual("white")

    })
    it("should have blue grid when there's no ship and not been shot at", () => {
        var value = {value: {ship: null, hit: false}}
        var test = gridForOwnBoard(value)
        expect(test.ship).toEqual(null)
        expect(test.color).toEqual("blue")
    })
    it("should have red grid when there's a ship and been shot at", () => {
        var value = {value: {ship: true, hit: true}}
        var test = gridForOwnBoard(value)
        expect(test.ship).toEqual(null)
        expect(test.color).toEqual("red")
    })
    it("should have grey grid when there's no ship and not been shot at, ship should have a value", () => {
        var value = {value: {ship: true, hit: false}}
        var test = gridForOwnBoard(value)
        expect(test.color).toEqual("grey")
        expect(test.ship).not.toEqual(null)
    })
    
})

describe("gridForAttackBoard", () => {
    it("should have a function on click and the color should be blue when it's not shot at",()=>{
        var mockFunc = jest.fn
        var value = {value: {ship: true, hit: false}, receiveAttack: mockFunc}
        var test = gridForAttackBoard(value)
        expect(test.color).toEqual("blue")
        expect(test.ship).toEqual(null)
        expect(test.click).toEqual(mockFunc)
    })

    it("should not have a function on click and the color should be green when it shot, but no ship on spot",()=>{
        var mockFunc = jest.fn
        var value = {value: {ship: null, hit: true}, receiveAttack: mockFunc}
        var test = gridForAttackBoard(value)
        expect(test.color).toEqual("green")
        expect(test.ship).toEqual(null)
        expect(test.click).not.toEqual(mockFunc)
    })

    it("should not have a function on click and the color should be red when it shot and a ship on spot",()=>{
        var mockFunc = jest.fn
        var value = {value: {ship: true, hit: true}, receiveAttack: mockFunc}
        var test = gridForAttackBoard(value)
        expect(test.color).toEqual("red")
        expect(test.ship).toEqual(null)
        expect(test.click).not.toEqual(mockFunc)
    })
})

describe("generateGridDisplay", () => {
    var mockPlaceShips = jest.fn(x=>"placeships")
    var mockOwnBoard = jest.fn(x=>"ownboard")
    var mockAttackBoard = jest.fn(x=>"attackboard")


    it("should return placeships if placedships === false", () => {
        var value = {props: {placedships: false, isOwnBoard:true}, placeships: mockPlaceShips}
        var test = generateGridDisplay(value)
        expect(test).toEqual("placeships")
    })

    it("should return ownboard if placedships === true, isOwnBoard === true", () => {
        var value = {props: {placedships: true, isOwnBoard:true}, ownboard: mockOwnBoard}
        var test = generateGridDisplay(value)
        expect(test).toEqual("ownboard")
    })

    it("should return ownboard if placedships === true, isOwnBoard === false", () => {
        var value = {props: {placedships: true, isOwnBoard: false}, attackboard: mockAttackBoard}
        var test = generateGridDisplay(value)
        expect(test).toEqual("attackboard")
    })
})