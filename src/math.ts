import { Vertex, Triangle, LinearMap } from './interfaces';

const applyLinMapToVertex = (linmap: LinearMap, v: Vertex): Vertex =>{
    return {
        x: v.x*linmap.r1[0] + v.y*linmap.r1[1] + v.z*linmap.r1[2],
        y: v.x*linmap.r2[0] + v.y*linmap.r2[1] + v.z*linmap.r2[2],
        z: v.x*linmap.r3[0] + v.y*linmap.r3[1] + v.z*linmap.r3[2]
    }
}

const applyLinMapToTriangle = (linmap: LinearMap, t: Triangle): Triangle =>{
    return {
        v1: applyLinMapToVertex(linmap, t.v1),
        v2: applyLinMapToVertex(linmap, t.v2),
        v3: applyLinMapToVertex(linmap, t.v3),
        color: t.color
    }
}

export const applyLinMapToTriangles = (tris: Triangle[], linmap: LinearMap) =>{
    return tris.map(t => applyLinMapToTriangle(linmap, t));
}

export const degToRad = (deg: number) =>{
    return (Math.PI / 180) * deg;
}