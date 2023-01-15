import Screen from './screen'
import linalg from './linalg';
import Obj from './object'
import { runTests } from './tests'

//https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray

const objUpload = document.getElementById('objUpload')! as HTMLInputElement;

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const scale_slider = document.getElementById('scale-slider')! as HTMLInputElement;
const scale_out = document.getElementById('scale-out')!;

const xy_slider = document.getElementById('xy-slider')! as HTMLInputElement;
const xy_out = document.getElementById('xy-out')!;

const xz_slider = document.getElementById('xz-slider')! as HTMLInputElement;
const xz_out = document.getElementById('xz-out')!;

const yz_slider = document.getElementById('yz-slider')! as HTMLInputElement;
const yz_out = document.getElementById('yz-out')!;

const height = 500;
const width = 1000;

let obj: Obj = new Obj([],[],[0,0,0,0]);
let screen = new Screen(height, width, ctx);

document.addEventListener ('DOMContentLoaded', async e =>{
    // runTests();
    await emulateFileUploadEvent('./cube.obj');
});

// For testing and perhaps some future purposes, this allows an OBJ file upload to be emulated,
//     where the OBJ file lives relative to the public folder
const emulateFileUploadEvent = async(relativePathToOBJFile: string) =>{
    const objDataBlob = await fetch(relativePathToOBJFile).then(res => res.text());
    
    // https://stackoverflow.com/questions/47119426/how-to-set-file-objects-and-length-property-at-filelist-object-where-the-files-a
    const dT = new DataTransfer();
    const file = new File([objDataBlob], relativePathToOBJFile);
    dT.items.add(file);
    objUpload.files = dT.files;
    objUpload.dispatchEvent(new Event('change'));
}

// I would love to make higher order functions but, due to the imperative nature 
//     of objects, I cannot really update an object's properties whenever I call
//     the associated transformation function. Sorry to future me and others for reading
//     this mess of seemingly identical code...

const enum UpdateType {
    scale,
    XYRotate,
    XZRotate,
    YZRotate
}

// Somewhat constructor pattern like approach. I would very much rather prefer a functional appraoch to this
//     using higher order functions, but that gets a bit messy when dealing with objects,
//     probably requiring a full blown rewrite to how all the code is constructed
const emulateUpdate = (updateType: UpdateType, newVal: number) =>{
    switch(updateType){
        case UpdateType.scale:
            obj.scale(newVal);
            scale_out.innerHTML = `Scale: ${newVal}`;
            scale_slider.value = newVal.toString();
            break;
        case UpdateType.XYRotate:
            obj.rotateXY(newVal);
            xy_out.innerHTML = `XY Rotation: ${newVal} degrees`;
            xy_slider.value = newVal.toString();
            break;
        case UpdateType.XZRotate:
            obj.rotateXZ(newVal);
            xz_out.innerHTML = `XZ Rotation: ${newVal} degrees`;
            xz_slider.value = newVal.toString();
            break;
        case UpdateType.YZRotate:
            obj.rotateYZ(newVal);
            yz_out.innerHTML = `YZ Rotation: ${newVal} degrees`;
            xz_slider.value = newVal.toString();
            break;
    }
    screen.render(obj.make_pixelbuffer(height, width));
}

objUpload.addEventListener('change', async () =>{
    if(!objUpload.files) return;

    const objFile = objUpload.files[0];
    const objData = await objFile.text();

    const verticesData = objData.split('\n').filter(line => line.startsWith('v '));
    let vertices: number[][] = [];
    verticesData.forEach(line =>{
        const vertexCoordinates = line.split(/\s+/).slice(1).
            filter(str => str!='').map(num => parseFloat(num));
        vertices.push(vertexCoordinates);
    });

    const facesData = objData.split('\n').filter(line => line.startsWith('f '));
    let faces: number[][] = [];
    facesData.forEach(line =>{
        // Since faces in OBJ files can have 3 or more vertices that make up a face,
        // We divide the faces into separate triangles, and add those to our faces array 
        // This is done by assuming the first vertex is fixed, and the 
        // 2nd vertex is obtained by iterating from the first to (n-1)th vertex,
        // and the 3rd vertex is the next vertex after the 2nd.  
        const vertexList: string[] | number[] = line.split(/\s+/).slice(1).
            filter(str => str!='').map(v => parseInt(v)-1);
        
        for(let v2Pos = 1; v2Pos < vertexList.length-1; ++v2Pos){
            faces.push([vertexList[0], vertexList[v2Pos], vertexList[v2Pos+1]]);
        }
    });
    const objcolor = [linalg.randInt(20,200), linalg.randInt(20,200), linalg.randInt(20, 200), 255];
    obj = new Obj(vertices, faces, objcolor);

    emulateUpdate(UpdateType.scale, Number.parseFloat(scale_slider.value));
    emulateUpdate(UpdateType.XYRotate, Number.parseFloat(xy_slider.value));
    emulateUpdate(UpdateType.XZRotate, Number.parseFloat(xz_slider.value));
    emulateUpdate(UpdateType.YZRotate, Number.parseFloat(yz_slider.value));
});

scale_slider.oninput = () => emulateUpdate(UpdateType.scale, Number.parseFloat(scale_slider.value));
xy_slider.oninput = () => emulateUpdate(UpdateType.XYRotate, Number.parseFloat(xy_slider.value));
xz_slider.oninput = () => emulateUpdate(UpdateType.XZRotate, Number.parseFloat(xz_slider.value));
yz_slider.oninput = () => emulateUpdate(UpdateType.YZRotate, Number.parseFloat(yz_slider.value));