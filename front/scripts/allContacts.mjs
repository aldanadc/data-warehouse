const checkboxes = document.querySelectorAll(".contact-checkbox");
const deleteBtn = document.getElementById("delete-contacts-btn");
const selectAll = document.getElementById("main-selector");
const contactsCount = document.querySelector(".contactsQ");
let selectedBoxes = [];
let contactsSelected = 0;

selectAll.addEventListener("click", () => {
  if (selectAll.checked) {
    selectedBoxes = [];
    selectAll.removeAttribute("checked");
    selectAll.setAttribute("checked", "checked");
    selectAll.checked = true;

    checkboxes.forEach(box => {
      box.removeAttribute("checked");
      box.setAttribute("checked", "checked");
      box.checked = true;
      selectedBoxes.push(box.value);
    })

    if (deleteBtn.classList.contains("hidden")) {
      deleteBtn.classList.remove("hidden")
    }

    if (contactsCount.classList.contains("hidden")) {
      contactsCount.classList.remove("hidden")
    }

    contactsSelected = selectedBoxes.length;
    contactsCount.innerHTML = `${contactsSelected} seleccionados`;

  }else {
    selectAll.removeAttribute("checked");
    selectAll.checked = false;

    checkboxes.forEach(box => {
      box.removeAttribute("checked");
      box.checked = false;
    })

    selectedBoxes = [];
    contactsSelected = 0;
    deleteBtn.classList.add("hidden");

    if (!(contactsCount.classList.contains("hidden"))) {
      contactsCount.classList.add("hidden")
    } 

  }
})


const contactsForm = document.querySelector(".deleteForm");

checkboxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.checked) {
      box.removeAttribute("checked");
      box.setAttribute("checked", "checked");

      if (deleteBtn.classList.contains("hidden")) {
        deleteBtn.classList.remove("hidden");
      }

      if (selectedBoxes.indexOf(box.value) === -1) {
        selectedBoxes.push(box.value);
        contactsSelected += 1;
      }

      contactsCount.classList.remove("hidden");
      contactsCount.innerHTML = `${contactsSelected} seleccionados`;

    }else {
      box.removeAttribute("checked");
      const boxIndex = selectedBoxes.indexOf(box.value);
      selectedBoxes.splice(boxIndex, 1);
      contactsSelected -= 1;
      contactsCount.innerHTML = `${contactsSelected} seleccionados`;

      if (selectedBoxes.length === 0 ) {
        deleteBtn.classList.add("hidden");
        contactsCount.classList.add("hidden");
        selectAll.removeAttribute("checked", "checked");
        contactsForm.innerHTML = "";
      }
    }
  })
})


//BORRAR SELECCIONADOS CON CLICK EN BOTÓN

deleteBtn.addEventListener("click", () => {

  const checkedBoxes = document.querySelectorAll(".contact-checkbox:checked");

  checkedBoxes.forEach(contact => {
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", "deleteContact[]");
    newInput.setAttribute("value", contact.value);
    contactsForm.appendChild(newInput)
  })

  const inputsArray = Array.from(contactsForm.children)

  contactsForm.submit();
})


//SHOW INFO ON CLICK ON TAGS

const tags = document.querySelectorAll(".tag-channel");

tags.forEach(tag => {
  const emptyString = "";
  const innerText = emptyString.concat(tag.innerHTML);

  tag.addEventListener("click", () => {
    if (tag.classList.contains("tag-channel")) {
      tag.innerHTML = tag.nextElementSibling.innerHTML;
      tag.classList.remove("tag-channel")
    }else {
      tag.innerHTML = innerText;
      tag.classList.add("tag-channel")
    }
  });
})


const deleteContact = document.querySelectorAll(".delete-contact");

deleteContact.forEach(button => {
  button.addEventListener("click", () => {
    if (window.confirm("¿Confirma que desea eliminar este contacto?")) {
      button.parentElement.submit();
    }
  })
})


checkboxes.forEach(checkbox => {
  const td = checkbox.parentElement;
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      td.parentElement.classList.add("selected");
    }else {
      td.parentElement.classList.remove("selected");
    }
  })
})