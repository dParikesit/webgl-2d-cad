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

    getCenter() {
        if (this.points.length === 0) {
            return;
        }

        let x = 0;
        let y = 0;
        for (let i = 0; i < this.points.length; i++) {
            const element = this.points[i].getPoint();
            x += element[0];
            y += element[1];
        }
        return [x / this.points.length, y / this.points.length];
    }

    moveCenterX(newX) {
        const [originX, _originY] = this.getCenter();
        let delta = newX - originX;

        let min = this.points[0][0]
        let max = this.points[0][0];

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i][0] < min) {
                min = this.points[i][0];
            }

            if (this.points[i][0] > max) {
                max = this.points[i][0];
            }

        }

        if (min + delta <= -1) {
            delta = -1 - min;
        } else if (max + delta >= 1) {
            delta = 1 - max;
        }

        for (let i = 0; i < this.points.length; i++) {
            this.points[i].pos[0] += delta;
        }
    }

    moveCenterY(newY) {
        const [_originX, originY] = this.getCenter();
        let delta = newY - originY;

        let min = this.points[0][1];
        let max = this.points[0][1];

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i][1] < min) {
                min = this.points[i][1];
            }

            if (this.points[i][1] > max) {
                max = this.points[i][1];
            }
        }

        if (min + delta <= -1) {
            delta = -1 - min;
        } else if (max + delta >= 1) {
            delta = 1 - max;
        }

        for (let i = 0; i < this.points.length; i++) {
            this.points[i].pos[1] += delta;
        }
    }

    objListener(gl) {
        let rect = gl.canvas.getBoundingClientRect();
        const [centerX, centerY] = this.getCenter();

        let toolsSect = document.getElementById("transformation");
        toolsSect.replaceChildren();

        const div1 = document.createElement("div");
        div1.className = "container-object";
        const h11 = document.createElement("h1");
        h11.innerHTML = "Translasi";

        const h21 = document.createElement("h2");
        h21.innerHTML = "Slider X";
        const sliderX = document.createElement("input");
        sliderX.type = "range";
        // sliderX.min = ((rect.left - rect.left) / gl.canvas.width) * 2 - 1;
        // sliderX.max = ((rect.right - rect.left) / gl.canvas.width) * 2 - 1;
        sliderX.min = - 1;
        sliderX.max = 1;
        sliderX.value = 0;
        sliderX.step = "0.01";
        sliderX.addEventListener("change", (e) => {
            console.log(e.target.value);
            this.moveCenterX(e.target.value);
        });

        const h22 = document.createElement("h2");
        h22.innerHTML = "Slider Y";
        const sliderY = document.createElement("input");
        sliderY.type = "range";
        // sliderY.min = ((rect.top - rect.top) / gl.canvas.height) * -2 + 1;
        // sliderY.max = ((rect.bottom - rect.top) / gl.canvas.height) * -2 + 1;
        sliderY.min = -1;
        sliderY.max = 1;
        sliderY.value = 0;
        sliderY.step = "0.01";
        sliderY.addEventListener("change", (e) => {
            console.log(e.target.value);
            this.moveCenterY(e.target.value);
        });

        div1.append(h11, h21, sliderX, h22, sliderY);

        toolsSect.append(div1);
    }

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
