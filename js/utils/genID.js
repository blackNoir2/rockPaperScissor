/**
 * Generates a random alphanumeric ID of length 20.
 *
 * @returns {string} The randomly generated ID
 */
function generateID(idLength = 20) {
    let randomString = "";
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    return randomString;
  }


  function getRandomChoice(n) {
    // Generate a random index between 0 and n-1
    const randomIndex = Math.floor(Math.random() * n);
  
    return randomIndex;
  }

  export {
    generateID,
    getRandomChoice,
  }