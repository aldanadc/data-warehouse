const regionSelect = document.getElementById("region");
const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");
const countriesData = JSON.parse(countriesJson);
const citiesData = JSON.parse(citiesJson);

function selectRegion() {
  countrySelect.innerHTML = "<option disabled selected>--Seleccione un país--</option>"
  citySelect.innerHTML = "<option disabled selected>--Seleccione una ciudad--</option>"
  const selectedRegion = region.options[region.selectedIndex].value;
  for (let country of countriesData) {
    if (selectedRegion === country.region_id) {
      const option = document.createElement("option");
      option.innerHTML = country.name;
      option.value = country._id;
      countrySelect.appendChild(option);
    }        
  }      
}

function selectCountry() {
  citySelect.innerHTML = "<option disabled selected>--Seleccione una ciudad--</option>"
  const selectedCountry = country.options[country.selectedIndex].value;
  for (let city of citiesData) {
    if (selectedCountry === city.country_id) {
      const option = document.createElement("option");
      option.innerHTML = city.name;
      option.value = city._id;
      citySelect.appendChild(option);
    }        
  }    
}

region.addEventListener("change", selectRegion);
country.addEventListener("change", selectCountry);



// ADD CONTACT METHOD ON CLICK

const container = document.getElementById("channels-container");
const add = document.getElementById("add");
let i = 2;

add.addEventListener("click", () => {
  let template = `
      <label for="contact_methods">Método de contacto</label>
      <span class="control">
        <select id="contact_methods" name="contact_methods[${i}][channel]">
          <option disabled selected>--Seleccione una opción--</option>
          <option value="phone">Teléfono</option>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </span>
      <div class="field p-2">
        <label for="account">Cuenta de usuario</label>
        <span class="control">
          <input type="text" id="account" name="contact_methods[${i}][account]">
        </span>
      </div>
      <label for="preference">Preferencias</label>
      <span class="control">
        <select id="preference" name="contact_methods[${i}][preference]">
          <option disabled selected>--Seleccione una opción--</option>
          <option value="no preference">Sin preferencia</option>
          <option value="favourite">Canal favorito</option>
          <option value="do not disturb">No molestar</option>
        </select>
      </span>
      `

  const newChannel = document.createElement("div");
  newChannel.setAttribute("class", "field p-2");
  newChannel.setAttribute("id", "channel");
  newChannel.innerHTML = template;
  container.appendChild(newChannel);

  i++
});

