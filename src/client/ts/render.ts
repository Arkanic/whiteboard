import {debounce} from "throttle-debounce";
import * as menu from "./render/menu";

let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("board");
let ctx = canvas.getContext("2d")!;

ctx.font = "10px Arial";
ctx.textAlign = "center";

function setDimensions() {
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}
setDimensions();
window.addEventListener("resize", debounce(40, setDimensions));

let renderLoop = setInterval(() => {
    menu.render(ctx, canvas);
}, 1000/60);