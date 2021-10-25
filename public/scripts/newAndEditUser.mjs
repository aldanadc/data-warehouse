const password = document.getElementById("password");
const passwordRepeat = document.getElementById("password-repeat");
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
  if (password.value != passwordRepeat.value) {
    password.classList.add("is-invalid");
    passwordRepeat.classList.add("is-invalid");
    form.classList.remove("was-validated")
    event.preventDefault();
    event.stopPropagation();
    alert("Los campos de contraseña deben coincidir")
  }
})

