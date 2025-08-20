/*
    - Adds event listeners to tooltip checkboxes and search input
    - Shows tooltip upon filter icon being clicked
*/
document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.querySelector('.tooltip');

        document.getElementById('filterIcon').addEventListener('click', (e) => {
            e.stopPropagation();
            tooltip.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!tooltip.contains(e.target)) tooltip.classList.remove('show');
        });

        const searchInput = document.getElementById('searchInput');
        const cardsParent = document.querySelector('.cards');
        const filterCheckboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));

        function runSearch() {
            search(cardsParent, {
                title: 'title',
                searchedText: searchInput.value,
                filteredTags: filterCheckboxes.filter(cb => cb.checked).map(cb => cb.value)
            });
        }

        searchInput.addEventListener('input', runSearch);
        filterCheckboxes.forEach(cb => cb.addEventListener('change', runSearch));
        runSearch(); // to have all items have a fade-in animation on load
});


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
        const tagList = Array.from(child.querySelector(".tags").children).flatMap(tag => [...tag.classList]).filter(cls => cls !== "tag");
        for(let i = 0, l = filteredTags.length; i < l; i++) {
            if(!tagList.includes(filteredTags[i])){
                matchesTags = false;
                break;
            }
        }
    console.log(searchedText, matchesTitle, matchesTags)

      if (matchesTitle && matchesTags) {
            child.style.display = "block";
            child.classList.remove("fade-out");
            child.classList.add("fade-in");
        } else {
            child.classList.remove("fade-in");
            child.classList.add("fade-out");

            child.addEventListener("animationend", () => {
                if (child.classList.contains("fade-out")) child.style.display = "none";
                child.removeEventListener("animationend", onAnimationEnd);
            });        
        }
    });
}
