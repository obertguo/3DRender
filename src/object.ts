import transformations from './transformations'
import process_image from './process_image';

export default class Obj{
    vertices: number[][];
    faces: number[][];
    facecolors: number[][];
    xy_rotateDeg: number;
    xz_rotateDeg: number;
    yz_rotateDeg: number;
    scalefactor: number;

    constructor(vertices: number[][], faces: number[][], facecolors: number[][]){
        this.vertices = vertices;
        this.faces = faces;
        this.facecolors = facecolors;
        this.xy_rotateDeg = 0;
        this.xz_rotateDeg = 0;
        this.yz_rotateDeg = 0;
        this.scalefactor = 1;
    }

    public rotateXY(deg: number): void{
        this.vertices = transformations.rotateXY(deg - this.xy_rotateDeg, this.vertices);
        this.xy_rotateDeg = deg;
    }

    public rotateXZ(deg: number): void{
        this.vertices = transformations.rotateXZ(deg - this.xz_rotateDeg, this.vertices);
        this.xz_rotateDeg = deg;
    }

    public rotateYZ(deg: number): void{
        this.vertices = transformations.rotateYZ(deg - this.yz_rotateDeg, this.vertices);
        this.yz_rotateDeg = deg;
    }

    public translateX(unit: number): void{
        this.vertices = transformations.translateX(unit, this.vertices);
    }

    public translateY(unit: number): void{
        this.vertices = transformations.translateY(unit, this.vertices);
    }

    public translateZ(unit: number): void{
        this.vertices = transformations.translateZ(unit, this.vertices);
    }

    public scale(factor: number): void{
        this.vertices = transformations.scale(factor/this.scalefactor, this.vertices);
        this.scalefactor = factor;
    }

    public make_pixelbuffer(height: number, width: number): number[][][]{
        console.log(this.faces);
        const renderedVertices = transformations.translateY(height/2, 
            transformations.translateX(width/2, this.vertices));
        return process_image.make_pixelbuffer(height, width, this.faces, renderedVertices, this.facecolors);
    }
}
