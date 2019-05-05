/**
 * State model
 */
class State {
    constructor(data = {}) {
        this.gameId = null;
        this.state = null;
        this.playerId = null;
        this.message = null;
        Object.assign(this, data);
    }
}

export default State;
