const email = document.querySelector("#icon--email");
const instagram = document.querySelector("#icon--instagram");
const linkedin = document.querySelector("#icon--linkedin");

email.addEventListener("click", () => {
  window.location.href = "mailto:hello@felix.de";
});
instagram.addEventListener("click", () => {
  window.open("https://www.instagram.com/femei93/?hl=de");
});
linkedin.addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/felixmeischter/");
});
