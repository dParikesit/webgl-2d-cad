import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Line extends Shape {
    firstPoint;
    secondPoint = null;

    constructor(firstPoint) {
        super()

        this.firstPoint = firstPoint;
        this.drawObjectInfo();
    }

    clone() {
        let newLine = new Line(this.id, this.type);
        this.points.forEach((point) => {
            newLine.points.push(point.clone());
        });
    }

    draw(gl, program, vBuffer, cBuffer) {
        if (this.secondPoint == null) {
            return;
        }

        this.render(
            gl,
            program,
            vBuffer,
            cBuffer,
            [this.firstPoint, this.secondPoint],
            gl.LINES,
        );
    }

    updatePoint(temporarySecondPoint) {
        this.secondPoint = temporarySecondPoint;
    }

    drawObjectInfo = () => {
        let inner = "<h1>Line Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };
}
