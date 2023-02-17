"use strict";

// import { Line } from "./models/shapes/Line.js"
import { Polygon } from "./models/Polygon.js";
import { Line } from "./models/Line.js";
import { initDrawLine } from "./shapes/oldLine.js";
import { initDrawPolygon } from "./shapes/polygon.js";
import { resizeCanvasToDisplaySize } from "./utils/tools.js";
import WebGLUtils from "./utils/webgl-utils.js";

const canvas = document.getElementById("canvas");
const polyAddPoint = document.getElementById("polyAddPoint");
const polyDelPoint = document.getElementById("polyDelPoint");
const objectCreated = document.getElementById("object-created");
export const gl = WebGLUtils.setupWebGL(canvas);

if (!gl) {
    alert("WebGL isn't available");
}

resizeCanvasToDisplaySize(gl.canvas);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

let drawing = false; 
let obj = Object.create(null)
let count = 0

document.getElementById("line").addEventListener("mousedown", function (e) {
    var line = new Line(0);

    canvas.addEventListener("mousedown", function (e) {
        if (drawing){
            count++;
            obj[count] = line
            console.log(obj)

            drawing = false
            line.draw(e)
        } else {
            drawing = true
            line.draw(e)
        }
    });
    
    canvas.addEventListener("mousemove" , function (e) {
        line.mouseMoveHandler(e)
    })
    

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

    showPolygonButton("block");

    polyAddPoint.addEventListener("mousedown", function (e) {
        polygon.addPolygonPoint();
    });

    polyDelPoint.addEventListener("mousedown", function (e) {
        polygon.delPolygonPoint();
    });

    objectCreated.addEventListener("mousedown", function (e) {
        alert("JALANNN")
    });
});

function showPolygonButton(status) {

    var polygonSection = document.getElementById("polygonSection");
    // var x = document.getElementById("polyAddPoint");
    // var y = document.getElementById("polyDelPoint");
    // x.style.display = status;
    // y.style.display = status;
    polygonSection.style.display = status;
}

