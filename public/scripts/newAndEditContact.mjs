const regionSelect = document.getElementById("region");
const countrySelect = document.getElementById("country");
const citySelect = document.getElementById("city");
const countriesData = JSON.parse(countriesJson);
const citiesData = JSON.parse(citiesJson);

function selectRegion() {
  countrySelect.innerHTML = "<option disabled selected>--Seleccione un país--</option>"
  citySelect.innerHTML = "<option disabled selected>--Seleccione una ciudad--</option>"
  const selectedRegion = region.options[region.selectedIndex].value;
  console.log(selectedRegion)
  for (let country of countriesData) {
    if (selectedRegion === country.region_id) {
      const option = document.createElement("option");
      option.innerHTML = country.name.charAt(0).toUpperCase()+country.name.slice(1);
      option.value = country._id;
      option.setAttribute("class", "has-text-info");
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
      option.innerHTML = city.name.charAt(0).toUpperCase()+city.name.slice(1);
      option.value = city._id;
      option.setAttribute("class", "has-text-info");
      citySelect.appendChild(option);
    }        
  }    
}

region.addEventListener("change", selectRegion);
country.addEventListener("change", selectCountry);


// ADD CONTACT METHOD ON CLICK

const container = document.getElementById("channels-container");
const add = document.getElementById("add");

add.addEventListener("click", () => {
  const channels = document.querySelectorAll("#channel");
  let i = 0;
  channels.forEach(channel => {
    i += 1;
    console.log(channel);
    console.log(i);
  })
  

  let template = `
    <div class="field p-2">
      <label class="form-label" for="contact_methods">Canal</label>
      <span>
        <select class="form-select" id="contact_methods" name="contact_methods[${i}][channel]" required>
          <option class="has-text-info" value="" disabled selected>--Seleccione una opción--</option>
          <option class="has-text-info" value="phone">Teléfono</option>
          <option class="has-text-info" value="email">Email</option>
          <option class="has-text-info" value="whatsapp">WhatsApp</option>
          <option class="has-text-info" value="linkedin">LinkedIn</option>
        </select>
        <div class="invalid-feedback">
          Por favor complete este campo
        </div>
        </span>
    </div>
    <div class="field p-2">
      <label class="form-label" for="account">Cuenta de usuario</label>
      <span>
        <input class="form-control" type="text" id="account" name="contact_methods[${i}][account]" placeholder="Ej: email@email.com" required>
        <div class="invalid-feedback">
          Por favor complete este campo
        </div>
        </span>
    </div>
    <div class="field p-2">
      <label class="form-label" for="preference">Preferencias</label>
      <span>
        <select class="form-select" id="preference" name="contact_methods[${i}][preference]" required>
          <option class="has-text-info" value="" disabled selected>--Seleccione una opción--</option>
          <option class="has-text-info" value="no preference">Sin preferencia</option>
          <option class="has-text-info" value="favourite">Canal favorito</option>
          <option class="has-text-info" value="do not disturb">No molestar</option>
        </select>
        <div class="invalid-feedback">
          Por favor complete este campo
        </div>
      </span>
    </div>
    <p id="delete-channel" class="has-text-danger mt-2 has-text-right is-clickable">Borrar canal</p>
    `

  const newChannel = document.createElement("div");
  newChannel.setAttribute("class", "field p-2");
  newChannel.setAttribute("id", "channel");
  newChannel.innerHTML = template;
  container.appendChild(newChannel);

  i++

  deleteContactChannel();
});


function deleteContactChannel() {
  const deteleChannel = document.querySelectorAll("#delete-channel");

  deteleChannel.forEach(button => {
    button.addEventListener("click", () => {
      button.parentElement.remove();
    })
  })
};

deleteContactChannel();
