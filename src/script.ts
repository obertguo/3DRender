import { render } from './canvas';
import { Obj } from './object';

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

let obj: Obj;

objUpload.addEventListener('change', async () =>{
    if(!objUpload.files) return;
    obj = new Obj();
    const objFile = objUpload.files[0];
    const objData = await objFile.text();
    const verticesData = objData.split('\n').filter(line => line.startsWith('v '));
    const vertices = verticesData.map(line => {
        const nums = line.split(' ').slice(1);
        return nums.map(val => parseFloat(val));
    });

    const facesData = objData.split('\n').filter(line => line.startsWith('f '));
    const faces = facesData.map(line =>{
        const nums = line.split(' ').slice(1);
        return nums.map(val => parseInt(val) - 1);
    });

    obj.addVerticies(vertices);
    obj.addFaces(faces);

    const xy_rotate_deg = parseInt(xy_slider.value);
    const xz_rotate_deg = parseInt(xz_slider.value);
    const yz_rotate_deg = parseInt(yz_slider.value);
    const scale = parseFloat(scale_slider.value);

    obj.rotateXY(xy_rotate_deg);
    obj.rotateXZ(xz_rotate_deg);
    obj.rotateYZ(yz_rotate_deg);

    xy_slider.value = xy_rotate_deg.toString();
    xz_slider.value = xz_rotate_deg.toString();
    yz_slider.value = yz_rotate_deg.toString();

    xy_out.innerHTML = `XY Rotation: ${xy_rotate_deg} degrees.`;
    xz_out.innerHTML = `XZ Rotation: ${xz_rotate_deg} degrees.`;
    yz_out.innerHTML = `YZ Rotation: ${yz_rotate_deg} degrees.`;
    scale_out.innerHTML = `Scale: ${scale}`;

    render(ctx, scale, obj.getFaces());
});

scale_slider.oninput = () =>{
    const scale = parseFloat(scale_slider.value);
    scale_out.innerHTML = `Scale: ${scale}`;
    render(ctx, scale, obj.getFaces());
}

xy_slider.oninput = () =>{
    const xy_rotate_deg = parseInt(xy_slider.value);
    const scale = parseFloat(scale_slider.value);
    obj.rotateXY(xy_rotate_deg);
    xy_out.innerHTML = `XY Rotation: ${xy_rotate_deg} degrees.`;
    render(ctx, scale, obj.getFaces());
}

xz_slider.oninput = () =>{
    const xz_rotate_deg = parseInt(xz_slider.value);
    const scale = parseFloat(scale_slider.value);
    obj.rotateXZ(xz_rotate_deg);
    xz_out.innerHTML = `XZ Rotation: ${xz_rotate_deg} degrees.`;
    render(ctx, scale, obj.getFaces());
}

yz_slider.oninput = () =>{
    const yz_rotate_deg = parseInt(yz_slider.value);
    const scale = parseFloat(scale_slider.value);
    obj.rotateYZ(yz_rotate_deg);
    yz_out.innerHTML = `YZ Rotation: ${yz_rotate_deg} degrees.`;
    render(ctx, scale, obj.getFaces());
 }

canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
ctx.translate(canvas.width/2, canvas.height/2);