/**
 * Game model
 */
import Player from "./Player";

class GameModel {
    constructor(data = {}) {
        this.id = null;
        this.player1 = Player;
        this.player2 = Player;
        this.gameMode = null;
        this.size = null;
        this.gameStatus = null;
        this.isPlaying = false;
        Object.assign(this, data);
    }
}

export default GameModel;