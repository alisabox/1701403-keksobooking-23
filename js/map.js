import {createCard} from './card.js';
import {setInactiveState, setActiveState} from './form-state.js';

setInactiveState();

const address = document.querySelector('#address');

const MAP_ZOOM = 13;
const DECIMALS = 5;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const centerOfTokyo = {
  lat: 35.68272,
  lng: 139.75871,
};
const mainPinSize = {
  width: 52,
  height: 52,
};
const pointPinSize = {
  width: 40,
  height: 40,
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
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [mainPinSize.width, mainPinSize.height],
  iconAnchor: [mainPinSize.width/2, mainPinSize.height],
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

const getAddress = (lat, lng) => address.value = `${ lat.toFixed(DECIMALS) }, ${ lng.toFixed(DECIMALS) }`;
getAddress(centerOfTokyo.lat, centerOfTokyo.lng);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  getAddress(lat, lng);
});

const setInitialAddress = () => {
  const { lat, lng } = centerOfTokyo;
  mainPinMarker.setLatLng({
    lat,
    lng,
  });
  map.setView({
    lat,
    lng,
  }, MAP_ZOOM);
  getAddress(lat, lng);
};

const setMapPoints = (publications) => {
  publications.forEach((point) => {
    const { location: { lat, lng } } = point;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [pointPinSize.width, pointPinSize.height],
      iconAnchor: [pointPinSize.width/2, pointPinSize.height],
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
};

export {setMapPoints, setInitialAddress};
