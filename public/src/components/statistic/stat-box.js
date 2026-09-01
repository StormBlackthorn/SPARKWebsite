UI.dependencies(["stat-box.css"]);

UI.register("stat-box", `
<div class="stat-box">
    <img src="@param(icon)" alt="" loading="lazy">
    <p>@param(text)</p>
</div>
`, {
    icon: "",
    text: ""
});
