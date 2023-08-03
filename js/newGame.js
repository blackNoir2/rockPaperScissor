import { LocalStorage } from "./localStorage.js";
import { getQuery }     from "./utils/getQuery.js";
import { Player }       from "./player.js";
import {
  generateID,
  getRandomChoice
} from "./utils/genID.js";
import { getDictValue } from "./utils/getDictValue.js";
import mySettings       from "./settings.js";


const closeRulesBtn   = getQuery(mySettings.Btns.closeRulesButtonClassSelector);
const playAgainBtn    = getQuery(mySettings.Btns.playGameBtnClassSelector);
const playNewGameBtn  = getQuery(mySettings.Btns.playNewGameClassSelector);
const rulesBtn        = getQuery(mySettings.Btns.rulesBtnIDSelector);
const rulesDivElement = getQuery(mySettings.Btns.viewRulesClassSelector);


if (playAgainBtn) {
  playGameAgain()
}

if (playNewGameBtn) {
  playNewGame();
}

/**
 * Event listener for the close rules button.
 * Hides the rules div element by adding the "show-rules" class.
 */

closeRulesBtn.addEventListener("click", () => {
  rulesDivElement.classList.add(mySettings.Classes.showRules);
})


/**
 * Event listener for the play again button.
 * Reloads the current page, effectively restarting the game.
 */
function playGameAgain() {
  playAgainBtn.addEventListener("click", () => {
    document.location.reload();
  })
}

/**
 * Event listener for the play new game button.
 * Clears the localStorage data and redirects the user to the menu page.
 */
function playNewGame() {
  playNewGameBtn.addEventListener("click", () => {
    localStorage.clear();
    document.location.href = mySettings.Pages.menuPage;
  });
}

/**
 * Event listener for the rules button.
 * Toggles the visibility of the rules div element by adding or removing the "show-rules" class.
 */

rulesBtn.addEventListener("click", () => {
  rulesDivElement.classList.toggle(mySettings.Classes.showRules);
})

/**
 * Utility class for handling UI-related tasks in the game.
 */
class HandleUI {
  /**
   * Displays the final round message on the UI.
  */
  static displayFinalRoundMessage() {

    const roundElement       = getQuery(mySettings.Display.roundClassSelector);
    roundElement.textContent = mySettings.Game.Messages.Round.finalRound;
    roundElement.style.color = mySettings.Game.Messages.Round.color;

  }

  /**
   * Displays the player names on the UI.
   *
   * @param {Player} player1 - Player 1 object.
   * @param {Player} player2 - Player 2 object.
   */
  static displayName(player1, player2) {

    const player1LabelElement       = getQuery(mySettings.Player.Label.player1LabelClassSelector);
    const player2LabelElement       = getQuery(mySettings.Player.Label.player2LabelClassSelector);

    player1LabelElement.textContent = player1.name;
    player2LabelElement.textContent = player2.name;

  }

  /**
   * Displays the current round on the UI.
   *
   * @param {number} round - The current round number.
   */
  static displayRound(round) {
    const roundElement       = getQuery(mySettings.Display.roundClassSelector);
    roundElement.textContent = `Round ${round}`;
  }

  /**
    * Handles the player's choice and updates the UI accordingly.
    *
    * @param {Player} player - The player object.
    * @param {number} currentPlayer - The current player number.
    */
  static handleChoice(player, currentPlayer) {

    if (currentPlayer === 1) {
      const divName = mySettings.Player.Choice.player1ChoiceClassSelector;
      HandleUI._createSpoilerChoiceElement(divName, player);
    } else {
      const divName = mySettings.Player.Choice.player2ChoiceClassSelector;
      HandleUI._createSpoilerChoiceElement(divName, player);
    }
  }


