## Style Guidelines
We are not very script, but just follow general good coding practices

### JavaScript
CamelCasing, four spaces indentations. I'd prefer shorthand/shortcuts instead of excessive variables and functions, as AI often love to do. 

### CSS
**CSS files should be written with a nested structure,** unless it is just a quick one-liner. This is to make it easier to read and understand the structure of the page.

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