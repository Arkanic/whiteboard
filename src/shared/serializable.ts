import * as types from "./types/input";

abstract class Serializable {
    constructor() {

    }

    serialize():types.None {
        return {}
    }
}

export default Serializable;