  /**
 * Creates a new spoiler choice element inside the specified div container based on the player's choice.
 *
 * @param {string} divName - The name of the div container.
 * @param {Player} player - The player object.
 */
  static _createSpoilerChoiceElement(divName, player) {
    const divElement = getQuery(divName);

    if (divElement.childElementCount === 0) {
      const images = {
        "R": mySettings.Img.Path.rockImagePath,
        "S": mySettings.Img.Path.scissorImagePath,
        "P": mySettings.Img.Path.paperImagePath,
      };


      const alt = {
        "R": "Rock",
        "P": "Paper",
        "S": "Scissor"
      };

      // Create a <p> element for player
      const playerLabel       = document.createElement('p');
      playerLabel.textContent = `${player.name} choice is hidden:`;

      playerLabel.classList.add(mySettings.Classes.spoilerTag);
      playerLabel.classList.add(mySettings.Classes.hiddenLabelColor);

      // Create the image element for the player choice
      const playerChoiceImg = document.createElement('img');
      playerChoiceImg.src   = images[player.choice];
      playerChoiceImg.alt   = alt[player.choice];

      playerChoiceImg.classList.add(mySettings.Classes.playerChoice);
      playerChoiceImg.classList.add(mySettings.Classes.hideImage);

      // Append the new elements to the div element
      divElement.classList.add(mySettings.Classes.spoilerTag);
      divElement.appendChild(playerLabel);
      divElement.appendChild(playerChoiceImg);

      divElement.classList.add(mySettings.Classes.showChoice);
    }
  }

  /**
   * Hides the home screen UI.
  */
  static hideHomeScreen() {

    const homeScreen         = getQuery(mySettings.homePageContainerSelector);
    homeScreen.style.display = "none";
    homeScreen.classList.add(mySettings.Transition.fadeInAndOutClass);
   
  }

  /**
  * Hides the player 2 input field on the UI.
  */
  static hidePlayer2InputField() {

    const player2Field         = getQuery(mySettings.Player.ID.player2);
    const player2Label         = getQuery(mySettings.Player.Label.flexBoxPlayer2LabelClassSelector);
    player2Field.style.display = "none";
    player2Label.style.display = "none";

  }

  /**
   * Hides the round message on the UI.
  */
  static hideRoundMessage() {
    const roundElement = getQuery(mySettings.Display.roundClassSelector);
    roundElement.style.display = "none";
  }


  /**
   * Hides the end game screen UI.
   */
  static hideEndGameScreen() {
    const hideScreenElement = getQuery(mySettings.endGameScreen);
    hideScreenElement.classList.add(mySettings.Hide.hideGameScreen);
    getQuery(mySettings.Game.GameOverScreen.Heading.h2).classList.add(mySettings.Hide.dNone)
  }

  /**
   * Hides the user input fields.
   */
  static hideUserInputFields() {
    const userFieldsElements = getQuery(mySettings.Fields.userInputFieldsClassSelector);
    userFieldsElements.classList.add(mySettings.Classes.hideField);
  }

  /**
   * Hides the player choices.
   */
  static _hidePlayerChoices(divName, currentPlayer) {

    const divElement      = getQuery(divName);
    const playerLabel     = divElement.querySelector(mySettings.Player.Choice.playerChoiceSelection(currentPlayer));
    const playerChoiceImg = divElement.querySelector(mySettings.Player.Choice.playerChoiceImageSelection(currentPlayer));

    if (divElement.childElementCount > 0) {

      divElement.classList.remove(mySettings.Classes.spoilerTag);
      divElement.removeChild(playerLabel);
      divElement.removeChild(playerChoiceImg);
      divElement.classList.remove(mySettings.Classes.showChoice);

    }
  }

  /**
   * Handles the display of scores on the UI.
   *
   * @param {Player} player1 - Player 1 object.
   * @param {Player} player2 - Player 2 object.
   */
  static handleScores(player1, player2) {

    const player1ScoreElement       = getQuery(mySettings.Player.Score.player1ScoreClassSelector);
    const player2ScoreElement       = getQuery(mySettings.Player.Score.player2ScoreClassSelector);

    player1ScoreElement.textContent = mySettings.Game.Score.score.replace('{playerScore}', player1.score);
    player2ScoreElement.textContent = mySettings.Game.Score.score.replace('{playerScore}', player2.score);

  }

