/**
 * Game model
 */
class GameModel {
    constructor(data = {}) {
        this.id = null;
        this.player1 = null;
        this.player2 = null;
        this.gameMode = null;
        this.creationTime = null;
        this.isplaying = false;
        this.players = [];
        Object.assign(this, data);
    }
}
export default GameModel;