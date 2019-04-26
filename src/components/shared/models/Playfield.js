/**
 * Playfield model
 */
class Playfield {
    constructor(data = {}) {
        this.id = null;
        this.x = null;
        this.y = null;
        this.gameId = null;
        this.layout = null;
        this.worker = null;
        Object.assign(this, data);
    }
}

export default Playfield;
