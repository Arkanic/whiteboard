import * as input from "../../../../shared/types/input";
import {dtoh} from "../../../../shared/hexdec";
import Line from "../../../../shared/line";

export default function renderLine(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, line:Line) {
    let color = dtoh(line.color);

    ctx.lineWidth = 5.0;
    ctx.strokeStyle = `#${color}`;

    ctx.beginPath();
    ctx.moveTo(line.segments[0].x, line.segments[0].y);
    for(let i = 1; i < line.segments.length; i++) {
        let {x, y} = line.segments[i];
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.lineWidth = 1.0;
    ctx.strokeStyle = "black";
}