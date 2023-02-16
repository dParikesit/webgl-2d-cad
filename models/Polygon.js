import { gl } from "../script.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Polygon extends Shape {
    constructor(id = -1, type = "Polygon") {
        super(id, type);

        this.refreshObjectsList();
    }

    clone() {
        let newPolygon = new Polygon(this.id, this.type);
        this.points.forEach((point) => {
            newPolygon.points.push(point.clone());
        });
    }

    draw(event) {
        

        let rect = gl.canvas.getBoundingClientRect();
        let x = ((event.clientX - rect.left) / gl.canvas.width) * 2 - 1;
        let y = ((event.clientY - rect.top) / gl.canvas.height) * -2 + 1;

        if (this.points.length < 2) {
            this.points.push(new Point([x, y]));
            this.render(gl.POINTS);
        } else if(this.points.length == 2){
            this.points.push(new Point([x, y]));
            this.render(gl.TRIANGLES);
        }else {
            this.points.push(this.points[0].clone());
            this.points.push(this.points[this.points.length - 2].clone());
            this.points.push(new Point([x, y]));
            this.render(gl.TRIANGLES);
        }
    }

    refreshObjectsList = () => {
        let inner = "<h1>Polygon Initiated</h1>";
    
        document.getElementById("object-created").innerHTML = inner;
    };

    addPolygonPoint(){
        alert("HEYHO")
    }
}
