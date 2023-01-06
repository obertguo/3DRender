import linalg from "./linalg"

const rotateXY = (deg: number, vertices: number[][]): number[][] =>{
    const rad = linalg.degtorad(deg);
    const rotate_xy_mat = [
        [Math.cos(rad), -Math.sin(rad), 0],
        [Math.sin(rad), Math.cos(rad), 0],
        [0, 0, 1]
    ];

    return linalg.matmul(rotate_xy_mat, vertices);
}

const rotateXZ = (deg: number, vertices: number[][]): number[][] => {
    const rad = linalg.degtorad(deg);
    const rotate_xz_mat = [
        [Math.cos(rad), 0, -Math.sin(rad)],
        [0, 1, 0],
        [Math.sin(rad), 0, Math.cos(rad)]
    ];

    return linalg.matmul(rotate_xz_mat, vertices);
}

const rotateYZ = (deg: number, vertices: number[][]): number[][] => {
    const rad = linalg.degtorad(deg);
    const rotate_yz_mat = [
        [1, 0, 0],
        [0, Math.cos(rad), -Math.sin(rad)],
        [0, Math.sin(rad), Math.cos(rad)]
    ];

    return linalg.matmul(rotate_yz_mat, vertices);
}

const translateX = (unit: number, vertices: number[][]) =>{
    return vertices.map(v => linalg.vecadd(v, [unit,0,0]));
}

const translateY = (unit: number, vertices: number[][]) =>{
    return vertices.map(v => linalg.vecadd(v, [0,unit,0]));
}

const translateZ = (unit: number, vertices: number[][]) =>{
    return vertices.map(v => linalg.vecadd(v, [0,0,unit]));
}

const scale = (factor: number, vertices: number[][]): number[][] =>{
    const scale_mat = [
        [factor, 0, 0],
        [0, factor, 0],
        [0, 0, factor]
    ];

    return linalg.matmul(scale_mat, vertices);
}

export default{
    rotateXY,
    rotateXZ,
    rotateYZ,
    translateX,
    translateY,
    translateZ,
    scale
}