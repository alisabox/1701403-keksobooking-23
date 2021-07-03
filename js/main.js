import './map.js';
import './form-validation.js';
import {setMapPoints} from './map.js';
import {getData} from './fetch.js';
import {showAlert} from './alert.js';
import {setUserFormSubmit} from './form-validation.js';

getData(setMapPoints, showAlert);
setUserFormSubmit();
