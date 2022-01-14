import * as input from "./types/input";
import Serializable from "./serializable";

class Position extends Serializable {
    x:number;
    y:number;

    constructor(x:number, y:number) {
        super();
        
        this.x = x;
        this.y = y;
    }

    serialize():input.Position {
        return {
            x: this.x,
            y: this.y
        }
    }
}

export default Position;