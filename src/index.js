/**
 * Learn React they say, it'll be fun and useful they say...
 * 
 * Well I say "nuh uh", cuz this thing going to be made of pure chaos(no frameworks!!).
 * ...Definitely not because I'm too lazy to learn them...
 */

//load all components/scripts for all pages
(async function() {

    //load all components/scripts
    const scripts = [
        "./src/components/Footer.js",
        "./src/components/Navbar.js"
    ];

    //no clue wth this is. All hail chatGPT
    /*
        async function loadScripts() {...}
            Declares an asynchronous function, meaning you can use await inside it to pause until things are done — in this case, script loading.

        const scripts = ["/src/components/Footer.js", "/src/components/Navbar.js"];
            An array of paths to the script files you want to load.

        Promise.all(scripts.map(...))
            Maps each script path to a promise that resolves when the script is loaded.

        Promise.all([...]) waits for all of these promises to finish.
            It loads the scripts concurrently, not one-by-one.

        scripts.map(src => new Promise(resolve => {...})) For each script path, it:
            Creates a new <script> element.
            Sets src to the current path.
            Sets type to "module" so ES module syntax works inside the file.
            Sets onload = resolve to resolve the promise when the script is fully loaded.
            Appends the script to the document’s <head> so the browser starts loading it.

        Object.assign(document.createElement("script"), { ... })
        This is a shortcut to set multiple properties (src, type, onload) at once, instead of writing:
            const script = document.createElement("script");
            script.src = src;
            script.type = "module";
            script.onload = resolve;
    */
    await Promise.all(scripts.map(src => {
        return new Promise(resolve => {
            document.head.appendChild(
                Object.assign(document.createElement("script"), {
                    src,
                    type: "module",
                    onload: resolve
                })
            );
        });
    }));
})();

/**
 * Rotate the id "current" for the children of the wrapper element by the given rotation(wrap around).
 * Make sure the given wrapper only have children element you want to rotate. If not, make a wrapper div
 * @param {String | String[]} wrapper the parent element of the children to be rotated. Should be String class name of the parent element.
 * @param {int | int[]} rotation how much to rotate the children by. If $setTo is true, this will be the index of the child to be "current". Positive = go right
 * @param {bool} setTo if true, will set the children of the given index to be "current"
 * @returns void
 */
function rotate(wrapper, rotation, setTo=false) {
    
    wrapper = Array.isArray(wrapper) ? wrapper : [wrapper]; //force convert $wrapper to array
    wrapper.map(selector => document.querySelector(selector)).forEach(parent => { //convert string name into its actual element
        
        const children = Array.from(parent.children); //make children true array as parent.children returns HTML collections

        //if $setTo is true, set the children to the given index 
        if(setTo) {
            //remove all "current"
            children.filter(child => child.classList.contains("current")).forEach(e => e.classList.remove("current"));
            //if rotation is an array, this means we want to set multiple elements to "current"
            if(Array.isArray(rotation)) {
                return rotation.forEach(index => children[index].classList.add("current"));
            }
            //else we set just one element to "current"
            return children[rotation].classList.add("current");
        }

        const currentElements = children.filter(child => child.classList.contains("current"));
        
        // For some reason the rotation becomes opposite if there are more than 1 elements with class "current"??
        // I tried to figure it out but couldn't :skull:
        // I mean... as long as the code works, right?
        if(currentElements.length > 1) rotation *= -1; 

        //get the index of currentElements
        const indexes = children.map((child, i) => child.classList.contains("current") ? i : -1).filter(i => i !== -1);   
        
        currentElements.forEach(e => e.classList.remove("current")); //remove all element's class

        //do the index shifting(to calculate which element to add the class to)
        for(let i = 0, l = currentElements.length; i < l; i++) {
            let newIndex = (indexes[i] + rotation) % children.length;
            if (newIndex < 0) newIndex += children.length;
            children[newIndex].classList.add("current");
        }

        //Didn't know how ot manipulate DOM. Asked ChatGPT. It gave me the complete opposite code. 
        //I Spent too long on these simple lines
        //Reason for DOM manipulation([] == showing):
        // 1 2 [3] [4] [5] -> rotate(1) SHOULD BECOME [4] [5] [1] 2 3 but in reality is [1] 2 3 [4] [5] 
        //as the DOM order of the children is not changed

        //FIX: only do this if there are more than 1 elements with class "current", which is the thing
        //that causes looping issues to begin with. If it only has one element, doing DOM manipulation will
        //in some case break it instead.
        if(currentElements.length > 1) {
            for(let i = 0, l = Math.abs(rotation); i < l; i++) 
                rotation > 0 ? children.push(children.shift()) : children.unshift(children.pop());

            parent.innerHTML = ''; // Clear the container(to update DOM)
            children.forEach(child => parent.appendChild(child)); // Add the children back
        }
        

    })

}
