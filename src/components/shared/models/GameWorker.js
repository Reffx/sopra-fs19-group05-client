/**
 * GameWorker model
 */
class GameWorker {
    constructor(data = {}) {
        this.workerId = null;
        this.playerId = null;
        this.position = null;
        this.next = null;
        this.winner = null;
        this.layout = null;
        Object.assign(this, data);
    }
}

export default GameWorker;
