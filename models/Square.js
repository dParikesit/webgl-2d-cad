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
        super(-1, "Square");

        this.center = center;
        this.drawObjectInfo();
    }

    clone() {}

    draw(gl, program, vBuffer, cBuffer) {
        if (this.firstPoint == null) {
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
            [
                this.firstPoint,
                this.fourthPoint,
                this.thirdPoint,
                this.secondPoint,
                this.firstPoint,
            ],
            gl.TRIANGLE_FAN
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

    updateFromImport(center, firstPoint, secondPoint, thirdPoint, fourthPoint) {
        this.center = center;
        this.firstPoint = firstPoint;
        this.secondPoint = secondPoint;
        this.thirdPoint = thirdPoint;
        this.fourthPoint = fourthPoint;
        this.done = true;
    }

    getOtherPoints() {
        var cPoint = this.center.getPoint();
        var a = cPoint[0];
        var b = cPoint[1];

        var fPoint = this.firstPoint.getPoint();
        var x = fPoint[0];
        var y = fPoint[1];

        // rotate 90 degree by center
        this.secondPoint = new Point([-y + a + b, x - a + b]);

        // rotate 180 degree by center
        this.thirdPoint = new Point([-x + a + a, -y + b + b]);

        // rotate -90 degree by center
        this.fourthPoint = new Point([y - b + a, -x + a + b]);
    }

    getCenter() {
        if (this.secondPoint === null) {
            return;
        }

        let x =
            this.firstPoint.pos[0] +
            this.secondPoint.pos[0] +
            this.thirdPoint.pos[0] +
            this.fourthPoint.pos[0];
        let y =
            this.firstPoint.pos[1] +
            this.secondPoint.pos[1] +
            this.thirdPoint.pos[1] +
            this.fourthPoint.pos[1];
        return [x / 2, y / 2];
    }

    moveCenterX(newX) {
        const [originX, _originY] = this.getCenter();
        let delta = newX - originX;

        this.firstPoint.pos[0] += delta;
        this.secondPoint.pos[0] += delta;
        this.thirdPoint.pos[0] += delta;
        this.fourthPoint.pos[0] += delta;
    }

    moveCenterY(newY) {
        const [_originX, originY] = this.getCenter();
        let delta = newY - originY;

        this.firstPoint.pos[1] += delta;
        this.secondPoint.pos[1] += delta;
        this.thirdPoint.pos[1] += delta;
        this.fourthPoint.pos[1] += delta;
    }

    rotate(degree){
        const radian = degree * (Math.PI / 180);
        const [originX, originY] = this.getCenter();
        
        let oldX = this.firstPoint.pos[0];
        let oldY = this.firstPoint.pos[1];
        this.firstPoint.pos[0] = originX + ((oldX-originX)*Math.cos(radian)) - ((oldY-originY)*Math.sin(radian));
        this.firstPoint.pos[1] = originY + ((oldX-originX)*Math.sin(radian)) + ((oldY-originY)*Math.cos(radian));

        oldX = this.secondPoint.pos[0];
        oldY = this.secondPoint.pos[1];
        this.secondPoint.pos[0] = originX + ((oldX-originX)*Math.cos(radian)) - ((oldY-originY)*Math.sin(radian));
        this.secondPoint.pos[1] = originY + ((oldX-originX)*Math.sin(radian)) + ((oldY-originY)*Math.cos(radian));

        oldX = this.thirdPoint.pos[0];
        oldY = this.thirdPoint.pos[1];
        this.thirdPoint.pos[0] = originX + ((oldX-originX)*Math.cos(radian)) - ((oldY-originY)*Math.sin(radian));
        this.thirdPoint.pos[1] = originY + ((oldX-originX)*Math.sin(radian)) + ((oldY-originY)*Math.cos(radian));

        oldX = this.fourthPoint.pos[0];
        oldY = this.fourthPoint.pos[1];
        this.fourthPoint.pos[0] = originX + ((oldX-originX)*Math.cos(radian)) - ((oldY-originY)*Math.sin(radian));
        this.fourthPoint.pos[1] = originY + ((oldX-originX)*Math.sin(radian)) + ((oldY-originY)*Math.cos(radian));
    }
}
