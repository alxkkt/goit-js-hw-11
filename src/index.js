import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createCardMarkup } from './js/createCardMarkup';
import { fetchQuery } from './js/fetchQuery';
import { refs } from './js/refs';

let gallery = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value;

  fetchQuery(searchQuery).then(data => {
    if (!data.length) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
    const markup = createCardMarkup(data);
    refs.gallery.innerHTML = markup;
  });
}
