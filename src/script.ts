import Canvas from './canvas'
import Obj from './object'
import { runTests } from './tests'

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

let obj: Obj;
let screen = new Canvas(height, width, ctx);

// runTests();
objUpload.addEventListener('change', async () =>{
    if(!objUpload.files) return;

    const objFile = objUpload.files[0];
    const objData = await objFile.text();

    const verticesData = objData.split('\n').filter(line => line.startsWith('v '));
    const vertices = verticesData.map(line => {
        const nums = line.split(/\s+/).slice(1);
        return nums.map(val => parseFloat(val));
    });

    const facesData = objData.split('\n').filter(line => line.startsWith('f '));
    const faces = facesData.map(line =>{
        const nums = line.split(/\s+/).slice(1);
        return nums.map(val => parseInt(val) - 1);
    });

    const color = [Math.random()*256, Math.random()*256, Math.random()*256];
    const facecolors = faces.map(() => {
        const intensity = Math.random();
        return color.map(val => val*intensity);
    });

    obj = new Obj(vertices, faces, facecolors);

    const xy_rotate_deg = parseInt(xy_slider.value);
    const xz_rotate_deg = parseInt(xz_slider.value);
    const yz_rotate_deg = parseInt(yz_slider.value);
    const scalefactor = parseFloat(scale_slider.value);

    obj.rotateXY(xy_rotate_deg);
    obj.rotateXZ(xz_rotate_deg);
    obj.rotateYZ(yz_rotate_deg);
    obj.scale(scalefactor);

    xy_slider.value = xy_rotate_deg.toString();
    xz_slider.value = xz_rotate_deg.toString();
    yz_slider.value = yz_rotate_deg.toString();

    xy_out.innerHTML = `XY Rotation: ${xy_rotate_deg} degrees.`;
    xz_out.innerHTML = `XZ Rotation: ${xz_rotate_deg} degrees.`;
    yz_out.innerHTML = `YZ Rotation: ${yz_rotate_deg} degrees.`;
    scale_out.innerHTML = `Scale: ${scalefactor}`;

    screen.render(obj.make_pixelbuffer(height, width));
});

scale_slider.oninput = () =>{
    const factor = parseFloat(scale_slider.value);
    scale_out.innerHTML = `Scale: ${factor}`;
    obj.scale(factor);
    screen.render(obj.make_pixelbuffer(height, width));
}

xy_slider.oninput = () =>{
    const xy_rotate_deg = parseInt(xy_slider.value);
    const scale = parseFloat(scale_slider.value);
    obj.rotateXY(xy_rotate_deg);
    xy_out.innerHTML = `XY Rotation: ${xy_rotate_deg} degrees.`;
    screen.render(obj.make_pixelbuffer(height, width));
}

xz_slider.oninput = () =>{
    const xz_rotate_deg = parseInt(xz_slider.value);
    const scale = parseFloat(scale_slider.value);
    obj.rotateXZ(xz_rotate_deg);
    xz_out.innerHTML = `XZ Rotation: ${xz_rotate_deg} degrees.`;
    screen.render(obj.make_pixelbuffer(height, width));
}

yz_slider.oninput = () =>{
    const yz_rotate_deg = parseInt(yz_slider.value);
    const scale = parseFloat(scale_slider.value);
    obj.rotateYZ(yz_rotate_deg);
    yz_out.innerHTML = `YZ Rotation: ${yz_rotate_deg} degrees.`;
    screen.render(obj.make_pixelbuffer(height, width));
}