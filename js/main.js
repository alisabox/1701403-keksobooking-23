import './map.js';
import './form-validation.js';
import {onSuccess} from './map.js';
import {request} from './fetch.js';
import {showAlert} from './alert.js';
import {setUserFormSubmit} from './form-validation.js';

request(onSuccess, showAlert, 'GET');
setUserFormSubmit();
