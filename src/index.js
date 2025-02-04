/**
 * Learn React they say, it'll be fun and useful they say...
 * 
 * Well I say "nuh uh", cuz this thing going to be made of pure chaos(no frameworks!!).
 * ...Definitely  not because I'm too lazy to learn them...
 */


/**
 * Rotate the id "current" for the children of the wrapper element by the given rotation
 * make sure the given wrapper only have children element you want to rotate. If not, make a wrapper div
 * @param {String | String[]} wrapper the parent element of the children to be rotated. Should be String class name of the parent element.
 * @param {int | int[]} rotation how much to rotate the children by. If $setTo is true, this will be the index to set the children to
 * @param {bool} setTo if true, will set the children to the given index instead of rotating
 * @returns void
 */
function rotate(wrapper, rotation, setTo=false) {
    
    wrapper = Array.isArray(wrapper) ? wrapper : [wrapper]; //force convert $wrapper to array
    wrapper.map(selector => document.querySelector(selector)).forEach(parent => { //convert string name into its actual element
        
        const children = Array.from(parent.children); //make children true array as parent.children returns HTML collections

        //if $setTo is true, set the children to the given index 
        if(setTo) {
            children.filter(child => child.classList.contains("current")).forEach(e => e.classList.remove("current"));
            if(Array.isArray(rotation)) {
                return setTo.forEach(index => children[index].classList.add("current"));
            }
            return children[rotation].classList.add("current");
        }

        const currentElements = children.filter(child => child.classList.contains("current"));   
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