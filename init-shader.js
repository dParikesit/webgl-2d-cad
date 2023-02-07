// Vertex shader program
const vsSource = `
    attribute vec4 a_position;
    void main() {
    
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
    }
`;

const fsSource = `
    precision mediump float;
    
    void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1); // return reddish-purple
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
