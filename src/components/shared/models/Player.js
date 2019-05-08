import GameWorker from "./GameWorker";

/**
 * PlayerView model
 */
class Player {
    constructor(data = {}) {
        this.id = null;
        this.gameId = null;
        this.color = null;
        this.status = null;
        this.username = null;
        this.worker1 = GameWorker;
        this.worker2 = GameWorker;
        Object.assign(this, data);
    }
}

export default Player;
