function getChapterLocations() {
    const countries = [...new Set(CHAPTERS.map((chapter) => chapter.country))];
    const regions = [...new Set(CHAPTERS.map((chapter) => chapter.region))];

    return [...countries, ...regions].map((label) => ({
        label,
        value: label.toLowerCase().replace(/\s+/g, "-")
    }));
}

function renderChapters() {
    const tbody = UI.element("tbody", { class: "directory-rows" });

    CHAPTERS.forEach((chapter) => {
        UI.add(tbody, UI.component("school", {
            school: chapter.school,
            url: chapter.url,
            country: chapter.country,
            region: chapter.region,
            countrySlug: chapter.country.toLowerCase(),
            regionSlug: chapter.region.toLowerCase()
        }));
    });

    return tbody;
}

function renderLocationFilters() {
    return getChapterLocations().map((location) => UI.component("location-filter", location));
}
