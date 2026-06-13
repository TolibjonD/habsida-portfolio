document.addEventListener("DOMContentLoaded", () => {
  const navLink = document.querySelector("header nav");
  navLinks = document.querySelectorAll("header nav ul li a");
  const ctaButton = document.querySelector("header #cta-button");
  const navButton = document.getElementById("nav-button");

  const count = document.getElementById("count");
  let counter = 0;

  const characterField = document.getElementById("characterField");
  const characterCount = document.getElementById("characterCount");
  const MAX_LENGTH = 120;

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  navButton.addEventListener("click", () => {
    navLink.classList.toggle("shown");
    ctaButton.classList.toggle("shown");
  });

  navLinks.forEach((element) => {
    element.addEventListener("click", () => {
      if (isMobile()) {
        navLink.classList.toggle("hidden");
        ctaButton.classList.toggle("hidden");
      }

      navLinks.forEach((link) => link.classList.remove("active"));
      element.classList.add("active");
    });
  });

  const buttons = [
    { id: "plus", action: () => counter++ },
    { id: "minus", action: () => counter-- },
    { id: "reset", action: () => (counter = 0) },
  ];

  buttons.forEach(({ id, action }) => {
    document.getElementById(id).addEventListener("click", () => {
      action();
      count.textContent = counter;
    });
  });

  function updateCount() {
    const length = characterField.value.length;
    characterCount.textContent = length;
    characterCount.classList.toggle("is-warning", length >= MAX_LENGTH);
  }
});
