import './css/styles.css';
import Notiflix from 'notiflix';

import { createCardMarkup } from './js/createCardMarkup';
import { PicsApiSet } from './js/fetchQuery';
import { refs } from './js/refs';

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const picsApiSet = new PicsApiSet();

function onSearch(e) {
  e.preventDefault();

  cleanMarkup();
  picsApiSet.query = e.currentTarget.elements.searchQuery.value;
  picsApiSet.resetPage();
  picsApiSet.fetchQuery().then(data => {
    if (!data.length) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(data));
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  picsApiSet
    .fetchQuery()
    .then(data => refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(data)));
}
function cleanMarkup() {
  refs.gallery.innerHTML = '';
}
