import { getQuery }  from "./utils/getQuery.js";
import { Player }    from "./player.js";
import mySettings    from "./settings.js";


const form             = getQuery(mySettings.EnterPlayer.Form.ID);
const player1InputForm = getQuery(mySettings.EnterPlayer.Form.player1InputFormIDSelector);
const player2InputForm = getQuery(mySettings.EnterPlayer.Form.player2InputFormIDSelector);



/**
 * Handle the form submission event when the user submits the player information form.
 * This function is responsible for creating two Player objects, setting their names,
 * and saving them to local storage. It also sets the player names in the local storage
 * for later retrieval. Finally, it redirects the user to the avatar page using the
 * location.href property.
 *
 * @param {Event} event - The form submission event.
 */
form.addEventListener("submit", (event) => {
    
    event.preventDefault();

    // Get the input values for player 1 and player 2 from the form and convert to uppercase.
    const player1Value = player1InputForm.value.toUpperCase();
    const player2Value = player2InputForm.value.toUpperCase();

    // Create two Player objects with the provided names.
    const player1 = new Player(player1Value);
    const player2 = new Player(player2Value);

    // Set the names for player 1 and player 2.
    player1.setName(player1Value);
    player2.setName(player2Value);

    player1.save();
    player2.save();

    // Set the player names in local storage for later retrieval.
    localStorage.setItem("player1", player1.name);
    localStorage.setItem("player2", player2.name);

    // Redirect the user to the avatar page using the URL defined in the 'mySettings' object.
    document.location.href = mySettings.Pages.avatarPage;
});
