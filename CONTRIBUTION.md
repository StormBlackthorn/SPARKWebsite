## Style Guidelines
We are not very script, but just follow general good coding practices

### JavaScript
CamelCasing, four spaces indentations. I'd prefer shorthand/shortcuts instead of excessive variables and functions, as AI often love to do. 

### HTML
All internal links should be relative, treating `/public` as root. Please start your path as `/` instead of `./`. This is to ensure firebase hosting works properly.

E.g. the absolute path `/public/about/chapters.html` will be `/about/chapters.html` in the code.

Every file needs to include the following snippits in `<head>`:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="SPARK — STEM Path Activities & Resources for Kids. A student-run organization providing afterschool STEM education in local elementary schools.">
    <title>SPARK - {PAGE TITLE}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
    <script>
        if(location.hostname !== "spark-stem.web.app") {
            document.head.appendChild(Object.assign(document.createElement('base'), {
                href: "/public/"
            }));
        }
    </script>
    <script src="src/index.js"></script>
    <!-- Additional scripts -->
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="stylesheet" href="styles/{PAGE NAME}.css">

</head>
```

### CSS
**CSS files should be written with a nested structure.**

Each page should only have ONE css file, and it should be named after the page. E.g. `about.html` should have `about.css`. CSS used across multiple files should go in `styles.css`.
```css
.class {
    .nestedClass {

    }
}
```
Instead of 
```
.class .nestedClass {

}
```

## AI Usage
All AI usage MUST be disclosed. AI generated code MUST be hand reviewed. 

## Merging
It would be appreciated if you could include an image showing the actual changes made in the PR live on the website(if the frontend is changed). 

---

**Please update `.gigignore` for any additional unneeded files(such as editor/ai configuration files).**