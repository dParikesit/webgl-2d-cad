var hull = [];

export function QuickHull(points) {
    hull = [];

    var baseline = getMinMaxPoints(points);
    addSegments(baseline, points);
    addSegments([baseline[1], baseline[0]], points);
    hull.push(hull[0]);
    return hull;
}

function getMinMaxPoints(points) {
    var i;
    var minPoint;
    var maxPoint;

    minPoint = points[0];
    maxPoint = points[0];

    for(i=1; i<points.length; i++) {
        if(points[i].pos[0] < minPoint.pos[0])
            minPoint = points[i];
        if(points[i].pos[0] > maxPoint.pos[0])
            maxPoint = points[i];
    }

    return [minPoint, maxPoint];
}

function distanceFromLine(point, line) {
    var vY = line[1].pos[1] - line[0].pos[1];
    var vX = line[0].pos[0] - line[1].pos[0];
    return (vX * (point.pos[1] - line[0].pos[1]) + vY * (point.pos[0] - line[0].pos[0]))
}

function distalPoints(line, points) {
    var i;
    var outer_points = [];
    var point;
    var distal_point;
    var distance=0;
    var max_distance=0;

    for(i=0; i<points.length; i++) {
        point = points[i];
        distance = distanceFromLine(point,line);

        if(distance > 0) outer_points.push(point);
        else continue; //short circuit

        if(distance > max_distance) {
            distal_point = point;
            max_distance = distance;
        }

    }

    return {points: outer_points, max: distal_point};
}

function addSegments(line, points) {
    var distal = distalPoints(line, points);
    if(!distal.max) return hull.push(line[0]);
    addSegments([line[0], distal.max], distal.points);
    addSegments([distal.max, line[1]], distal.points);
}
