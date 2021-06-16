import {generatePublications} from './data.js';
import {createCard} from './card.js';

const PUBLICATIONS_COUNT = 10;
const publications = generatePublications(PUBLICATIONS_COUNT);

const cards = publications.map((publication) => createCard(publication));

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.append(cards[0]);