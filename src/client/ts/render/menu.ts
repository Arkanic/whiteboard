import renderBackground from "./components/background";

export function render(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
    const t = Date.now() / 7500;
    const x = 1000 + 800 * Math.cos(t);
    const y = 1000 + 800 * Math.sin(t);
    renderBackground(ctx, canvas, x, y);
}