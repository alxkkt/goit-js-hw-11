import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { createListMarkup } from './js/createListMarkup';
import { createCardMarkup } from './js/createCardMarkup';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  let searchQuery = e.target.value.trim();

  if (!searchQuery) {
    updateMarkup();
    return;
  }

  fetchCountries(searchQuery)
    .then(data => {
      const elementsQuantity = data.length;

      if (elementsQuantity > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
        return;
      } else if (10 > elementsQuantity && elementsQuantity > 1) {
        const markup = createListMarkup(data);

        updateMarkup(markup);
      } else {
        const markup = createCardMarkup(data);

        updateMarkup(markup);
      }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function updateMarkup(markup = '') {
  countryList.innerHTML = markup;
}
