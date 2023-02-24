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

        for (let i = 0; i < this.points.length; i++) {
            this.points[i].pos[0] += delta;
        }
    }

    moveCenterY(newY) {
        const [_originX, originY] = this.getCenter();
        let delta = newY - originY;

        for (let i = 0; i < this.points.length; i++) {
            this.points[i].pos[1] += delta;
        }
    }

    rotate(degree) {
        const radian = degree * (Math.PI / 180);
        const [originX, originY] = this.getCenter();
        for (let i = 0; i < this.points.length; i++) {
            const oldX = this.points[i].pos[0];
            const oldY = this.points[i].pos[1];

            this.points[i].pos[0] =
                originX +
                (oldX - originX) * Math.cos(radian) -
                (oldY - originY) * Math.sin(radian);
            this.points[i].pos[1] =
                originY +
                (oldX - originX) * Math.sin(radian) +
                (oldY - originY) * Math.cos(radian);
        }
    }

    // To setup between height or width
    thirdDivSetup() {}

    objListener(gl) {
        // let rect = gl.canvas.getBoundingClientRect();
        // const [centerX, centerY] = this.getCenter();

        let toolsSect = document.getElementById("transformation");
        toolsSect.replaceChildren();

        // first div
        const firstDiv = document.createElement("div");
        firstDiv.className = "container-transformation-list-1";
        const translation = document.createElement("h1");
        translation.innerHTML = "Translasi";

        const sliderXTitle = document.createElement("h2");
        sliderXTitle.innerHTML = "Slider X";
        const sliderX = document.createElement("input");
        sliderX.type = "range";
        // sliderX.min = ((rect.left - rect.left) / gl.canvas.width) * 2 - 1;
        // sliderX.max = ((rect.right - rect.left) / gl.canvas.width) * 2 - 1;
        sliderX.min = -1;
        sliderX.max = 1;
        sliderX.value = 0;
        sliderX.step = "0.01";
        sliderX.addEventListener("change", (e) => {
            console.log(e.target.value);
            this.moveCenterX(e.target.value);
        });

        const sliderYTitle = document.createElement("h2");
        sliderYTitle.innerHTML = "Slider Y";
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

        firstDiv.append(
            translation,
            sliderXTitle,
            sliderX,
            sliderYTitle,
            sliderY
        );

        // second div
        const secondDiv = document.createElement("div");
        secondDiv.className = "container-transformation-list-2";
        const rotation = document.createElement("h1");
        rotation.innerHTML = "Rotasi";

        const degTitle = document.createElement("h2");
        degTitle.innerHTML = "Sudut";
        const sliderDeg = document.createElement("input");
        sliderDeg.type = "range";
        // sliderX.min = ((rect.left - rect.left) / gl.canvas.width) * 2 - 1;
        // sliderX.max = ((rect.right - rect.left) / gl.canvas.width) * 2 - 1;
        sliderDeg.min = 0;
        sliderDeg.max = 360;
        sliderDeg.value = 0;
        sliderDeg.step = "1";
        sliderDeg.addEventListener("change", (e) => {
            console.log(e.target.value);
            this.rotate(e.target.value);
        });

        secondDiv.append(rotation, degTitle, sliderDeg);

        // third div
        const thirdDiv = document.createElement("div");
        thirdDiv.className = "container-transformation-list-3";
        const sizeTitle = document.createElement("h1");
        sizeTitle.innerHTML = "Ukuran";

        // first inner third div
        const heightTitle = document.createElement("h2");
        heightTitle.innerHTML = "Panjang";
        const sliderHeight = document.createElement("input");
        sliderHeight.type = "range";
        sliderHeight.min = 0;
        sliderHeight.max = 1;
        sliderHeight.value = 0;
        sliderHeight.step = "1";

        const widthTitle = document.createElement("h2");
        widthTitle.innerHTML = "Lebar";
        const sliderWidth = document.createElement("input");
        sliderWidth.type = "range";
        sliderWidth.min = 0;
        sliderWidth.max = 1;
        sliderWidth.value = 0;
        sliderWidth.step = "1";
        
        toolsSect.append(firstDiv, secondDiv, this.thirdDivSetup());
    }

    setupSlider() {}

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

        gl.drawArrays(glTypes, offset, pointsDraw.length/2);
    }
}
