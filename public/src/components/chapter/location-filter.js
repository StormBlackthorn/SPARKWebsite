UI.register("location-filter", `
<label>
    <input type="checkbox" name="location" value="@param(value)">
    @param(label)
</label>
`, {
    value: "washington",
    label: "Washington"
})
