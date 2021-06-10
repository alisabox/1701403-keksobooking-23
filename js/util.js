const randomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  return Math.round(Math.random() * (max - min) + min);
};

const randomCoordinate = (min, max, decimals) => {
  if (min < 0 || max < 0) {
    return;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  const result = Math.random() * (max - min) + min;
  return result.toFixed(decimals);
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let _i = 0; _i < array.length; _i++) {
    const _j = randomNumber(_i, array.length - 1);
    [shuffledArray[_i], shuffledArray[_j]] = [shuffledArray[_j], shuffledArray[_i]];
  }
  return shuffledArray;
};

const getRandomArray = (array) => {
  const randomArrayLength = randomNumber(0, array.length - 1);
  if (randomArrayLength === 0) {
    return [];
  }
  return shuffleArray(array).slice(0, randomArrayLength);
};

const getRandomArrayElement = (elements) => elements[randomNumber(0, elements.length - 1)];


export {randomNumber, randomCoordinate, shuffleArray, getRandomArray, getRandomArrayElement};
