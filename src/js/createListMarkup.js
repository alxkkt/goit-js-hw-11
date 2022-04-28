export function createListMarkup(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
      <img src="${flags.svg}" width="40" height="40" alt="">
      <p>${name.official}</p>
        </li>`;
    })
    .join('');
}
