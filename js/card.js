const card = document.querySelector('#card').content.querySelector('.popup');

const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
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
  type.textContent = types[offer.type];
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

  const featuresList = offer.features.map((feature) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    return newFeature;
  });
  const features = cardTemplate.querySelector('.popup__features');
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }
  featuresList.map((feature) => features.appendChild(feature));
  if (featuresList.length === 0) {
    features.classList.add('hidden');
  }

  const description = cardTemplate.querySelector('.popup__description');
  description.textContent = offer.description;
  if (offer.description.length === 0) {
    description.classList.add('hidden');
  }

  const photosList = offer.photos.map((photo) => {
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
  photosList.map((photo) => photos.appendChild(photo));
  if (photosList.length === 0) {
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
