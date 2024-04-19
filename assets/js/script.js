const navLinks = document.querySelectorAll(
  "nav[aria-label='Main navigation'] .list li a"
);

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
  trigger.innerHTML = `<span>${text}</span>${icon}`;
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
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>`;

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
