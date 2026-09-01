UI.dependencies(["statistic.css"]);

UI.register("statistic", `
<div class="statistic">
  <img src="@param(icon)" class="icon" alt="" loading="lazy">
  <h2 class="title">@param(value)</h2>
  <p class="label">@param(label)</p>
</div>
`, {
    icon: "",
    value: "",
    label: ""
});
