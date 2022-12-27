import { LinearMap } from "./interfaces"

export const rotateXYLinMap = (rotateRad: number): LinearMap =>{
    return {
        r1: [Math.cos(rotateRad), -1*Math.sin(rotateRad), 0],
        r2: [Math.sin(rotateRad), Math.cos(rotateRad), 0],
        r3: [0, 0, 1]
    }
}

export const rotateXZLinMap = (rotateRad: number): LinearMap => {
    return {
        r1: [Math.cos(rotateRad), 0, -1*Math.sin(rotateRad)],
        r2: [0, 1, 0],
        r3: [Math.sin(rotateRad), 0, Math.cos(rotateRad)]
    }
}

export const rotateYZLinMap = (rotateRad: number): LinearMap => {
    return {
        r1: [1, 0, 0],
        r2: [0, Math.cos(rotateRad), Math.sin(rotateRad)],
        r3: [0, -1*Math.sin(rotateRad), Math.cos(rotateRad)]
    }
}