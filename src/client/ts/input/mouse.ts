import * as handlers from "../handlers";

enum MouseLM {
    None = 0,
    Position,
    Clicking
}

export interface MouseData {
    lastModified:MouseLM;
    mouseX:number;
    mouseY:number;
    clicking:boolean;
}

let mouse:MouseData;

function handleMouseMove(e:MouseEvent) {
    mouse.mouseX = e.offsetX;
    mouse.mouseY = e.offsetY;
    mouse.lastModified = MouseLM.Position;

    handlers.handleMouseChange(mouse);
}

function handleMouseDown(e:MouseEvent) {
    mouse.clicking = true;
    mouse.lastModified = MouseLM.Clicking;

    handlers.handleMouseChange(mouse);
}

function handleMouseUp(e:MouseEvent) {
    mouse.clicking = false;
    mouse.lastModified = MouseLM.Clicking;

    handlers.handleMouseChange(mouse);
}

export function getMouseState():MouseData {
    return mouse;
}

export function startMouseInputHandling() {
    mouse = {
        lastModified: MouseLM.None,
        mouseX: window.innerWidth / 2,
        mouseY: window.innerHeight / 2,
        clicking: false
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
}

export function stopMouseInputHandling() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
}