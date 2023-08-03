/**
 * avatar.js - Handles the avatar selection and related functionality.
 *
 * This module provides functions to handle the avatar selection process in the game.
 * It includes functions to set player avatars, handle single player mode, handle two player mode,
 * display messages to prompt avatar selection, and redirect to the game page after avatar selection.
 *
 * Functions:
 * - setPlayerAvatar: Sets the avatar for a player and updates the corresponding image element.
 * - handleSinglePlayerMode: Handles the avatar selection process in single player mode.
 * - handleTwoPlayerMode: Handles the avatar selection process in two player mode.
 * - displayMsgToPlayerToChooseAvatar: Displays a message prompting the current player to choose an avatar.
 * - displayMsg: Displays a message in the UI.
 * - goToGame: Redirects to the game page after avatar selection.
 * - _run: Executes the necessary actions based on the selected avatars and game mode.
 *
 * Usage:
 * Import this module into your main script file and call the necessary functions to handle the avatar selection process.
 * Ensure that the required HTML elements and data are properly set up before using the functions.
 */


import { getQuery }        from "./utils/getQuery.js";
import { getRandomChoice } from "./utils/genID.js";
import { Player }          from "./player.js";

import mySettings from "./settings.js";

const avatarImageElements       = document.querySelectorAll(mySettings.Avatar.avatarClassSelector);
const avatarPlayer1Msg          = getQuery(mySettings.Avatar.avatarPlayer1TurnClassSelector);
const avatarPlayer2Msg          = getQuery(mySettings.Avatar.avatarPlayer2TurnClassSelector);
const player1AvatarImageElement = getQuery(mySettings.Avatar.Img.player1Avatar);
const player2AvatarImageElement = getQuery(mySettings.Avatar.Img.player2Avatar);
const player1NameHeading        = getQuery(mySettings.Avatar.Heading.H1.player1ClassSelector);
const player2NameHeading        = getQuery(mySettings.Avatar.Heading.H1.player2ClassSelector);
const playerOne                 = Player.getPlayerByName(localStorage.getItem("player1"));
const playerTwo                 = Player.getPlayerByName(localStorage.getItem("player2"));

player1NameHeading.textContent = playerOne.name;
player2NameHeading.textContent = playerTwo.name;


/**
 * Sets the player's avatar image and related properties.
 * 
 * @param {HTMLElement} playerAvatarMainImageElement - The main avatar image element for the player.
 * @param {HTMLElement} avatarImageElement - The avatar image element selected by the player.
 * @param {Player} player - The player object to set the avatar for.
 * @param {string} avatar - The selected avatar value.
 */
function setPlayerAvatar(playerAvatarMainImageElement, avatarImageElement, player) {
  playerAvatarMainImageElement.src = avatarImageElement.src;
  avatarImageElement.classList.add("selected");
  player.setAvatar(avatarImageElement.src);
  player.save();
}


/**
 * Handles the avatar selection process for a single player game against the computer.
 * Adds a click event listener to each avatar image element.
 * When an avatar is selected by the player, it sets the avatar for the player,
 * displays a message, waits for a brief period, handles computer avatar selection,
 * and triggers the game to begin.
 */
function handleSinglePlayerMode() {

  avatarImageElements.forEach((avatarImageElement) => {
    avatarImageElement.addEventListener("click", () => {
      if (!playerOne.avatar && !playerTwo.avatar) {

        setPlayerAvatar(player1AvatarImageElement, avatarImageElement, playerOne);
        displayMsg("Player 1: Avatar selected", "green", true, 1);
        displayMsgToPlayerToChooseAvatar();

        if (!playerTwo.avatar) {
          displayMsg("Please wait, Computer is now processing their choice...", "red", true, 2);
          setTimeout(() => {
            handleComputerAvatarSelection();
            _run();
          }, 3000);
        }
      } 
      
      _run();
      
    });
  });
}

/**
 * Handles the avatar selection for both players in a two-player mode.
 * Allows each player to choose their avatar by clicking on the corresponding avatar image.
 * Once both players have selected their avatars, the game continues.
 */
