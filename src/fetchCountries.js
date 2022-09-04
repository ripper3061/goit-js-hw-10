export function fetchCountries(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName.trim()}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
