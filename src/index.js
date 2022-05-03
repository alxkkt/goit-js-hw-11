import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createCardMarkup } from './js/createCardMarkup';
import { PicsServiceApi } from './js/fetchQuery';
import { refs } from './js/refs';

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const picsServiceApi = new PicsServiceApi();

function onSearch(e) {
  e.preventDefault();
  picsServiceApi.query = e.currentTarget.elements.searchQuery.value;

  cleanMarkup();
  picsServiceApi.resetPage();
  picsServiceApi.fetchQuery().then(({ hits, totalHits }) => {
    if (!hits.length) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(hits));
    refs.loadMoreBtn.classList.remove('visually-hidden');

    let lightbox = new SimpleLightbox('.gallery a');
    lightbox.on('show.simplelightbox');
  });
}

function onLoadMore() {
  picsServiceApi
    .fetchQuery()
    .then(data => refs.gallery.insertAdjacentHTML('beforeend', createCardMarkup(data.hits)));
}
function cleanMarkup() {
  refs.gallery.innerHTML = '';
}
