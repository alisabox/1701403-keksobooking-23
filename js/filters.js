const filters = Array.from(document.querySelector('.map__filters').children);
const PUBLICATIONS_COUNT = 10;
const DEFAULT_VALUE = 'any';

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

const FilterRules = {
  'housing-type': (data, filter) => filter.value === data.offer.type,
  'housing-price': (data, filter) => {
    const selectedPrice = PriceFilterValues[filter.value.toUpperCase()];
    return data.offer.price >= selectedPrice.MIN && data.offer.price < selectedPrice.MAX;
  },
  'housing-rooms': (data, filter) => filter.value === data.offer.rooms.toString(),
  'housing-guests': (data, filter) => filter.value === data.offer.guests.toString(),
  'housing-features': (data, filter) => {
    const checkedListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));
    return checkedListElements.every((checkbox) => data.offer.features && data.offer.features.some((feature) => feature === checkbox.value));
  },
};

const filterData = (data) => {
  const offers = [];
  let i = 0;
  let result;

  while (i < data.length && offers.length < PUBLICATIONS_COUNT) {
    result = filters.every((filter) => (filter.value === DEFAULT_VALUE) ? true : FilterRules[filter.id](data[i], filter));
    if (result) {
      offers.push(data[i]);
    }
    i++;
  }
  return offers;
};

export {filterData};
