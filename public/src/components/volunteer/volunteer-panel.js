UI.register("volunteer-panel", `
<div class="tab-panel" role="tabpanel" id="panel-@param(id)" aria-labelledby="tab-@param(id)" aria-hidden="true"></div>
`, {
    id: "join",
    steps: [],
    note: "",
    cta: null,
    active: false
}, (element, params) => {
    if (params.active) {
        element.classList.add("active");
        element.setAttribute("aria-hidden", "false");
    } else {
        element.toggleAttribute("inert", true);
    }

    const stepsList = UI.element("ol", { class: "steps" });

    params.steps.forEach((step) => {
        const li = UI.element("li");
        step.parts.forEach((part) => {
            if (part.href) {
                const link = UI.element("a", { href: part.href });
                link.textContent = part.linkText ?? part.text ?? "";
                UI.add(li, link);
            } else if (part.text) {
                li.appendChild(document.createTextNode(part.text));
            }
        });
        UI.add(stepsList, li);
    });

    UI.add(element, stepsList);

    if (params.note) {
        UI.add(element, UI.element("p", { class: "panel-note" }, { textContent: params.note }));
    }

    if (params.cta) {
        const ctaFooter = UI.element("div", { class: "panel-cta" });
        const ctaLink = UI.element("a", { href: params.cta.href });
        UI.add(ctaLink, UI.element("button", { type: "button" }, { textContent: params.cta.label }));
        UI.add(ctaFooter, ctaLink);
        UI.add(element, ctaFooter);
    }
});
