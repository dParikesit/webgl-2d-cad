import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Square extends Shape {
    center;
    firstPoint = null;
    secondPoint = null;
    thirdPoint = null;
    fourthPoint = null;
    done = false;

    constructor(center) {
        super()

        this.center = center;
        this.drawObjectInfo();
    }

    clone() {}

    draw(gl, program, vBuffer, cBuffer) {
        if (this.firstPoint == null) {
            return;
        }

        if (!this.done) {
            this.getOtherPoints(this.firstPoint);
        }

        this.render(
            gl,
            program,
            vBuffer,
            cBuffer,
            [this.firstPoint, this.fourthPoint, this.thirdPoint, this.secondPoint, this.firstPoint],
            gl.TRIANGLE_FAN,
        );
    }

    doneDraw() {
        this.done = true;
    }

    updatePoint(temporarySecondPoint) {
        this.firstPoint = temporarySecondPoint;
    }

    drawObjectInfo = () => {
        let inner = "<h1>Square Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    getOtherPoints() {
        var cPoint = this.center.getPoint();
        var a = cPoint[0]
        var b = cPoint[1]

        var fPoint = this.firstPoint.getPoint();
        var x = fPoint[0]
        var y = fPoint[1]

        // rotate 90 degree by center
        this.secondPoint = new Point([-y+a+b, x-a+b])

        // rotate 180 degree by center
        this.thirdPoint = new Point([-x+a+a, -y+b+b])

        // rotate -90 degree by center
        this.fourthPoint = new Point([y-b+a, -x+a+b])
    }
}
