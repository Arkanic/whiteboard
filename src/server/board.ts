import io from "socket.io";
import {nanoid} from "nanoid";

import constants from "../shared/constants";
import * as input from "../shared/types/input";

import User from "./user";
import Line from "./line";

class Board {
    sockets:{[key:string]:io.Socket};
    users:{[key:string]:User};

    lines:{[key:string]:Line};

    constructor() {
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
}

export default Board;