import http from "http";
import express from "express";
import socketio from "socket.io";

import constants from "./shared/constants";
import Board from "./server/board";
import * as protocol from "./protocol";

import * as input from "./shared/types/input";

const port = process.env.PORT || "8080";

const app = express();
app.set("port", port);
app.use(express.static("dist"));

let server = new http.Server(app);
let io = new socketio.Server(server);

const msg = constants.msg;

io.on("connection", function(socket:socketio.Socket) {
    socket.on(msg.join, onJoin)
    socket.on(msg.draw, onDraw);
    socket.on(msg.sync, onSync);

    socket.on("disconnect", onDisconnect);
});

server.listen(port, () => {
    console.log("Server started.");
});

let board = new Board();

function checkValidation(socket:socketio.Socket, json:any, policy:string):boolean {
    if(!protocol.validateInput(json, policy)) {
        socket.emit(msg.kick, {message: "stop it"});
        socket.disconnect();

        return true;
    }

    return false;
}

function onJoin(this:socketio.Socket, data:any) {
    if(checkValidation(this, data, "Join")) return;

    data.username = data.username.substring(0, 50) || `Player #${Math.floor(Math.random() * 1000)}`;

    console.log(`${data.username} has joined.`);
    board.addUser(this, data);
}

function onDraw(this:socketio.Socket, data:any) {
    if(checkValidation(this, data, "Draw")) return;

    let method = [
        "DrawStart",
        "DrawContinue",
        "DrawFinish",
        "DrawDelete"
    ];
    if(checkValidation(this, data, method[data.mode])) return;

    board.handleDraw(this, data);
}

function onSync(this:socketio.Socket, data:any) {
    if(checkValidation(this, data, "Sync")) return;

    board.handleSync(this, data);
}

function onDisconnect(this:socketio.Socket) {
    console.log(`${board.users[this.id].username} disconnected.`);
    
    board.removeUser(this);
}