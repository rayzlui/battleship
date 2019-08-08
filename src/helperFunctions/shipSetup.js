import { shipObject } from '../classes/shipObject';

export const SHIP_OPTIONS = [
  'battleship',
  'cruiser',
  'carrier',
  'destroyer',
  'submarine',
];
export const IMAGE_URLS = {
  battleship: 'batt',
  cruiser: 'crui',
  carrier: 'carr',
  destroyer: 'des',
  submarine: 'sub',
};

const SHIPS = {
  battleship: {
    length: 4,
    image: IMAGE_URLS.battleship,
  },
  submarine: {
    length: 3,
    image: IMAGE_URLS.submarine,
  },
  destroyer: {
    length: 3,
    image: IMAGE_URLS.destroyer,
  },
  cruiser: {
    length: 2,
    image: IMAGE_URLS.cruiser,
  },
  carrier: {
    length: 5,
    image: IMAGE_URLS.carrier,
  },
};

export function createShip(ship) {
  let selectedShip = SHIPS[ship];
  let newship = shipObject({
    name: ship,
    length: selectedShip.length,
    image: selectedShip.image,
  });
  return newship;
}
