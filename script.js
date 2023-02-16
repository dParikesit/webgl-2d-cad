"use strict";

import { Polygon } from "./models/Polygon.js";
import { initDrawLine } from "./shapes/line.js";
import { initDrawPolygon } from "./shapes/polygon.js";
import { resizeCanvasToDisplaySize } from "./utils/tools.js";
import WebGLUtils from "./utils/webgl-utils.js";

const canvas = document.getElementById("canvas");
export const gl = WebGLUtils.setupWebGL(canvas);

if (!gl) {
    alert("WebGL isn't available");
}

resizeCanvasToDisplaySize(gl.canvas);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

document.getElementById("line").addEventListener("mousedown", function (e) {
    initDrawLine();
});

document.getElementById("square").addEventListener("mousedown", function (e) {
    // initDrawSquare()
});

document
    .getElementById("rectangle")
    .addEventListener("mousedown", function (e) {
        // initDrawRectangle()
    });

document.getElementById("polygon").addEventListener("mousedown", function (e) {
    // initDrawPolygon();
    // const polygon = new Polygon();
    // canvas.addEventListener("mousedown", function (e) {
    //     polygon.draw(e);
    // });

    const polygon = new Polygon();
    canvas.addEventListener("mousedown", function (e) {
        polygon.draw(e);
    });

    showAddPointsButton("block");
});

function showAddPointsButton(status) {
    var x = document.getElementById("polyAddPoint");
    x.style.display = status;
}

