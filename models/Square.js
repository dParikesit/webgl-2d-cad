import { gl } from "../script.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Square extends Shape {
    constructor(id = -1, type = "Line") {
        super(id, type);

        this.points.push(new Point([0.01,0.01],1, [1.0, 0.0, 0.0, 1.0]))
        this.points.push(new Point([-0.01,0.01],1, [1.0, 0.0, 0.0, 1.0]))
        this.points.push(new Point([0.01,-0.01],1, [1.0, 0.0, 0.0, 1.0]))
        this.points.push(new Point([-0.01,-0.01],1, [1.0, 0.0, 0.0, 1.0]))


        this.drawObjectInfo();
    }

    calculateSide(){
        return euclideanDistance(this.points[0], this.points[1])
    }

    clone() {
        let newSquare = new Square(this.id, this.type);
        this.points.forEach((point) => {
            Square.points.push(point.clone());
        });

    }

    draw(event) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // let point = this.getMousePosition(event)
        // this.points.push(new Point(point))
        console.log(this.points) 

        this.render(gl.TRIANGLE_STRIP, this.points);
        
    }

    drawObjectInfo = () => {
        let inner = "<h1>Square Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    getMousePosition(event){
        let rect = gl.canvas.getBoundingClientRect();
        let x = ((event.clientX - rect.left) / gl.canvas.width) * 2 - 1;
        let y = ((event.clientY - rect.top) / gl.canvas.height) * -2 + 1;
        return [x,y]
    }


    mouseMoveHandler(event){
        // let point = new Point(this.getMousePosition(event))
        // this.renderMouseMove([...this.points,point])
    }

    renderMouseMove(points){
        // var pairedPoints
        // var nonPairedPoint
        // if ((points.length) % 2 == 0) {
        //     pairedPoints = points
        // } else {
        //     pairedPoints = points.slice(0, points.length-1)
        //     nonPairedPoint = points.slice(points.length)
        // }
        
        this.render(gl.TRIANGLE_STRIP, this.points)
    }
}
