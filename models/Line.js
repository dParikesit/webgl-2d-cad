import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Line extends Shape {
    firstPoint;
    secondPoint = null;

    constructor(firstPoint) {
        super(-1, "Line");

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
            gl.LINES
        );
    }

    updatePoint(temporarySecondPoint) {
        this.secondPoint = temporarySecondPoint;
    }

    drawObjectInfo = () => {
        let inner = "<h1>Line Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    updatePointFromImport(firstPoint, secondPoint) {
        this.firstPoint = firstPoint;
        this.secondPoint = secondPoint;
    }

    getCenter() {
        if (this.secondPoint === null) {
            return;
        }

        let x = this.firstPoint.pos[0] + this.secondPoint.pos[0];
        let y = this.firstPoint.pos[1] + this.secondPoint.pos[1];
        return [x / 2, y / 2];
    }

    moveCenterX(newX) {
        const [originX, _originY] = this.getCenter();
        let delta = newX - originX;

        let min = Math.min(this.firstPoint.pos[0], this.secondPoint.pos[0]);
        let max = Math.max(this.firstPoint.pos[0], this.secondPoint.pos[0]);

        if (min + delta <= -1) {
            delta = -1 - min;
        } else if (max + delta >= 1) {
            delta = 1 - max;
        }

        this.firstPoint.pos[0] += delta;
        this.secondPoint.pos[0] += delta;
    }

    moveCenterY(newY) {
        const [_originX, originY] = this.getCenter();
        let delta = newY - originY;

        let min = Math.min(this.firstPoint.pos[1], this.secondPoint.pos[1]);
        let max = Math.max(this.firstPoint.pos[1], this.secondPoint.pos[1]);

        if (min + delta <= -1) {
            delta = -1 - min;
        } else if (max + delta >= 1) {
            delta = 1 - max;
        }

        this.firstPoint.pos[1] += delta;
        this.secondPoint.pos[1] += delta;
    }
}
