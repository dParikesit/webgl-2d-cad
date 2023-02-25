import { genColor } from "../utils/tools.js";
import { euclidianDist } from "../utils/math.js";

export class Point {
    constructor(pos, id = -1, color = genColor()) {
        this.id = id;
        this.name = `New Point`;
        this.pos = pos;
        this.color = color;
    }

    clone() {
        return new Point(this.pos, this.id, this.color);
    }

    print() {
        console.log(
            `Point with id ${this.id}, name ${this.name}, pos ${this.color}, color ${this.color}`
        );
    }

    objListener() {
        let styleSect = document.getElementById("style");
        styleSect.replaceChildren();

        // First Div Point
        const firstDivPoint = document.createElement("div");
        firstDivPoint.className = "container-transformation-list-1";
        const colorSelector = document.createElement("h2");
        colorSelector.innerHTML = "Color Selector";

        const element = document.createElement("select");
        if (this.color == [1, 0, 0, 1]) {
            element.value = "Red";
        } else if (this.color == [0, 1, 0, 1]) {
            element.value = "Green";
        } else if (this.color == [0, 0, 1, 1]) {
            element.value = "Blue";
        }

        const optRed = document.createElement("option");
        optRed.value = "Red";
        optRed.text = "Red";
        const optGreen = document.createElement("option");
        optGreen.value = "Green";
        optGreen.text = "Green";
        const optBlue = document.createElement("option");
        optBlue.value = "Blue";
        optBlue.text = "Blue";

        element.add(optRed);
        element.add(optGreen);
        element.add(optBlue);

        element.addEventListener("change", (e) => {
            console.log(e.target.value)
            if (e.target.value === "Red") {
                this.color = [1, 0, 0, 1];
            } else if (e.target.value === "Green") {
                this.color = [0, 1, 0, 1];
            } else if (e.target.value === "Blue") {
                this.color = [0, 0, 1, 1];
            }
        });

        firstDivPoint.append(colorSelector, element)

        // First Div Point
        const secondDivPoint = document.createElement("div");
        secondDivPoint.className = "container-transformation-list-1";
        const pointSlider = document.createElement("h2");
        pointSlider.innerHTML = "Point Slider";


        const sliderXTitle = document.createElement("h3");
        sliderXTitle.innerHTML = "Slider X";
        const sliderX = document.createElement("input");
        sliderX.type = "range";
        sliderX.min = -1;
        sliderX.max = 1;
        sliderX.value = 0;
        sliderX.step = "0.01";
        sliderX.addEventListener("input", (e) => {
            console.log(e.target.value);
            this.movePointX(e.target.value);
        });

        const sliderYTitle = document.createElement("h3");
        sliderYTitle.innerHTML = "Slider Y";
        const sliderY = document.createElement("input");
        sliderY.type = "range";
        sliderY.min = -1;
        sliderY.max = 1;
        sliderY.value = 0;
        sliderY.step = "0.01";
        sliderY.addEventListener("input", (e) => {
            console.log(e.target.value);
            this.movePointY(e.target.value);
        });

        secondDivPoint.append(sliderXTitle)
        secondDivPoint.append(sliderX)
        secondDivPoint.append(sliderYTitle)
        secondDivPoint.append(sliderY)

        styleSect.append(firstDivPoint, secondDivPoint)
    }

    movePointX(newX){
        console.log("masuk fungsi x", newX)
        this.pos[0] = newX
    }

    movePointY(newY){
        console.log("masuk fungsi y", newY)
        this.pos[1] = newY
    }

    getPoint() {
        return this.pos;
    }

    getColor() {
        return this.color
    }
}
