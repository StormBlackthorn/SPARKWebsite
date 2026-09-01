const VOLUNTEER_STAT_LABELS = {
    volunteerTeachers: "Volunteer Teachers",
    hoursContributed: "Hours Contributed",
    schools: "Partner Schools",
    studentsTaught: "Students Taught"
};

function formatVolunteerStatText(key) {
    const stat = STATS[key];
    const label = VOLUNTEER_STAT_LABELS[key] ?? stat.label;
    return `${stat.value} ${label}`;
}

function renderVolunteerStats() {
    const section = UI.element("div", { class: "volunteer-stats", "aria-label": "Volunteer impact" });
    const grid = UI.element("div", { class: "volunteer-stats-grid" });

    VOLUNTEER_STATS.forEach((key) => {
        const stat = STATS[key];
        UI.add(grid, UI.component("stat-box", {
            icon: stat.icon,
            text: formatVolunteerStatText(key)
        }));
    });

    UI.add(section, grid);
    return section;
}
