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

const PUBLICATIONS_COUNT = 10;
const AVATARS_COUNT = 11;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 100;
const MIN_GUESTS = 1;
const MAX_GUESTS = 100;
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LANGITUDE = 139.70000;
const MAX_LANGITUDE = 139.80000;
const DECIMALS = 5;

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TITLES = [
  'Минималистичная квартирка в центре Токио',
  'Уютная комната в европейском стиле',
  'Большие аппартаменты для больших людей',
  'Маленький домик для любителей компактности',
  'Большой дом в зеленой зоне',
  'Шикарный особняк рядом с резиденцией императора',
  'Комната в бизнес-отеле',
  'Комната в лав-отеле',
];

const DESCRIPTION = [
  'Лучшее место в Токио',
  'Самая доступная по цене квартира в Токио',
  'Рядом со станцией Синдзюку',
  'Рядом много комбини',
  'Вокруг столько деревьев, словно в центре Аокигахара',
  'Галерея с прямым доступом к дворцу императора',
  'Быстрый интернет, услуги прачечной и завтрак включены в стоимость',
  'Толстые стрены и полная приватность',
];

const avatars = [];
for (let _i = 1; _i < AVATARS_COUNT + 1; _i++) {
  (String(_i).length > 1) ? avatars.push(`${  _i}`) : avatars.push(`0${  _i}`);
}

const shuffledAvatars = avatars.slice();
for (let _i = 0; _i < avatars.length; _i++) {
  const _j = randomNumber(_i, avatars.length - 1);
  [shuffledAvatars[_i], shuffledAvatars[_j]] = [shuffledAvatars[_j], shuffledAvatars[_i]];
}

let avatarIndex = 0;

const getAuthor = () => {
  const author = {
    avatar: `img/avatars/user${  shuffledAvatars[avatarIndex]  }.png`,
  };
  avatarIndex++;
  return author;
};

const getLocation = () => {
  const location = {
    lat: parseFloat(randomCoordinate(MIN_LATITUDE, MAX_LATITUDE, DECIMALS)),
    lng: parseFloat(randomCoordinate(MIN_LANGITUDE, MAX_LANGITUDE, DECIMALS)),
  };
  return location;
};

const getRandomArray = (array) => {
  const randomArrayLength = randomNumber(0, array.length - 1);
  if (randomArrayLength === 0) {
    return [];
  }
  const shuffledArray = array.slice();
  for (let _i = 0; _i < array.length; _i++) {
    const _j = randomNumber(_i, array.length - 1);
    [shuffledArray[_i], shuffledArray[_j]] = [shuffledArray[_j], shuffledArray[_i]];
  }
  return shuffledArray.slice(0, randomArrayLength);
};

const getRandomArrayElement = (elements) => elements[randomNumber(0, elements.length - 1)];

const getOffer = () => {
  const offer = {
    title: getRandomArrayElement(TITLES),
    address: `${getLocation()['lat']  }, ${  getLocation()['lng']}`,
    price: randomNumber(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: randomNumber(MIN_ROOMS, MAX_ROOMS),
    guests: randomNumber(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECK_IN_OUT),
    checkout: getRandomArrayElement(CHECK_IN_OUT),
    features: getRandomArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTION),
    photos: getRandomArray(PHOTOS),
  };
  return offer;
};

const getPublication = () => {
  const publication = {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
  };
  return publication;
};

const publications = new Array(PUBLICATIONS_COUNT).fill(null).map(() => getPublication());

publications;
