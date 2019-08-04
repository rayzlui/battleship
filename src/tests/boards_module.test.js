 import {GameModeBoard, PlaceShipsBoard} from './boards_module'
 import React from 'react'
 import {shallow} from 'enzyme'

 describe ('GameModeBoard', () => {
    var mockFunc = jest.fn(x=>"hi i'm receive attk")
    var mockCurrentPlayer = "Paul"
    var mockNextPlayer = "George"
    var wrapper = shallow(<GameModeBoard currentPlayer = {mockCurrentPlayer} nextPlayer = {mockNextPlayer} isOwnBoard = {true} receiveAttack = {mockFunc}/>)
    it ('should have have receive attack function on attack board', () => {
        var testOwnBoard = wrapper.find("#attack-board")
        expect(testOwnBoard.props().children[1].props.receiveAttack).toEqual(mockFunc)

    })
    it ('should have not have receive attack function on own board', () => {
        var testOwnBoard = wrapper.find("#own-board")
        expect(testOwnBoard.props().children[1].props.receiveAttack).toEqual(undefined)
    
    })
 })

 describe('PlaceShipsBoard', () => {
     //test if there's a ship selected then it should have function to place ship on the grid and if no ship selected should not have it (aka clicking on grid without selected ship will not do anything.)
    var mockSelectGridForShip = jest.fn(x=>"Hi me selectgrid")
    var mockShips = ["tugboat", "ferry", "yacht", "fishing vessel"]
    var mockBoard = []
    for (var i = 0; i < 81; i++){
        mockBoard.push(i) 
    }
    var mockPlayer = {name: "Paul", board: {allgrids: mockBoard}, ships: mockShips}


    it('should run vertical function when verticalize button is clicked', ()=>{
        var wrapper = shallow(<PlaceShipsBoard player = {mockPlayer} selectGridForShip = {mockSelectGridForShip} />)
       // expect(wrapper.state.vertical).toEqual(false)
        var vertButton = wrapper.find('#vertical-button')
        expect(wrapper.state("vertical")).toEqual(false)
        expect(vertButton.props().children).toEqual("Verticalize Placement")
        
        vertButton.simulate('click')
        vertButton = wrapper.find('#vertical-button')
        expect(wrapper.state("vertical")).toEqual(true)
        expect(vertButton.props().children).toEqual("Horizontalize Placement")
        


    })
    describe('place-ships-board with no ship' , () => {
        var wrapper = shallow(<PlaceShipsBoard  player = {mockPlayer} selectGridForShip = {mockSelectGridForShip} />)
        var testBoard = wrapper.find("#place-ship-board")

        it('should have not a selectGridForShip function if there is a ship selected (aka clicking on grid will not place ship on grid)', ()=>{
            expect(testBoard.props().children.props.selectGridForShip).toEqual(null)
        })

        it ('should not have a h4 with mockboat', ()=>{
           var header = wrapper.find('h4')
           expect(header.length).toEqual(0)
           //it shouldn't exist
        })

    })

    describe('place-ships-board with ship' , () => {
        var wrapper = shallow(<PlaceShipsBoard player = {mockPlayer} selectGridForShip = {mockSelectGridForShip} />)
        wrapper.setState({selectedship: {name: "tugboat"}})
        var testBoard = wrapper.find("#place-ship-board")
        
        it('should have h4 with mockBoat' , ()=>{
            var header = wrapper.find('h4')
            expect(header.props().children).toEqual(`You have selected tugboat`)
        })


        it('should have a selectGridForShip function if there is a ship selected (aka clicking on grid will place ship on grid)', ()=>{
            
            expect(testBoard.props().children.props.selectGridForShip).not.toEqual(null)
        })
 
    })
 })