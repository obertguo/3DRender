import linalg from "./linalg"

const get_face_bounding_box = (face: number[], vertices: number[][]): number[] =>{
    const v1 = vertices[face[0]];
    const v2 = vertices[face[1]];
    const v3 = vertices[face[2]];

    return [
        Math.min(v1[0], v2[0], v3[0]),
        Math.max(v1[0], v2[0], v3[0]),
        Math.min(v1[1], v2[1], v3[1]),
        Math.max(v1[1], v2[1], v3[1]),
    ].map(val => Math.round(val));
}

const get_pixel_depth = (x: number, y: number, face: number[], vertices: number[][]): number =>{
    const v1 = vertices[face[0]];
    const v2 = vertices[face[1]];
    const v3 = vertices[face[2]];

    const dir1 = linalg.vecsubtract(v2,v1);
    const dir2 = linalg.vecsubtract(v3,v1);

    const norm = linalg.veccross(dir1,dir2);
    return (linalg.vecdot(norm,v1) - norm[0]*x - norm[1]*y) / norm[2];
}

const pixel_face_collision = (x: number, y: number, face: number[], vertices: number[][]): boolean =>{
    let v1 = vertices[face[0]];
    let v2 = vertices[face[1]];
    let v3 = vertices[face[2]];
    let p = [x,y,0];
    

    // Recenter so v1 is at origin
    v2 = linalg.vecsubtract(v2,v1);
    v3 = linalg.vecsubtract(v3,v1);
    p = linalg.vecsubtract(p,v1);

    const mat = [
        [v2[0],v3[0]],
        [v2[1],v3[1]]
    ];

    const inv = linalg.matinv(mat);
    if(inv === false) return false;

    const weights = linalg.matvec(inv,[p[0],p[1]]);
    const w1 = weights[0];
    const w2 = weights[1];
    return 0 <= w1 && w1 <= 1 &&
        0 <= w2 && w2 <= 1 &&
        0 <= w2+w2 && w1+w2 <= 1;
}

const computeLightIntensity = (face: number[], vertices: number[][], lightPos: number[]): number =>{
    const v1 = vertices[face[0]];
    const v2 = vertices[face[1]];
    const v3 = vertices[face[2]];

    const dir1 = linalg.vecsubtract(v2,v1);
    const dir2 = linalg.vecsubtract(v3,v1);
    const normal = linalg.vecnormalize(linalg.veccross(dir1,dir2));
    const faceToLightSrc = linalg.vecnormalize(linalg.vecsubtract(lightPos, v1));

    return Math.abs(linalg.vecdot(normal, faceToLightSrc));
}

const make_pixelbuffer = (height: number, width: number, faces: number[][], vertices: number[][], objcolor: number[]): number[][][] =>{
    let pixelbuffer = linalg.makemat(height, width, [0,0,0,255]);
    let zbuffer = linalg.makemat(height, width, Number.MIN_SAFE_INTEGER);
    const lightPos = [0, 0, Number.MAX_SAFE_INTEGER];

    faces.forEach(face =>{
        const face_bounds = get_face_bounding_box(face, vertices);
        for(let row = Math.max(0, face_bounds[2]); row <= Math.min(height-1, face_bounds[3]); ++row){
            for(let col = Math.max(0, face_bounds[0]); col <= Math.min(width-1, face_bounds[1]); ++col){
                if(pixel_face_collision(col,row,face,vertices)){
                    const depth = get_pixel_depth(col,row,face,vertices);
                    if(depth >= zbuffer[row][col]){
                        zbuffer[row][col] = depth;
                        //Diffuse shading
                        const intensity = computeLightIntensity(face, vertices, lightPos);
                        pixelbuffer[row][col] = objcolor.map(x => x*intensity);
                    }
                }
            }
        }
    });
    return pixelbuffer;
}

export default{
    make_pixelbuffer
}