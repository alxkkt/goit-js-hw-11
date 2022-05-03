import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createCardMarkup } from './js/createCardMarkup';
import { PicsServiceApi } from './js/fetchQuery';
import { refs } from './js/refs';

refs.form.addEventListener('submit', onSearch);
window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    onLoadMore();
  }
});

const picsServiceApi = new PicsServiceApi();

function onSearch(e) {
  e.preventDefault();
  picsServiceApi.query = e.currentTarget.elements.searchQuery.value;

  picsServiceApi.resetPage();
  picsServiceApi.fetchQuery().then(({ hits, totalHits }) => {
    if (!hits.length) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    cleanMarkup();
    refreshMarkup(hits);
  });
}

function onLoadMore() {
  picsServiceApi.fetchQuery().then(({ hits }) => {
    if (hits.length < 40) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    refreshMarkup(hits);
  });
}
function cleanMarkup() {
  refs.gallery.innerHTML = '';
}

function refreshMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(data));
  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}
