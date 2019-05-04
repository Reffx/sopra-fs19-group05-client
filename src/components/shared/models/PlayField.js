/**
 * Playfield model
 */
class PlayField {
    constructor(data = {}) {
        this.id = null;
        this.allFields = null;
        Object.assign(this, data);
    }
}

export default PlayField;
