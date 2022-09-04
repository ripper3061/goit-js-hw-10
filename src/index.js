import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryCard = document.querySelector('.country-info');
const input = document.querySelector('#search-box');
let countryName;

input.addEventListener('input', debounce(onSearch, 300));

function onSearch(e) {
  fetchCountries(e.target.value)
    ?.then(renderCard)
    .catch(() => {
      if (e.target.value == '') return;
      Notify.failure('Oops, there is no country with that name.');
    });

  if (e.target.value === '') countryCard.innerHTML = '';
}

function renderCard(countrys) {
  let cardMarkup;
  if (!countrys) return;
  if (countrys?.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countrys?.length >= 2 && countrys?.length <= 10) {
    cardMarkup = countrys
      ?.map(country => {
        return `<div class="short-card">
    <div class="country-name">
        <div class="image"><img src="${country.flags.svg}" width="30" heigth="30" alt="Flag of ${country.name.official}"></div>
        <p class="country-name-text"> ${country.name.official}</p>
    </div>`;
      })
      .join('');

    return (countryCard.innerHTML = cardMarkup);
  }
  cardMarkup = countrys
    ?.map(country => {
      return `<div class="card">
     <div class="image"><img src="${
       country.flags.svg
     }" width="30" heigth="30" alt="Flag of ${country.name.official}"></div>
        <p class="country-name-text">${country.name.official}</p>
    </div>
    <div class="card-info">
        <div class="card-body">
            <p class="card-text"><span class="title">Capital: </span>${
              country.capital
            }</p>
            <p class="card-text"><span class="title">Population: </span>${
              country.population
            }</p>
            <p class="card-text"><span class="title">Languages:</span>${Object.values(
              country.languages
            ).map(
              language => `<span class="list-group-item"> ${language}</span>`
            )}</p>
          
        </div>
    </div>
          </div>`;
    })
    .join('');

  countryCard.innerHTML = cardMarkup;
}
