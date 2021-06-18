const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset, select');

const setInactiveState = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => fieldset.disabled = true);
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersFieldset.forEach((fieldset) => fieldset.disabled = true);
};

const setActiveState = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => fieldset.disabled = false);
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersFieldset.forEach((fieldset) => fieldset.disabled = false);
  mapFiltersFieldset.disabled = false;
};

export {setInactiveState, setActiveState};
