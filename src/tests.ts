import linalg from './linalg'

const check_expect = (actual: unknown, expected: unknown): void =>{
    if(JSON.stringify(actual) === JSON.stringify(expected))
        console.info('Test passed');
    else{
        console.error('Test failed', actual, expected);
        throw new Error();
    }
}

const mat1 = [
    [3,4],
    [5,8]
];

const mat2 = [
    [5,2],
    [-1,3]
];

const vec1 = [1,2,3];
const vec2 = [4,5,6];

export const runTests = () =>{
    check_expect(linalg.vecdot(vec1,vec2), 4+10+18);
    check_expect(linalg.veccross(vec1,vec2), [2*6-5*3, 3*4-6*1, 1*5-4*2]);
    check_expect(linalg.vecadd(vec1,vec2), [5,7,9]);
    check_expect(linalg.vecsubtract(vec1,vec2), [1-4,2-5,3-6]);
    check_expect(linalg.matmul(mat1,mat2), [[23,41],[9,19]]);
    check_expect(linalg.matdet(mat1), 24-20);
    check_expect(linalg.matinv(mat1), [[2,-1],[-5/4,3/4]]);
    check_expect(linalg.matinv([[0,0],[0,0]]), false);
    check_expect(linalg.makevec(3, 1), [1,1,1]);
    check_expect(linalg.makemat(2,3, 0), [[0,0,0],[0,0,0]]);
}