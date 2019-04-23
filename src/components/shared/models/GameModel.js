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
        this.creationTime = null;
        this.isplaying = false;
        this.size = null;
        Object.assign(this, data);
    }
}
export default GameModel;