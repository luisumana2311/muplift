document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initRevealAnimations();
});

// Handles the responsive navigation menu.
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll("#nav-menu a");

  if (!menuToggle || !navMenu) return;

  function closeMenu() {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const clickedMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedMenu && !clickedToggle) {
      closeMenu();
    }
  });
}

// Uses IntersectionObserver for subtle entrance animations without external libraries.
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}
