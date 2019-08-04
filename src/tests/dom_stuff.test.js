import {IntroPage, StartNextRoundButton}  from './dom_stuff'
import {shallow} from 'enzyme'
import React from 'react'

describe ('IntroPage', () => {
    var mockplay1 = jest.fn(x=>"Hi I'm mockplay1")
    var mockplay2 = jest.fn(x=>"Hi I'm mockplay2")
    var wrapper = shallow(<IntroPage startOne = {mockplay1} startTwo = {mockplay2}/>)
    
    it ('should render two buttons with two different functions', () => {
        var buttons = wrapper.find('button')
        expect(buttons.length).toEqual(2)
        var testbutton1 = wrapper.find('.oneplayer')
        var testbutton2 = wrapper.find('.twoplayer')
        expect(testbutton1).not.toEqual(testbutton2)

    })
    it ('should run oneplayer functio when one player button is clicked', () =>{
        var testbutton1 = wrapper.find('.oneplayer')
        testbutton1.simulate('click')
        expect(mockplay1).toHaveBeenCalled()
        expect (testbutton1.props().onClick()).toEqual(mockplay1())
    })
    
    it ('should run twoplayer functio when two player button is clicked', () =>{
        var testbutton2 = wrapper.find('.twoplayer')
        testbutton2.simulate('click')
        expect(mockplay2).toHaveBeenCalled()
        expect (testbutton2.props().onClick()).toEqual(mockplay2())
        
    })    
})
    
describe("StartNextRoundButton", () =>{
    it ('should receive run function when clicked', ()=>{
        var mockFunc = jest.fn()
        var mockPlayer = {name: "Mocky"}
        var wrapper = shallow(<StartNextRoundButton startTurn = {mockFunc} currentPlayer = {mockPlayer}/>)
        wrapper.find('h2').simulate('click')
        expect(mockFunc).toHaveBeenCalled()
    })
})