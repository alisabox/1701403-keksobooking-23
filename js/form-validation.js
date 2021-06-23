const MAX_ROOMS = 100;
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 2000,
  house: 3000,
  palace: 5000,
};

const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const typeOfLodging = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const guestsOptions = guests.querySelectorAll('option');

const checkTypeOfLoging = () => {
  price.min = minPrice[typeOfLodging.value];
  price.placeholder = minPrice[typeOfLodging.value];
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

typeOfLodging.addEventListener('input', checkTypeOfLoging);

rooms.addEventListener('input', () => {
  getGuestsOptions();
  checkGuestsValidity();
});
