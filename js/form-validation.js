const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 2000,
  house: 3000,
  palace: 5000,
};
const numberOfGuests = {
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

const checkTypeOfLoging = () => {
  price.min = minPrice[typeOfLodging.value];
  price.placeholder = minPrice[typeOfLodging.value];
};

const validateRooms = () => {
  const roomValue = rooms.value;
  guestsOptions.forEach((guest) => {
    const isDisabled = (numberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = numberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

typeOfLodging.addEventListener('change', checkTypeOfLoging);

rooms.addEventListener('change', onRoomNumberChange);

checkin.addEventListener('change', () => {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', () => {
  checkin.value = checkout.value;
});
