import React from 'react';
import { shallow } from 'enzyme';
import { setupPlayers } from '../helperFunctions/playerSetup';
import { setupComputer } from '../helperFunctions/computerSetup';
import { PostAttackView } from './PostAttackView';

describe('PostAttackView', () => {
  describe('postAttack false', () => {
    const wrapper = shallow(<PostAttackView postAttack={false} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });
  describe('player two is comp', () => {
    describe('no loser', () => {
      let mockPlayerOne = setupPlayers('1');
      let mockComputer = setupComputer();
      let mockEndHold = jest.fn();
      let mockAttackOne = jest.fn();
      let mockComputerOptions = jest.fn();
      let mockStartAttackOne = jest.fn();
      let mockStartAttackTwo = jest.fn();
      let mockBeginAttack = jest.fn();
      mockPlayerOne.turn = true;
      const wrapper = shallow(
        <PostAttackView
          playerOne={mockPlayerOne}
          playerTwo={mockComputer}
          postAttack={true}
          endHoldScreen={mockEndHold}
          attackPlayerOne={mockAttackOne}
          updateComputerAttackOptions={mockComputerOptions}
          beginAttack={mockBeginAttack}
          startAttackOne={mockStartAttackOne}
          startAttackTwo={mockStartAttackTwo}
        />,
      );
      it('should render header', () => {
        const header = wrapper.find('h2');
        expect(header.text()).toEqual(
          'Click on any empty attack grid to end turn.',
        );
      });

      it('should render boards', () => {
        const attackBoard = wrapper.find('AttackBoard');
        expect(attackBoard.props().board).toEqual(mockComputer.board);
        expect(attackBoard.props().receiveAttack()).toEqual(null);
      });

      it('should render boards', () => {
        const ownBoard = wrapper.find('OwnBoard');
        expect(ownBoard.props().board).toEqual(mockPlayerOne.board);
      });

      it('should handle click', () => {
        const view = wrapper.find('.post-attack-view');
        view.simulate('click');
        expect(mockAttackOne).toHaveBeenCalled();
        expect(mockEndHold).toHaveBeenCalled();
        expect(mockComputerOptions).toHaveBeenCalled();
        expect(mockStartAttackOne).toHaveBeenCalled();
        expect(mockBeginAttack).toHaveBeenCalled();
        expect(mockStartAttackTwo).not.toHaveBeenCalled();
      });
    });

    describe('comp loser', () => {
      let mockPlayerOne = setupPlayers('1');
      let mockComputer = setupComputer();
      let mockEndHold = jest.fn();
      let mockAttackOne = jest.fn();
      let mockComputerOptions = jest.fn();
      let mockStartAttackOne = jest.fn();
      let mockStartAttackTwo = jest.fn();
      let mockBeginAttack = jest.fn();
      mockPlayerOne.turn = true;
      mockComputer.loser = true;
      const wrapper = shallow(
        <PostAttackView
          playerOne={mockPlayerOne}
          playerTwo={mockComputer}
          postAttack={true}
          endHoldScreen={mockEndHold}
          attackPlayerOne={mockAttackOne}
          updateComputerAttackOptions={mockComputerOptions}
          beginAttack={mockBeginAttack}
          startAttackOne={mockStartAttackOne}
          startAttackTwo={mockStartAttackTwo}
        />,
      );
      it('should render header', () => {
        const header = wrapper.find('GameOverHeader');
        expect(header.props().name).toEqual(mockPlayerOne.name);
      });

      it('should render boards', () => {
        const attackBoard = wrapper.find('AttackBoard');
        expect(attackBoard.props().board).toEqual(mockComputer.board);
        expect(attackBoard.props().receiveAttack()).toEqual(null);
      });

      it('should render boards', () => {
        const ownBoard = wrapper.find('OwnBoard');
        expect(ownBoard.props().board).toEqual(mockPlayerOne.board);
      });

      it('should handle click', () => {
        const view = wrapper.find('.post-attack-view');
        view.simulate('click');
        expect(mockAttackOne).not.toHaveBeenCalled();
        expect(mockEndHold).not.toHaveBeenCalled();
        expect(mockComputerOptions).not.toHaveBeenCalled();
        expect(mockStartAttackOne).not.toHaveBeenCalled();
        expect(mockBeginAttack).not.toHaveBeenCalled();
        expect(mockStartAttackTwo).not.toHaveBeenCalled();
      });
    });

    describe('user loser', () => {
      let mockPlayerOne = setupPlayers('1');
      let mockComputer = setupComputer();
      let mockEndHold = jest.fn();
      let mockAttackOne = jest.fn();
      let mockComputerOptions = jest.fn();
      let mockStartAttackOne = jest.fn();
      let mockStartAttackTwo = jest.fn();
      let mockBeginAttack = jest.fn();
      mockPlayerOne.turn = true;
      mockPlayerOne.loser = true;
      const wrapper = shallow(
        <PostAttackView
          playerOne={mockPlayerOne}
          playerTwo={mockComputer}
          postAttack={true}
          endHoldScreen={mockEndHold}
          attackPlayerOne={mockAttackOne}
          updateComputerAttackOptions={mockComputerOptions}
          beginAttack={mockBeginAttack}
          startAttackOne={mockStartAttackOne}
          startAttackTwo={mockStartAttackTwo}
        />,
      );
      it('should render header', () => {
        const header = wrapper.find('GameOverHeader');
        expect(header.props().name).toEqual(mockComputer.name);
      });

      it('should render boards', () => {
        const attackBoard = wrapper.find('AttackBoard');
        expect(attackBoard.props().board).toEqual(mockComputer.board);
        expect(attackBoard.props().receiveAttack()).toEqual(null);
      });

      it('should render boards', () => {
        const ownBoard = wrapper.find('OwnBoard');
        expect(ownBoard.props().board).toEqual(mockPlayerOne.board);
      });

      it('should handle click', () => {
        const view = wrapper.find('.post-attack-view');
        view.simulate('click');
        expect(mockAttackOne).not.toHaveBeenCalled();
        expect(mockEndHold).not.toHaveBeenCalled();
        expect(mockComputerOptions).not.toHaveBeenCalled();
        expect(mockStartAttackOne).not.toHaveBeenCalled();
        expect(mockBeginAttack).not.toHaveBeenCalled();
        expect(mockStartAttackTwo).not.toHaveBeenCalled();
      });
    });
  });

  describe('two player', () => {
    describe('player one turn', () => {
      let mockPlayerOne = setupPlayers('1');
      let mockPlayerTwo = setupPlayers('2');
      let mockEndHold = jest.fn();
      let mockAttackOne = jest.fn();
      let mockComputerOptions = jest.fn();
      let mockStartAttackOne = jest.fn();
      let mockStartAttackTwo = jest.fn();
      let mockBeginAttack = jest.fn();
      mockPlayerOne.turn = true;

      describe('no loser', () => {
        const wrapper = shallow(
          <PostAttackView
            playerOne={mockPlayerOne}
            playerTwo={mockPlayerTwo}
            postAttack={true}
            endHoldScreen={mockEndHold}
            attackPlayerOne={mockAttackOne}
            updateComputerAttackOptions={mockComputerOptions}
            beginAttack={mockBeginAttack}
            startAttackOne={mockStartAttackOne}
            startAttackTwo={mockStartAttackTwo}
          />,
        );

        it('should render header', () => {
          const header = wrapper.find('h2');
          expect(header.text()).toEqual(
            'Click on any empty attack grid to end turn.',
          );
        });

        it('should render boards', () => {
          const attackBoard = wrapper.find('AttackBoard');
          expect(attackBoard.props().board).toEqual(mockPlayerTwo.board);
          expect(attackBoard.props().receiveAttack()).toEqual(null);
        });

        it('should render boards', () => {
          const ownBoard = wrapper.find('OwnBoard');
          expect(ownBoard.props().board).toEqual(mockPlayerOne.board);
        });

        it('should handle click', () => {
          const view = wrapper.find('.post-attack-view');
          view.simulate('click');
          expect(mockAttackOne).not.toHaveBeenCalled();
          expect(mockEndHold).toHaveBeenCalled();
          expect(mockComputerOptions).not.toHaveBeenCalled();
          expect(mockStartAttackOne).not.toHaveBeenCalled();
          expect(mockBeginAttack).not.toHaveBeenCalled();
          expect(mockStartAttackTwo).toHaveBeenCalled();
        });
      });

      describe('playertwo loser', () => {
        let mockPlayerOne = setupPlayers('1');
        let mockPlayerTwo = setupPlayers('2');
        let mockEndHold = jest.fn();
        let mockAttackOne = jest.fn();
        let mockComputerOptions = jest.fn();
        let mockStartAttackOne = jest.fn();
        let mockStartAttackTwo = jest.fn();
        let mockBeginAttack = jest.fn();
        mockPlayerTwo.loser = true;
        const wrapper = shallow(
          <PostAttackView
            playerOne={mockPlayerOne}
            playerTwo={mockPlayerTwo}
            postAttack={true}
            endHoldScreen={mockEndHold}
            attackPlayerOne={mockAttackOne}
            updateComputerAttackOptions={mockComputerOptions}
            beginAttack={mockBeginAttack}
            startAttackOne={mockStartAttackOne}
            startAttackTwo={mockStartAttackTwo}
          />,
        );

        it('should render header', () => {
          const header = wrapper.find('GameOverHeader');

          expect(header.props().name).toEqual(mockPlayerOne.name);
        });

        it('should render boards', () => {
          const attackBoard = wrapper.find('AttackBoard');
          expect(attackBoard.props().board).toEqual(mockPlayerTwo.board);
          expect(attackBoard.props().receiveAttack()).toEqual(null);
        });

        it('should render boards', () => {
          const ownBoard = wrapper.find('OwnBoard');
          expect(ownBoard.props().board).toEqual(mockPlayerOne.board);
        });

        it('should handle click', () => {
          const view = wrapper.find('.post-attack-view');
          view.simulate('click');
          expect(mockAttackOne).not.toHaveBeenCalled();
          expect(mockEndHold).not.toHaveBeenCalled();
          expect(mockComputerOptions).not.toHaveBeenCalled();
          expect(mockStartAttackOne).not.toHaveBeenCalled();
          expect(mockBeginAttack).not.toHaveBeenCalled();
          expect(mockStartAttackTwo).not.toHaveBeenCalled();
        });
      });
    });

    describe('player two turn', () => {
      let mockPlayerOne = setupPlayers('1');
      let mockPlayerTwo = setupPlayers('2');
      let mockEndHold = jest.fn();
      let mockAttackOne = jest.fn();
      let mockComputerOptions = jest.fn();
      let mockStartAttackOne = jest.fn();
      let mockStartAttackTwo = jest.fn();
      let mockBeginAttack = jest.fn();
      mockPlayerTwo.turn = true;

      describe('no loser', () => {
        const wrapper = shallow(
          <PostAttackView
            playerOne={mockPlayerOne}
            playerTwo={mockPlayerTwo}
            postAttack={true}
            endHoldScreen={mockEndHold}
            attackPlayerOne={mockAttackOne}
            updateComputerAttackOptions={mockComputerOptions}
            beginAttack={mockBeginAttack}
            startAttackOne={mockStartAttackOne}
            startAttackTwo={mockStartAttackTwo}
          />,
        );

        it('should render header', () => {
          const header = wrapper.find('h2');
          expect(header.text()).toEqual(
            'Click on any empty attack grid to end turn.',
          );
        });

        it('should render boards', () => {
          const attackBoard = wrapper.find('AttackBoard');
          expect(attackBoard.props().board).toEqual(mockPlayerOne.board);
          expect(attackBoard.props().receiveAttack()).toEqual(null);
        });

        it('should render boards', () => {
          const ownBoard = wrapper.find('OwnBoard');
          expect(ownBoard.props().board).toEqual(mockPlayerTwo.board);
        });

        it('should handle click', () => {
          const view = wrapper.find('.post-attack-view');
          view.simulate('click');
          expect(mockEndHold).toHaveBeenCalled();
          expect(mockStartAttackOne).toHaveBeenCalled();
          expect(mockStartAttackTwo).not.toHaveBeenCalled();
        });
      });

      describe('playerone loser', () => {
        let mockPlayerOne = setupPlayers('1');
        let mockPlayerTwo = setupPlayers('2');
        let mockEndHold = jest.fn();
        let mockAttackOne = jest.fn();
        let mockComputerOptions = jest.fn();
        let mockStartAttackOne = jest.fn();
        let mockStartAttackTwo = jest.fn();
        let mockBeginAttack = jest.fn();
        mockPlayerOne.loser = true;
        const wrapper = shallow(
          <PostAttackView
            playerOne={mockPlayerOne}
            playerTwo={mockPlayerTwo}
            postAttack={true}
            endHoldScreen={mockEndHold}
            attackPlayerOne={mockAttackOne}
            updateComputerAttackOptions={mockComputerOptions}
            beginAttack={mockBeginAttack}
            startAttackOne={mockStartAttackOne}
            startAttackTwo={mockStartAttackTwo}
          />,
        );

        it('should render header', () => {
          const header = wrapper.find('GameOverHeader');

          expect(header.props().name).toEqual(mockPlayerTwo.name);
        });

        it('should render boards', () => {
          const attackBoard = wrapper.find('AttackBoard');
          expect(attackBoard.props().board).toEqual(mockPlayerOne.board);
          expect(attackBoard.props().receiveAttack()).toEqual(null);
        });

        it('should render boards', () => {
          const ownBoard = wrapper.find('OwnBoard');
          expect(ownBoard.props().board).toEqual(mockPlayerTwo.board);
        });

        it('should handle click', () => {
          const view = wrapper.find('.post-attack-view');
          view.simulate('click');
          expect(mockAttackOne).not.toHaveBeenCalled();
          expect(mockEndHold).not.toHaveBeenCalled();
          expect(mockComputerOptions).not.toHaveBeenCalled();
          expect(mockStartAttackOne).not.toHaveBeenCalled();
          expect(mockBeginAttack).not.toHaveBeenCalled();
          expect(mockStartAttackTwo).not.toHaveBeenCalled();
        });
      });
    });
  });
});
