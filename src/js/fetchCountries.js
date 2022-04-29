const ENTRY_POINT = 'https://restcountries.com/v3.1';

export function fetchCountries(countryName) {
  return fetch(
    `${ENTRY_POINT}/name/${countryName}?fields=name,capital,population,flags,languages`,
  ).then(r => {
    if (r.ok) {
      return r.json();
    } else {
      throw new Error(r.status);
    }
  });
}
