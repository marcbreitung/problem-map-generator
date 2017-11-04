let assert = require('chai').assert;

import {Random} from './../../../lib/Utils/Random';

suite('Random', function () {

    suite('#getBetweenMinMax(min, max)', function () {

        test('should return a random value between min and max', function () {
            assert.isAbove(Random.getBetweenMinMax(10, 20), 9);
        });

        test('should return a random value between min and max', function () {
            assert.isBelow(Random.getBetweenMinMax(10, 20), 21);
        });

    });

});