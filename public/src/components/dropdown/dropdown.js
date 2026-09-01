UI.dependencies(["dropdown.css"]);

function getSelectedOption(options) {
    return options.find((option) => option.selected) || options[0];
}

function initSparkDropdown(root, params) {
    const trigger = root.querySelector(".spark-dropdown-trigger");
    const menu = root.querySelector(".spark-dropdown-menu");
    const hidden = root.querySelector('input[type="hidden"]');
    const label = trigger.querySelector(".spark-dropdown-label");
    const items = root.querySelectorAll(".spark-dropdown-item");

    function setOpen(open) {
        root.classList.toggle("open", open);
        trigger.setAttribute("aria-expanded", open);
        menu.hidden = !open;
    }

    function select(value, text) {
        label.textContent = text;
        items.forEach((item) => {
            const isSelected = item.dataset.value === value;
            item.classList.toggle("selected", isSelected);
            item.setAttribute("aria-selected", isSelected);
        });

        if (hidden) {
            hidden.value = value;
            hidden.dispatchEvent(new Event("input", { bubbles: true }));
        }

        params.onSelect?.(value);
        setOpen(false);
    }

    trigger.addEventListener("click", () => {
        setOpen(!root.classList.contains("open"));
    });

    items.forEach((item) => {
        item.addEventListener("click", () => {
            select(item.dataset.value, item.textContent.trim());
        });
    });

    document.addEventListener("click", (event) => {
        if (!root.contains(event.target)) {
            setOpen(false);
        }
    });

    trigger.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setOpen(false);
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(!root.classList.contains("open"));
        }
    });
}

function renderDropdown(params) {
    const selected = getSelectedOption(params.options || []);
    const root = UI.element("div", {
        class: `spark-dropdown ${params.className || ""}`.trim()
    });

    const triggerId = params.id || "";
    const trigger = UI.element("button", {
        type: "button",
        class: "spark-dropdown-trigger",
        id: triggerId,
        "aria-haspopup": "listbox",
        "aria-expanded": "false"
    });

    if (params.ariaLabel) {
        trigger.setAttribute("aria-label", params.ariaLabel);
    }

    UI.add(trigger, UI.element("span", { class: "spark-dropdown-label" }, {
        textContent: selected?.label || ""
    }));
    UI.add(trigger, UI.element("span", { class: "spark-dropdown-arrow", "aria-hidden": "true" }, {
        textContent: "›"
    }));
    UI.add(root, trigger);

    const menu = UI.element("div", {
        class: "spark-dropdown-menu",
        role: "listbox",
        hidden: "true"
    });

    if (triggerId) {
        menu.id = `${triggerId}-menu`;
        trigger.setAttribute("aria-controls", menu.id);
    }

    (params.options || []).forEach((option) => {
        const isSelected = option.value === selected?.value;
        const item = UI.element("button", {
            type: "button",
            class: `spark-dropdown-item${isSelected ? " selected" : ""}`,
            role: "option",
            "data-value": option.value,
            "aria-selected": isSelected
        }, { textContent: option.label });
        UI.add(menu, item);
    });

    UI.add(root, menu);

    if (params.name) {
        const hiddenAttrs = {
            type: "hidden",
            name: params.name,
            value: selected?.value || ""
        };
        if (params.required) {
            hiddenAttrs.required = "";
        }
        UI.add(root, UI.element("input", hiddenAttrs));
    }

    initSparkDropdown(root, params);
    return root;
}
