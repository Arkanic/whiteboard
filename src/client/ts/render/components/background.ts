export default function renderBackground(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}