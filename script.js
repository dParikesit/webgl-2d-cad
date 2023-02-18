import { Line } from "./models/Line.js";
import { Point } from "./models/Point.js";
import { resizeCanvasToDisplaySize } from "./utils/tools.js";
import {
    createProgram,
    createShader,
    vsSource,
    fsSource,
} from "./utils/init-shader.js";

import WebGLUtils from "./utils/webgl-utils.js";

// ------------------------ INITIATE GL PROGRAM  ------------------------
// Create program
let canvas = document.getElementById("canvas");
let gl = WebGLUtils.setupWebGL(canvas);
if (!gl) {
    alert("WebGL isn't available");
}

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
let program = createProgram(gl, vertexShader, fragmentShader);

// Setup program
gl.useProgram(program);

// Setup viewport
resizeCanvasToDisplaySize(gl.canvas);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear color
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Crete vBuffer and cBuffer
let vBuffer = gl.createBuffer();
let cBuffer = gl.createBuffer();

//  ------------------------ GLOBAL VARIABLE  ------------------------
// Global variables
let objects = [];
let drawing = false;
let drawType = "";

//  ------------------------ HELPER FUNCTIONS  ------------------------
// Function
const renderAllObject = () => {
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw(gl, program, vBuffer, cBuffer);
    }

    window.requestAnimationFrame(renderAllObject);
};

renderAllObject();

//  ------------------------ LISTENERS  ------------------------
// Button Listener
document.getElementById("line").addEventListener("mousedown", function (e) {
    drawType = "LINE";
    drawing = false; // means want to initiate first point see line 81-85
});

// Canvas Listener
canvas.addEventListener("mousedown", function (e) {
    let rect = gl.canvas.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / gl.canvas.width) * 2 - 1;
    let y = ((e.clientY - rect.top) / gl.canvas.height) * -2 + 1;
    var point = new Point([x, y]);
    // LINE
    if (drawType == "LINE") {
        if (drawing) {
            // second time mouse down, make line
            let line = objects[objects.length - 1];
            line.updatePoint(point);
            line.draw(gl, program, vBuffer, cBuffer);

            drawing = false;
        } else {
            // first time mouse down
            let line = new Line(point);
            objects.push(line);

            drawing = true; // then drawing mode when mouse move
        }
    }
    // SQUARE

    // RECTANGLE

    // POLYGON
});

canvas.addEventListener("mousemove", function (e) {
    let rect = gl.canvas.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / gl.canvas.width) * 2 - 1;
    let y = ((e.clientY - rect.top) / gl.canvas.height) * -2 + 1;
    var point = new Point([x, y]);

    if (drawing) {
        // LINE
        if (drawType == "LINE") {
            let line = objects[objects.length - 1];
            line.updatePoint(point);
            line.draw(gl, program, vBuffer, cBuffer);
        }
        // SQUARE

        // RECTANGLE

        // POLYGON
    }
});

// Listener
// const polyAddPoint = document.getElementById("polyAddPoint");
// const polyDelPoint = document.getElementById("polyDelPoint");
// const objectCreated = document.getElementById("object-created");

// let drawing = false;
// let obj = Object.create(null)
// let count = 0

// document.getElementById("line").addEventListener("mousedown", function (e) {
//     var line = new Line();

//     canvas.addEventListener("mousedown", function (e) {

//         if (drawing){
//             count++;
//             obj[count]
//             console.log(obj)

//             drawing = false
//             line.draw(e)
//         } else {
//             drawing = true
//             line.draw(e)
//         }
//     });

//     canvas.addEventListener("mousemove" , function (e) {
//         line.mouseMoveHandler(e)
//     })

// });

// document.getElementById("square").addEventListener("mousedown", function (e) {
//     // initDrawSquare()
// });

// document
//     .getElementById("rectangle")
//     .addEventListener("mousedown", function (e) {
//         // initDrawRectangle()
//     });

// document.getElementById("polygon").addEventListener("mousedown", function (e) {
//     // initDrawPolygon();
//     // const polygon = new Polygon();
//     // canvas.addEventListener("mousedown", function (e) {
//     //     polygon.draw(e);
//     // });

//     const polygon = new Polygon();
//     canvas.addEventListener("mousedown", function (e) {
//         polygon.draw(e);
//     });

//     showPolygonButton("block");

//     polyAddPoint.addEventListener("mousedown", function (e) {
//         polygon.addPolygonPoint();
//     });

//     polyDelPoint.addEventListener("mousedown", function (e) {
//         polygon.delPolygonPoint();
//     });

//     objectCreated.addEventListener("mousedown", function (e) {
//         alert("JALANNN")
//     });
// });

// function showPolygonButton(status) {

//     var polygonSection = document.getElementById("polygonSection");
//     // var x = document.getElementById("polyAddPoint");
//     // var y = document.getElementById("polyDelPoint");
//     // x.style.display = status;
//     // y.style.display = status;
//     polygonSection.style.display = status;
// }
