import * as state from "../state";
import * as input from "../../../shared/types/input";

import renderLine from "./components/line";
import renderBackground from "./components/background";

export function render(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    let board = state.getBoard();

    renderBackground(ctx, canvas);

    for(let i in board) {
        let line = board[i];
        renderLine(ctx, canvas, line);
    }
}