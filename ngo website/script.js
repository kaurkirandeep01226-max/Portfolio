
// Initialize Lucide icons
lucide.createIcons();


// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

    lucide.createIcons();
});


// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i data-lucide="menu"></i>';

        lucide.createIcons();

    });

});


// Update Footer Year
document.getElementById("year").textContent =
    new Date().getFullYear();


// Contact Form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {

        formMessage.textContent = "Please fill in all fields.";
        return;

    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        formMessage.textContent = "Please enter a valid email address.";
        return;

    }

    // Demo response: no information is transmitted or stored.
    formMessage.textContent =
        "Thank you, " + name + "! Your form has been validated. Please connect a backend to submit your message.";

    contactForm.reset();

});
