function renderAboutNav(currentSlug) {
    return renderDropdown({
        id: "about-nav",
        ariaLabel: "About pages",
        options: ABOUT_NAV.map((page) => ({
            value: page.value,
            label: page.label,
            selected: page.slug === currentSlug
        })),
        onSelect: (value) => {
            window.location.href = value;
        }
    });
}
