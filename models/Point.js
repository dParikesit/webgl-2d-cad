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

        styleSect.appendChild(element)
    }

    getPoint() {
        return this.pos;
    }

    getColor() {
        return this.color
    }
}
