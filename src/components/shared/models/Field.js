/**
 * Field model
 */
class Field {
    constructor(data = {}) {
        this.height = null;
        this.occupation = null;
        this.reachedMaxHeight = null;
        this.id = null;
        this.x_coordinate = null;
        this.y_coordinate = null;
        this.playfieldId = null;
        this.layout = null;
        Object.assign(this, data);
    }
}

export default Field;
