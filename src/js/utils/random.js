/**
 * Returns an array of random values (from 0 to 5 items) in range from 1 to 100
 * @returns {Array}
 */
const generateRandomValues = () => {
  let values = [];
  const quantityOfValues = getRandomInt(0, 5);

  for (let i = 0; i < quantityOfValues; i++) {
    values.push(getRandomInt(1, 100));
  }

  const sum = values.reduce((a, b) => a + b, 0);

  if (sum > 100) {
    values = values.map(value => Math.floor((value / sum) * 100));
  }

  return values;
};

/**
 * Returns an array of two markers: one fixed on 50 and one in range from 1 to 100
 * @returns {Array}
 */
const generateRandomMarkers = () => {
  return [50, getRandomInt(1, 100)];
};

/**
 * Function returns a random number in specified range
 * @param min
 * @param max
 * @returns {*}
 */
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Function returns an object with random values and markers
 * @returns {{values: Array, markers: Array}}
 */
export const generateRandomData = () => {
  const result = {
    values: generateRandomValues(),
    markers: generateRandomMarkers()
  };

  return result;
};
