/**
 * Field model
 */
class Field {
    constructor(data = {}) {
        this.id = null;
        this.fieldNum = null;
        this.height = null;
        this.occupation = null;
        this.reachedMaxHeight = null;
        this.x_coordinate = null;
        this.y_coordinate = null;
        this.layout = null;
        Object.assign(this, data);
    }
}

export default Field;
