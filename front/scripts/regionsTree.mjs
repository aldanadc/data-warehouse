const deleteCountryBtn = document.querySelectorAll(".delete-country");

deleteCountryBtn.forEach(button => {
  button.addEventListener("click", () => {
    if (window.confirm("Al borrar un país, se borrarán también todos las ciudades pertenecientes a él. ¿Confirma que desea eliminar este país?")) {
      button.parentElement.submit();
    }
  })
});

const deleteRegionBtn = document.querySelectorAll(".delete-region");

deleteRegionBtn.forEach(button => {
  button.addEventListener("click", () => {
    if (window.confirm("Al borrar una región, se borrarán también todos los países pertenecientes a ella. ¿Confirma que desea eliminar esta región?")) {
      button.parentElement.submit();
    }
  })
});