const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide-in");

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show"); // add animation class
          observer.unobserve(entry.target);   // run once per element
        }
      });
    }, { threshold: 0.2 }); // 20% visible triggers it

    elements.forEach(el => observer.observe(el));
  });

