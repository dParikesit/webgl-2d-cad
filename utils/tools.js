export function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize =
        canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}

export function genColor(){
    let itemList = ["red", "green", "blue"];
    let item = itemList[Math.floor(Math.random() * itemList.length)];
    if (item == "red") {
        return([1.0, 0.0, 0.0, 1.0]);
    } else if (item == "green") {
        return([0.0, 1.0, 0.0, 1.0]);
    } else if (item == "blue") {
        return([0.0, 0.0, 1.0, 1.0]);
    }
}