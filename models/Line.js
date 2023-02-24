import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Line extends Shape {
    firstPoint;
    secondPoint = null;
    oldFirstPoint;
    oldSecondPoint;
    deltaValue = 0;

    constructor(firstPoint) {
        super(-1, "Line");

        // needed to preserve old point such that it is not connected to firstPoint change
        this.oldFirstPoint = JSON.parse(JSON.stringify(firstPoint));
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
        this.oldSecondPoint = JSON.parse(JSON.stringify(temporarySecondPoint));
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

        this.firstPoint.pos[0] += delta;
        this.secondPoint.pos[0] += delta;
    }

    moveCenterY(newY) {
        const [_originX, originY] = this.getCenter();
        let delta = newY - originY;

        this.firstPoint.pos[1] += delta;
        this.secondPoint.pos[1] += delta;
    }

    rotate(degree) {
        const radian = degree * (Math.PI / 180);
        const [originX, originY] = this.getCenter();

        let oldX = this.firstPoint.pos[0];
        let oldY = this.firstPoint.pos[1];
        this.firstPoint.pos[0] =
            originX +
            (oldX - originX) * Math.cos(radian) -
            (oldY - originY) * Math.sin(radian);
        this.firstPoint.pos[1] =
            originY +
            (oldX - originX) * Math.sin(radian) +
            (oldY - originY) * Math.cos(radian);

        oldX = this.secondPoint.pos[0];
        oldY = this.secondPoint.pos[1];
        this.secondPoint.pos[0] =
            originX +
            (oldX - originX) * Math.cos(radian) -
            (oldY - originY) * Math.sin(radian);
        this.secondPoint.pos[1] =
            originY +
            (oldX - originX) * Math.sin(radian) +
            (oldY - originY) * Math.cos(radian);
    }

    changeHeight(point) {
        console.log(this.oldFirstPoint.pos, this.oldSecondPoint.pos);
        let oldFpX = this.oldFirstPoint.pos[0];
        let oldFpY = this.oldFirstPoint.pos[1];
        let oldSpX = this.oldSecondPoint.pos[0];
        let oldSpY = this.oldSecondPoint.pos[1];

        this.firstPoint.pos[0] = parseFloat(oldFpX + parseFloat(point));
        this.firstPoint.pos[1] = parseFloat(oldFpY + parseFloat(point));
        this.secondPoint.pos[0] = parseFloat(oldSpX - parseFloat(point));
        this.secondPoint.pos[1] = parseFloat(oldSpY - parseFloat(point));
    }

    thirdDivSetup() {
        // third div
        const thirdDiv = document.createElement("div");
        thirdDiv.className = "container-transformation-list-3";
        const sizeTitle = document.createElement("h1");
        sizeTitle.innerHTML = "Ukuran";

        // first inner third div
        const heightTitle = document.createElement("h2");
        heightTitle.innerHTML = "Panjang";
        const sliderHeight = document.createElement("input");
        sliderHeight.type = "range";
        sliderHeight.min =-1;
        sliderHeight.max = 1;
        sliderHeight.value = this.deltaValue;
        sliderHeight.step = "0.01";
        sliderHeight.addEventListener("input", (e) => {
            this.changeHeight(e.target.value);
            this.deltaValue = e.target.value;
        });

        thirdDiv.append(sizeTitle, heightTitle, sliderHeight);

        return thirdDiv;
    }

    calculateLength() {
        return euclidianDist(this.firstPoint, this.secondPoint);
    }
}
