import { gl } from "../script.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Line extends Shape {
    constructor(id = -1, type = "Line") {
        super(id, type);

        this.drawObjectInfo();
    }


    clone() {
        let newLine = new Line(this.id, this.type);
        this.points.forEach((point) => {
            newLine.points.push(point.clone());
        });

    }

    draw(event) {
        let point = this.getMousePosition(event)
        this.points.push(new Point(point)) 

        let points = this.points

        var pairedPoints
        var nonPairedPoint
        if ((points.length) % 2 == 0) {
            pairedPoints = points
        } else {
            pairedPoints = points.slice(0, points.length-1)
            nonPairedPoint = points.slice(points.length)
        }

        this.render(gl.LINES, pairedPoints);
    }

    drawObjectInfo = () => {
        let inner = "<h1>Line Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    getMousePosition(event){
        let rect = gl.canvas.getBoundingClientRect();
        let x = ((event.clientX - rect.left) / gl.canvas.width) * 2 - 1;
        let y = ((event.clientY - rect.top) / gl.canvas.height) * -2 + 1;
        return [x,y]
    }


    mouseMoveHandler(event){
        console.log("mousemove")
        let point = new Point(this.getMousePosition(event))
        this.renderMouseMove([...this.points,point])
    }

    renderMouseMove(points){
        var pairedPoints
        var nonPairedPoint
        if ((points.length) % 2 == 0) {
            pairedPoints = points
        } else {
            pairedPoints = points.slice(0, points.length-1)
            nonPairedPoint = points.slice(points.length)
        }
        
        this.render(gl.LINES, pairedPoints)
    }
}
