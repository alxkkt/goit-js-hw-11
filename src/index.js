import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createCardMarkup } from './js/createCardMarkup';
import { PicsServiceApi } from './js/fetchQuery';
import { refs } from './js/refs';

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.classList.add('visually-hidden');

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
    refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(hits));
    refs.loadMoreBtn.classList.remove('visually-hidden');
    // let lightbox = new SimpleLightbox('.gallery a');
  });
}

function onLoadMore() {
  picsServiceApi.fetchQuery().then(({ hits }) => {
    if (hits.length < 40) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(hits));
    // let lightbox = new SimpleLightbox('.gallery a');
    // lightbox.refresh();
  });
}
function cleanMarkup() {
  refs.gallery.innerHTML = '';
}
