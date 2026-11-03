
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


// =========================================
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
// 9. FREE GUIDED PROJECT CHAT
// =========================================

const chatPanel = document.getElementById("chatPanel");
const chatLauncher = document.getElementById("chatLauncher");

if (chatPanel && chatLauncher) {
    const chatClose = document.getElementById("chatClose");
    const chatMessagesElement = document.getElementById("chatMessages");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");
    const chatFinish = document.getElementById("chatFinish");
    const chatMessages = [];
    const projectDetails = {
        projectType: "",
        language: "",
        goals: "",
        name: "",
        email: "",
        phone: ""
    };
    const projectQuestions = [
        {
            key: "projectType",
            prompt: "What type of work do you need? For example: a business website, portfolio, online store, landing page, graphic design, or something else."
        },
        {
            key: "language",
            prompt: "Which language should the website use? For example: English, Punjabi, Hindi, or more than one."
        },
        {
            key: "goals",
            prompt: "What would you like the project to do? Tell me about the audience, pages, features, style, or examples you have in mind."
        },
        {
            key: "name",
            prompt: "What name should I include in the project inquiry?"
        },
        {
            key: "email",
            prompt: "What email address can Kirandeep use to reply?"
        },
        {
            key: "phone",
            prompt: "Would you like to include a phone number? Type a number, or type “skip” to leave it out."
        }
    ];
    let activeQuestion = 0;
    let emailDraftReady = false;

    function updateChatControls() {
        chatInput.disabled = emailDraftReady;
        chatSend.disabled = emailDraftReady;
        chatFinish.disabled =
            emailDraftReady ||
            !chatMessages.some((message) => message.role === "user");
    }

    function addChatBubble(role, text) {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble chat-bubble-${role}`;
        bubble.textContent = text;
        chatMessagesElement.appendChild(bubble);
        chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
        return bubble;
    }

    function addChatAction(label, action, className) {
        const button = document.createElement("button");
        button.className = className;
        button.type = "button";
        button.textContent = label;
        button.addEventListener("click", action, { once: true });
        chatMessagesElement.appendChild(button);
        chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    }

    function sendChatReply(text) {
        chatMessages.push({ role: "assistant", content: text });
        addChatBubble("assistant", text);
        updateChatControls();
    }

    function getCommonAnswer(message) {
        const text = message.toLowerCase();
        const isQuestion =
            text.includes("?") ||
            /^(what|how|do|does|can|could|is|are|where|when|who|why)\b/.test(text);

        if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
            if (activeQuestion >= projectQuestions.length) {
                return "Thanks again! Your project details are ready. " +
                    "Choose “Finish & prepare email” to create the inquiry draft.";
            }

            return "Hi! I’m here to help with a project inquiry. " +
                projectQuestions[activeQuestion].prompt;
        }

        if (isQuestion && /\b(price|prices|pricing|cost|costs|budget|charge|charges|how much)\b/.test(text)) {
            return "The portfolio doesn’t list prices, so I can’t quote a cost. " +
                "I’ll include your project needs in the email draft so Kirandeep can follow up.";
        }

        if (isQuestion && /\b(technology|technologies|tech stack|framework|programming language|coding language)\b/.test(text)) {
            return "The portfolio mentions HTML, CSS, and basic JavaScript. " +
                "For your project, tell me the website’s preferred display language—such as English, Punjabi, or Hindi.";
        }

        if (isQuestion && /\b(language|languages)\b/.test(text) && /\b(website|site|support|available|speak)\b/.test(text)) {
            return "The project brief can include English, Punjabi, Hindi, or multiple website languages. " +
                "Which would you prefer for your project?";
        }

        if (isQuestion && /\b(time|timeline|how long|deadline|when)\b/.test(text)) {
            return "I can’t promise a delivery date. Share your target timeline in the project details, " +
                "and Kirandeep can discuss it with you.";
        }

        if (isQuestion && /\b(whatsapp|whats app|phone number|call|contact number)\b/.test(text)) {
            return "You can reach Kirandeep on WhatsApp at +91 62393 42533. " +
                "I can also include your contact details in the project email draft.";
        }

        if (isQuestion && /\b(email|gmail)\b/.test(text)) {
            return "You can email Kirandeep at kaurkirandeep01226@gmail.com. " +
                "When you finish this chat, I can prepare a project inquiry draft addressed to her.";
        }

        if (isQuestion && /\b(reach|contact)\b/.test(text)) {
            return "You can email Kirandeep at kaurkirandeep01226@gmail.com or reach her on WhatsApp at +91 62393 42533.";
        }

        if (isQuestion && /\b(where|location|located|based)\b/.test(text)) {
            return "Kirandeep is based in Patiala, Punjab, India.";
        }

        if (isQuestion && /\b(what can you do|what do you do|services|projects|work you do|help with)\b/.test(text)) {
            return "I can collect a brief for a website, portfolio, online store, landing page, " +
                "graphic design, or another project. Kirandeep can review your request and follow up.";
        }

        if (isQuestion && /\b(free|paid|payment|subscribe|subscription|api)\b/.test(text)) {
            return "This guided project helper is free and does not use an AI service or paid API. " +
                "It runs in your browser and helps prepare an email draft.";
        }

        if (isQuestion && /\b(private|privacy|secure|stored|save my|data)\b/.test(text)) {
            return "This helper does not send your chat to an AI service or save it on a server. " +
                "Your answers are used to prepare an email draft only when you choose to open it.";
        }

        return "";
    }

    function createProjectSummary() {
        return [
            "PROJECT INQUIRY",
            `Name: ${projectDetails.name || "Not provided"}`,
            `Email: ${projectDetails.email || "Not provided"}`,
            `Phone: ${projectDetails.phone || "Not provided"}`,
            `Project type: ${projectDetails.projectType || "Not provided"}`,
            `Website language: ${projectDetails.language || "Not provided"}`,
            `Goals and requirements: ${projectDetails.goals || "Not provided"}`
        ].join("\n");
    }

    function createEmailDraft() {
        const body = [
            "Project inquiry from the portfolio chat helper",
            "",
            createProjectSummary()
        ].join("\n");
        const emailUrl =
            `mailto:kaurkirandeep01226@gmail.com?subject=${encodeURIComponent("Portfolio project inquiry")}` +
            `&body=${encodeURIComponent(body)}`;

        window.location.href = emailUrl;
    }

    function prepareChatEmail() {
        const summary = createProjectSummary();
        sendChatReply(
            `Here’s the project summary for Kirandeep:\n\n${summary}\n\n` +
            "Choose below to open an email draft. Review it and press Send in your email app."
        );
        addChatAction(
            "Open email draft to Kirandeep ↗",
            createEmailDraft,
            "chat-email-link"
        );
        emailDraftReady = true;
        updateChatControls();
    }

    function handleProjectAnswer(message) {
        if (activeQuestion >= projectQuestions.length) {
            sendChatReply(
                "I’ve collected the project details. Choose “Finish & prepare email” " +
                "to review the summary, or type “start over” to begin a new inquiry."
            );
            return;
        }

        const question = projectQuestions[activeQuestion];

        if (question.key === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message)) {
            sendChatReply("That doesn’t look like a complete email address. Please check it and try again.");
            return;
        }

        if (question.key === "phone" && /^(skip|no|none|no thanks)$/i.test(message)) {
            projectDetails.phone = "";
        } else {
            projectDetails[question.key] = message;
        }

        activeQuestion += 1;

        if (activeQuestion < projectQuestions.length) {
            sendChatReply(projectQuestions[activeQuestion].prompt);
            return;
        }

        sendChatReply(
            "Thanks, I’ve collected your project details. " +
            "Choose “Finish & prepare email” below to review the summary and open an email draft."
        );
    }

    chatLauncher.addEventListener("click", () => {
        chatPanel.hidden = false;
        chatLauncher.setAttribute("aria-expanded", "true");
        chatInput.focus();
    });

    chatClose.addEventListener("click", () => {
        chatPanel.hidden = true;
        chatLauncher.setAttribute("aria-expanded", "false");
        chatLauncher.focus();
    });

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const content = chatInput.value.trim();

        if (!content || emailDraftReady) {
            return;
        }

        if (chatMessages.filter((message) => message.role === "user").length >= 24) {
            addChatBubble(
                "assistant",
                "This chat has reached its message limit. Finish the chat to prepare your project summary."
            );
            return;
        }

        chatMessages.push({ role: "user", content });
        addChatBubble("user", content);
        chatInput.value = "";
        updateChatControls();

        if (/^(start over|restart|new inquiry)$/i.test(content)) {
            Object.keys(projectDetails).forEach((key) => {
                projectDetails[key] = "";
            });
            activeQuestion = 0;
            sendChatReply(`No problem. Let’s start again. ${projectQuestions[activeQuestion].prompt}`);
            return;
        }

        const commonAnswer = getCommonAnswer(content);

        if (commonAnswer) {
            sendChatReply(commonAnswer);
        } else {
            handleProjectAnswer(content);
        }
    });

    chatFinish.addEventListener("click", () => {
        if (!emailDraftReady && chatMessages.some((message) => message.role === "user")) {
            prepareChatEmail();
        }
    });

    updateChatControls();
}
