import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Rectangle extends Shape {
    firstPoint = null;
    secondPoint = null;
    thirdPoint = null;
    fourthPoint = null;
    done = false;

    // for translation purpose
    oldFirstPoint;
    oldSecondPoint;
    oldThirdPoint;
    oldFourthPoint;
    deltaxValue = 0;
    deltayValue = 0;

    constructor(firstPoint) {
        super(-1, "Rectangle");

        this.firstPoint = firstPoint;
        this.oldFirstPoint = JSON.parse(JSON.stringify(firstPoint));
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
            [
                this.firstPoint,
                this.thirdPoint,
                this.secondPoint,
                this.fourthPoint,
                this.firstPoint,
            ],
            gl.TRIANGLE_FAN
        );
    }

    doneDraw() {
        this.done = true;
    }

    updatePoint(temporarySecondPoint) {
        this.secondPoint = temporarySecondPoint;
        this.oldSecondPoint = JSON.parse(JSON.stringify(temporarySecondPoint));
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

        this.oldFirstPoint = JSON.parse(JSON.stringify(firstPoint));
        this.oldSecondPoint = JSON.parse(JSON.stringify(secondPoint));
        this.getOtherPoints();
    }

    getOtherPoints() {
        var fPoint = this.firstPoint.getPoint();
        var a = fPoint[0];
        var b = fPoint[1];

        var sPoint = this.secondPoint.getPoint();
        var x = sPoint[0];
        var y = sPoint[1];

        // rotate 180 degree by center
        this.thirdPoint = new Point([a, y]);
        this.oldThirdPoint = new Point([a, y]);

        // rotate -90 degree by center
        this.fourthPoint = new Point([x, b]);
        this.oldFourthPoint = new Point([x, b]);
    }

    calculateWidth() {
        return euclidianDist(this.firstPoint, this.thirdPoint);
    }

    calculateLength() {
        return euclidianDist(this.firstPoint, this.fourthPoint);
    }

    changeHeight(deltaX) {
        // 1 -- 3
        // 4 -- 2
        this.firstPoint.pos[0] = parseFloat(
            this.oldFirstPoint.pos[0] - parseFloat(deltaX)
        );
        this.secondPoint.pos[0] = parseFloat(
            this.oldSecondPoint.pos[0] + parseFloat(deltaX)
        );
        this.thirdPoint.pos[0] = parseFloat(
            this.oldThirdPoint.pos[0] - parseFloat(deltaX)
        );
        this.fourthPoint.pos[0] = parseFloat(
            this.oldFourthPoint.pos[0] + parseFloat(deltaX)
        );
    }

    changeWidth(deltaY) {
        this.firstPoint.pos[1] = parseFloat(
            this.oldFirstPoint.pos[1] + parseFloat(deltaY)
        );
        this.secondPoint.pos[1] = parseFloat(
            this.oldSecondPoint.pos[1] - parseFloat(deltaY)
        );
        this.thirdPoint.pos[1] = parseFloat(
            this.oldThirdPoint.pos[1] - parseFloat(deltaY)
        );
        this.fourthPoint.pos[1] = parseFloat(
            this.oldFourthPoint.pos[1] + parseFloat(deltaY)
        );
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
        sliderHeight.min = 0;
        sliderHeight.max = 1;
        sliderHeight.value = this.deltaxValue;
        sliderHeight.step = "0.01";
        sliderHeight.addEventListener("input", (e) => {
            this.changeHeight(e.target.value);
            this.deltaxValue = e.target.value;
        });

        // second inner third div
        const widthTitle = document.createElement("h2");
        widthTitle.innerHTML = "Lebar";
        const sliderWidth = document.createElement("input");
        sliderWidth.type = "range";
        sliderWidth.min = 0;
        sliderWidth.max = 1;
        sliderWidth.value = this.deltayValue;
        sliderWidth.step = "0.01";
        sliderWidth.addEventListener("input", (e) => {
            this.changeWidth(e.target.value);
            this.deltayValue = e.target.value;
        });

        thirdDiv.append(
            sizeTitle,
            heightTitle,
            sliderHeight,
            widthTitle,
            sliderWidth
        );

        return thirdDiv;
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
}
