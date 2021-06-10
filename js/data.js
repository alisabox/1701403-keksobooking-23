import {randomNumber, randomCoordinate, getRandomArray, getRandomArrayElement, shuffleArray} from './util.js';

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

const shuffledAvatars = shuffleArray(avatars);

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

const generatePublications = (count) => new Array(count).fill(null).map(() => getPublication());

export {generatePublications};
