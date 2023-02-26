import { genColor } from "../utils/tools.js";
import { euclidianDist } from "../utils/math.js";
import { objects } from "../script.js";

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
    
    thirdDivStyleSetup() {}

    objListener(idParent=-1) {
        let toolsSect = document.getElementById("transformation");
        toolsSect.replaceChildren();
        
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


        const sliderXTitlePoint = document.createElement("h3");
        sliderXTitlePoint.innerHTML = "Slider X";
        const sliderXPoint = document.createElement("input");
        sliderXPoint.type = "range";
        sliderXPoint.min = -1;
        sliderXPoint.max = 1;
        sliderXPoint.value = 0;
        sliderXPoint.step = "0.01";
        sliderXPoint.addEventListener("input", (e) => {
            console.log(e.target.value);
            this.movePointX(e.target.value, idParent);
        });

        const sliderYTitlePoint = document.createElement("h3");
        sliderYTitlePoint.innerHTML = "Slider Y";
        const sliderYPoint = document.createElement("input");
        sliderYPoint.type = "range";
        sliderYPoint.min = -1;
        sliderYPoint.max = 1;
        sliderYPoint.value = 0;
        sliderYPoint.step = "0.01";
        sliderYPoint.addEventListener("input", (e) => {
            console.log(e.target.value);
            this.movePointY(e.target.value, idParent);
        });

        secondDivPoint.append(pointSlider)
        secondDivPoint.append(sliderXTitlePoint)
        secondDivPoint.append(sliderXPoint)
        secondDivPoint.append(sliderYTitlePoint)
        secondDivPoint.append(sliderYPoint)


        styleSect.append(firstDivPoint, secondDivPoint)
    }

    movePointX(newX, idParent){
        console.log("masuk fungsi x", newX)
        if (idParent==-1) {
            this.pos[0] = parseFloat(newX);    
        } else{
            let parent = objects[idParent];
            parent.moveCenterX(newX);
        }
        
        
    }

    movePointY(newY, idParent){
        console.log("masuk fungsi y", newY)
        if (idParent == -1) {
            this.pos[1] = parseFloat(newY);
        } else {
            let parent = objects[idParent];
            parent.moveCenterY(newY);
        }
    }

    getPoint() {
        return this.pos;
    }

    getColor() {
        return this.color
    }
}
