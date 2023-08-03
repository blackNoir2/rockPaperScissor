/**
 * Settings file for managing HTML class names and IDs.
 *
 * Use this file to define and update the class names and IDs used in the HTML elements
 * that are accessed and manipulated by the JavaScript code. By centralizing the settings
 * in this file, it becomes easier to make changes to the class names and IDs without
 * modifying the JavaScript code directly.
 *
 * Usage:
 * - Modify the class names and IDs defined in this file to match your HTML structure.
 * - Update the class names and IDs in this file if you make changes to your HTML structure.
 *
 * Note: Remember to update the JavaScript code that references these class names and IDs
 * if you make any changes here.
 */

const settings = {

  // menu.js for menu.html 
  Menu: {

    Heading: {
      H1: ".menu h3",
    },

    Btn: {
      continueBtnClassSelector: ".continueBtn",
      playGameBtnClassSelector: ".play-game",
      imageBtn: ".main-image",

    },

    Form: {

      singlePlayerFormIDSelector: "#singlePlayerNameForm",
      twoPlayerUserFormIDSelector: "#playerNameForm",

      Fields: {
        player1IDSelector: "#player1",
        player2IDSelector: "#player2",
      }

    },


    GameMode: {
      ID: "#gameMode",
      Option: {
        numOfGamesIDSelector: "#numberOfGames",
      }
    }

  },


  // EnterPage.js for enterPlayerName.html
  EnterPlayer: {
    Form: {
      ID: "#playerNameForm",
      player1InputFormIDSelector: "#player1",
      player2InputFormIDSelector: "#player2",
    }
  },


  Avatar: {
        avatarClassSelector : ".avatar",
        avatarPlayer1TurnClassSelector: ".avatar-player1-turn",
        avatarPlayer2TurnClassSelector: ".avatar-player2-turn",

        Img: {
          player1Avatar: ".player-1-avatar img",
          player2Avatar: ".player-2-avatar img",

          Attribute: {
            data1: "data-avatar",
          }
        },

        Heading: {
          H1: {
            player1ClassSelector: ".player1-h1",
            player2ClassSelector: ".player2-h1",
          }
        },
        
      },
      // Home Page Container
      homePageDivSelector: "#home-page",
      homePageContainerSelector: "#home-page .container",

      // Form elements
      Form: {
        singlePlayerNameIDFormSelector: "#singlePlayerNameForm",
        twoPlayerNameIDFormSelector: "playerNameForm",
      },

      // menu h1 elements
      Headings: {
        H1: {
          menuH1HeadingClassSelector: ".menu h1",
        },
        H2: {
          winner: ".info h2",
        }, 

        SubHeadings: {
          heading1: ".heading",
          heading2: ".heading2",
        },

   

  },


  // Button and Rule Display
  Btns: {
    // play game elements
    playGameBtnClassSelector: ".play-game",
    continueBtnClassSelector: ".continueBtn",
    closeRulesButtonClassSelector: ".close-rules-button",
    playNewGameClassSelector: ".play-new-game",
    playAgainClassSelector: ".play-again",
    rulesBtnIDSelector: "#button-rules",
    viewRulesClassSelector: ".view-rules",
    showRulesClassSelector: ".show-rules",

  },

  // Game Over Message elements

  // game mode elements
  selectGameModeIDSelector: "#gameMode",

  // game selection option


  // Display Elements
  Display: {

    roundClassSelector: ".round",
    showChoiceClassSelector: ".show-choice",
    numberOfRoundClassSelector: ".numberOfRounds",
    numberOfGamesLeftClassSelector: ".numberOfGamesLeft",
  

  },

  // Player Attributes
  Player: {
    ID : {
      player1: "#player1",
      player2: "#player2",
    },
    
    Choice: {
      player1ChoiceClassSelector: ".player1-choice",
      player2ChoiceClassSelector: ".player2-choice",
      playerChoiceSelection     :  (currentPlayer) => `.player${currentPlayer}-choice p`,
      playerChoiceImageSelection:  (currentPlayer) => `.player${currentPlayer}-choice img`,

    },
    
    Label: {
      player1LabelClassSelector: ".player1-label",
      player2LabelClassSelector: ".player2-label",
      flexBoxPlayer1LabelClassSelector: ".flex-box-player1-label",
      flexBoxPlayer2LabelClassSelector: ".flex-box-player2-label",
    },
    

    Score: {
      player1ScoreClassSelector: ".player1-score",
      player2ScoreClassSelector: ".player2-score",

    },
    
  },

  // Result Display
  resultClassSelector: ".result",

  // Image Paths
  Img: {
    Path: {
      rockImagePath: "img/rock.png",
      scissorImagePath: "img/scissor.png",
      paperImagePath: "img/paper.jpeg",
    },

   
    // Player Image Classes
    player1ImageClassSelector: ".player1-img",
    player2ImageClassSelector: ".player2-img",

  },


  Hide: {
    // Spoiler Tags
    Spoiler: {
      spoilerPTagClassSelector: ".spoiler-p-tag",
      spoilerTagClassSelector: ".spoiler-tag",
    },

    // Hide Image
    hideImgClassSelector: ".hide-img",
  
   
    hideGameScreen: "hide-game-screen",

    dNone: "none",
  },


  // classes
  Classes: {
      hideField: "hide-fields",
      hideGameScreen: "hide-game-screen",
      playerChoice: "player-choice",
      showRules: "show-rules",
      spoilerPTag: "spoiler-p-tag",
      showChoice: "show-choice",
      spoilerTag: "spoiler-tag",
      hideImage: "hide-img",
      darkenImage: "darker-img",
      hiddenLabelColor: "hidden-label-title-text",
      revealLabelColor: "reveal-title-text",

  },

  // Transition Class

  Transition: {
    fadeInAndOutClass: "transition-class",
    blinkingTextClass: "blinking-text",

  },



  // User Input Fields

  Fields: {

    userInputFieldsClassSelector: ".userInputFields",
    player1IDFieldSelector: "#player1",
    player2IDFieldSelector: "#player2",

    InputField: {
      Color: {

        // The color for the field when the field is either active or disabled
        background: {
          active   : "white",
          notActive: "lightgray",
        }
      }
    }

  },

  // The outcome for the game
  Game: {
    GameOverScreen: {
      Heading: {
        h2: ".info h2",
      }
    },
    OutCome: {
      winner: "Winner",
      tie   : "Tie",
    },
    Mode: {
      singlePlayerMode: "single player mode",
      twoPlayerMode   : "two player mode",
    },
    Options: {
      computerVsHuman: "computerVShuman",
      humanVshuman   : "humanVshuman",
    },
    Messages: {
      Round: {
        finalRound: "Final Round",
        color: "red",
        remainingRounds: "Number of rounds to play: {numOfRounds}",
        gamesLeft      : "Number of rounds played: {gamesRemaining}",
      },

      Outcome: {
        Tie: {
          heading: "The game was a tie",
          tieMessageWithPlayers: "It's a Tie between {player1} and {player2}",
        },
        Winner: {
          winnerMsg: "The winner is {winnerName}",
        },

      
      },

      Fields: {
        display: ".user-turn",
      }
    },
    Score: {
      score: "Score {playerScore}"
    },
  },
 

 



  // End Game Screen
  endGameScreen: ".end-game-screen",

  // Game Info Elements
  gameInfoClassSelector: ".gameInfo",
  gameInfoH2DisplayclassSelector: ".info h2",

  // User Turn
  userTurnClassSelector: ".user-turn",

  // Pages
  Pages: {

    avatarPage: "/avatar.html",
    menuPage: "/menu.html",
    singlePlayerPage: "/singleplayer.html",
    twoPlayerPage: "/enterplayername.html",
    gamePage: "/game.html",
    
  },


};


export default settings;