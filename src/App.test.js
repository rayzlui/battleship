import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {mount, shallow} from 'enzyme'
import Ship from './ship'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});




describe('<App/>', ()=>{
  
  it ("should render IntroPage if when first ran, when gamestart === false" , () => {
    var wrapper = shallow(<App/>) 
    expect(wrapper.state().gamestart).toEqual(false)
    expect(wrapper.find("IntroPage").length).toEqual(1)
    
  })
  
  describe("one player intropage => ship placement", () =>{
    var wrapper = mount(<App/>) 
    var button = wrapper.find(".oneplayer")
    button.simulate('click')
    describe('IntroPage', () => {
      it ("should change gamestart to true when oneplayer button is clicked" , () => {     
        expect(wrapper.state().gamestart).toEqual(true)
      })
      
      it ("should no longer display IntroPage" , () => {     
        expect(wrapper.find("IntroPage").length).toEqual(0)
      })
      
      it ("should display PlaceShipsBoard" , () => {     
        var testDisplay = wrapper.find("PlaceShipsBoard")
        expect(testDisplay.length).toEqual(1)
      })
      
    })
    it ("should render GameModeBoard when placedships === true" , () => {
      wrapper.setState({placedships: true})
      expect(wrapper.find("GameModeBoard").length).toEqual(1)
      var header = wrapper.find("h2")
      expect(header.props().children).toEqual("Player 1 Turn")
    })
  
  })

  describe("two player intropage => ship placement", () =>{
    var wrapper = mount(<App/>) 
    var button = wrapper.find(".twoplayer")
    button.simulate('click')

    describe('IntroPage actions', () => {

      it ("should change gamestart to true when twoplayer button is clicked" , () => {     
        expect(wrapper.state().gamestart).toEqual(true)
      })

      it ("should no longer display IntroPage" , () => {     
        expect(wrapper.find("IntroPage").length).toEqual(0)
      })

    })

    describe('Ship placement actions', () => {

      var testDisplay = wrapper.find(".start-next-player-button")

      it('should have state.nextturn === true', ()=>{
        expect(wrapper.state().nextturn).toEqual(true)
      })

      it ("should display StartNextRoundButton when state.nextturn === true" , () => {     
        expect(testDisplay.length).toEqual(1)
        var header = wrapper.find("h2")
        expect(header.props().children).toEqual("Click to Start Player 1's Turn")
      })

      it ("should display PlaceShipsBoard when start button is clicked on" , () => {     
        testDisplay.simulate('click')
        var testNextDisplay = wrapper.find("PlaceShipsBoard")
        expect(testNextDisplay.length).toEqual(1)
      })
      
    })

    
    
    
  })

  describe('two player game play flow', () => {
    var wrapper = mount(<App/>) 
    var button = wrapper.find(".twoplayer")
    button.simulate('click')
    var startbutton = wrapper.find(".start-next-player-button")
    startbutton.simulate('click')
    var mockPlayer1  = wrapper.state().nextPlayer
    var mockPlayer2 = wrapper.state().currentPlayer
    var tugboat = new Ship({name: "tugboat", length: 2})
    mockPlayer1.board.allgrids[0] = {ship: tugboat, hit: false, player: "Player2"}
    mockPlayer1.board.allgrids[1] = {ship: tugboat, hit: false, player: "Player2"}
    mockPlayer2.board.allgrids[10] = {ship: tugboat, hit: false, player: "Player1"}
    mockPlayer2.board.allgrids[11] = {ship: tugboat, hit: false, player: "Player1"}
    wrapper.setState({placedships: true})
    var grid = wrapper.find("Grid")
    var mapForm = grid.map(x=>x)
    
    it ("should go to postAttack after player 1 selects a grid to attack", () => {
      
      
      mapForm[0].simulate('click')
      expect(wrapper.state().postAttack).toEqual(true)
      expect(wrapper.state().gameover).toEqual(false)

    })
    it('should display screen with header to click on grid to end turn' , () =>{
      var holdscreen = wrapper.find("h2")
      expect(holdscreen.props().children).toEqual("Click on any empty attack grid to end turn.")
    })
    it('should change postAttack to false and nextturn to true when a grid is clicked' , () => {
      mapForm[11].simulate('click')
      expect(wrapper.state().postAttack).toEqual(false)
      expect(wrapper.state().nextturn).toEqual(true)
    })
    
    it('should display blank screen with header to click on to start Player 2 turn' , () =>{
      var header = wrapper.find("h2")
      expect(header.props().children).toEqual("Click to Start Player 2's Turn")
      header.simulate('click')
    })
    it ('should display boards for player 2' , () => {
      expect(wrapper.find("h2").props().children).toEqual("Player 2 Turn")
    })

    it ("should go to postAttack after player 2 selects a grid to attack", () => {
      grid = wrapper.find("Grid")
      mapForm = grid.map(x=>x)
      mapForm[1].simulate('click')
      expect(wrapper.state().postAttack).toEqual(true)
      expect(wrapper.state().gameover).toEqual(false)
    })
    it('should display screen with header to click on grid to end turn' , () =>{
      var holdscreen = wrapper.find("h2")
      holdscreen = wrapper.find("h2")
      expect(holdscreen.props().children).toEqual("Click on any empty attack grid to end turn.")
    })
    it('should change postAttack to false and nextturn to true when a grid is clicked' , () => {
      mapForm[11].simulate('click')
      expect(wrapper.state().postAttack).toEqual(false)
      expect(wrapper.state().nextturn).toEqual(true)
    })
    it('should display blank screen with header to click on to start Player 1 turn' , () =>{
      var header = wrapper.find("h2")
      header = wrapper.find("h2")
      expect(header.props().children).toEqual("Click to Start Player 1's Turn")
      header.simulate('click')
      expect(wrapper.find("h2").props().children).toEqual("Player 1 Turn")
    })
    it('should be state === gameover after an attack if that attack does cause a game over' , () =>{
      grid = wrapper.find("Grid")
      mapForm = grid.map(x=>x)
      mapForm[1].simulate('click')
      expect(wrapper.state().postAttack).toEqual(false)
      expect(wrapper.state().gameover).toEqual(true)
    })
    it('should display the game over banner if state === gameover', () => {
      expect(wrapper.find("#game-over-banner").length).toEqual(1)
    })

  })

  describe('one player game play flow', () => {
    var wrapper = mount(<App/>) 
    var button = wrapper.find(".oneplayer")
    button.simulate('click')
    var mockPlayer2 = wrapper.state().currentPlayer
    var tugboat = new Ship({name: "tugboat", length: 2})
    mockPlayer2.board.allgrids[10] = {ship: tugboat, hit: false, player: "Player1"}
    mockPlayer2.board.allgrids[11] = {ship: tugboat, hit: false, player: "Player1"}
    wrapper.setState({placedships: true})
    expect(wrapper.state().nextPlayer.ships.length).toEqual(5)
    var grid = wrapper.find("Grid")
    var mapForm = grid.map(x=>x)
    var currentPlayerGridHits = mockPlayer2.board.allgrids.filter(grid=>grid.hit === true)
    
    
    it ("should not go to postAttack in one player mode", () => {
      mapForm[0].simulate('click')
      expect(wrapper.state().postAttack).toEqual(false)
    })

    it ("should not have a hold screen", () => {
      var holdscreen = wrapper.find("h2")
      expect(holdscreen.props().children).not.toEqual("Click on any empty attack grid to end turn.")
    })

    it ('should automatically register an attack from computer', ()=>{
      var board = mockPlayer2.board.allgrids.filter(grid=>grid.hit === true)
      expect((currentPlayerGridHits.length + 1)/1).toEqual(board.length)
      currentPlayerGridHits = board
    })
    
    it("should still display player 1's gameboards", ()=> {
      expect(wrapper.find("h2").props().children).toEqual("Player 1 Turn")
      
    })
    
    it ('should allow player to click on grid to attack right away again', () => {
      var compBoard = wrapper.state().nextPlayer.board.allgrids
      expect(compBoard[1].hit).toEqual(false)
      grid = wrapper.find("Grid")
      mapForm = grid.map(x=>x)
      mapForm[1].simulate('click')
      expect(compBoard[1].hit).toEqual(true)
    })

    it ('should automatically register an attack from computer', ()=>{
      var board = mockPlayer2.board.allgrids.filter(grid=>grid.hit === true)
      expect((currentPlayerGridHits.length + 1)/1).toEqual(board.length)
     
    })

  })
})