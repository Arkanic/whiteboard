import {nanoid} from "nanoid";
import {htod} from "../../shared/hexdec";
import * as networking from "./networking";
import * as state from "./state";
import * as input from "../../shared/types/input";
import * as mouse from "./input/mouse";
import * as render from "./render";

let colorPicker:HTMLInputElement = <HTMLInputElement>document.getElementById("color-picker");

export function handleSync(data:input.Whiteboard) {
    state.handleSync(data);
    render.renderBoard();
}

export function handleDraw(data:input.Draw) {
    state.newData(data);
    render.renderBoard();
}

let currentlyDrawing = false;
let currentID = nanoid();
export function handleMouseChange(data:mouse.MouseData) {
    if(currentlyDrawing) {
        if(data.lastModified == mouse.MouseLM.Position) {
            let d = {
                mode: input.DT.Continue,
                time: Date.now(),
                id: currentID,
                pos: {
                    x: data.mouseX,
                    y: data.mouseY
                }
            } as input.DrawContinue;

            networking.draw(d);
            state.newClientData(d);

        } else if(data.lastModified == mouse.MouseLM.Clicking && !data.clicking) {
            let d = {
                mode: input.DT.Finish,
                time: Date.now(),
                id: currentID,
                pos: {
                    x: data.mouseX,
                    y: data.mouseY
                }
            } as input.DrawFinish;

            networking.draw(d);
            state.newClientData(d);

            currentlyDrawing = false;
        }
    } else if(data.lastModified == mouse.MouseLM.Clicking && data.clicking) {
        currentID = nanoid();
        let d = {
            mode: input.DT.Start,
            time: Date.now(),
            id: currentID,
            color: htod(colorPicker.value.substring(1)),
            pos: {
                x: data.mouseX,
                y: data.mouseY
            }
        } as input.DrawStart;

        networking.draw(d);
        state.newClientData(d);
        render.renderBoard();
        currentlyDrawing = true;
    }
}