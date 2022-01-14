import {throttle, debounce} from "throttle-debounce";
import * as menu from "./render/menu";
import * as board from "./render/board";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("board");
let ctx = canvas.getContext("2d")!;

ctx.font = "10px Arial";
ctx.textAlign = "center";

function setDimensions() {
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
    renderBoard();
}
setDimensions();
window.addEventListener("resize", debounce(40, setDimensions));

let rendering = false;
export function renderBoard() {
    if(rendering) board.render(ctx, canvas);
}

let renderLoop = setInterval(() => {
    menu.render(ctx, canvas);
}, 1000/60);

export function startRendering() {
    clearInterval(renderLoop);
    rendering = true;
}

export function stopRendering() {
    renderLoop = setInterval(() => {
        menu.render(ctx, canvas);
    }, 1000/60);
}