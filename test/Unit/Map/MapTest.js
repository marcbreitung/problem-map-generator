let assert = require('chai').assert;
let sinon = require('sinon');

import {Map} from './../../../lib/Map/Map';

import {Point} from "../../../lib/Map/Point";
import {MapNode} from "../../../lib/Map/MapNode";
import {Random} from "../../../lib/Utils/Random";

suite('Map', function () {

    suite('#constructor(parameters)', function () {
        test('should set cols, rows, width and height default values', function () {
            let map = new Map({});
            assert.propertyVal(map, 'cols', 10);
            assert.propertyVal(map, 'rows', 10);
            assert.propertyVal(map, 'width', 100);
            assert.propertyVal(map, 'height', 100);
        });
        test('should set cols, rows, width and height attributes', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            assert.propertyVal(map, 'cols', 2);
            assert.propertyVal(map, 'rows', 2);
            assert.propertyVal(map, 'width', 10);
            assert.propertyVal(map, 'height', 10);
        });
    });

    suite('#setSettings(parameters)', function () {
        test('should set cols, rows, width and height default values', function () {
            let map = new Map({});
            assert.propertyVal(map, 'cols', 10);
            assert.propertyVal(map, 'rows', 10);
            assert.propertyVal(map, 'width', 100);
            assert.propertyVal(map, 'height', 100);
        });
        test('should set cols, rows, width and height attributes', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.setSettings({'cols': 5, 'rows': 5, 'width': 15, 'height': 15});
            assert.propertyVal(map, 'cols', 5);
            assert.propertyVal(map, 'rows', 5);
            assert.propertyVal(map, 'width', 15);
            assert.propertyVal(map, 'height', 15);
        });
    });

    suite('#injectRandom(random)', function () {
        test('should set random to injected random class', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.injectRandom(Random);
            assert.isFunction(map.random.getBetweenMinMax);
        });
    });

    suite('#findNodeByPoint(point)', function () {
        test('should return the node for the given point', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.calculateGutter();
            map.addNodes();
            assert.deepEqual(map.findNodeByPoint(new Point(1, 0)), new MapNode({
                id: '1-0',
                point: new Point(1, 0),
                position: new Point(2.5, 7.5)
            }));
        });
    });

    suite('#findNodeByPosition(position)', function () {
        test('should return the node for the given point (with default threshold)', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.calculateGutter();
            map.addNodes();
            assert.deepEqual(map.findNodeByPosition(new Point(2.5, 7.5)), new MapNode({
                id: '1-0',
                point: new Point(1, 0),
                position: new Point(2.5, 7.5)
            }));
        });
        test('should return the node for the given point (with custom threshold)', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.calculateGutter();
            map.addNodes();
            assert.deepEqual(map.findNodeByPosition(new Point(1.5, 6.5), 2), new MapNode({
                id: '1-0',
                point: new Point(1, 0),
                position: new Point(2.5, 7.5)
            }));
        });
    });

    suite('#calculateGutter()', function () {
        test('should calculate the gutter', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.calculateGutter();
            assert.deepPropertyVal(map, 'gutter', {'x': 5, 'y': 5});
        });
    });

    suite('#addNodes()', function () {
        test('should add map nodes', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.calculateGutter();
            map.addNodes();
            assert.sameDeepMembers(map.nodes, [
                    new MapNode({id: '0-0', point: new Point(0, 0), position: new Point(2.5, 2.5)}),
                    new MapNode({id: '0-1', point: new Point(0, 1), position: new Point(7.5, 2.5)}),
                    new MapNode({id: '1-0', point: new Point(1, 0), position: new Point(2.5, 7.5)}),
                    new MapNode({id: '1-1', point: new Point(1, 1), position: new Point(7.5, 7.5)})
                ]
            );
        });
    });

    suite('#addConnectionsToNode(node)', function () {
        test('should add map nodes', function () {
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.calculateGutter();
            map.addNodes();
            map.addConnections();
            let node = map.findNodeByPoint(new Point(1, 0));
            assert.lengthOf(node.childs, 2);
        });
    });

    suite('#randomizePosition(node)', function () {
        test('should return position with min value, if random value ist smaller than min', function () {
            let position = new Point(2.5, 7.5);
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(2.4);

            map.injectRandom(random);
            map.calculateGutter();

            assert.deepEqual(map.randomizePosition(position), new Point(2.5, 2.5));
        });
        test('should return position with max value, if random value ist greater than max', function () {
            let position = new Point(2.5, 7.5);
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(10);

            map.injectRandom(random);
            map.calculateGutter();

            assert.deepEqual(map.randomizePosition(position), new Point(7.5, 7.5));
        });
        test('should return position with random value', function () {
            let position = new Point(2.5, 7.5);
            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(3.8);

            map.injectRandom(random);
            map.calculateGutter();

            assert.deepEqual(map.randomizePosition(position), new Point(3.8, 3.8));
        });
    });

    suite('#randomizeChildNodes(parentNode)', function () {
        test('should remove randomized child nodes', function () {
            let node = new MapNode({id: '0-0', point: new Point(0, 0), position: new Point(2.5, 2.5)});
            node.addChildNodes([new MapNode({
                id: '1-0',
                point: new Point(0, 0),
                position: new Point(2.5, 2.5)
            }), new MapNode({id: '1-1', point: new Point(0, 0), position: new Point(2.5, 2.5)})]);

            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.onCall(0).returns(1);
            random.getBetweenMinMax.onCall(1).returns(2);

            map.injectRandom(random);
            map.calculateGutter();
            map.randomizeChildNodes(node);

            assert.sameDeepMembers(node.childs, [new MapNode({
                id: '1-1',
                point: new Point(0, 0),
                position: new Point(2.5, 2.5)
            })]);
        });
    });

    suite('#randomizeNodes()', function () {
        test('should call methods randomizePosition and randomizeChildNodes', function () {

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(1);

            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});

            let spy = sinon.spy();
            spy(map, 'randomizePosition');
            spy(map, 'randomizeChildNodes');

            map.injectRandom(random);
            map.calculateGutter();
            map.addNodes();
            map.addConnections();
            map.randomizeNodes();

            assert.equal(spy.callCount, 2);

        });
    });

    suite('#buildMap()', function () {
        test('should call methods calculateGutter, addNodes, addConnections and randomizeNodes', function () {

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(1);

            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});

            let spy = sinon.spy();

            spy(map, 'calculateGutter');
            spy(map, 'addNodes');
            spy(map, 'addConnections');
            spy(map, 'randomizeNodes');

            map.injectRandom(random);
            map.buildMap();

            assert.equal(spy.callCount, 4);

        });
    });

    suite('#getNodes()', function () {
        test('should call buildMap and return all nodes if no node exists', function () {

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(1);

            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.injectRandom(random);

            assert.lengthOf(map.getNodes(), 4);
        });
        test('should not call buildMap and return all nodes if nodes already exists', function () {

            let random = {getBetweenMinMax: sinon.stub()};
            random.getBetweenMinMax.returns(1);

            let map = new Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
            map.injectRandom(random);
            map.buildMap();

            assert.lengthOf(map.getNodes(), 4);
        });
    });

});