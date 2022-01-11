import * as input from "../shared/types/input";

class Position {
    x:number;
    y:number;

    constructor(x:number, y:number) {
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