export default function renderBackground(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement, x:number, y:number) {
    const backgroundX = 1000 - x + canvas.width / 2;
    const backgroundY = 1000 - y + canvas.height / 2;
    const background = ctx.createRadialGradient(
        backgroundX,
        backgroundY,
        200,
        backgroundX,
        backgroundY,
        1000
    );

    background.addColorStop(0, "black");
    background.addColorStop(0, "gray");

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}