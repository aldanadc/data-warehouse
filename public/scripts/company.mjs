// const deleteButtons = document.querySelectorAll(".delete-company");
// const cardDiv = document.querySelector(".card");

// deleteButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     const lala = document.createElement("div");
//     lala.innerHTML = warning;
//     cardDiv.appendChild(lala)
//   })
// })




const warning = `
  <article class="message is-danger">
  <div class="message-header">
    <p>¡Atención!</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">
    Al borrar una compañía, se borrarán también <strong>todos</strong> los contactos actualmente asociados a ella.
  </div>

  <button class="button is-danger">Continuar y borrar</button>
  
  </article>
`

const deleteCompanyBtn = document.querySelectorAll(".delete-company");

deleteCompanyBtn.forEach(button => {
  button.addEventListener("click", () => {
    if (window.confirm("Al borrar una compañía, se borrarán también todos los contactos actualmente asociados a ella. ¿Confirma que desea eliminar esta compañía?")) {
      button.parentElement.submit();
    }
  })
});

//HIDE ICON WHEN SORTING COLUMNS
const sortIcons = document.querySelectorAll(".sort-icon");

sortIcons.forEach(icon => {
  const columnHeader = icon.parentElement;
  columnHeader.addEventListener("click", () => {
    icon.style.display = "none";
  })
});
