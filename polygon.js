"use strict";

import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "./init-shader.js";
import WebGLUtils from "./webgl-utils.js";

const point = [];
const points = []

let canvasElem = document.querySelector("canvas");

main();

function main() {
    const canvas = document.getElementById("canvas");
    const gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert("WebGL isn't available");
    }

    resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // INITIALIZATION DONE
}

// objek created
const refreshObjectsList = () => {
    let inner = '<h1>Object Created</h1>';


    document.getElementById('object-created').innerHTML = inner;
};
  
refreshObjectsList();


// to get mouse position in canvas
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = ((event.clientX - rect.left) / canvas.width * 2 - 1);
    let y = ((event.clientY - rect.top) / canvas.height * (-2) + 1);

    updatePointsFromOrigin(x,y);

    if(points.length == 2){
        renderPolygon(0, 1);
    }else if(points.length == 4){
        renderPolygon(0, 2);
    }else{
        renderPolygon(0, points.length);
    }
}

canvasElem.addEventListener("mousedown", function(e){
    getMousePosition(canvasElem, e);
});

function updatePoints(x,  y){
    let titik = [x, y];
    let totalTitik = points.length;
    point.push(titik);

    if(totalTitik >= 6){
        console.log("here");
        points.push(points[totalTitik - 4]);
        points.push(points[totalTitik - 3]);
        points.push(points[totalTitik - 2]);
        points.push(points[totalTitik - 1]);
        points.push(x);
        points.push(y);
    }else{
        points.push(x);
        points.push(y);
    }
    console.log(points);
}

function updatePointsFromOrigin(x,  y){
    let titik = [x, y];
    let totalTitik = points.length;
    point.push(titik);

    if(totalTitik >= 6){
        console.log("here");
        points.push(points[0]);
        points.push(points[1]);
        points.push(points[totalTitik - 2]);
        points.push(points[totalTitik - 1]);
        points.push(x);
        points.push(y);
    }else{
        points.push(x);
        points.push(y);
    }
    console.log(points);
}


function renderPolygon(offset, count){
    const gl = WebGLUtils.setupWebGL(canvas);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
    );

    var offsets = offset;
    var counts = count;
    var glTypes;

    if(point.length <= 2){
        glTypes = gl.POINTS;
    }else{
        glTypes = gl.TRIANGLES;
    }
    gl.drawArrays(glTypes, offsets, counts);
}



function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize =
        canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}