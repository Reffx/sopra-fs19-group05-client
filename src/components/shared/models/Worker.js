/**
 * Worker model
 */
class Worker {
    constructor(data = {}) {
        this.layout = null;
        this.workerId = null;
        this.playerId = null;
        this.position = null;
        this.next = null;
        this.winner = null;
        Object.assign(this, data);
    }
}

export default Worker;
