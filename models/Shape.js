export class Shape {
    constructor(id = -1, type = "Shape") {
        this.id = id;
        this.points = [];
        this.type = `${type}`;
    }

    clone() {}

    print() {
        console.log(
            `${this.type} ${this.id} with points ${this.points}, colors ${this.colors}`
        );
    }

    draw(event) {}

    render(gl, program, vBuffer, cBuffer, points, glTypes) {
        const pointsDraw = points.flatMap((item) => item.pos);
        const colorsDraw = points.flatMap((item) => item.color);

        // console.log(gl)
        // console.log(program)
        // console.log(vBuffer)
        // console.log(cBuffer)
        // console.log(points)
        // console.log(glTypes)

        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(pointsDraw),
            gl.STATIC_DRAW
        );
        var positionAttributeLocation = gl.getAttribLocation(
            program,
            "vPosition"
        );

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2; // 2 components per iteration
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
        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(colorsDraw),
            gl.STATIC_DRAW
        );

        const vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, stride, offset);
        gl.enableVertexAttribArray(vColor);

        gl.drawArrays(glTypes, offset, pointsDraw.length);
    }
}
