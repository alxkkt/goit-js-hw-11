export function createCardMarkup(country) {
  return country.map(({ name, flags, capital, population, languages }) => {
    return `<li class="js-single-card">
                <p class="card-title">
                <img src="${flags.svg}" width="30" height="30" alt="${name.common} national Flag">
                <span>${name.official}</span>
                </p>
                
                    <p><span class="card-item">Capital:</span> ${capital}</p>
                    <p><span class="card-item">Population:</span> ${population}</p>
                    <p><span class="card-item">Languages:</span> ${Object.values(languages)}</p>
            </li>`;
  });
}
