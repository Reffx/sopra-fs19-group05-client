import "./Worker";
/**
 * Field model
 */
class Field {
    constructor(data = {}) {
        this.id = null;
        this.fieldNum = null;
        this.height = null;
        this.occupier = null;
        this.reachedMaxHeight = null;
        this.x_coordinate = null;
        this.y_coordinate = null;
        this.layout = null;
        this.workerId = null;
        Object.assign(this, data);
    }
}

export default Field;
