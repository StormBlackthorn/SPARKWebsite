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
                    { linkText: "Contact us", href: "pages/contactUs.html" },
                    { text: " with the chapter you want to join." }
                ]
            }
        ],
        cta: { label: "Browse chapters", href: "pages/about/chapters.html" }
    },
    {
        id: "start",
        label: "Start a chapter",
        steps: [
            {
                parts: [
                    { linkText: "Contact us", href: "pages/contactUs.html" },
                    { text: " first." }
                ]
            },
            {
                parts: [{ text: "Recruit 4–5 students." }]
            },
            {
                parts: [{ text: "Plan what you'll teach." }]
            },
            {
                parts: [{ text: "Email your local elementary school." }]
            },
            {
                parts: [{ text: "Start the club once approved." }]
            }
        ],
        cta: { label: "Contact us", href: "pages/contactUs.html" }
    },
    {
        id: "chaperone",
        label: "Chaperone",
        steps: [
            {
                parts: [{ text: "Stay in the classroom during sessions." }]
            },
            {
                parts: [{ text: "Sign up through your school's volunteer process." }]
            },
            {
                parts: [
                    { linkText: "Contact us", href: "pages/contactUs.html" },
                    { text: " when you're signed up." }
                ]
            }
        ],
        note: "Schools usually require a background check.",
        cta: { label: "Contact us", href: "pages/contactUs.html" }
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
    }

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => showTab(index));
    });
}
