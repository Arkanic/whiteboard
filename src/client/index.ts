import "./css/main.scss";

import * as networking from "./ts/networking";
import * as state from "./ts/state";
import * as input from "../shared/types/input";
import {startInputHandling, stopInputHandling} from "./ts/input";
import * as render from "./ts/render";

import Logger from "./ts/logger";

console.log("%cWHITEBOARD", "color:blue; font-size:32px; font-weight:bold;", "\nBy Arkanic");

let logger = new Logger("main", "red");

const playMenu:HTMLElement = document.getElementById("play-menu")!;
const playButton:HTMLButtonElement = <HTMLButtonElement>document.getElementById("play-button")!;
const usernameInput:HTMLInputElement = <HTMLInputElement>document.getElementById("username-input");

Promise.all([
    networking.connect()
]).then(() => {
    playMenu.classList.remove("hidden");
    usernameInput.focus();

    playButton.addEventListener("click", () => {
        networking.sync({});
        networking.startGame({username:usernameInput.value});
        logger.log(`Game Started.`);
        playMenu.classList.add("hidden");

        startInputHandling();
        render.startRendering();
    });
}).catch(logger.error);