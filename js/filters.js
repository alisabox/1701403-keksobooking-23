const filters = document.querySelector('.map__filters');
const housingFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const featuresFilter = filters.querySelectorAll('.map__checkbox');

const PriceFilterValues = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: 1000000,
  },
};

const getPublicationRank = (item) => {
  let rank = 0;
  const selectedPrice = PriceFilterValues[priceFilter.value.toUpperCase()];
  const selectedFeatures = [];
  featuresFilter.forEach((feature) => {
    if (feature.checked) {
      selectedFeatures.push(feature.value);
    }
  });
  if (item.offer.type === housingFilter.value) {
    rank++;
  }
  if (selectedPrice && item.offer.price >= selectedPrice.MIN && item.offer.price < selectedPrice.MAX) {
    rank++;
  }
  if (item.offer.rooms === parseFloat(roomsFilter.value)) {
    rank++;
  }
  if (item.offer.guests === parseFloat(guestsFilter.value)) {
    rank++;
  }
  if (item.offer.features) {
    const similarFeatures = item.offer.features.filter((value) => selectedFeatures.includes(value));
    if (similarFeatures) {
      rank += similarFeatures.length;
    }
  }
  return rank;
};

const comparePublications = (item1, item2) => {
  const rank1 = getPublicationRank(item1);
  const rank2 = getPublicationRank(item2);
  return rank2 - rank1;
};

const filterData = (data) => data.slice().sort(comparePublications);

export {filterData};
