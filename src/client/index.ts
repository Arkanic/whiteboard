import "./css/main.scss";

import * as networking from "./ts/networking";

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
        networking.startGame({username:usernameInput.value});
        logger.log(`Game Started.`);
        playMenu.classList.add("hidden");
    });
}).catch(logger.error);