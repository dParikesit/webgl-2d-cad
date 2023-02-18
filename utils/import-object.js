import { Point } from "../models/Point.js";
import { Line } from "../models/Line.js";
import { Square } from "../models/Square.js";
import { Rectangle } from "../models/Rectangle.js";

export function importLine(object) {
    var firstPointX = object.firstPoint.pos[0];
    var firstPointY = object.firstPoint.pos[1];
    var firstPointColor = object.firstPoint.color;
    var firstPoint = new Point(
        [firstPointX, firstPointY],
        -1,
        firstPointColor
    );

    var secondPointX = object.secondPoint.pos[0];
    var secondPointY = object.secondPoint.pos[1];
    var secondPointColor = object.secondPoint.color;
    var secondPoint = new Point(
        [secondPointX, secondPointY],
        -1,
        secondPointColor
    );

    var line = new Line();
    line.updatePointFromImport(firstPoint, secondPoint);

    return line;
}

export function importSquare(object) {
    var centerX = object.center.pos[0];
    var centerY = object.center.pos[1];
    var center = new Point([centerX, centerY]);

    var firstPointX = object.firstPoint.pos[0];
    var firstPointY = object.firstPoint.pos[1];
    var firstPointColor = object.firstPoint.color;
    var firstPoint = new Point(
        [firstPointX, firstPointY],
        -1,
        firstPointColor
    );

    var secondPointX = object.secondPoint.pos[0];
    var secondPointY = object.secondPoint.pos[1];
    var secondPointColor = object.secondPoint.color;
    var secondPoint = new Point(
        [secondPointX, secondPointY],
        -1,
        secondPointColor
    );

    var thirdPointX = object.thirdPoint.pos[0];
    var thirdPointY = object.thirdPoint.pos[1];
    var thirdPointColor = object.thirdPoint.color;
    var thirdPoint = new Point(
        [thirdPointX, thirdPointY],
        -1,
        thirdPointColor
    );

    var fourthPointX = object.fourthPoint.pos[0];
    var fourthPointY = object.fourthPoint.pos[1];
    var fourthPointColor = object.fourthPoint.color;
    var fourthPoint = new Point(
        [fourthPointX, fourthPointY],
        -1,
        fourthPointColor
    );

    var square = new Square();
    square.updateFromImport(
        center,
        firstPoint,
        secondPoint,
        thirdPoint,
        fourthPoint
    );

    return square
}

export function importRectangle(object) {
    var firstPointX = object.firstPoint.pos[0];
    var firstPointY = object.firstPoint.pos[1];
    var firstPointColor = object.firstPoint.color;
    var firstPoint = new Point(
        [firstPointX, firstPointY],
        -1,
        firstPointColor
    );

    var secondPointX = object.secondPoint.pos[0];
    var secondPointY = object.secondPoint.pos[1];
    var secondPointColor = object.secondPoint.color;
    var secondPoint = new Point(
        [secondPointX, secondPointY],
        -1,
        secondPointColor
    );

    var thirdPointX = object.thirdPoint.pos[0];
    var thirdPointY = object.thirdPoint.pos[1];
    var thirdPointColor = object.thirdPoint.color;
    var thirdPoint = new Point(
        [thirdPointX, thirdPointY],
        -1,
        thirdPointColor
    );

    var fourthPointX = object.fourthPoint.pos[0];
    var fourthPointY = object.fourthPoint.pos[1];
    var fourthPointColor = object.fourthPoint.color;
    var fourthPoint = new Point(
        [fourthPointX, fourthPointY],
        -1,
        fourthPointColor
    );

    var rectangle = new Rectangle();
    rectangle.updatePointFromImport(
        firstPoint, 
        secondPoint, 
        thirdPoint,
        fourthPoint
    )

    return rectangle
}