const menuButton = document.querySelector("#menuButton");

function toggleButton() {
  if (menuButton.getAttribute("aria-expanded") === "false") {
    menuButton.setAttribute("aria-expanded", "true");
  } else {
    menuButton.setAttribute("aria-expanded", "false");
  }
}

menuButton.addEventListener("click", toggleButton);
