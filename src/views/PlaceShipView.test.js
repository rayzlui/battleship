import React from 'react';
import { shallow, mount } from 'enzyme';
import { PlaceShipView } from './PlaceShipView';
import { setupPlayers } from '../helperFunctions/playerSetup';

describe('PlaceShipView', () => {
  const mockPlaceShipOne = jest.fn(() => {
    return 'I placed ship one';
  });
  const mockPlaceShipTwo = jest.fn(() => {
    return 'I placed ship two';
  });
  const mockCompletedPlacement = jest.fn(() => {
    return 'Placed ships!';
  });

  describe('placedShips true', () => {
    const wrapper = shallow(<PlaceShipView placedShips={true} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  describe('gameStart false', () => {
    const wrapper = shallow(<PlaceShipView gameStart={false} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  describe('neither player placed', () => {
    const mockPlayerOne = setupPlayers('1');
    const mockPlayerTwo = setupPlayers('2');
    const mockPlaceShipOne = jest.fn();
    const mockPlaceShipTwo = jest.fn();
    const wrapper = mount(
      <PlaceShipView
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        placeShipOne={mockPlaceShipOne}
        placeShipTwo={mockPlaceShipTwo}
        placedShips={false}
        gameStart={true}
        completedPlacement={mockCompletedPlacement}
      />,
    );

    it('should have header', () => {
      const headerLarge = wrapper.find('h2');
      expect(headerLarge.text()).toEqual('Player 1 Place Your Ships');
    });

    it('should have components', () => {
      const placeShipsBoard = wrapper.find('PlaceShipBoard');
      const { board, selectGridForShip } = placeShipsBoard.props();
      expect(board).toEqual(mockPlayerOne.board);
      expect(selectGridForShip()).toEqual(null);
    });

    it('should have components', () => {
      const shipHead = wrapper.find('h4');
      expect(shipHead.text()).toEqual('');
      const options = wrapper.find('ShipOptionsDisplay');
      const { player } = options.props();
      expect(player).toEqual(mockPlayerOne);
      const ship = wrapper.find('.battleship');
      ship.simulate('click');
      const shipHeadAgain = wrapper.find('h4');
      expect(shipHeadAgain.text()).toEqual(`You have selected battleship`);
    });

    it('should have toggle', () => {
      let toggle = wrapper.find('.vertical-button');
      let toggle2 = wrapper.find('TogglePlacement');
      expect(toggle2.props().isVertical).toBe(true);
      toggle.simulate('click');
      let toggle3 = wrapper.find('TogglePlacement');
      expect(toggle3.props().isVertical).toBe(false);
    });
  });

  describe('player two placed', () => {
    const mockPlayerOne = setupPlayers('1');
    const mockPlayerTwo = setupPlayers('2');
    mockPlayerTwo.shipsPlaced = true;
    const mockPlaceShipOne = jest.fn();
    const mockPlaceShipTwo = jest.fn();
    const wrapper = mount(
      <PlaceShipView
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        placeShipOne={mockPlaceShipOne}
        placeShipTwo={mockPlaceShipTwo}
        placedShips={false}
        gameStart={true}
        completedPlacement={mockCompletedPlacement}
      />,
    );

    it('should have header', () => {
      const headerLarge = wrapper.find('h2');
      expect(headerLarge.text()).toEqual('Player 1 Place Your Ships');
    });

    it('should have components', () => {
      const placeShipsBoard = wrapper.find('PlaceShipBoard');
      const { board, selectGridForShip } = placeShipsBoard.props();
      expect(board).toEqual(mockPlayerOne.board);
      expect(selectGridForShip()).toEqual(null);
    });

    it('should have components', () => {
      const shipHead = wrapper.find('h4');
      expect(shipHead.text()).toEqual('');
      const options = wrapper.find('ShipOptionsDisplay');
      const { player } = options.props();
      expect(player).toEqual(mockPlayerOne);
      const ship = wrapper.find('.battleship');
      ship.simulate('click');
      const shipHeadAgain = wrapper.find('h4');
      expect(shipHeadAgain.text()).toEqual(`You have selected battleship`);
    });
    it('should have toggle', () => {
      let toggle = wrapper.find('.vertical-button');
      let toggle2 = wrapper.find('TogglePlacement');
      expect(toggle2.props().isVertical).toBe(true);
      toggle.simulate('click');
      let toggle3 = wrapper.find('TogglePlacement');
      expect(toggle3.props().isVertical).toBe(false);
    });
  });

  describe('player one placed', () => {
    const mockPlayerOne = setupPlayers('1');
    mockPlayerOne.shipsPlaced = true;
    const mockPlayerTwo = setupPlayers('2');
    const mockPlaceShipOne = jest.fn();
    const mockPlaceShipTwo = jest.fn();
    const wrapper = mount(
      <PlaceShipView
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        placeShipOne={mockPlaceShipOne}
        placeShipTwo={mockPlaceShipTwo}
        placedShips={false}
        gameStart={true}
        completedPlacement={mockCompletedPlacement}
      />,
    );

    it('should have header', () => {
      const headerLarge = wrapper.find('h2');
      expect(headerLarge.text()).toEqual('Player 2 Place Your Ships');
    });

    it('should have components', () => {
      const placeShipsBoard = wrapper.find('PlaceShipBoard');
      const { board, selectGridForShip } = placeShipsBoard.props();
      expect(board).toEqual(mockPlayerTwo.board);
      expect(selectGridForShip()).toEqual(null);
    });

    it('should have components', () => {
      const shipHead = wrapper.find('h4');
      expect(shipHead.text()).toEqual('');
      const options = wrapper.find('ShipOptionsDisplay');
      const { player } = options.props();
      expect(player).toEqual(mockPlayerTwo);
      const ship = wrapper.find('.battleship');
      ship.simulate('click');
      const shipHeadAgain = wrapper.find('h4');
      expect(shipHeadAgain.text()).toEqual(`You have selected battleship`);
    });

    it('should have toggle', () => {
      let toggle = wrapper.find('.vertical-button');
      let toggle2 = wrapper.find('TogglePlacement');
      expect(toggle2.props().isVertical).toBe(true);
      toggle.simulate('click');
      let toggle3 = wrapper.find('TogglePlacement');
      expect(toggle3.props().isVertical).toBe(false);
    });
  });

  describe('both player placed', () => {
    const mockPlayerOne = setupPlayers('1');
    const mockPlayerTwo = setupPlayers('2');
    mockPlayerOne.shipsPlaced = true;
    mockPlayerTwo.shipsPlaced = true;
    const mockPlaceShipOne = jest.fn();
    const mockPlaceShipTwo = jest.fn();
    const wrapper = shallow(
      <PlaceShipView
        playerOne={mockPlayerOne}
        playerTwo={mockPlayerTwo}
        placeShipOne={mockPlaceShipOne}
        placeShipTwo={mockPlaceShipTwo}
        placedShips={false}
        gameStart={true}
        completedPlacement={mockCompletedPlacement}
      />,
    );
    expect(wrapper.isEmptyRender()).toBe(true);
    expect(mockCompletedPlacement).toHaveBeenCalled();
  });
});
