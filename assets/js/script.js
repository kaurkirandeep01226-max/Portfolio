
/* =========================================
   KIRANDEEP KAUR — PORTFOLIO JAVASCRIPT
========================================= */

"use strict";


// =========================================
// 1. SCROLL REVEAL ANIMATIONS
// =========================================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    // Animate each section once.
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });

} else {
    // Fallback for older browsers.
    revealItems.forEach((item) => {
        item.classList.add("is-visible");
    });
}
// 2. OPENING BUBBLE ANIMATION
// =========================================

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    const bubbleContainer = document.createElement("div");

    bubbleContainer.id = "bubble-container";

    document.body.appendChild(bubbleContainer);

    // Create bubbles in different sizes and positions.
    for (let i = 0; i < 26; i++) {
        const bubble = document.createElement("span");

        bubble.className = "bubble";

        const size = Math.random() * 38 + 10;
        const duration = Math.random() * 3 + 4;
        const delay = Math.random() * 1.8;

        bubble.style.setProperty(
            "--left",
            `${Math.random() * 100}%`
        );

        bubble.style.setProperty(
            "--size",
            `${size}px`
        );

        bubble.style.setProperty(
            "--duration",
            `${duration}s`
        );

        bubble.style.setProperty(
            "--delay",
            `${delay}s`
        );

        bubbleContainer.appendChild(bubble);
    }

    // Remove the temporary bubbles after the opening effect.
    window.setTimeout(() => {
        bubbleContainer.remove();
    }, 9000);
}


// =========================================
// 3. MOUSE-FOLLOWING GLOW
// =========================================

if (
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {
    const cursorGlow = document.createElement("div");

    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorGlow);

    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });

    const tiltTargets = document.querySelectorAll(
        ".hero-art, .experience-card, .work-card"
    );

    tiltTargets.forEach((target) => {
        target.addEventListener("pointermove", (event) => {
            const bounds = target.getBoundingClientRect();
            const pointerX = (event.clientX - bounds.left) / bounds.width;
            const pointerY = (event.clientY - bounds.top) / bounds.height;
            const tiltX = (pointerX - 0.5) * 8;
            const tiltY = (0.5 - pointerY) * 8;

            target.style.setProperty("--tilt-x", `${tiltX}deg`);
            target.style.setProperty("--tilt-y", `${tiltY}deg`);

            if (target.classList.contains("work-card")) {
                const image = target.querySelector(".work-image");

                if (image) {
                    image.style.setProperty("--pointer-x", `${pointerX * 100}%`);
                    image.style.setProperty("--pointer-y", `${pointerY * 100}%`);
                }
            }
        });

        target.addEventListener("pointerleave", () => {
            target.style.removeProperty("--tilt-x");
            target.style.removeProperty("--tilt-y");

            const image = target.querySelector(".work-image");

            if (image) {
                image.style.removeProperty("--pointer-x");
                image.style.removeProperty("--pointer-y");
            }
        });
    });
}


// =========================================
// 4. SCROLL PROGRESS BAR
// =========================================

const progressBar = document.getElementById("progressBar");

function updateScrollProgress() {
    if (!progressBar) {
        return;
    }

    const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progressBar.style.width =
        `${Math.min(progress, 100)}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


// =========================================
// 5. MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    // Close the menu after selecting a section.
    navMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );
        });

    });
}


// =========================================
// 6. CREATIVE WORK CATEGORY FILTERS
// =========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;

        // Update active filter button.
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Display matching projects.
        workCards.forEach((card) => {

            const category = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            if (shouldShow) {

                card.classList.remove("is-filtered");

                // Re-run the entrance animation.
                if (!prefersReducedMotion) {
                    card.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(18px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 400,
                            easing: "ease-out"
                        }
                    );
                }

            } else {
                card.classList.add("is-filtered");
            }

        });

    });

});


// =========================================
// 7. AUTOMATIC COPYRIGHT YEAR
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================================
// 8. THREE-STEP PROJECT INQUIRY FORM
// =========================================

const projectForm = document.getElementById("projectForm");

if (projectForm) {
    const formSteps = Array.from(
        projectForm.querySelectorAll("[data-form-step]")
    );
    const formStepLabel = document.getElementById("formStepLabel");
    const formProgress = document.getElementById("formProgress");
    const formProgressBar = document.getElementById("formProgressBar");
    const formBack = document.getElementById("formBack");
    const formNext = document.getElementById("formNext");
    const formSubmit = document.getElementById("formSubmit");
    let activeFormStep = 0;

    function showFormStep(stepIndex) {
        activeFormStep = stepIndex;

        formSteps.forEach((step, index) => {
            step.hidden = index !== activeFormStep;
        });

        const stepNumber = activeFormStep + 1;
        const progress = (stepNumber / formSteps.length) * 100;

        formStepLabel.textContent = `Step ${stepNumber} of ${formSteps.length}`;
        formProgress.setAttribute("aria-valuenow", String(stepNumber));
        formProgressBar.style.width = `${progress}%`;
        formBack.hidden = activeFormStep === 0;
        formNext.hidden = activeFormStep === formSteps.length - 1;
        formSubmit.hidden = activeFormStep !== formSteps.length - 1;

        formSteps[activeFormStep].querySelector("legend").focus();
    }

    function validateCurrentFormStep() {
        const controls = formSteps[activeFormStep].querySelectorAll(
            "input, textarea, select"
        );

        for (const control of controls) {
            if (!control.checkValidity()) {
                control.reportValidity();
                return false;
            }
        }

        return true;
    }

    formSteps.forEach((step) => {
        step.querySelector("legend").tabIndex = -1;
    });

    formNext.addEventListener("click", () => {
        if (validateCurrentFormStep()) {
            showFormStep(activeFormStep + 1);
        }
    });

    formBack.addEventListener("click", () => {
        showFormStep(activeFormStep - 1);
    });

    projectForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateCurrentFormStep()) {
            return;
        }

        const answers = new FormData(projectForm);
        const message = [
            "New portfolio project inquiry",
            "",
            `Name: ${answers.get("Name")}`,
            `Email: ${answers.get("Email")}`,
            `Phone: ${answers.get("Phone") || "Not provided"}`,
            `Project type: ${answers.get("Project type")}`,
            `Website language: ${answers.get("Website language")}`,
            "",
            "Project details:",
            answers.get("Project details")
        ].join("\n");
        const emailUrl =
            `mailto:kaurkirandeep01226@gmail.com?subject=${encodeURIComponent("New project inquiry")}` +
            `&body=${encodeURIComponent(message)}`;

        window.location.href = emailUrl;
    });
}


// =========================================
