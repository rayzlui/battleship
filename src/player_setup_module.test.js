 import {findGridForCompShipPlacement} from './player_setup_module'
//testing player creator is redunant, the computer creators are loops that 
//generate random numbers that ultimately rely on findGridForCompShipPlacement

 describe("findGridForCompShipPlacement", () => {
    it("should keep running until it has placed all ships", () => {
        //we just want to make sure it'll keep trying to place a ship, the actual placement will be tested in selectGridForShip
        var counter = 1
        var mockFunc = jest.fn(()=>{
            if (counter === 5){
                return true
            }else{
                counter += 1
                return false 
            }
            
        })
        findGridForCompShipPlacement({selectGridForShip: mockFunc})
        expect(mockFunc).toHaveBeenCalledTimes(5)
    })
 }) 