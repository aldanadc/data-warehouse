const rows = document.querySelectorAll(".table-row");

rows.forEach(row => {
  row.addEventListener("mouseenter", () => {
    row.classList.add("hover");
  })
})

rows.forEach(row => {
  row.addEventListener("mouseleave", () => {
    row.classList.remove("hover");
  })
})

//HIDE ICON WHEN SORTING COLUMNS

const sortIcons = document.querySelectorAll(".sort-icon");

sortIcons.forEach(icon => {
  const columnHeader = icon.parentElement;
  columnHeader.addEventListener("click", () => {
    icon.classList.add("hidden");
  })
});
