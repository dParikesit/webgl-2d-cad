import { QuickHull } from "../utils/quickhull.js";
import { Point } from "./Point.js";
import { Shape } from "./Shape.js";

export class Polygon extends Shape {
    firstPoint = null;
    secondPoint = null;
    jumlahTitik = 0;
    done = false;

    constructor(firstPoint) {
        super(-1, "Polygon")

        this.firstPoint = firstPoint;
        this.points.push(firstPoint);
        this.drawObjectInfo();
    }

    clone() {}

    draw(gl, program, vBuffer, cBuffer) {
        if (this.secondPoint == null) {
            return
        }
        
        if(this.points.length == 0){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                [...this.points, this.secondPoint],
                gl.POINTS,
            );
        }else if(this.points.length == 1){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                [...this.points, this.secondPoint],
                gl.LINES,
            );
        }else{
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                QuickHull([...this.points, this.secondPoint]),
                gl.TRIANGLE_FAN
            );
        }
    }

    drawLast(gl, program, vBuffer, cBuffer) {
        console.log("di draw last", this.points)
        if(this.points.length == 1){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                this.points,
                gl.POINTS,
            );
        }else if(this.points.length == 2){
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                this.points,
                gl.LINES,
            );
        }else{
            this.render(
                gl,
                program,
                vBuffer,
                cBuffer,
                this.points,
                gl.TRIANGLE_FAN,
            );
        }
    }

    doneDraw() {
        this.done = true;
    }

    updatePoint(temporarySecondPoint) {
        this.secondPoint = temporarySecondPoint;
    }

    updateFixedPoint(addedPoint){
        this.points.push(addedPoint);
        this.jumlahTitik = this.jumlahTitik + 1
    }

    drawObjectInfo = () => {
        let inner = "<h1>Polygon Initiated</h1>";

        document.getElementById("object-created").innerHTML = inner;
    };

    updatePointFromImport(firstPoint, secondPoint, points) {
        this.firstPoint = firstPoint;
        this.secondPoint = secondPoint;
        this.points = points
        this.done = true;
    }

    thirdDivSetup() {
        // third div
        const thirdDiv = document.createElement("div");
        thirdDiv.className = "container-transformation-list-3";

        return thirdDiv;
    }

    objListenerPol(gl, id){
        console.log("sampe sini")

        let styleSect = document.getElementById("Polygon_Function");
        styleSect.replaceChildren();

        const thirdDivPoint = document.createElement("div");
        thirdDivPoint.className = "container-transformation-list-1";
        const addDelete = document.createElement("h2");
        addDelete.innerHTML = "Add-Delete Polygon Point";

        const addButton = document.createElement("Button")
        addButton.textContent = "Add Point";
        const delButton = document.createElement("Button")
        delButton.textContent = "Delete Point";
        addButton.addEventListener("mousedown", (e) => {
            console.log(e.target.value);
            // this.movePointY(e.target.value);
            console.log("tambahh")
            this.addPolygonPoint();
        });

        delButton.addEventListener("mousedown", (e) => {
            this.deletePolPoint(id);
        });


        thirdDivPoint.append(addDelete)
        thirdDivPoint.append(addButton)
        thirdDivPoint.append(delButton)

        styleSect.append(thirdDivPoint)
    }

    deletePolPoint(id){
        if(this.points.length >4 ){
            this.points.splice(id, 1);
        }
    }

    addPolygonPoint(){
        let x = Math.random() * (1 - (-1)) + (-1);
        let y = Math.random() * (1 - (-1)) + (-1);

        this.points.push(new Point([x, y]));
    }
}






// delPolygonPoint(x, y){

//     if (this.points.length <= 2) {
//         this.points.pop();
//         this.render(gl.POINTS);
//     } else if(this.points.length == 3){
//         this.points.pop();
//         this.render(gl.POINTS);
//     }else {
//         this.points.pop();
//         this.points.pop();
//         this.points.pop();
//         this.render(gl.TRIANGLES);
//     }
// }