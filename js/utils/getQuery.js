/**
 * Get the first element that matches the specified CSS selector.
 * @param {string} identifier - The CSS selector to query.
 * @returns {Element} - The first element that matches the selector, or null if no matches are found.
 */
function getQuery(identifier) {
    // Use document.querySelector to find the first element that matches the CSS selector
    // specified by 'identifier'.
    // Returns the matched element if found, or null if no matches are found.
    return document.querySelector(identifier);
}

export {getQuery}