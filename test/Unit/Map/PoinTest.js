let assert = require('chai').assert;

import {Point} from './../../../lib/Map/Point';

suite('Point', function () {

    suite('#constructor(x, y)', function () {
        test('should set x, y attributes', function () {
            let point = new Point(10, 20);
            assert.propertyVal(point, 'x', 10);
            assert.propertyVal(point, 'y', 20);
        });
    });

    suite('#distance(point)', function () {
        test('should return distance between to points', function () {
            let pointA = new Point(10, 20);
            let pointB = new Point(50, 40);
            assert.closeTo(pointA.distance(pointB), 44.72135955, 0.5);
        });
    });

});