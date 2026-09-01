UI.register("carousel-dot", `
<button type="button" class="carousel-dot" role="tab" aria-label="@param(label)"></button>
`, {
    index: 0,
    label: "Slide 1",
    current: false
}, (element, params) => {
    if (params.current) {
        element.classList.add("current");
        element.setAttribute("aria-selected", "true");
    } else {
        element.setAttribute("aria-selected", "false");
    }
});
