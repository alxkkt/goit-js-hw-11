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
  if (!e.target.value) return;

  fetchCountries(e.target.value)
    .then(r => r.json())
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length < 10 && data.length > 1) {
        cleanMarkup();
        countryList.insertAdjacentHTML('beforeend', createListMarkup(data));
      } else {
        cleanMarkup();
        countryList.insertAdjacentHTML('afterbegin', createCardMarkup(data));
      }

      console.log(data);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function cleanMarkup() {
  countryList.innerHTML = '';
}