  /**
   * Handles the display of the winner on the UI.
   *
   * @param {Player} winner - The winner player object.
  */
  static handleWinner(winner) {

    HandleUI._revealPlayerChoices();
    HandleUI._displayWinnerResult(winner)
  }


  /**
   * Handles the display of a tie on the UI.
   *
   * @param {Player} player1 - Player 1 object.
   * @param {Player} player2 - Player 2 object.
   */
  static handleTie(player1, player2) {

    HandleUI._revealPlayerChoices();
    HandleUI._displayTieResult(player1, player2);

  }

  /**
 * Displays the winner result in the result div container.
 *
 * @param {Player} winner - The winning player object.
 */
  static _displayWinnerResult(winner) {
    
    const divName         = mySettings.resultClassSelector;
    const resultDiv       = getQuery(divName);
    resultDiv.textContent = mySettings.Game.Messages.Outcome.Winner.winnerMsg.replace('{winnerName}', winner.name);

    resultDiv.classList.add(mySettings.Classes.showChoice);

  }

  /**
 * Displays the tie result in the UI with player names.
 *
 * @param {string} player1Name - The name of player 1.
 * @param {string} player2Name - The name of player 2.
 */
  static _displayTieResult(player1, player2) {

    const divName      = mySettings.resultClassSelector;
    const resultDiv    = getQuery(divName);
    const pTagElement1 = document.createElement("p");
    const pTagElement2 = document.createElement("p");

    pTagElement1.textContent = mySettings.Game.Messages.Outcome.Tie.heading;
    pTagElement2.textContent = mySettings.Game.Messages.Outcome.Tie.tieMessageWithPlayers.replace('{player1}', player1.name).replace('{player2}', player2.name);

    resultDiv.appendChild(pTagElement1);
    resultDiv.appendChild(pTagElement2);

    resultDiv.classList.add(mySettings.Classes.showChoice);
  }

  /**
   * Resets the game board on the UI.
  */
  static resetBoard() {
    HandleUI._hidePlayerChoices(mySettings.Player.Choice.player1ChoiceClassSelector, 1);
    HandleUI._hidePlayerChoices(mySettings.Player.Choice.player2ChoiceClassSelector, 2);

    setTimeout(() => {
      getQuery(mySettings.resultClassSelector).classList.remove(mySettings.Classes.showChoice);
    }, 1000)

    getQuery(mySettings.Game.Messages.Fields.display).textContent = "Play"
  }

  /**
   * Helper method to reveal player choices on the UI.
  */
  static _revealPlayerChoices() {
    const divElements      = document.querySelectorAll(mySettings.Hide.Spoiler.spoilerTagClassSelector);
    const divImageElements = document.querySelectorAll(mySettings.Hide.hideImgClassSelector);
    const divLabelElements = document.querySelectorAll(mySettings.Hide.Spoiler.spoilerPTagClassSelector);

    divElements.forEach((divElement) => {
      divElement.classList.remove(mySettings.Classes.spoilerTag)

    });

    divImageElements.forEach((divImageElement) => {
      divImageElement.classList.remove(mySettings.Classes.hideImage);
    })

    // The label that is title for the user's choice
    divLabelElements.forEach((divLabelElement) => {
      divLabelElement.classList.remove(mySettings.Classes.spoilerPTag);
      divLabelElement.textContent = divLabelElement.textContent.split("hidden").join(' ');

      console.log(divLabelElement.textContent);
      // Note to self - figure out why the text is not displaying "Player choice is in the is line"
      divLabelElement.classList.remove(mySettings.Classes.hiddenLabelColor);
    })


  }

