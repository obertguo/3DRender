export interface Vertex{
    x: number,
    y: number,
    z: number
}

export interface Color{
    r: number,
    g: number,
    b: number,
    a: number
}

export interface Triangle{
    v1: Vertex,
    v2: Vertex,
    v3: Vertex,
    color: Color
}

// Requires c1,c2,c3 to be elements of R3
export interface LinearMap{
    r1: number[],
    r2: number[],
    r3: number[]
}