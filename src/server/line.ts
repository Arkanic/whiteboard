import * as input from "../shared/types/input";
import Serializable from "./serializable";
import Position from "./position";

class Line extends Serializable {
    id:string;
    owner:string;
    finished:boolean;
    color:number;
    segments:Array<Position>;

    constructor(id:string, owner:string, color:number, start:Position) {
        super();
        
        this.id = id;
        this.owner = owner;
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
            id: this.id,
            owner: this.owner,
            finished: this.finished,
            color: this.color,
            segments: this.segments
        }
    }
}

export default Line;