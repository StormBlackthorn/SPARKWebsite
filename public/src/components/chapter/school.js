UI.register("school", `
<tr class="directory-row" data-country="@param(countrySlug)" data-region="@param(regionSlug)">
    <td><a href="@param(url)" target="_blank" rel="noopener noreferrer">@param(school)</a></td>
    <td>@param(country)</td>
    <td>@param(region)</td>
</tr>
`, {
    school: "School Name",
    url: "#",
    country: "United States",
    region: "Washington",
    countrySlug: "united states",
    regionSlug: "washington"
})
