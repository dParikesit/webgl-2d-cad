"use strict";

import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "./init-shader.js";
import WebGLUtils from "./webgl-utils.js";

// to get mouse position in canvas
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    // masih harus disesuain lg coordinatnya jadi 0.0 (sekarang dia ratusan gitu)
    console.log("Coordinate x: " + x, 
                "Coordinate y: " + y);
}

let canvasElem = document.querySelector("canvas");
  
canvasElem.addEventListener("mousedown", function(e)
{
    getMousePosition(canvasElem, e);
});

// objek created
const refreshObjectsList = () => {
    let inner = '<h1>Object Created</h1>';


    document.getElementById('object-created').innerHTML = inner;
};
  
refreshObjectsList();

main();

function main() {
    const canvas = document.getElementById("canvas");
    const gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert("WebGL isn't available");
    }

    // gl.viewport(0, 0, canvas.width, canvas.height);
    // gl.clearColor(0.8, 0.8, 0.8, 1.0);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    var program = createProgram(gl, vertexShader, fragmentShader);
    console.log(program);
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    var positions = [
        //bawah, atas, kanan
        0.0, 0.0, 0.0, 0.6, 0.5, 0.0, // Triangle 1
        // 0.0, -0.9, -0.5, -0.5, 0.5, -0.9, // Triangle 2 
        // -0.6, -0.6, -0.9, 0.10, -0.3, -0,1 // tiangle 3
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // INITIALIZATION DONE

    resizeCanvasToDisplaySize(gl.canvas)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

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

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 9;
    gl.drawArrays(gl.POINTS, offset, count);
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