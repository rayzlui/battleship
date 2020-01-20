import { shipObject } from '../classes/shipObject';

export const SHIP_OPTIONS = [
  'battleship',
  'cruiser',
  'carrier',
  'destroyer',
  'submarine',
];
export const IMAGE_URLS = {
  battleship:
    'https://i0.wp.com/bestofthesouthbay.com/wp-content/uploads/2018/05/Battleship-IOWA-3.jpg?fit=1000%2C565&ssl=1',
  cruiser: 'http://www.military-today.com/navy/ticonderoga_class_cruiser.jpg',
  carrier: 'https://s1.1zoom.me/big0/504/Ships_Aircraft_carrier_USS_Ronald_Reagan_(CVN_76)_520551_1280x854.jpg',
  destroyer:
    'https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8xNzQ5MjUzMC9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTU4NTA5NTQ5N30.NtufxACnX8pnT1FS5S7hljDqfTTkgLF27X226CANZKE/img.jpg?width=980',
  submarine: 'https://image.businessinsider.com/5ad514fd146e71a4488b47a3?width=1100&format=jpeg&auto=webp',
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
