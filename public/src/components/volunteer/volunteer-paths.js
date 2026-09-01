const VOLUNTEER_CONTACT = {
    join: {
        subject: "Volunteer - Join a Chapter",
        message: "Hi, I'd like to volunteer as a teacher. I'm interested in joining the chapter at:\n\n[School name]\n\n"
    },
    start: {
        subject: "Volunteer - Start a Chapter",
        message: "Hi, I'm interested in starting a new SPARK chapter.\n\nMy high school:\nTarget elementary school:\n\n"
    },
    chaperone: {
        subject: "Volunteer - Chaperone",
        message: "Hi, I've completed my school's volunteer signup and would like to chaperone SPARK sessions.\n\nSchool:\n\n"
    },
    general: {
        subject: "Volunteer Inquiry",
        message: "Hi, I'm interested in volunteering with SPARK.\n\n"
    }
};

function volunteerContactUrl(pathId = "general") {
    const contact = VOLUNTEER_CONTACT[pathId] ?? VOLUNTEER_CONTACT.general;
    const params = new URLSearchParams({
        subject: contact.subject,
        message: contact.message
    });
    return `pages/contactUs.html?${params.toString()}`;
}

const VOLUNTEER_PATHS = [
    {
        id: "join",
        label: "Join a chapter",
        steps: [
            {
                parts: [
                    { text: "Find a school on the " },
                    { linkText: "Chapters", href: "pages/about/chapters.html" },
                    { text: " page." }
                ]
            },
            {
                parts: [
                    { linkText: "Contact us", href: volunteerContactUrl("join") },
                    { text: " with the chapter you want to join. We'll connect you with the chapter lead." }
                ]
            },
            {
                parts: [
                    { text: "Attend a session or two with the existing team to learn how clubs run (about 2–3 hours/week during the school year)." }
                ]
            }
        ],
        cta: { label: "Contact us to join", href: volunteerContactUrl("join") }
    },
    {
        id: "start",
        label: "Start a chapter",
        steps: [
            {
                parts: [
                    { linkText: "Contact us", href: volunteerContactUrl("start") },
                    { text: " first — we'll help you reach out to schools and answer questions about getting started." }
                ]
            },
            {
                parts: [
                    { text: "Recruit 4–5 high school students at your school who want to teach STEM after school." }
                ]
            },
            {
                parts: [
                    { text: "Plan lessons using " },
                    { linkText: "Xcratch", href: "pages/Xcratch/index.html" },
                    { text: " and other hands-on activities. No teaching experience required — we share what works." }
                ]
            },
            {
                parts: [
                    { text: "Email a local elementary school to propose an afterschool club. Check the " },
                    { linkText: "Chapters", href: "pages/about/chapters.html" },
                    { text: " page to see which schools are nearby." }
                ]
            },
            {
                parts: [
                    { text: "Start the club once the school approves — most chapters launch within 2–4 weeks of first contact." }
                ]
            }
        ],
        cta: { label: "Contact us to start", href: volunteerContactUrl("start") }
    },
    {
        id: "chaperone",
        label: "Chaperone",
        steps: [
            {
                parts: [
                    { text: "Stay in the classroom during sessions to supervise students and help with materials. You don't need to teach." }
                ]
            },
            {
                parts: [
                    { text: "Sign up through your school's volunteer process (background check is usually required)." }
                ]
            },
            {
                parts: [
                    { linkText: "Contact us", href: volunteerContactUrl("chaperone") },
                    { text: " once you're signed up so we can match you with a chapter." }
                ]
            }
        ],
        note: "Schools usually require a background check before you can volunteer on campus.",
        cta: { label: "Contact us to chaperone", href: volunteerContactUrl("chaperone") }
    }
];

function renderVolunteerPaths() {
    const tabs = UI.element("div", { class: "tabs", role: "tablist" });
    const panels = UI.element("div", { class: "tab-panels" });

    VOLUNTEER_PATHS.forEach((path, index) => {
        const isActive = index === 0;
        UI.add(tabs, UI.component("volunteer-tab", {
            id: path.id,
            label: path.label,
            active: isActive
        }));
        UI.add(panels, UI.component("volunteer-panel", {
            id: path.id,
            steps: path.steps,
            note: path.note ?? "",
            cta: path.cta,
            active: isActive
        }));
    });

    const pageNote = UI.element("p", { class: "page-note" }, {
        textContent: "*Teaching volunteers must be in high school."
    });

    return [tabs, panels, pageNote];
}

function initVolunteerTabs(container) {
    const tabButtons = container.querySelectorAll(".tab");
    const tabPanels = container.querySelectorAll(".tab-panel");
    const pathIds = VOLUNTEER_PATHS.map((path) => path.id);

    function showTab(index) {
        tabButtons.forEach((button, i) => {
            const isActive = i === index;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", isActive);
        });

        tabPanels.forEach((panel, i) => {
            const isActive = i === index;
            panel.classList.toggle("active", isActive);
            panel.setAttribute("aria-hidden", String(!isActive));
            panel.toggleAttribute("inert", !isActive);
        });

        const pathId = pathIds[index];
        if (pathId) {
            history.replaceState(null, "", `#${pathId}`);
        }
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => showTab(index));
    });

    const hash = window.location.hash.slice(1);
    const hashIndex = pathIds.indexOf(hash);
    if (hashIndex >= 0) {
        showTab(hashIndex);
    }
}
