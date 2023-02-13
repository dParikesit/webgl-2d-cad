// Vertex shader program
const vsSource = `
    attribute vec4 vPosition;
    attribute vec4 vColor;
    varying vec4 fColor;
    void main() {
    
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = vPosition;
    gl_PointSize = 10.0;
    fColor = vColor;
    }
`;

const fsSource = `
    precision mediump float;
    varying vec4 fColor;
    
    void main() {
    gl_FragColor = fColor; // return reddish-purple
    }
`;

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

export { createShader, createProgram, vsSource, fsSource };
