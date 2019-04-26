/**
 * Worker model
 */
class Worker {
    constructor(data = {}) {
        this.gameId = null;
        this.x = null;
        this.y = null;
        Object.assign(this, data);
    }
}

export default Worker;
