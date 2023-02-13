"use strict";

import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "../utils/init-shader.js";
import WebGLUtils from "../utils/webgl-utils.js";
import { gl } from "../script.js";

const points = [];
const colors = [];

function initDrawLine() {
    if (!gl) { alert("WebGL isn't available");}

    resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT);

    refreshObjectsList();

    let canvasElem = document.querySelector("canvas");
    canvasElem.addEventListener("mousedown", function (e) {
        getMousePosition(canvasElem, e);
    });
}

// resize
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

// object created
function refreshObjectsList() {
    let inner = "<h1>Line Initiated</h1>";

    document.getElementById("object-created").innerHTML = inner;
};


// get mouse position in canvas
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = ((event.clientX - rect.left) / canvas.width) * 2 - 1;
    let y = ((event.clientY - rect.top) / canvas.height) * -2 + 1;

    updatePoints(x, y);

    if (points.length < 2) {
        renderPoint(0,1);
    } else {
        renderLine(0, points.length);
    }
}

function appendColor() {
    let itemList = ["red", "green", "blue"];
    let item = itemList[Math.floor(Math.random() * itemList.length)];
    if (item == "red") {
        colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (item == "green") {
        colors.push([0.0, 1.0, 0.0, 1.0]);
    } else if (item == "blue") {
        colors.push([0.0, 0.0, 1.0, 1.0]);
    }
}

function updatePoints(x, y) {
    let titik = [x, y];

    points.push(x);
    points.push(y);
    appendColor();

    console.log(points)
}

function renderPoint(offset,count) {
    // gl.clear(gl.COLOR_BUFFER_BIT);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    var positionAttributeLocation = gl.getAttribLocation(program, "vPosition");

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
    gl.enableVertexAttribArray(positionAttributeLocation);

    let color = [];

    for (let index = 0; index < colors.length; index++) {
        color.push(colors[index][0]);
        color.push(colors[index][1]);
        color.push(colors[index][2]);
        color.push(colors[index][3]);
    }

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

    const vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    gl.drawArrays(gl.POINT, offset, count);
}

function renderLine(offset, count) {

    //
    /* render lines (paired vertices) */
    //
    gl.clear(gl.COLOR_BUFFER_BIT);

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    var program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    var pairedPoints
    var nonPairedPoint
    if ((points.length/2) % 2 == 0) {
        pairedPoints = points
    } else {
        pairedPoints = points.slice(0, points.length-1)
        nonPairedPoint = points.slice(points.length)
    }

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pairedPoints), gl.STATIC_DRAW);
    var positionAttributeLocation = gl.getAttribLocation(program, "vPosition");

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
    gl.enableVertexAttribArray(positionAttributeLocation);

    let color = [];

    for (let index = 0; index < colors.length; index++) {
        color.push(colors[index][0]);
        color.push(colors[index][1]);
        color.push(colors[index][2]);
        color.push(colors[index][3]);
    }

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

    const vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    gl.drawArrays(gl.LINES, offset, count);

    //
    /* render point (alone vertices) */
    // 
    // if all vertices already paired, no need to make new point
    if ((points.length/2) % 2 == 0) {
        return
    }

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nonPairedPoint), gl.STATIC_DRAW);
    var positionAttributeLocation = gl.getAttribLocation(program, "vPosition");

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
    gl.enableVertexAttribArray(positionAttributeLocation);

    let color_2 = [];

    for (let index = 0; index < colors.length; index++) {
        color_2.push(colors[index][0]);
        color_2.push(colors[index][1]);
        color_2.push(colors[index][2]);
        color_2.push(colors[index][3]);
    }

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color_2), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    gl.drawArrays(gl.POINT, offset, 0);
}

export { initDrawLine };