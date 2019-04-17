/**
 * Player model
 */
class Player {
    constructor(data = {}) {
        this.id = null;
        this.username = null;
        this.status = null;
        this.gameId = null;
        this.isReady = null;
        Object.assign(this, data);
    }
}
export default Player;