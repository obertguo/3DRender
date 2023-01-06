/*
Simple/practical linear algebra wrapper to handle calculations in R^2/R^3, and M_2x2/M_3x3, 
    so don't expect this to perform cross products in R^n or find determinants in M_nxn.
The wrapper also helps with initialization of matrices/arrays.
All matrices consumed and produced are assumed to be in row major order.
*/

// Produces the scalar dot product of vec1 and vec2
// Requires vec1 and vec2 to have the same dimensions
const vecdot = (vec1: number[], vec2: number[]): number =>{
    let res = 0;
    for(let i = 0; i < vec1.length; ++i)
        res += vec1[i]*vec2[i];
    return res;
}

// Produces the vector dot product of vec1 and vec2
// Requires vec1 and vec2 to be in R^3
const veccross = (vec1: number[], vec2: number[]): number[] =>{
    return [
        vec1[1]*vec2[2] - vec2[1]*vec1[2],
        vec1[2]*vec2[0] - vec2[2]*vec1[0],
        vec1[0]*vec2[1] - vec2[0]*vec1[1]
    ];
}

// Produces the matrix-vector multiplication of mat and vec 
// Requires mat to have dimensions m x n, and vec to be in R^n
const matvec = (mat: number[][], vec: number[]): number[] =>{
    return mat.map(row => vecdot(row, vec));
}

// Produces the matrix multiplication of mat1 and mat2 such that
//      mat1 is a matrix in row major order, and mat2 is an array of size p that contains vectors in R^n
//      The resulting matrix multiplication is then simply an array of the 
//      matrix-vector multiplication of mat1 and the ith vector of mat2.
// Requires mat1 to have dimensions m x n
//  and mat2 to have dimensions p x n
const matmul = (mat1: number[][], mat2: number[][]): number[][] =>{
    return mat2.map(vec => matvec(mat1, vec));
}

// Produces the 2 x 2 determinant of mat
// Requires mat have dimensions 2 x 2
const matdet = (mat: number[][]) =>{
    return mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0];
}

// Produes the 2 x 2 inverse matrix of mat if possible, and false otherwise
// Requires mat to have dimensions 2 x 2
const matinv = (mat: number[][]): number[][] | false =>{
    const det: number = matdet(mat);
    if(det === 0) return false;

    return [
        [mat[1][1]/det, -mat[0][1]/det],
        [-mat[1][0]/det, mat[0][0]/det]
    ];
}

// Produces the vector addition of vec1 and vec2
// Requires vec1 and vec2 to be in R^n
const vecadd = (vec1: number[], vec2: number[]) =>{
    let res: number[] = [];
    for(let i = 0; i < vec1.length; ++i)
        res.push(vec1[i]+vec2[i]);
    return res;
}

// Produces the vector subtraction of vec2 from vec1
// Requires vec1 and vec2 to be in R^n
const vecsubtract = (vec1: number[], vec2: number[]) =>{
    let res: number[] = [];
    for(let i = 0; i < vec1.length; ++i)
        res.push(vec1[i]-vec2[i]);
    return res;
}

// Produces a vector in R^n, all initialized to initval
const makevec = <T>(n: number, initval: T): T[] =>{
    let arr: T[] = new Array(n);
    for(let i = 0; i<n; ++i)
        arr[i] = initval;
    return arr;
}

// Produces a m x n matrix, an array of size m containing vectors in R^n, all initialized to initval
const makemat = <T>(m: number, n: number, initval: T): T[][] =>{
    let mat: T[][] = new Array(m);
    for(let i = 0; i<m; ++i)
        mat[i] = makevec(n, initval);
    return mat;
}

// Produces deg in radians
const degtorad = (deg: number) =>{
    return deg*(Math.PI / 180);
}

export default {
    vecdot,
    veccross,
    matvec,
    matmul,
    matdet,
    matinv,
    vecadd,
    vecsubtract,
    makevec,
    makemat,
    degtorad
};