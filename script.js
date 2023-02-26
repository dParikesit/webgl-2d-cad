import { Line } from "./models/Line.js";
import { Point } from "./models/Point.js";
import { Rectangle } from "./models/Rectangle.js";
import { Square } from "./models/Square.js";
import { Polygon } from "./models/Polygon.js";
import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "./utils/init-shader.js";
import { resizeCanvasToDisplaySize } from "./utils/tools.js";

import {
    importLine,
    importPolygon,
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
        for (let j = 0; j < objects[id].points.length; j++) {
            objectsButton.appendChild(createPointButton(id, j));
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
// Object Listener
document.getElementById("object-list").addEventListener("mousedown", function (e) {
    let id = e.target.id.split("-")
    if (id.length===1) {
        id[0] = parseInt(id[0])
        const obj = objects[id[0]];
        console.log(`${obj.type} ${id[0]} clicked`)
        obj.objListener(gl)
    } else{
        id[0] = parseInt(id[0]);
        id[1] = parseInt(id[1]);
        const obj = objects[id[0]];
        console.log(`${objects[id[0]].type} ${id[0]} Point ${id[1]} clicked`);
        if (obj.type==="Line") {
            if (id[1]===1) {
                console.log("First point clicked")
                obj.firstPoint.objListener();
            } else if (id[1] === 2) {
                console.log("Second point clicked");
                obj.secondPoint.objListener();
            }
        } else if(obj.type==="Square" || obj.type==="Rectangle") {
            if (id[1] === 1) {
                console.log("First point clicked");
                obj.firstPoint.objListener();
            } else if (id[1] === 2) {
                console.log("Second point clicked");
                obj.secondPoint.objListener();
            } else if (id[1] === 3) {
                console.log("Third point clicked");
                obj.thirdPoint.objListener();
            } else if (id[1] === 4) {
                console.log("Fourth point clicked");
                obj.fourthPoint.objListener();
            }
        }else{
            obj.points[id[1]].objListener();
            obj.objListenerPol(gl, id[1]);
        }
    }
})

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

            if (type == "Polygon") {
                objects.push(importPolygon(object))
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

document
    .getElementById("polygon")
    .addEventListener("mousedown", function (e) {
        drawType = "POLYGON";
        drawing = false;
    });


// Canvas Listener
canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
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
    if (drawType == "POLYGON") {        
        if(e.which == 3){
            let polygon = objects[objects.length - 1];
            polygon.updatePoint(point);
            polygon.updateFixedPoint(point);
            polygon.draw(gl, program, vBuffer, cBuffer);
            polygon.doneDraw();

            drawing = false
        }else{
            if(drawing){
                let polygon = objects[objects.length - 1];
                polygon.updateFixedPoint(point);
                polygon.draw(gl, program, vBuffer, cBuffer);

            }else{
                let polygon = new Polygon(point);
                objects.push(polygon);
                polygon.updatePoint(point);
                drawing = true; // then drawing mode when mouse move
            }
        }

    }
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
        if (drawType == "POLYGON") {
            let polygon = objects[objects.length - 1];
            polygon.updatePoint(point);
            polygon.draw(gl, program, vBuffer, cBuffer);
        }
    }
});

// ------------------------ HELP ------------------------

// When the user clicks on the button, open the modal
document.getElementById("myBtn").addEventListener("mousedown", function (e) {
    document.getElementById("myModal").style.display = "block";
});

// When the user clicks on <span> (x), close the modal
document.getElementById("close").addEventListener("mousedown", function (e) {
    document.getElementById("myModal").style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
}

canvas.addEventListener("contextmenu", function(event) {

    // Prevent the default context menu from showing up
    event.preventDefault();
  
  });

// ------------------------ HELP ------------------------
// document.getElementById("stopDraw").addEventListener("mousedown", function (e) {
//     stopDrawPolygon();
//     // document.getElementById("stopDraw").style.display = "none";
// });

// function stopDrawPolygon(){
//     let polygon = objects[objects.length - 1];
//     console.log(polygon.points)
//     polygon.updatePoint(null);
//     // polygon.updateFixedPoint(point);
//     polygon.draw(gl, program, vBuffer, cBuffer);
//     polygon.doneDraw();

//     drawing = false
// }


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
