import * as types from "../shared/types/input";

abstract class Serializable {
    constructor() {

    }

    serialize():types.None {
        return {}
    }
}

export default Serializable;