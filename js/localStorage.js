/**
 * The LocalStorage class provides methods to interact with the local storage. 
 * It allows you to set data, retrieve data, save data, and clear the local storage. 
 */

class LocalStorage {
    /**
     * @param {string} storageName - The name of the local storage.
     */
    constructor(storageName) {
      this.storageName = storageName;
      this.data        = null;
    }
  
     /**
     * Retrieves the data from the local storage.
     * @returns {object} The data from the local storage.
     */
    getData() {
      return JSON.parse(localStorage.getItem(this.storageName));
    }
  
    /**
     * Saves data to the local storage.
     * @param {object} dataToSave - The data to save.
     */
    saveData(dataToSave) {
      localStorage.setItem(this.storageName, JSON.stringify(dataToSave));
    }
  
    /**
     * Clears the local storage and the session storage.
     */
    clear() {
      
      localStorage.clear();
  
    }
  }

export {LocalStorage}
  