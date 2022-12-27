import { Color, Triangle, Vertex } from "./interfaces";
import { rotateXYLinMap, rotateXZLinMap, rotateYZLinMap } from "./linmaps";
import { applyLinMapToTriangles, degToRad } from "./math";

const makeVertex = (x: number, y: number, z: number): Vertex =>{
    return {x,y,z};
}
const makeColor = (r: number, g: number, b: number, a?: number) =>{
    return {r,g,b,a: a||1};
}
const makeTriangle = (v1: Vertex, v2: Vertex, v3: Vertex, color?: Color): Triangle =>{
    return {v1,v2,v3, color: color || makeColor(0,0,0)};
}

export class Obj{
    vertices: Vertex[];
    faces: Triangle[];
    xy_rotateDeg;
    xz_rotateDeg;
    yz_rotateDeg;

    constructor(){
        this.vertices = [];
        this.faces = [];
        this.xy_rotateDeg = 0;
        this.xz_rotateDeg = 0;
        this.yz_rotateDeg = 0;
    }

    addVerticies(verticies: number[][]): void{
        this.vertices = verticies.map(v => makeVertex(v[0], v[1], v[2]));
    }

    // Uses zero indexed vertex in verticies arr 
    addFaces(faces: number[][]): void{
        this.faces = faces.map(f => 
            makeTriangle(this.vertices[f[0]], 
                this.vertices[f[1]], 
                this.vertices[f[2]]));
    }

    getFaces(): Triangle[]{
        return this.faces;
    }

    rotateXY(deg: number): void{
        const rotateRad = degToRad(deg - this.xy_rotateDeg);
        this.xy_rotateDeg = deg;
        this.faces = applyLinMapToTriangles(this.faces, rotateXYLinMap(rotateRad));
    }

    rotateXZ(deg: number): void{
        const rotateRad = degToRad(deg - this.xz_rotateDeg);
        this.xz_rotateDeg = deg;
        this.faces = applyLinMapToTriangles(this.faces, rotateXZLinMap(rotateRad));
    }

    rotateYZ(deg: number): void{
        const rotateRad = degToRad(deg - this.yz_rotateDeg);
        this.yz_rotateDeg = deg;
        this.faces = applyLinMapToTriangles(this.faces, rotateYZLinMap(rotateRad));
    }
}
