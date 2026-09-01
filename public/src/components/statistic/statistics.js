function resolveStatItem(item) {
    if (typeof item === "string") {
        return STATS[item];
    }
    return item;
}

function renderStatistics() {
    const container = UI.element("div", { class: "statistics" });

    STAT_SECTIONS.forEach((section) => {
        if (section.label) {
            UI.add(container, UI.element("h2", { class: "section-label" }, { textContent: section.label }));
        }

        if (section.footnote) {
            UI.add(container, UI.element("p", { class: "footnote" }, { textContent: section.footnote }));
        }

        const row = UI.element("div", { class: "row" });
        section.items.forEach((item) => {
            UI.add(row, UI.component("statistic", resolveStatItem(item)));
        });
        UI.add(container, row);
    });

    return container;
}
