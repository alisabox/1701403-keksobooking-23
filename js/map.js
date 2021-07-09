import {createCard} from './card.js';
import {setInactiveState, setActiveState} from './form-state.js';
import {filterData} from './filters.js';
import {debounce} from './debounce.js';

setInactiveState();

let fetchedData = [];

const address = document.querySelector('#address');
const filters = document.querySelector('.map__filters');

const MAP_ZOOM = 13;
const DECIMALS = 5;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const PUBLICATIONS_COUNT = 10;
const RERENDER_DELAY = 500;

const CenterOfTokyo = {
  LAT: 35.68272,
  LNG: 139.75871,
};
const MainPinSize = {
  WIDTH: 52,
  HEIGHT: 52,
};
const PointPinSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })
  .setView({
    lat: CenterOfTokyo.LAT,
    lng: CenterOfTokyo.LNG,
  }, MAP_ZOOM);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MainPinSize.WIDTH, MainPinSize.HEIGHT],
  iconAnchor: [MainPinSize.WIDTH/2, MainPinSize.HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: CenterOfTokyo.LAT,
    lng: CenterOfTokyo.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const getAddress = (lat, lng) => address.value = `${ lat.toFixed(DECIMALS) }, ${ lng.toFixed(DECIMALS) }`;
getAddress(CenterOfTokyo.LAT, CenterOfTokyo.LNG);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  getAddress(lat, lng);
});

const setInitialAddress = () => {
  const { LAT, LNG } = CenterOfTokyo;
  mainPinMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });
  map.setView({
    lat: LAT,
    lng: LNG,
  }, MAP_ZOOM);
  getAddress(LAT, LNG);
};

const markerGroup = L.layerGroup().addTo(map);

const setMapPoints = (publications) => {
  publications.slice(0, PUBLICATIONS_COUNT).forEach((point) => {
    const { location: { lat, lng } } = point;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PointPinSize.WIDTH, PointPinSize.HEIGHT],
      iconAnchor: [PointPinSize.WIDTH/2, PointPinSize.HEIGHT],
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
      .addTo(markerGroup)
      .bindPopup(createCard(point),
        {
          keepInView: true,
        });
  });
};

const onMapFilterChange = () => {
  markerGroup.clearLayers();
  setMapPoints(filterData(fetchedData));
};

const processChange = debounce(() => onMapFilterChange(), RERENDER_DELAY);

const onSuccess = (data) => {
  fetchedData = data.slice();
  setMapPoints(fetchedData);
  filters.addEventListener('change', processChange);
};

export {onSuccess, setInitialAddress};
