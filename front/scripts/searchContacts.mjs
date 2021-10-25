function searchContacts (inputValue) {

  async function newSearch(searchTerm) {
    const url = `http://localhost:8080/contacts/search/${searchTerm}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data
  }

  newSearch(inputValue)
  .then(results => {
    contactsSection.innerHTML = "";
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      const noResults = document.createElement("p");
      noResults.setAttribute("class", "no-results");
      noResults.classList.add("box");
      noResults.innerText = "Lo sentimos, no hubo resultados. Intenta con otra búsqueda.";
      resultsContainer.appendChild(noResults);
    } else {
      resultsTitle.classList.remove("hidden");
      const container = document.createElement("div");
      container.innerHTML = tableTemplate;
      resultsContainer.appendChild(container);
      results.forEach(contact => {
        const tableBody = document.querySelector("#results-table-body");
        const newRow = createTableRow(contact);
        tableBody.append(newRow);
      });
    }
  })
}


const searchIcon = document.getElementById("search-icon");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const resultsTitle = document.querySelector(".results-title");
const contactsSection = document.querySelector(".contacts-table");

const tableTemplate = `
<table class="table table-striped is-bordered js-sort-table" id="results-table">
  <thead class="has-background-info table-head">
    <th scope="col" class="table-header has-text-info-light">Contacto</th>
    <th scope="col" class="table-header has-text-info-light">País</th>
    <th scope="col" class="table-header has-text-info-light">Compañía</th>
    <th scope="col" class="table-header has-text-info-light">Cargo</th>
    <th scope="col" class="table-header has-text-info-light">Canal preferido</th>
    <th scope="col" class="table-header has-text-info-light">Acciones</th>
  </thead>
  <tbody id="results-table-body">
  </tbody>
</table>
  `

searchIcon.addEventListener("click", () => {
  searchContacts(searchInput.value);  
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchContacts(searchInput.value); 
  }
});

const searchTip = document.querySelector(".search-tip");

searchInput.addEventListener("focus", () => {
  searchTip.classList.remove("hidden");
})

searchInput.addEventListener("blur", () => {
  searchTip.classList.add("hidden");
})


function createTableRow(contact) {
  const row = document.createElement("tr");
  const channels = document.createElement("div");
  row.setAttribute("class", "table-row has-text-link");
  row.setAttribute("scope", "row");

  for (let method of contact.contact_methods) {
    if (method.preference === "favourite") {
      const channel = document.createElement("span");
      channel.setAttribute("class", "tag button is-static is-info tag-channel");
      const channelText = `${method.channel.charAt(0).toUpperCase()}${method.channel.slice(1)} `
      channel.innerText = channelText;
      channels.appendChild(channel);
    }
  }

  row.innerHTML = `
    <td>${contact.first_name.charAt(0).toUpperCase()}${contact.first_name.slice(1)} ${contact.last_name.charAt(0).toUpperCase()}${contact.last_name.slice(1)}</td>
    <td>${contact.cityInfo.countryInfo.name.charAt(0).toUpperCase()}${contact.cityInfo.countryInfo.name.slice(1)}</td>
    <td>${contact.companyInfo.name.charAt(0).toUpperCase()}${contact.companyInfo.name.slice(1)}</td>
    <td>${contact.role.charAt(0).toUpperCase()}${contact.role.slice(1)}</td>
    <td><span>${channels.innerHTML}</span></td>
    <td class="has-text-centered">
      <a href="/contacts/${contact._id}"><button class="button is-success is-outlined">Ver todo</button></a>
    </td>
    `
  return row
}

