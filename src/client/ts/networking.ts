import io from "socket.io-client";
import {throttle} from "throttle-debounce";
import constants from "../../shared/constants";
import Logger from "./logger";

import * as handlers from "./handlers";

import * as input from "../../shared/types/input";

const logger = new Logger("networking", "blue");

const protocol = (window.location.protocol.includes("https")) ? "wss" : "ws";
const socket = io(`${protocol}://${window.location.host}`, {reconnection: false});
let disconnectMessage = "Unknown. Try checking your network. If not, the server may have crashed.";

const connected:Promise<void> = new Promise(resolve => {
    socket.on("connect", () => {
        logger.log(`Connected, using ${protocol}`);
        resolve();
    });
});

export function connect() {
    connected.then(() => {
        logger.log("Starting handlers...");

        socket.on(constants.msg.sync, handlers.handleSync);
        socket.on(constants.msg.draw, handlers.handleDraw);

        socket.on(constants.msg.kick, (data:any) => {
            disconnectMessage = data.message;
        });

        socket.on("disconnect", () => {
            logger.error(disconnectMessage);

            document.getElementById("disconnected")!.classList.remove("hidden");
            document.getElementById("reconnect-button")!.addEventListener("click", () => {
                window.location.reload();
            });
        });
    });
}

export const startGame = (data:input.Join) => {
    socket.emit(constants.msg.join, data);
}

export const draw = (data:input.DrawStart | input.DrawContinue | input.DrawFinish | input.DrawDelete) => {
    socket.emit(constants.msg.draw, data);
}

export const sync = (data:input.Sync) => {
    socket.emit(constants.msg.sync, data);
}