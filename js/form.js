const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelector('fieldset');

const setInactiveState = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => fieldset.disabled = true);
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersSelect.forEach((selectField) => selectField.disabled = true);
  mapFiltersFieldset.disabled = true;
};

const setActiveState = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => fieldset.disabled = false);
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersSelect.forEach((selectField) => selectField.disabled = false);
  mapFiltersFieldset.disabled = false;
};

export {setInactiveState, setActiveState};
