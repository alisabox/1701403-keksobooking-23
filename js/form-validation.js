const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
let MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 2000;
const HOUSE_MIN_PRICE = 3000;
const PALACE_MIN_PRICE = 5000;
const MAX_ROOMS = 100;

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const typeOfLodging = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const guestsOptions = guests.querySelectorAll('option');

const checkTitleValidity = () => {
  const valueLength = title.value.length;
  if (title.validity.valueMissing) {
    title.setCustomValidity('Обязательное поле');
  } else if (valueLength < TITLE_MIN_LENGTH) {
    title.setCustomValidity(`Минимальная длина - 30 символов. Введите еще ${  TITLE_MIN_LENGTH - valueLength } символов`);
  } else if (valueLength > TITLE_MAX_LENGTH) {
    title.setCustomValidity(`Максимальная длина - 100 символов. Удалите лишние ${  valueLength - TITLE_MAX_LENGTH } символов.`);
  } else {
    title.setCustomValidity('');
  }
};

const checkTypeOfLoging = () => {
  switch (typeOfLodging.value) {
    default:
    case 'bungalow':
      MIN_PRICE = BUNGALOW_MIN_PRICE;
      break;
    case 'flat':
      MIN_PRICE = FLAT_MIN_PRICE;
      break;
    case 'hotel':
      MIN_PRICE = HOTEL_MIN_PRICE;
      break;
    case 'house':
      MIN_PRICE = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      MIN_PRICE = PALACE_MIN_PRICE;
  }
  price.min = MIN_PRICE;
  price.placeholder = MIN_PRICE;
};

const checkPriceValidity = () => {
  checkTypeOfLoging();
  if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else if (price.value < MIN_PRICE) {
    price.setCustomValidity(`Минимальная цена за ночь для типа жилья ${typeOfLodging[typeOfLodging.selectedIndex].textContent} - ${MIN_PRICE} руб.`);
  } else if (price.value > MAX_PRICE) {
    price.setCustomValidity(`Максимальная цена за ночь - ${MAX_PRICE} руб.`);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
};

const checkGuestsValidity = () => {
  if (+guests.value > +rooms.value || (
    +guests.value === 0 && +rooms.value < MAX_ROOMS) || (
    +guests.value > 0 && +rooms.value === MAX_ROOMS)) {
    guests.setCustomValidity('Неподходящее количество мест для выбранного количества комнат');
  } else {
    guests.setCustomValidity('');
  }
  guests.reportValidity();
};

const getGuestsOptions = () => {
  if (rooms.value < MAX_ROOMS) {
    guestsOptions.forEach((option) => {
      if (+option.value <= +rooms.value && +option.value > 0) {
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  } else {
    guestsOptions.forEach((option) => {
      if (+option.value === 0) {
        option.hidden = false;
      } else {
        option.hidden = true;
      }
    });
  }
};


title.addEventListener('input', () => {
  checkTitleValidity();
  title.reportValidity();
});

price.addEventListener('input', checkPriceValidity);

typeOfLodging.addEventListener('input', checkTypeOfLoging);

rooms.addEventListener('input', () => {
  getGuestsOptions();
  checkGuestsValidity();
});
