UI.dependencies(["carousel.css"]);

UI.register("carousel-slide", `
<div class="carousel-slide">
    <img src="@param(src)" alt="@param(alt)" loading="lazy">
</div>
`, {
    src: "",
    alt: ""
});
