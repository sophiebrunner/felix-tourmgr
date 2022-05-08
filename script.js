const burger = document.querySelector("#burger-menu");
const navBar = document.querySelector("#nav-bar");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
  navBar.classList.toggle("show");
});

const navLink = document.querySelectorAll(".nav-bar__link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    navBar.classList.remove("show");
  })
);

const scrollUp = document.querySelector("#scroll-up");

scrollUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
