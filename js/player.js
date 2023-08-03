import { LocalStorage } from "./localStorage.js";

/**
 * Represents a Player in the game.
 */
class Player {
    #data;
    _storage;

    /**
     * Create a new Player instance.
     * @param {string} name - The name of the player.
     */
    constructor(name) {
        this.name   = name;
        this.score  = 0;
        this.choice = null;
        this.wins   = [];
        this.avatar = null;
        this._storage = new LocalStorage(this.name);
        this.#data = this.getData();

    }

    /**
     * Set the name of the player.
     * @param {string} name - The new name of the player.
     */
    setName(name) {
        this.name = name;
        this.#data.name = this.name;
    }

    /**
     * Set the avatar of the player.
     * @param {string} avatarPath - The path to the player's avatar image.
     */
    setAvatar(avatarPath) {
        this.avatar = avatarPath;
        this.#data.avatar = this.avatar
    }

    /**
     * Increase the player's score by one.
     */
    increaseScoreByOne() {
        this.score = parseInt(this.score) + 1;
        this.#data.score = this.score;
    }

    /**
     * Set the list of wins for the player.
     * @param {string} win - The outcome of the win.
     */
    setWins(win) {
        if (Array.isArray(this.#data.wins)) {
            this.#data.wins.push(win);
        } else {
            this.wins.push(win);
            this.#data.wins = this.wins;
        }
    }

    /**
     * Set the player's choice.
     * @param {string} choice - The choice made by the player.
     */
    setChoice(choice) {
        this.choice        = choice;
        this.#data.choice = choice;
    }

    /**
     * Get the player's data from local storage.
     * @returns {object} - The player's data.
     */
    getData() {
        return this._storage.getData() || {};
    }

    /**
     * Save the player's data to local storage.
     */
    save() {
        this._storage.saveData(this.#data);
    }

    /**
     * Get a player instance by name from local storage.
     * @param {string} name - The name of the player to retrieve.
     * @returns {Player} - The player instance.
     */
    static getPlayerByName(name) {
        const player = new Player(name);
        const data = player.getData();
        
        if (data) {
            player.name   = data.name;
            player.score  = data.score !== typeof(0) ? 0 : data.score;
            player.choice = data.choice;
            player.wins   = data.wins;
            player.avatar = data.avatar;
             
            return player;
        }
    }
}

export { Player };
