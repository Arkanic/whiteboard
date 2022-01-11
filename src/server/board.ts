import io from "socket.io";
import {nanoid} from "nanoid";

import constants from "../shared/constants";
import * as input from "../shared/types/input";

import Serializable from "./serializable";
import User from "./user";
import Line from "./line";
import Position from "./position";

class Board extends Serializable {
    sockets:{[key:string]:io.Socket};
    users:{[key:string]:User};

    lines:{[key:string]:Line};

    constructor() {
        super();

        this.sockets = {};
        this.users = {};
        this.lines = {};
    }

    addUser(socket:io.Socket, data:input.Join) {
        this.sockets[socket.id] = socket;
        this.users[socket.id] = new User(socket.id, data.username);
    }

    removeUser(socket:io.Socket) {
        delete this.sockets[socket.id];
        delete this.users[socket.id];
    }

    handleDraw(socket:io.Socket, data:input.Draw) {
        let pos = new Position(data.pos?.x as number, data.pos?.y as number);

        if(data.mode == input.DT.Start) {
            if(this.lines[data.id]) return;
            this.lines[data.id] = new Line(data.id, socket.id, data.color as number, pos);
        } else {
            if(this.lines[data.id].owner !== socket.id) return;

            if(data.mode == input.DT.Continue) {
                this.lines[data.id].addSegment(pos);
            } else if(data.mode == input.DT.Finish) {
                this.lines[data.id].addSegment(pos);
                this.lines[data.id].finish();
            } else if(data.mode == input.DT.Delete) {
                delete this.lines[data.id];
            }
        }

        sendData(data);
    }

    handleSync()
}

export default Board;