  /**
 * Displays the end game screen and hides the home screen.
 * It adds the "Game Over" heading to the game info div element and hides the user input fields and round message.
 */
  static showEndGameDisplay() {

    const hideScreenElement = getQuery(mySettings.endGameScreen);

    getQuery(mySettings.Game.GameOverScreen.Heading.h2).classList.remove(mySettings.Hide.dNone)

    const gameInfoDivElement     = getQuery(mySettings.gameInfoClassSelector);
    const homePageElement        = getQuery(mySettings.homePageDivSelector);
    const gameOverHeading        = document.createElement('h1');
    const roundsElements         = getQuery(mySettings.Display.numberOfRoundClassSelector);
    const numOfGamesLeft         = getQuery(mySettings.Display.numberOfGamesLeftClassSelector);

    roundsElements.style.display = "none";
    numOfGamesLeft.style.display = "none";
    gameOverHeading.textContent  = "Game Over";

    setTimeout(() => {
      HandleUI.hideHomeScreen();

      setTimeout(() => {
        hideScreenElement.classList.remove(mySettings.Classes.hideGameScreen);
        homePageElement.classList.add(mySettings.Classes.hideGameScreen);

        gameInfoDivElement.appendChild(gameOverHeading);
        HandleUI.hideUserInputFields();
        HandleUI.hideRoundMessage();
      }, 3000);
    }, 4000);
  }



  /**
  * Displays the player avatars on the screen.
  *
  * @param {string} player1ImgSrc - The image source for player 1's avatar.
  * @param {string} player2ImgSrc - The image source for player 2's avatar.
  */
  static showPlayerAvatars(player1ImgSrc, player2ImgSrc) {

    const player1PlayerAvatar = getQuery(mySettings.Img.player1ImageClassSelector);
    const player2PlayerAvatar = getQuery(mySettings.Img.player2ImageClassSelector);

    player1PlayerAvatar.src   = player1ImgSrc;
    player2PlayerAvatar.src   = player2ImgSrc;

    // if the player 2 has picked the same image as player 1 make one of the image darker
    if (player1PlayerAvatar.src === player2PlayerAvatar.src) {
      player2PlayerAvatar.classList.add(mySettings.Classes.darkenImage);
    }
  }


  /**
   * Shows the user's turn message based on the game state.
   *
   * @param {boolean} hasPlayer1HadTheirTurn - Indicates if player 1 has had their turn.
   * @param {boolean} hasPlayer2HadTheirTurn - Indicates if player 2 has had their turn.
   * @param {boolean} singlePlayerMode - Indicates if the game is in single player mode.
   */
  static showUserTurn(hasPlayer1HadTheirTurn, hasPlayer2HadTheirTurn, singlePlayerMode = false) {
    const userTurnElement = getQuery(mySettings.userTurnClassSelector);

    if (hasPlayer1HadTheirTurn && hasPlayer2HadTheirTurn) {
      userTurnElement.textContent = "No Turns available";
    } else if (hasPlayer1HadTheirTurn && !singlePlayerMode) {
      userTurnElement.textContent = "Player 2: Make your Choice....";
    } else if (hasPlayer2HadTheirTurn) {
      userTurnElement.textContent = "Player 1: Make your Choice....";
    } else if (!singlePlayerMode) {
      userTurnElement.textContent = "Take turns to enter your choice....";
    } else if (!hasPlayer1HadTheirTurn && !hasPlayer2HadTheirTurn) {
      getQuery(mySettings.Game.Messages.Fields.display).textContent = "Play";
    }
  }

  /**
  * Displays the winner of the game.
  *
  * @param {string} winner - The name of the winner.
  */
  static showWinner(winner) {
    getQuery(mySettings.Headings.H2.winner).textContent = `${winner} wins`;
  }

  /**
   * Updates the game information with the number of rounds and games remaining.
   *
   * @param {number} numOfRounds - The number of rounds to play.
   * @param {number} gamesRemaining - The number of games remaining.
   */
  static updateGameInfo(numOfRounds, gamesRemaining) {
    getQuery(mySettings.Display.numberOfRoundClassSelector).textContent     = mySettings.Game.Messages.Round.remainingRounds.replace('{numOfRounds}', numOfRounds);
    getQuery(mySettings.Display.numberOfGamesLeftClassSelector).textContent = mySettings.Game.Messages.Round.gamesLeft.replace('{gamesRemaining}', gamesRemaining);
  }

}

