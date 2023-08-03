import { getQuery } from "./utils/getQuery.js";
import { Player } from "./player.js";

import mySettings from "./settings.js";

const continueBtn       = getQuery(mySettings.Menu.Btn.continueBtnClassSelector);
const gameMode          = getQuery(mySettings.Menu.GameMode.ID);
const imageBtn          = getQuery(mySettings.Menu.Btn.imageBtn);
const numOfGames        = getQuery(mySettings.Menu.GameMode.Option.numOfGamesIDSelector);
const player1InputField = getQuery(mySettings.Menu.Form.Fields.player1IDSelector);
const player2InputField = getQuery(mySettings.Menu.Form.Fields.player2IDSelector);
const singlePlayerForm  = getQuery(mySettings.Menu.Form.singlePlayerFormIDSelector);
const twoPlayerUserForm = getQuery(mySettings.Menu.Form.twoPlayerUserFormIDSelector);


/**
 * Add a click event listener to the 'imageBtn' element to handle clicks on the button.
 * When the button is clicked, it logs a message to the console and redirects the user
 * to the menu page using the location.href property.
 */
if (imageBtn) {
  // Add a click event listener to the 'imageBtn' element.
  imageBtn.addEventListener("click", () => {
      
      // Redirect the user to the menu page using the URL defined in the 'mySettings' object.
      document.location.href = mySettings.Pages.menuPage;
  });
}


/**
 * Add event listeners to specific form elements and buttons to handle form submissions and button clicks.
 * The corresponding functions 'handleSinglePlayerFormSubmit', 'handleTwoPlayerFormSubmit', and 'handleContinue'
 * are called when these events occur.
 */

// Check if the 'singlePlayerForm' element exists, then add an event listener to handle form submissions.
if (singlePlayerForm) {
  singlePlayerForm.addEventListener("submit", handleSinglePlayerFormSubmit);
}

// Check if the 'twoPlayerUserForm' element exists, then add an event listener to handle form submissions.
if (twoPlayerUserForm) {
  twoPlayerUserForm.addEventListener("submit", handleTwoPlayerFormSubmit);
}

// Check if the 'continueBtn' element exists, then add an event listener to handle button clicks.
if (continueBtn) {
  continueBtn.addEventListener("click", handleContinue);
}


/**
 * Handles the event when the "Continue" button is clicked.
 * Redirects to the appropriate page based on the game mode selected.
 * Sets the game mode and number of games in the local storage.
 *
 * @param {Event} event - The click event object.
 */
function handleContinue(event) {
    event.preventDefault();
  
    const menu = getQuery(mySettings.Menu.Heading.H1);
    let gameSelection = null;
  
    menu.textContent = "Redirecting to player name entry";
    menu.classList.add(mySettings.Transition.blinkingTextClass);
  
    if (gameMode.value === mySettings.Game.Options.computerVsHuman) {
      gameSelection = mySettings.Pages.singlePlayerPage;
      localStorage.setItem("mode", mySettings.Game.Mode.singlePlayerMode);
    } else {
      gameSelection = mySettings.Pages.twoPlayerPage;
      localStorage.setItem("mode", mySettings.Game.Mode.twoPlayerMode);
    }
  
    localStorage.setItem("numOfGames", numOfGames.value);
  
    setTimeout(() => {
      document.location.href = gameSelection;
    }, 3000);
  }

  
  /**
   * Handles the form submission event for the single-player mode.
   * Extracts the player name from the input field and processes the user form.
   *
   * @param {Event} event - The form submission event object.
   */
  function handleSinglePlayerFormSubmit(event) {
    event.preventDefault();
  
    const playerName = player1InputField.value.toUpperCase();
    processUserForm(playerName, "Computer", true);
  }
  

  /**
   * Processes the user form by creating player objects, setting player names,
   * saving them, and storing player names in local storage.
   * Redirects to the avatar selection page.
   *
   * @param {string} player1Name - The name of player 1.
   * @param {string} player2Name - The name of player 2.
   */
  function processUserForm(player1Name, player2Name) {
    const player1 = new Player(player1Name);
    const player2 = new Player(player2Name);
  
    player1.setName(player1Name);
    player2.setName(player2Name);
  
    player1.save();
    player2.save();
  
    localStorage.setItem("player1", player1Name);
    localStorage.setItem("player2", player2Name);
  
    document.location.href = mySettings.Pages.avatarPage;
  }
  

  /**
   * Handles the form submission event for the two-player mode.
   * Extracts player names from the input fields and processes the user form.
   *
   * @param {Event} event - The form submission event object.
   */
  function handleTwoPlayerFormSubmit(event) {
    event.preventDefault();
  
    const player1Name = player1InputField.value.toUpperCase();
    const player2Name = player2InputField.value.toUpperCase();
  
    processUserForm(player1Name, player2Name);
  }
  



