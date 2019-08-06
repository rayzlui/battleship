export function shipObject(options) {
  const { name, length, image } = options;
  return {
    name: name,
    length: length,
    shiphits: 0,
    sunk: false,
    image: image
  };
}
