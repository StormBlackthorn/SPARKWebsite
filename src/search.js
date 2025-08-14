/**
 * Filters direct children of parentEl based on title and tags.
 * @param {Element} parentEl - The parent element containing items to filter.
 * @param {Object} options - { title: string, searchedText: string, tags: string[] }
 */
function search(parentEl, { title, searchedText="", filteredTags=[] }) {
    // Only direct children
    Array.from(parentEl.children).forEach(child => {
        const matchesTitle = child.querySelector(`.${title}`).textContent.toLowerCase().includes(searchedText.toLowerCase().trim());;
        let matchesTags = true;

        // Tag filter
        const tagList = Array.from(child.querySelector('.tag').classList).filter(cls => cls !== 'tag');
        for(let i = 0, l = filteredTags.length; i < l; i++) {
            if(!tagList.includes(filteredTags[i])){
                matchesTags = false;
                break;
            }
        }

      if (matchesTitle && matchesTags) {
            child.style.display = "block";
            child.classList.remove("fade-out");
            child.classList.add("fade-in");
        } else {
            child.classList.remove("fade-in");
            child.classList.add("fade-out");
            setTimeout(() => child.style.display = "none", 300); // Match the CSS animation duration
        }
    });
}
