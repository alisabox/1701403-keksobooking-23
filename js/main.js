// Задание 1. Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Если min и max равны, возвращается это же число.

const randomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  return Math.round(Math.random() * (max - min) + min);
};

randomNumber();

// Задание 2. Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Если min и max равны, возвращается это же число.

const randomCoordinate = (min, max, decimals) => {
  if (min < 0 || max < 0) {
    return;
  } else if (min > max) {
    [min, max] = [max, min];
  }
  const result = Math.random() * (max - min) + min;
  return result.toFixed(decimals);
};

randomCoordinate();
