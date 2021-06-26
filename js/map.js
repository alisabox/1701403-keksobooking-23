import {publications} from './data.js';
import {createCard} from './card.js';
import {setInactiveState, setActiveState} from './form-state.js';

setInactiveState();

const address = document.querySelector('#address');

const MAP_ZOOM = 12;
const DECIMALS = 5;

const centerOfTokyo = {
  lat: 35.68272,
  lng: 139.75871,
};
const mainPinSize = {
  x: 52,
  y: 52,
};
const pointPinSize = {
  x: 40,
  y: 40,
};

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: centerOfTokyo.lat,
    lng: centerOfTokyo.lng,
  }, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [mainPinSize.x, mainPinSize.y],
  iconAnchor: [mainPinSize.x/2, mainPinSize.y],
});

const mainPinMarker = L.marker(
  {
    lat: centerOfTokyo.lat,
    lng: centerOfTokyo.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${ lat.toFixed(DECIMALS) }, ${ lng.toFixed(DECIMALS) }`;
});

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: centerOfTokyo.lat,
    lng: centerOfTokyo.lng,
  });

  map.setView({
    lat: centerOfTokyo.lat,
    lng: centerOfTokyo.lng,
  }, MAP_ZOOM);
});

publications.forEach((point) => {
  const { location: { lat, lng } } = point;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [pointPinSize.x, pointPinSize.y],
    iconAnchor: [pointPinSize.x/2, pointPinSize.y],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createCard(point),
      {
        keepInView: true,
      });
});
