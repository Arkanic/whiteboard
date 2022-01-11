import * as input from "../shared/types/input";
import Position from "./position";

class Line {
    finished:boolean;
    color:number;
    segments:Array<Position>;

    constructor(color:number, start:Position) {
        this.finished = false;
        this.color = color;
        this.segments = [start];
    }

    addSegment(pos:Position) {
        if(this.finished) return;
        this.segments.push(pos);
    }

    finish() {
        this.finished = true;
    }

    serialize():input.Line {
        return {
            finished: this.finished,
            color: this.color,
            segments: this.segments
        }
    }
}

export default Line;