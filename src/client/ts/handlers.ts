import {nanoid} from "nanoid";
import * as networking from "./networking";
import * as state from "./state";
import * as input from "../../shared/types/input";
import * as mouse from "./input/mouse";

export function handleSync(data:input.Whiteboard) {
    console.log(data);
}

export function handleDraw(data:input.Draw) {
    state.newData(data);
}

let currentlyDrawing = false;
let currentID = nanoid();
export function handleMouseChange(data:mouse.MouseData) {
    if(currentlyDrawing) {
        if(data.lastModified == mouse.MouseLM.Position) {
            networking.draw({
                mode: input.DT.Continue,
                time: Date.now(),
                id: currentID,
                pos: {
                    x: data.mouseX,
                    y: data.mouseY
                }
            } as input.DrawContinue);
        } else if(data.lastModified == mouse.MouseLM.Clicking && !data.clicking) {
            networking.draw({
                mode: input.DT.Finish,
                time: Date.now(),
                id: currentID,
                pos: {
                    x: data.mouseX,
                    y: data.mouseY
                }
            } as input.DrawFinish);
            currentlyDrawing = false;
        }
    } else if(data.lastModified == mouse.MouseLM.Clicking && data.clicking) {
        currentID = nanoid();
        networking.draw({
            mode: input.DT.Start,
            time: Date.now(),
            id: currentID,
            color: 0,
            pos: {
                x: data.mouseX,
                y: data.mouseY
            }
        });
        currentlyDrawing = true;
    }
}