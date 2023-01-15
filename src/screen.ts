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

export default class Screen{
    private ctx: CanvasRenderingContext2D;

    constructor(height: number, width: number, ctx: CanvasRenderingContext2D){
        ctx.canvas.height = height;
        ctx.canvas.width = width;
        this.ctx = ctx;
    }

    public render(pixelbuffer: number[][][]): void{
        // Convert pixelbuffer into ImageData object
        const height = pixelbuffer.length;
        const width = pixelbuffer[0].length; 
        const pixelBufferFlat = pixelbuffer.flat(2);
        
        // imageData is a flat 1D array where 
        // every 4 elements specify a pixel's color in RGBA order
        const imageData: ImageData = this.ctx.createImageData(width, height);
        
        for(let i = 0; i < imageData.data.length; i += 4){
            imageData.data[i+0] = pixelBufferFlat[i+0];
            imageData.data[i+1] = pixelBufferFlat[i+1];
            imageData.data[i+2] = pixelBufferFlat[i+2];
            imageData.data[i+3] = 255;
        }
        this.ctx.putImageData(imageData,0,0);
    }

    public getWidth(): number{
        return this.ctx.canvas.width;
    }

    public getHeight(): number{
        return this.ctx.canvas.height;
    }
}