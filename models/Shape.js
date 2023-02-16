import {
    createProgram,
    createShader,
    fsSource,
    vsSource,
} from "../utils/init-shader.js";
import { resizeCanvasToDisplaySize } from "../utils/tools.js";

import { gl } from "../script.js";

export class Shape {
    constructor(id = -1, type = "Shape") {
        this.id = id;
        this.points = [];
        this.type = `${type}`;

        resizeCanvasToDisplaySize(gl.canvas);

        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

        this.program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(this.program);
    }

    clone() {}

    print() {
        console.log(
            `${this.type} ${this.id} with points ${this.points}, colors ${this.colors}`
        );
    }

    draw(event) {}

    render(objType = gl.POINTS) {
        console.log(this.points);
        const pointsDraw = this.points.flatMap((item) => item.pos);
        const colorsDraw = this.points.flatMap((item) => item.color);

        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(pointsDraw),
            gl.STATIC_DRAW
        );
        var positionAttributeLocation = gl.getAttribLocation(
            this.program,
            "vPosition"
        );

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 1; // 2 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionAttributeLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );
        gl.enableVertexAttribArray(positionAttributeLocation);

        var cBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(colorsDraw),
            gl.STATIC_DRAW
        );

        const vColor = gl.getAttribLocation(this.program, "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(vColor);

        gl.drawArrays(objType, offset, this.points.length);
    }
}