class Game {

  #gameData;
  _storage;
  isRunning;

  constructor(gameID, player1, player2, numOfGames, isOpponentComputer = false) {
    this.id                = "Game" + gameID;
    this.player1            = player1;
    this.player2            = player2;
    this.numOfGames         = numOfGames;
    this.numOfGamesPlayed   = 0;
    this.roundNumber        = 1;
    this.winner             = null;
    this._storage           = new LocalStorage(this.id);
    this.isRunning          = false;
    this._player1Turn       = false;
    this._plyaer2Turn       = false;
    this.isOpponentComputer = isOpponentComputer;

    HandleUI.displayRound(this.roundNumber);
    HandleUI.showPlayerAvatars(this.player1.avatar, this.player2.avatar);

  }

 
  _getData() {
    return this._storage.getData() || {}
  }

  startGame() {
    this.isRunning = true;
    this.gameLoop();
  }

  finishGame() {

    this.isRunning = false;
    HandleUI.showEndGameDisplay();
    this._getWinner();
    HandleUI.showWinner(this.winner);
    localStorage.clear()
   
  }

  play() {

    if (this.isRunning) {
      this._startNewRound();
      this.isOpponentComputer === true ? this._humanVsComputer() : this._humanVshuman();
    } else {
      this.finishGame();
    }
  }

  _startNewRound() {

    if (isOpponentComputer) {
      HandleUI.hidePlayer2InputField();
    }

    HandleUI.displayName(this.player1, this.player2);
    HandleUI.hideEndGameScreen();
    HandleUI.updateGameInfo(this.numOfGames, this.roundNumber);
  }

  _humanVsComputer() {

    if (this.roundNumber < this.numOfGames) {

      const player1InputField = this._getPlayersFields()[0];

      this._processPlayerInput(player1InputField, this.player1, 1, true)

      if (this.player1.choice) {

        this._disabledUserInputField(player1InputField);

        HandleUI.handleChoice(this.player1, 1);

        if (!this.player2.choice) {
          this.player2.choice = this._getComputerChoice();

        }
      }

      if (this.player2.choice) {
        HandleUI.handleChoice(this.player2, 2);
        this._player2Turn = true;
      }

      if (this.player1.choice && this.player2.choice) {

        setTimeout(() => {
          this._evaluateRound(this.player1, this.player2);

          setTimeout(() => {
            HandleUI.resetBoard();

            this._activeUserInputField(player1InputField);

          }, 5000);
        }, 3000);
      }
    } else {
      this.finishGame();
    }
  }

  _getComputerChoice() {

    const gameChoicesArray = ["S", "R", "P"];
    const choice           = gameChoicesArray[getRandomChoice(gameChoicesArray.length)];
    return choice;
  }

  _humanVshuman() {

    if (this.roundNumber < this.numOfGames) {

      let [player1InputField, player2InputField] = this._getPlayersFields();

      this._processPlayerInput(player1InputField, this.player1, 1);
      this._processPlayerInput(player2InputField, this.player2, 2);

      if (this.player1.choice) {
        this._disabledUserInputField(player1InputField);
        HandleUI.handleChoice(this.player1, 1);
      }

      if (this.player2.choice) {
        this._disabledUserInputField(player2InputField);
        HandleUI.handleChoice(this.player2, 2);
      }

      if (this.player1.choice && this.player2.choice) {

        setTimeout(() => {
          this._evaluateRound(this.player1, this.player2);

          setTimeout(() => {

            HandleUI.resetBoard();

            this._activeUserInputField(player1InputField);
            this._activeUserInputField(player2InputField);

          }, 5000);
        }, 3000);
      }

    } else {
      this.finishGame();
    }
  }

  _getWinner() {
    this.winner = this.player1.score > this.player2.score ? this.player1.name : this.player2.name;
  }

  _disabledUserInputField(inputField) {

    inputField.disabled         = true;
    inputField.style.background = mySettings.Fields.InputField.Color.background.notActive;
  }

