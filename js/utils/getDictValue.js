

/**
 * Get the value from a dictionary object based on the given key.
 * @param {Object} dictObj - The dictionary object.
 * @param {string} key - The key to look up in the dictionary.
 * @returns {*} - The value associated with the key, or null if the key does not exist.
 */
function getDictValue(dictObj, key) {
    let result;
    if (dictObj.hasOwnProperty(key)) {
        // If the key exists in the dictionary, assign the corresponding value to 'result'
        result = dictObj[key];
    } else {
        // If the key does not exist in the dictionary, set 'result' to null
        result = null;
    }
    return result;
}


export {getDictValue}