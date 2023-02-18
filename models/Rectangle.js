import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Rectangle extends Shape {
    firstPoint = null;
    secondPoint = null;
    thirdPoint = null;
    fourthPoint = null;
    done = false;

    constructor(firstPoint) {
        super(-1, "Rectangle")

        this.firstPoint = firstPoint;
        this.drawObjectInfo();
    }

    clone() {}

    draw(gl, program, vBuffer, cBuffer) {
        if (this.secondPoint == null) {
            return;
        }

        if (!this.done) {
            this.getOtherPoints();
        }

        this.render(
            gl,
            program,
            vBuffer,
            cBuffer,
            [this.firstPoint, this.thirdPoint, this.secondPoint, this.fourthPoint, this.firstPoint],
            gl.TRIANGLE_FAN,
        );
    }

    doneDraw() {
        this.done = true;
    }

    updatePoint(temporarySecondPoint) {
        this.secondPoint = temporarySecondPoint;
    }

    drawObjectInfo = () => {
        let inner = "<h1>Rectangle Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    updatePointFromImport(firstPoint, secondPoint, thirdPoint, fourthPoint) {
        this.firstPoint = firstPoint;
        this.secondPoint = secondPoint;
        this.thirdPoint = thirdPoint;
        this.fourthPoint = fourthPoint;
        this.done = true;
    }

    getOtherPoints() {
        var fPoint = this.firstPoint.getPoint();
        var a = fPoint[0]
        var b = fPoint[1]

        var sPoint = this.secondPoint.getPoint();
        var x = sPoint[0]
        var y = sPoint[1]

        // rotate 180 degree by center
        this.thirdPoint = new Point([a, y])

        // rotate -90 degree by center
        this.fourthPoint = new Point([x, b])
    }
}