  _activeUserInputField(inputField) {
    inputField.disabled         = false;
    inputField.style.background = mySettings.Fields.InputField.Color.background.active;
  }

  _processPlayerInput(playerField, player, playerTurn, singlePlayerMode = false) {

    const gameChoicesArray = ["R", "P", "S"];
    const inputValue       = playerField.value.toUpperCase();

    if (inputValue) {
      if (!gameChoicesArray.includes(inputValue)) {
        alert("Choice must be 'R', 'P', or 'S'");
        playerField.value = "";

      } else {
        player.setChoice(inputValue);
        playerField.value = "";

        if (playerTurn === 1) {
          this._player1Turn = true;
        } else {
          this._player2Turn = true;
        }

        HandleUI.showUserTurn(this._player1Turn, this._player2Turn, singlePlayerMode)

      }

    }

  }
  _getPlayersFields() {
    const player1Field = getQuery(mySettings.Player.ID.player1);
    const player2Field = getQuery(mySettings.Player.ID.player2);
    return [player1Field, player2Field];
  }

  _getGameCombination() {
    const gameCombination = {
      "RS": mySettings.Game.OutCome.winner, // Rock beats Scissors
      "SP": mySettings.Game.OutCome.winner, // Scissors beats Paper
      "PR": mySettings.Game.OutCome.winner, // Paper beats Rock
      "RR": mySettings.Game.OutCome.tie,    // Rock vs Rock is a tie
      "SS": mySettings.Game.OutCome.tie,    // Scissors vs Scissors is a tie
      "PP": mySettings.Game.OutCome.tie,    // Paper vs Paper is a tie
    };
    return gameCombination
  }
  _evaluateRound(player1, player2) {

    // Combine player choices to form combinations
    const combination1    = `${player1.choice}${player2.choice}`;
    const combination2    = `${player2.choice}${player1.choice}`;
    const gameCombination = this._getGameCombination();

    let result, participant;

    // Check if combination1 exists in the resultMap
    [result, participant] = [getDictValue(gameCombination, combination1.toUpperCase()), this.player1];

    if (!result) {
      [result, participant] = [getDictValue(gameCombination, combination2.toUpperCase()), this.player2];
    }
    
    if (result === mySettings.Game.OutCome.tie) {
      this._handleTie(this.player1, this.player2);
    } else if (result === mySettings.Game.OutCome.winner) {
      this._handleWinner(participant);

    }

    if (result) {

      this.increaseNumOfGamesPlayed();
      this.increaseRoundByOne();

      HandleUI.handleScores(this.player1, this.player2);

      this._resetPlayerChoices();
    }

    this._isFinalRound();

  }

  _isFinalRound() {
    this.roundNumber !== this.numOfGames - 1 ? HandleUI.displayRound(this.roundNumber) : HandleUI.displayFinalRoundMessage();
  }

  _handleTie(player1, player2) {

    player1.increaseScoreByOne();
    player2.increaseScoreByOne();
    HandleUI.handleTie(player1, player2);
  }

  _handleWinner(player) {

    player.increaseScoreByOne()
    console.log(player.score);
    HandleUI.handleWinner(player);
  }

  _resetPlayerChoices() {
    this.player1.choice = "";
    this.player2.choice = "";
    this._player1Turn   = null;
    this._player2Turn   = null;
  }

  increaseNumOfGamesPlayed() {
    this.numOfGamesPlayed++;
  }

  increaseRoundByOne() {
    this.roundNumber++;
  }

  gameLoop() {
    this.play();

    if (this.isRunning) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}


const id               = generateID();
let isOpponentComputer = localStorage.getItem("mode") === mySettings.Game.Mode.twoPlayerMode ? false : true;
const numOfGames       = localStorage.getItem("numOfGames");
const playerOne        = Player.getPlayerByName(localStorage.getItem("player1"));
const playerTwo        = Player.getPlayerByName(localStorage.getItem("player2"));
const newGame          = new Game(id, playerOne, playerTwo, numOfGames, isOpponentComputer);

newGame.startGame();





