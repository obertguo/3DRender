const clear = (ctx: CanvasRenderingContext2D) =>{
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

const delay = (ms: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
}


export default class Canvas{
    ctx: CanvasRenderingContext2D;

    constructor(height: number, width: number, ctx: CanvasRenderingContext2D){
        ctx.canvas.height = height;
        ctx.canvas.width = width;
        this.ctx = ctx;
    }

    private drawpixel = (x: number, y: number, rgb: number[]) => {
        this.ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        this.ctx.fillRect(x,y,1,1);
        this.ctx.fill();
    }
    
    public render(pixelbuffer: number[][][]): void{
        for(let row = 0; row < this.ctx.canvas.height; ++row){
            for(let col = 0; col < this.ctx.canvas.width; ++col){
                this.drawpixel(col, row, pixelbuffer[row][col]);
            }
        }
    }
}