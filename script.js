"use strict";

import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "./utils/init-shader.js";
import WebGLUtils from "./utils/webgl-utils.js";
import { initDrawLine } from "./shapes/line.js";
// import { initDrawSquare } from "./square.js";
// import { initDrawRectangle } from "./rectangle.js";
import { initDrawPolygon } from "./shapes/polygon.js";

// main();

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

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    var program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    // INITIALIZATION DONE

    
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    var positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);    

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
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
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

const canvas = document.getElementById("canvas");
export const gl = WebGLUtils.setupWebGL(canvas);


document.getElementById("line").addEventListener("mousedown", function(e) {
    initDrawLine()
})

document.getElementById("square").addEventListener("mousedown", function(e) {
    // initDrawSquare()
})

document.getElementById("rectangle").addEventListener("mousedown", function(e) {
    // initDrawRectangle()
})

document.getElementById("polygon").addEventListener("mousedown", function(e) {
    initDrawPolygon()
})
