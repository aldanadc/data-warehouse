const checkboxes = document.querySelectorAll(".contact-checkbox");
const deleteBtn = document.getElementById("delete-contacts-btn");
const selectAll = document.getElementById("main-selector");
const contactsCount = document.querySelector(".contactsQ");
let selectedBoxes = [];
let contactsSelected = 0;

selectAll.addEventListener("click", () => { //FUNCIONA OK PARA SELECCIONAR
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
      console.log(selectedBoxes);
    })

    if (deleteBtn.classList.contains("hidden")) {
      deleteBtn.classList.remove("hidden")
    }

    if (contactsCount.classList.contains("hidden")) {
      contactsCount.classList.remove("hidden")
    }

    contactsSelected = selectedBoxes.length;
    contactsCount.innerHTML = `${contactsSelected} seleccionados`;

    console.log(`Selected boxes: ${selectedBoxes}`);

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

    console.log(`Selected boxes: ${selectedBoxes}`);
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

      // const div = document.createElement("input");
      // div.setAttribute("type", "text");
      // div.setAttribute("name", "deleteContact[]");
      // div.setAttribute("value", box.value);
      // contactsForm.appendChild(div)

      contactsCount.classList.remove("hidden");
      contactsCount.innerHTML = `${contactsSelected} seleccionados`;

      console.log(selectedBoxes);
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
      console.log(selectedBoxes);
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
  console.log(inputsArray)
  console.log(contactsForm)

  contactsForm.submit();
})

// deleteBtn.addEventListener("click", async (request, response) => {
//   //console.log(selectedBoxes);
//   const ids = selectedBoxes;
//   console.log("ids")
//   console.log(ids)
//   console.log("ids")
//   //await deleteManyContacts(ids);
//   //response.redirect("/contacts");
// })

// function selectedBoxess() {
  
//   checkboxes.forEach(box => {
//     if (box.checked === true) {
//       console.log(box)
//     }
//   })
  
// }

//selectedBoxess();


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

// badges.forEach(badge => {
//   badge.addEventListener("click", () => {
//     if (badge.nextElementSibling.classList.contains("hidden")) {
//       badge.nextElementSibling.classList.remove("hidden")
//     }else {
//       badge.nextElementSibling.classList.add("hidden")
//     }
//   });
// })


// function showInfo(tag) {
//   const account = tag.nextElementSibling;
//   console.log(account)
//   account.style.display = "block";
//   //message.classList.add("notificacion");
//   //message.innerText = "hola este es el número";
//   //tag.parentElement.appendChild(message)
// }


//HIDE ICON WHEN SORTING COLUMNS
// const sortIcons = document.querySelectorAll(".sort-icon");

// sortIcons.forEach(icon => {
//   const columnHeader = icon.parentElement;
//   columnHeader.addEventListener("click", () => {
//     icon.style.display = "none";
//   })
// });

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
      console.log(td.parentElement)
      td.parentElement.classList.add("selected");
    }else {
      td.parentElement.classList.remove("selected");
      console.log(td.parentElement)
    }
  })
})