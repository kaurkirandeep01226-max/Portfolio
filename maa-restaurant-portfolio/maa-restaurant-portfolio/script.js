// MĀA restaurant portfolio interactions
window.addEventListener("load", () => {
  document.getElementById("preloader").classList.add("hide");
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

document.getElementById("year").textContent = new Date().getFullYear();

// Front-end demo reservation form. Connect this to a backend/email service for live bookings.
document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = data.get("name");
  document.getElementById("formStatus").textContent =
    `Thank you, ${name}! Your demo reservation request has been recorded on this page. Please connect a booking service to receive it.`;
  form.reset();
});
