const navButton = document.getElementById("nav-button");
navButton.setAttribute("aria-expanded", "false");
navButton.setAttribute("aria-controls", "main-nav");

navButton.addEventListener("click", () => {
  if (navButton.getAttribute("aria-expanded") === "false") {
    navButton.setAttribute("aria-expanded", "true");
  } else {
    navButton.setAttribute("aria-expanded", "false");
  }
});

const navLinks = document.querySelectorAll("nav[aria-label='Main'] .list li a");

navLinks.forEach((navlink) => {
  navlink.addEventListener("click", tagCurrentNavlink);
});

function tagCurrentNavlink(e) {
  navLinks.forEach((navlink) => {
    if (navlink.getAttribute("aria-current")) {
      navlink.removeAttribute("aria-current");
    }
  });
  e.target.setAttribute("aria-current", "page");
}

/* Code for disclosure widget by Sara Soueidan: https://codepen.io/SaraSoueidan/pen/zYLWPbg */

const containers = document.querySelectorAll(".disclosure-widget");

// Function to create a trigger element
function createTrigger(text, icon) {
  const trigger = document.createElement("button");
  trigger.classList.add("trigger");
  trigger.innerHTML = `<span class="trigger__text">${text}</span>${icon}`;
  return trigger;
}

// Function to toggle panel visibility
// since we don't want to rely on our CSS running, we show/hide the panel using the hidden attribute
function togglePanelVisibility(trigger, panel) {
  if (trigger.getAttribute("aria-expanded") === "true") {
    trigger.setAttribute("aria-expanded", "false");
    panel.setAttribute("hidden", "until-found");
  } else {
    trigger.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
  }
}

// prepend the toggle to the disclosure widget container
containers.forEach((container) => {
  const heading = container.lastElementChild.firstElementChild;
  const text = heading.innerText;
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="trigger__icon trigger__icon--open" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 5l0 14" />
  <path d="M5 12l14 0" />
</svg><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="trigger__icon trigger__icon--close" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 12l14 0" />
</svg>`;

  // create the trigger
  const trigger = createTrigger(text, icon);
  heading.remove();
  container.prepend(trigger);

  // give the panel an ID
  const id = `panel--` + Math.random();
  const panel = container.lastElementChild;
  panel.setAttribute("id", id);
  // add the aria-controls attribute referencing that ID
  trigger.setAttribute("aria-controls", id);

  // collapse the panel, and set aria-attribute to false to reflect its state
  panel.setAttribute("hidden", "until-found");
  trigger.setAttribute("aria-expanded", "false");

  // handle expanding/collapsing of the panel
  trigger.addEventListener("click", () =>
    togglePanelVisibility(trigger, panel)
  );
});