function handleTwoPlayerMode() {

  avatarImageElements.forEach((avatarImageElement) => {

    if (!playerOne.avatar && !playerTwo.avatar) {
      avatarImageElement.addEventListener("click", () => {
        const avatar = avatarImageElement.getAttribute(mySettings.Avatar.Img.Attribute.data1);

        if (!playerOne.avatar) {
          setPlayerAvatar(player1AvatarImageElement, avatarImageElement, playerOne, avatar);
          displayMsg("Player 1: Avatar selected", "green", true, 1);
        } else if (!playerTwo.avatar) {
          setPlayerAvatar(player2AvatarImageElement, avatarImageElement, playerTwo, avatar);
          displayMsg("Player 2: Avatar selected", "green", true, 2);
        }

        if (playerOne.avatar && playerTwo.avatar) {
          _run();
        }
      });
    }
  });
}


/**
 * Handles the avatar selection for the computer player in a single-player mode.
 * Randomly selects an avatar image for the computer player and updates the UI accordingly.
 */
function handleComputerAvatarSelection() {
  // Dictionary of available avatar image choices
  const avatars = {
    0: "avatar1.jpeg",
    1: "avatar2.jpg",
    2: "avatar3.png",
    3: "avatar5.jpg",
    4: "avatar6.jpeg",
    5: "avatar7.jpeg",
    6: "avatar8.jpg",
  };

  // Randomly choose an avatar image
  const avatarNumberChoice = getRandomChoice(Object.keys(avatars).length);
  const computerAvatarImgChoice = avatars[avatarNumberChoice];
  const avatarImgPath = `img/${computerAvatarImgChoice}`;

  // Set the selected avatar image for the computer player
  player2AvatarImageElement.src = avatarImgPath;
  playerTwo.setAvatar(avatarImgPath);
  playerTwo.save();

  // Display a message indicating the computer avatar selection
  displayMsg("Computer avatar selected", "green", true, 2);

  // Continue with the single-player mode
  handleSinglePlayerMode();
}


/**
 * Displays a message to prompt Player 1 or Player 2 to choose their avatar.
 * If Player 1 has not chosen an avatar, the message is displayed for Player 1;
 * otherwise, it is displayed for Player 2.
 */
function displayMsgToPlayerToChooseAvatar() {
  if (!playerOne.avatar) {
    displayMsg("Player 1 choose your avatar", "red", true, 1);
  } else {
    displayMsg("Player 2 choose your avatar", "red", true, 2);
  }
}


/**
 * Displays a message for a specific player with the given content and style.
 * The message is displayed in uppercase and can be optionally bold.
 * The player number determines which player's message to update.
 *
 * @param {string} msg - The content of the message.
 * @param {string} color - The color of the message text.
 * @param {boolean} [bold=false] - Whether to display the message in bold.
 * @param {number} [messageForPlayer=1] - The player number for whom the message is intended.
 */
function displayMsg(msg, color, bold = false, messageForPlayer = 1) {
  const playerMsg = {
    1: avatarPlayer1Msg,
    2: avatarPlayer2Msg,
  };

  playerMsg[messageForPlayer].textContent = msg.toUpperCase();
  playerMsg[messageForPlayer].style.color = color;
  playerMsg[messageForPlayer].classList.add(mySettings.Transition.fadeInAndOutClass);

  if (bold) {
    playerMsg[messageForPlayer].style.fontWeight = "bold";
  } else {
    playerMsg[messageForPlayer].style.fontWeight = "normal";
  }
}


/**
 * Redirects the user to the game page after selecting avatars.
 * Updates the heading and displays a countdown message before redirection.
 * The redirection occurs after 3 seconds.
 */
function goToGame() {
  
  getQuery(mySettings.Headings.SubHeadings.heading1).textContent = "Avatars selected";

  const heading2 = getQuery(mySettings.Headings.SubHeadings.heading2);
  heading2.textContent = "Game will begin in 3 seconds...";
  heading2.classList.add(mySettings.Transition.fadeInAndOutClass);

  setTimeout(() => {
    document.location.href = mySettings.Pages.gamePage;
  }, 3000);
}


/**
 * Executes the necessary actions based on the selected avatars and game mode.
 * If both player avatars are selected, it sets up a redirection to the game page after 3 seconds.
 * If the game mode is "two player mode", it calls the handleTwoPlayerMode() function.
 * If the game mode is "single player mode", it calls the handleSinglePlayerMode() function.
 */
function _run() {
  if (playerOne.avatar && playerTwo.avatar) {
    getQuery(mySettings.Headings.SubHeadings.heading2).textContent = "Redirecting to game in 3 seconds...";
    setTimeout(() => {
      goToGame();
    }, 3000);
  } else {
    if (localStorage.getItem("mode") === mySettings.Game.Mode.twoPlayerMode) {
      handleTwoPlayerMode();
    } else {
      handleSinglePlayerMode();
    }
  }
}



_run();