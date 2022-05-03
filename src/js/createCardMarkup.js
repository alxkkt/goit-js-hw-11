export function createCardMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href="${largeImageURL}" class="gallery__item">
                <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" width="300" height="180" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${downloads}</b>
              </p>
            </div>
          </div>
          </a>`,
    )
    .join('');
}
