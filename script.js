import { Line } from "./models/Line.js";
import { Point } from "./models/Point.js";
import { Rectangle } from "./models/Rectangle.js";
import { Square } from "./models/Square.js";
import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "./utils/init-shader.js";
import { resizeCanvasToDisplaySize } from "./utils/tools.js";

import {
    importLine,
    importRectangle,
    importSquare,
} from "./utils/import-object.js";
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
const createShapeButton = (id, type) => {
    const element = document.createElement("button");
    element.id = id;
    element.className = "shape";
    element.innerHTML = `${type} ${id}`;
    return element;
};

const createPointButton = (idParent, idPoint) => {
    const element = document.createElement("button");
    element.id = `${idParent}-${idPoint}`;
    element.className = "point";
    element.innerHTML = `Point ${idPoint}`;
    return element;
};

const createAllButton = (id) => {
    let objectsButton = document.getElementById("object-list");
    if (objects[id].type === "Line") {
        objectsButton.appendChild(createPointButton(id, 1));
        objectsButton.appendChild(createPointButton(id, 2));
    } else if (
        objects[id].type === "Square" ||
        objects[id].type === "Rectangle"
    ) {
        objectsButton.appendChild(createPointButton(id, 1));
        objectsButton.appendChild(createPointButton(id, 2));
        objectsButton.appendChild(createPointButton(id, 3));
        objectsButton.appendChild(createPointButton(id, 4));
    } else {
        for (let j = 0; j < objects[i].points.length; j++) {
            objectsButton.appendChild(createPointButton(i, j));
        }
    }
};

const renderAllObject = () => {
    for (let i = 0; i < objects.length; i++) {
        objects[i].draw(gl, program, vBuffer, cBuffer);
    }

    window.requestAnimationFrame(renderAllObject);

    let objectsButton = document.getElementById("object-list");
    objectsButton.replaceChildren();
    for (let i = 0; i < objects.length; i++) {
        objectsButton.appendChild(createShapeButton(i, objects[i].type));
        createAllButton(i)
    }
};

renderAllObject();

//  ------------------------ LISTENERS  ------------------------
// Export Import Listener
document.getElementById("export").addEventListener("mousedown", function (e) {
    let element = document.createElement("a");
    let text = JSON.stringify(objects);
    let filename = "data.json";

    element.setAttribute("href", "data:text/json, " + encodeURIComponent(text));
    element.setAttribute("download", filename);

    document.body.appendChild(element);
    element.click();
});

document.getElementById("import").addEventListener("change", function (event) {
    var data = document.getElementById("import").files[0];

    if (!data) {
        alert("data not found");
        return;
    }

    var reader = new FileReader();
    reader.onload = (e) => {
        try {
            var importedObjects = JSON.parse(e.target.result);
        } catch (e) {
            alert("data not found");
            return;
        }

        if (!importedObjects) {
            return;
        }

        for (let i = 0; i < importedObjects.length; i++) {
            console.log(importedObjects[i]);
            var object = importedObjects[i];
            var type = object.type;

            if (type == "Line") {
                objects.push(importLine(object));
            }

            if (type == "Square") {
                objects.push(importSquare(object));
            }

            if (type == "Rectangle") {
                objects.push(importRectangle(object));
            }
        }
    };
    reader.readAsText(data);
});

// Button Shape Listener
document.getElementById("line").addEventListener("mousedown", function (e) {
    drawType = "LINE";
    drawing = false;
});

document.getElementById("square").addEventListener("mousedown", function (e) {
    drawType = "SQUARE";
    drawing = false;
});

document
    .getElementById("rectangle")
    .addEventListener("mousedown", function (e) {
        drawType = "RECTANGLE";
        drawing = false;
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
    if (drawType == "SQUARE") {
        if (drawing) {
            // second time mouse down, make line
            let square = objects[objects.length - 1];
            square.updatePoint(point);
            square.draw(gl, program, vBuffer, cBuffer);
            square.doneDraw();

            drawing = false;
        } else {
            // first time mouse down
            let square = new Square(point);
            objects.push(square);

            drawing = true; // then drawing mode when mouse move
        }
    }

    // RECTANGLE
    if (drawType == "RECTANGLE") {
        if (drawing) {
            // second time mouse down, make line
            let rectangle = objects[objects.length - 1];
            rectangle.updatePoint(point);
            rectangle.draw(gl, program, vBuffer, cBuffer);
            rectangle.doneDraw();

            drawing = false;
        } else {
            // first time mouse down
            let rectangle = new Rectangle(point);
            objects.push(rectangle);

            drawing = true; // then drawing mode when mouse move
        }
    }

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
        if (drawType == "SQUARE") {
            let square = objects[objects.length - 1];
            square.updatePoint(point);
            square.draw(gl, program, vBuffer, cBuffer);
        }

        // RECTANGLE
        if (drawType == "RECTANGLE") {
            let rectangle = objects[objects.length - 1];
            rectangle.updatePoint(point);
            rectangle.draw(gl, program, vBuffer, cBuffer);
        }

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
