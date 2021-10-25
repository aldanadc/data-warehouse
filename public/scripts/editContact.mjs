const regionSelect = document.getElementById("region");
const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");
const countriesData = JSON.parse(countriesJson);
const citiesData = JSON.parse(citiesJson);


(function loadPreviousInfo() {
  const selectedRegion = region.options[region.selectedIndex].value;
  const selectedCountry = country.options[country.selectedIndex].value;
  const selectedCity= city.options[city.selectedIndex].value;
  for (let country of countriesData) {
    if (selectedRegion === country.region_id && selectedCountry != country._id) {
      const option = document.createElement("option");
      option.innerHTML = country.name;
      option.value = country._id;
      countrySelect.appendChild(option);
    }        
  }
  for (let city of citiesData) {
    if (selectedCountry === city.country_id && selectedCity != city._id) {
      const option = document.createElement("option");
      option.innerHTML = city.name;
      option.value = city._id;
      citySelect.appendChild(option);
    }        
  }
})();


//LOAD METHODS INFO

const channels = ["phone", "email", "whatsapp", "linkedin"];
const methodsSelect = document.querySelectorAll("#contact_methods");

for (let select of methodsSelect) {
  const selectedChannel = select.options[select.selectedIndex].value;
  for (let channel of channels) {
    if (selectedChannel != channel) {
      const option = document.createElement("option");
      option.innerHTML = channel;
      option.value = channel;
      select.appendChild(option);
    }        
  }
}


const preferences = ["no preference","favourite", "do not disturb"];
const preferenceSelects = document.querySelectorAll("#preference");

for (let select of preferenceSelects) {
  const selectedPreference = select.options[select.selectedIndex].value;
  for (let preference of preferences) {
    if (selectedPreference != preference) {
      const option = document.createElement("option");
      option.innerHTML = preference;
      option.value = preference;
      select.appendChild(option)
    }        
  }
}

const deteleChannel = document.querySelectorAll("#delete-channel");

deteleChannel.forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.remove();
  })
})

