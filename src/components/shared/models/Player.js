import "./Worker";

/**
 * PlayerView model
 */
class Player {
    constructor(data = {}) {
        this.id = null;
        this.username = null;
        this.status = null;
        this.gameId = null;
        this.isReady = null;
        this.color = null;
        this.worker1 = new Worker(null);
        this.worker2 = new Worker(null);
        Object.assign(this, data);
    }
}

export default Player;
