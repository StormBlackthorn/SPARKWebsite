const HOME_STAT_LABELS = {
    volunteerTeachers: "Volunteer Teachers"
};

function formatHomeStatText(key) {
    const stat = STATS[key];
    const label = HOME_STAT_LABELS[key] ?? stat.label;
    return `${stat.value} ${label}`;
}

function renderHomeStats() {
    const grid = UI.element("div", { class: "stats-grid" });

    HOME_STATS.forEach((key) => {
        const stat = STATS[key];
        UI.add(grid, UI.component("stat-box", {
            icon: stat.icon,
            text: formatHomeStatText(key)
        }));
    });

    return grid;
}
