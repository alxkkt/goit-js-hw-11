import "./css/styles.css";
import debounce from "lodash.debounce";
import Notiflix from "notiflix";
import { fetchCountries } from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;

const input = document.getElementById("search-box");
const countryList = document.querySelector(".country-list");

input.addEventListener("input", debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  if (!e.target.value) return;

  fetchCountries(e.target.value)
    .then((r) => r.json())
    .then((data) => {
      if (data.length > 10) {
        Notiflix.Notify.warning(
          "Too many matches found. Please enter a more specific name."
        );
        return;
      } else if (data.length < 10 && data.length > 1) {
        cleanMarkup();
        countryList.insertAdjacentHTML("beforeend", createListMarkup(data));
      } else {
        cleanMarkup();
        countryList.insertAdjacentHTML("afterbegin", createCardMarkup(data));
      }

      console.log(data);
    })
    .catch(() => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}

function createListMarkup(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item">
      <img src="${flags.svg}" width="40" height="40" alt="">
      <p>${name.official}</p>
        </li>`;
    })
    .join("");
}

function createCardMarkup(country) {
  return country.map(({ name, flags, capital, population, languages }) => {
    return `<li class="js-single-card">
                <p class="card-title">
                <img src="${flags.svg}" width="30" height="30" alt="${
      name.common
    } national Flag">
                <span>${name.official}</span>
                </p>
                
                    <p><span class="card-item">Capital:</span> ${capital}</p>
                    <p><span class="card-item">Population:</span> ${population}</p>
                    <p><span class="card-item">Languages:</span> ${Object.values(
                      languages
                    )}</p>
            </li>`;
  });
}

function cleanMarkup() {
  countryList.innerHTML = "";
}
