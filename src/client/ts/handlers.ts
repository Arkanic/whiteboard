import * as input from "../../shared/types/input";
import * as mouse from "./input/mouse";

export function handleSync(data:input.Whiteboard) {
    console.log(data);
}

export function handleMouseChange(mouse:mouse.MouseData) {
    let names = ["none", "position", "clicking"];
    console.log(names[mouse.lastModified]);
}