import Line from "../../shared/line";
import Position from "../../shared/position";
import * as input from "../../shared/types/input";

type WB = {[unit:string]:Line};

let board:WB = {};
let clientBoard:WB = {};

export function handleSync(data:input.Whiteboard) {
    board = {};
    clientBoard = {};
    data.lines.forEach(line => {
        let l = new Line(line.id, line.owner, line.color, new Position(line.segments[0].x, line.segments[0].y));
        for(let i = 1; i < line.segments.length; i++) {
            let segment = line.segments[i];
            l.addSegment(new Position(segment.x, segment.y));
        }
        board[line.id] = l;
    });
}

function addData(data:input.Draw, to:WB) {
    if(data.mode == input.DT.Start) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);
        let line = new Line(data.id, "0", data.color as number, pos);
        to[data.id] = line;
    } else if(data.mode == input.DT.Continue) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);
        to[data.id].addSegment(pos);
    } else if(data.mode == input.DT.Finish) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);
        to[data.id].addSegment(pos);
        to[data.id].finish();
    } else if(data.mode == input.DT.Delete) {
        delete to[data.id];
    }
}

export function newData(data:input.Draw) {
    addData(data, board);
}

export function newClientData(data:input.Draw) {
    addData(data, clientBoard);
}

export function getBoard():{[unit:string]:Line} {
    let b:WB = {};
    for(let i in board) {
        if(clientBoard[i]) b[i] = clientBoard[i];
        else b[i] = board[i];
    }

    return b;
}