UI.dependencies(["volunteer.css"]);

UI.register("volunteer-tab", `
<button type="button" class="tab" role="tab" id="tab-@param(id)" aria-selected="false" aria-controls="panel-@param(id)">@param(label)</button>
`, {
    id: "join",
    label: "Tab",
    active: false
}, (element, params) => {
    if (params.active) {
        element.classList.add("active");
        element.setAttribute("aria-selected", "true");
    }
});
