import { genColor } from "../utils/tools.js";

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
}
