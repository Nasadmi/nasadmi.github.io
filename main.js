const button = document.querySelector("button#searchButton");

const countryName = document.querySelector("input#name");

const elementsToWrite = Object.freeze({
  name_country: document.querySelector("span#name-country-info"),
  capital_country: document.querySelector("span#capitals-country-info"),
  continent_country: document.querySelector("span#continent-country-info"),
  currencies_country: document.querySelector("span#currencies-country-info"),
  map_country: document.querySelector("span#map-country-info"),
  openstreetmap_country: document.querySelector(
    "span#openstreetmap-country-info"
  ),
  flag_country: document.querySelector("img#flag-country-info"),
});

const API = "https://restcountries.com/v3.1/name";

const getDataRequest = async (name) => {
  try {
    const res = await fetch(`${API}/${name}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data[0];
  } catch (error) {
    return null;
  }
};

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await getDataRequest(countryName.value.toLowerCase());
  if (data === null) {
    return;
  }

  elementsToWrite.name_country.innerText = `${data.name.common} (${data.name.official}).`;

  if (data.capital.length > 1) {
    elementsToWrite.capital_country.innerText = `${data.capital.join(", ")}.`;
  } else {
    elementsToWrite.capital_country.innerText = `${data.capital}.`;
  }

  if (data.continents.length > 1) {
    elementsToWrite.continent_country.innerText = `${data.continents.join(
      ", "
    )}.`;
  } else {
    elementsToWrite.continent_country.innerText = `${data.continents}.`;
  }

  let currencies = Object.values(Object.values(data.currencies))[0];

  elementsToWrite.currencies_country.innerText = `${currencies.name} (${currencies.symbol}).`;

  elementsToWrite.map_country.innerHTML = `<a href="${
    data.maps.googleMaps
  }" target="_blank">${
    countryName.value.charAt(0).toUpperCase() + countryName.value.slice(1)
  }</a>`;

  elementsToWrite.openstreetmap_country.innerHTML = `<a href="${
    data.maps.openStreetMaps
  }" target="_blank">${
    countryName.value.charAt(0).toUpperCase() + countryName.value.slice(1)
  } (Open Street Map)</a>`;

  elementsToWrite.flag_country.src = `${data.flags.png}`;
});
