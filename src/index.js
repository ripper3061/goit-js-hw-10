import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const countryCard = document.querySelector('.country-info');

fetch(
  'https://restcountries.com/v3.1/name/peru?fields=name,capital,population,flags,languages'
)
  .then(res => {
    return res.json();
  })
  .then(country => {
    console.log(country);

    let cardMarkup = `<div class='card'>
                        <div class='country-name'>
                            <p class='country-name-text'>${name.official}</p>
                        </div>
                    </div>`;
    countryCard.innerHTML = cardMarkup;
  });
