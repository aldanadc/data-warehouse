const bulb = document.querySelector(".idea");
const text = document.querySelector(".idea-text");

bulb.addEventListener("click", () => {
  text.classList.remove("hidden");
})

bulb.addEventListener("mouseout", () => {
  text.classList.add("hidden");
})
