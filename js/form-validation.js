import {request} from './fetch.js';
import {createSuccessMessage, createErrorMessage} from './alert.js';
import {setInitialAddress} from './map.js';
import {removeAvatar, removeHousingPreview} from './preview.js';

const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const form = document.querySelector('.ad-form');
const price = form.querySelector('#price');
const typeOfLodging = form.querySelector('#type');
const rooms = form.querySelector('#room_number');
const guests = document.querySelector('#capacity');
const guestsOptions = guests.querySelectorAll('option');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const resetButton = document.querySelector('.ad-form__reset');

const checkTypeOfLoging = () => {
  price.min = MinPrice[typeOfLodging.value.toUpperCase()];
  price.placeholder = MinPrice[typeOfLodging.value.toUpperCase()];
};

const validateRooms = () => {
  const roomValue = rooms.value;
  guestsOptions.forEach((guest) => {
    const isDisabled = (NumberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

const onRoomNumberChange = () => {
  validateRooms();
};

const setFormInitialState = () => {
  form.reset();
  setInitialAddress();
  checkTypeOfLoging();
  removeAvatar();
  removeHousingPreview();
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    request(
      () => {
        setFormInitialState();
        createSuccessMessage();
      },
      () => createErrorMessage(),
      'POST',
      new FormData(evt.target),
    );
  });
};

validateRooms();

typeOfLodging.addEventListener('change', checkTypeOfLoging);

rooms.addEventListener('change', onRoomNumberChange);

checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormInitialState();
});

export {setUserFormSubmit};
