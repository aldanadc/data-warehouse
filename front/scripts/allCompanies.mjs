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
