UI.dependencies([
    "testimonial.css"
])

UI.register("quote", `
<blockquote class="rating">
    <p>@param(quote)</p>
    <cite>— @param(author)</cite>
</blockquote>
`, {
    quote: "[Place Holder]",
    author: "1",
    current: false
}, (element, params) => {
    if (params.current) {
        element.classList.add("current");
    }
});
