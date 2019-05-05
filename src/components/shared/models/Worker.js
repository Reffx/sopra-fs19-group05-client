/**
 * Worker model
 */
class Worker {
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

export default Worker;
