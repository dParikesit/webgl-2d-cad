import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Square extends Shape {
    center;
    firstPoint = null;
    secondPoint = null;
    thirdPoint = null;
    fourthPoint = null;
    done = false;

    oldCenter;
    oldFirstPoint;
    oldSecondPoint;
    oldThirdPoint;
    oldFourthPoint;
    deltaValue = 0;

    constructor(center) {
        super(-1, "Square");

        this.center = center;
        this.oldCenter = JSON.parse(JSON.stringify(center));
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
        this.oldFirstPoint = JSON.parse(JSON.stringify(temporarySecondPoint));
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

        this.oldFirstPoint = JSON.parse(JSON.stringify(firstPoint));
    }

    getOtherPoints(scale = false) {
        var cPoint = this.center.getPoint();
        var a = cPoint[0];
        var b = cPoint[1];

        var fPoint = this.firstPoint.getPoint();
        var x = fPoint[0];
        var y = fPoint[1];

        if (scale) {
            // rotate 90 degree by center
            this.secondPoint = new Point([-y + a + b, x - a + b], -1, this.secondPoint.color);
    
            // rotate 180 degree by center
            this.thirdPoint = new Point([-x + a + a, -y + b + b], -1, this.thirdPoint.color);
    
            // rotate -90 degree by center
            this.fourthPoint = new Point([y - b + a, -x + a + b], -1, this.fourthPoint.color);
        } else {
            this.secondPoint = new Point([-y + a + b, x - a + b]);
            this.thirdPoint = new Point([-x + a + a, -y + b + b]);
            this.fourthPoint = new Point([y - b + a, -x + a + b]);
        }
    }

    getCenter() {
        if (this.fourthPoint === null) {
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
        return [x / 4, y / 4];
    }

    moveCenterX(newX) {
        const [originX, _originY] = this.getCenter();
        let firstPointDelta = this.firstPoint.pos[0] - originX;
        let secondPointDelta = this.secondPoint.pos[0] - originX;
        let thirdPointDelta = this.thirdPoint.pos[0] - originX;
        let fourthPointDelta = this.fourthPoint.pos[0] - originX;

        this.firstPoint.pos[0] = parseFloat(newX) + firstPointDelta;
        this.secondPoint.pos[0] = parseFloat(newX) + secondPointDelta;
        this.thirdPoint.pos[0] = parseFloat(newX) + thirdPointDelta;
        this.fourthPoint.pos[0] = parseFloat(newX) + fourthPointDelta;
    }

    moveCenterY(newY) {
        const [_originX, originY] = this.getCenter();
        let firstPointDelta = this.firstPoint.pos[1] - originY;
        let secondPointDelta = this.secondPoint.pos[1] - originY;
        let thirdPointDelta = this.thirdPoint.pos[1] - originY;
        let fourthPointDelta = this.fourthPoint.pos[1] - originY;

        this.firstPoint.pos[1] = parseFloat(newY) + firstPointDelta;
        this.secondPoint.pos[1] = parseFloat(newY) + secondPointDelta;
        this.thirdPoint.pos[1] = parseFloat(newY) + thirdPointDelta;
        this.fourthPoint.pos[1] = parseFloat(newY) + fourthPointDelta;
    }

    rotate(newDegree) {
        const degree = newDegree - this.degree;
        this.degree += degree;
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

        oldX = this.thirdPoint.pos[0];
        oldY = this.thirdPoint.pos[1];
        this.thirdPoint.pos[0] =
            originX +
            (oldX - originX) * Math.cos(radian) -
            (oldY - originY) * Math.sin(radian);
        this.thirdPoint.pos[1] =
            originY +
            (oldX - originX) * Math.sin(radian) +
            (oldY - originY) * Math.cos(radian);

        oldX = this.fourthPoint.pos[0];
        oldY = this.fourthPoint.pos[1];
        this.fourthPoint.pos[0] =
            originX +
            (oldX - originX) * Math.cos(radian) -
            (oldY - originY) * Math.sin(radian);
        this.fourthPoint.pos[1] =
            originY +
            (oldX - originX) * Math.sin(radian) +
            (oldY - originY) * Math.cos(radian);
    }

    calculateLength() {
        return euclidianDist(this.firstPoint, this.secondPoint);
    }

    calculate(x, x1, y1, x2, y2) {
        let m = parseFloat((y2 - y1) / (x2 - x1));
        let c = parseFloat(y1 - parseFloat(m * x1));

        return parseFloat(parseFloat(m * x) + c);
    }

    changeHeight(delta) {
        console.log(delta)
        let oldX = this.oldFirstPoint.pos[0];
        let oldY = this.oldFirstPoint.pos[1];
        let newX = parseFloat(oldX) + parseFloat(delta);
        let newY = this.calculate(
            newX,
            oldX,
            oldY,
            this.center.pos[0],
            this.center.pos[1]
        );

        this.firstPoint.pos[0] = newX;
        this.firstPoint.pos[1] = parseFloat(newY);

        this.getOtherPoints(true);
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
        sliderHeight.min = -1;
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
}
