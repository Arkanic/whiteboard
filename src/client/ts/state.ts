import Line from "../../shared/line";
import Position from "../../shared/position";
import * as input from "../../shared/types/input";

let board:{[unit:string]:Line} = {};

export function newData(data:input.Draw) {
    if(data.mode == input.DT.Start) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);
        let line = new Line(data.id, "0", data.color as number, pos);
        board[data.id] = line;
    } else if(data.mode == input.DT.Continue) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);
        board[data.id].addSegment(pos);
    } else if(data.mode == input.DT.Finish) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);
        board[data.id].addSegment(pos);
        board[data.id].finish();
    } else if(data.mode == input.DT.Delete) {
        delete board[data.id];
    }
}

export function getBoard():{[unit:string]:Line} {
    return board;
}