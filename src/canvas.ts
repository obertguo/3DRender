import { Triangle } from './interfaces';

const drawTriangle = (ctx: CanvasRenderingContext2D, scale: number, t: Triangle) => {
    ctx.beginPath();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.1;
    ctx.fillStyle = 'rgba(0,0,255,0.05)';
    ctx.moveTo(0,0);

    ctx.lineTo(scale * t.v1.x, scale * t.v1.y);
    ctx.lineTo(scale * t.v2.x, scale * t.v2.y);
    ctx.lineTo(scale * t.v3.x, scale * t.v3.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

const clear = (ctx: CanvasRenderingContext2D) =>{
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

export const render = (ctx: CanvasRenderingContext2D, scale: number, tris: Triangle[]) =>{
    clear(ctx);
    tris.forEach(t => {
        drawTriangle(ctx, scale, t);
    });
}
const delay = (ms: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
}