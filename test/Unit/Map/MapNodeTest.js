let assert = require('chai').assert;

import {MapNode} from './../../../lib/Map/MapNode';
import {Point} from './../../../lib/Map/Point';

suite('MapNode', function () {

    suite('#constructor(id, point, position)', function () {
        test('should initialize empty childs array', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            assert.sameMembers(mapNode.childs, []);
        });
        test('should set property id', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            assert.propertyVal(mapNode, 'id', 'Graph Node ID');
        });
        test('should set property point', function () {
            let point = new Point(1, 2);
            let mapNode = new MapNode({id: 'Graph Node ID', point: point, position: null});
            assert.propertyVal(mapNode, 'point', point);
        });
        test('should set property position', function () {
            let position = new Point(1, 2);
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: position});
            assert.propertyVal(mapNode, 'position', position);
        });
        test('should set property label', function () {
            let position = new Point(1, 2);
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: position, label: 'Label'});
            assert.propertyVal(mapNode, 'label', 'Label');
        });
    });

    suite('#addChildNode(connection)', function () {
        test('should add the given connection to the childs array', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connection = new MapNode({id: 'Connection', point: null, position: null});
            mapNode.addChildNode(connection);
            assert.sameMembers(mapNode.childs, [connection]);
        });
        test('should add the given connection to the childs array if the array does not has the given connection', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connection = new MapNode({id: 'Connection', point: null, position: null});
            mapNode.addChildNode(connection);
            assert.sameMembers(mapNode.childs, [connection]);
            mapNode.addChildNode(connection);
            assert.sameMembers(mapNode.childs, [connection]);
        });
    });

    suite('#addChildNodes(connection)', function () {
        test('should add the given connection to the childs array', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connectionA = new MapNode({id: 'Connection A', point: null, position: null});
            let connectionB = new MapNode({id: 'Connection B', point: null, position: null});
            mapNode.addChildNodes([connectionA, connectionB]);
            assert.sameMembers(mapNode.childs, [connectionA, connectionB]);
        });
        test('should add the given connection to the childs array if the array does not has the given connection', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connectionA = new MapNode({id: 'Connection A', point: null, position: null});
            let connectionB = new MapNode({id: 'Connection B', point: null, position: null});
            mapNode.addChildNodes([connectionA, connectionB]);
            assert.sameMembers(mapNode.childs, [connectionA, connectionB]);
            mapNode.addChildNodes([connectionA]);
            assert.sameMembers(mapNode.childs, [connectionA, connectionB]);
        });
    });

    suite('#removeChildNode(connection)', function () {
        test('should remove the given connection to the childs array', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connection = new MapNode({id: 'Connection', point: null, position: null});
            mapNode.addChildNode(connection);
            assert.sameMembers(mapNode.childs, [connection]);

            mapNode.removeChildNode(connection);
            assert.sameMembers(mapNode.childs, []);
        });
        test('should does not remove childs if does not exists', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connectionA = new MapNode({id: 'Connection A', point: null, position: null});
            let connectionB = new MapNode({id: 'Connection B', point: null, position: null});

            mapNode.addChildNode(connectionA);
            assert.sameMembers(mapNode.childs, [connectionA]);

            mapNode.removeChildNode(connectionB);
            assert.sameMembers(mapNode.childs, [connectionA]);
        });
    });

    suite('#removeChildNodes(connection)', function () {
        test('should remove the given connection to the childs array', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connectionA = new MapNode({id: 'Connection A', point: null, position: null});
            let connectionB = new MapNode({id: 'Connection B', point: null, position: null});
            let connectionC = new MapNode({id: 'Connection C', point: null, position: null});
            mapNode.addChildNodes([connectionA, connectionB, connectionC]);
            mapNode.removeChildNodes([connectionA, connectionB]);
            assert.sameMembers(mapNode.childs, [connectionC]);
        });
        test('should does not remove connection if does not exists', function () {
            let mapNode = new MapNode({id: 'Graph Node ID', point: null, position: null});
            let connectionA = new MapNode({id: 'Connection A', point: null, position: null});
            let connectionB = new MapNode({id: 'Connection B', point: null, position: null});
            let connectionC = new MapNode({id: 'Connection C', point: null, position: null});
            mapNode.addChildNodes([connectionA, connectionB, connectionC]);
            mapNode.removeChildNodes([connectionA, connectionB]);
            assert.sameMembers(mapNode.childs, [connectionC]);
            mapNode.removeChildNodes([connectionA]);
            assert.sameMembers(mapNode.childs, [connectionC]);
        });
    });

});