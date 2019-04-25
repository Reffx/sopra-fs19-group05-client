/**
 * Field model
 */
class Field {
    constructor(data = {}) {
        this.id = null;
        this.x = null;
        this.y = null;
        this.gameId = null;
        this.layout = null;
        Object.assign(this, data);
    }
}
export default Field;
