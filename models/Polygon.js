import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Polygon extends Shape {
    firstPoint = null;
    secondPoint = null;
    jumlahTitik = 0;
    done = false;

    constructor(firstPoint) {
        super(-1, "Polygon")

        this.firstPoint = firstPoint;
        this.points.push(firstPoint);
        this.drawObjectInfo();
    }

    clone() {}

    draw(gl, program, vBuffer, cBuffer) {
        // console.log("apa kesini lagi")
        if (this.secondPoint == null) {
            return
        }
        
        if(this.points.length == 0){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                [...this.points, this.secondPoint],
                gl.POINTS,
            );
        }else if(this.points.length == 1){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                [...this.points, this.secondPoint],
                gl.LINES,
            );
        }else{
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                [...this.points, this.secondPoint],
                gl.TRIANGLE_FAN
            );
        }
    }

    drawLast(gl, program, vBuffer, cBuffer) {
        console.log("di draw last", this.points)
        if(this.points.length == 1){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                this.points,
                gl.POINTS,
            );
        }else if(this.points.length == 2){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                this.points,
                gl.LINES,
            );
        }else{
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                this.points,
                gl.TRIANGLE_FAN,
            );
        }
    }

    doneDraw() {
        this.done = true;
    }

    updatePoint(temporarySecondPoint) {
        this.secondPoint = temporarySecondPoint;
    }

    updateFixedPoint(addedPoint){
        this.points.push(addedPoint);
        this.jumlahTitik = this.jumlahTitik + 1
    }

    drawObjectInfo = () => {
        let inner = "<h1>Polygon Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    updatePointFromImport(firstPoint, secondPoint, thirdPoint, fourthPoint) {
        this.firstPoint = firstPoint;
        this.secondPoint = secondPoint;
        this.thirdPoint = thirdPoint;
        this.fourthPoint = fourthPoint;
        this.done = true;
    }
}


// constructor(id = -1, type = "Polygon") {
//     super(id, type);

//     this.drawObjectInfo();
// }

// clone() {
//     let newPolygon = new Polygon(this.id, this.type);
//     this.points.forEach((point) => {
//         newPolygon.points.push(point.clone());
//     });
// }

// draw(event) {
//     let rect = gl.canvas.getBoundingClientRect();
//     let x = ((event.clientX - rect.left) / gl.canvas.width) * 2 - 1;
//     let y = ((event.clientY - rect.top) / gl.canvas.height) * -2 + 1;

//     if (this.points.length < 2) {
//         this.points.push(new Point([x, y]));
//         this.render(gl.POINTS, this.points);
//     } else if(this.points.length == 2){
//         this.points.push(new Point([x, y]));
//         this.render(gl.TRIANGLES, this.points);
//     }else {
//         this.points.push(this.points[0].clone());
//         this.points.push(this.points[this.points.length - 2].clone());
//         this.points.push(new Point([x, y]));
//         this.render(gl.TRIANGLES, this.points);
//     }
// }

// glType(gl) {
//     return gl.TRIANGLES
// }

// drawObjectInfo = () => {
//     let inner = "<h1>Polygon Initiated</h1> <button id='test'> hai </button>";

//     document.getElementById("object-created").innerHTML = inner;
// };

// addPolygonPoint(x, y){
//     x = Math.random() * (1 - (-1)) + (-1);
//     y = Math.random() * (1 - (-1)) + (-1);

//     if (this.points.length < 2) {
//         this.points.push(new Point([x, y]));
//         this.render(gl.POINTS);
//     } else if(this.points.length == 2){
//         this.points.push(new Point([x, y]));
//         this.render(gl.TRIANGLES);
//     }else {
//         this.points.push(this.points[0].clone());
//         this.points.push(this.points[this.points.length - 2].clone());
//         this.points.push(new Point([x, y]));
//         this.render(gl.TRIANGLES);
//     }
// }

// delPolygonPoint(x, y){

//     if (this.points.length <= 2) {
//         this.points.pop();
//         this.render(gl.POINTS);
//     } else if(this.points.length == 3){
//         this.points.pop();
//         this.render(gl.POINTS);
//     }else {
//         this.points.pop();
//         this.points.pop();
//         this.points.pop();
//         this.render(gl.TRIANGLES);
//     }
// }