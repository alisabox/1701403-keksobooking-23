const card = document.querySelector('#card').content.querySelector('.popup');

const Types = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

const createCard = ({ author, offer }) => {
  const cardTemplate = card.cloneNode(true);

  const title = cardTemplate.querySelector('.popup__title');
  title.textContent = offer.title;
  if (offer.title.length === 0) {
    title.classList.add('hidden');
  }

  const address = cardTemplate.querySelector('.popup__text--address');
  address.textContent = offer.address;
  if (offer.address.length === 0) {
    address.classList.add('hidden');
  }

  const price = cardTemplate.querySelector('.popup__text--price');
  price.textContent = `${offer.price} ₽/ночь`;
  if (offer.price.length === 0) {
    price.classList.add('hidden');
  }

  const type = cardTemplate.querySelector('.popup__type');
  type.textContent = Types[offer.type];
  if (offer.type.length === 0) {
    type.classList.add('hidden');
  }

  const capacity = cardTemplate.querySelector('.popup__text--capacity');
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  if (offer.rooms.length === 0 && offer.guests.length === 0) {
    return capacity.classList.add('hidden');
  }

  const time = cardTemplate.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.checkin.length === 0 && offer.checkout.length === 0) {
    return time.classList.add('hidden');
  }

  const features = cardTemplate.querySelector('.popup__features');
  [].forEach.call(features.children, (feature) => {
    if (offer.features && offer.features.indexOf(feature.classList[1].replace('popup__feature--', '')) === -1) {
      feature.remove();
    }
  });

  if (offer.features && offer.features.length === 0) {
    features.classList.add('hidden');
  }

  const description = cardTemplate.querySelector('.popup__description');
  description.textContent = offer.description;
  if (offer.description && offer.description.length === 0) {
    description.classList.add('hidden');
  }

  const photosList = offer.photos && offer.photos.map((photo) => {
    const newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.src = photo;
    newPhoto.width = '45';
    newPhoto.height = '40';
    newPhoto.alt = 'Фотография жилья';
    return newPhoto;
  });
  const photos = cardTemplate.querySelector('.popup__photos');
  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }
  photosList && photosList.map((photo) => photos.appendChild(photo));
  if (photosList && photosList.length === 0) {
    photos.classList.add('hidden');
  }

  const avatar = cardTemplate.querySelector('.popup__avatar');
  avatar.src = author.avatar;
  if (author.avatar.length === 0) {
    avatar.classList.add('hidden');
  }

  return cardTemplate;
};

export {createCard};
