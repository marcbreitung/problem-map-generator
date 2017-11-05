# Problem Map Generator

## Map
```javascript
    var map = new ProblemMapGenerator.Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
    map.injectRandom(ProblemMapGenerator.Random);
    map.getNodes();
```
## Nodes
```javascript
    var nodeA = new ProblemMapGenerator.Node('A', new ProblemMapGenerator.Point(0, 0), new ProblemMapGenerator.Point(0, 0));
    var nodeB = new ProblemMapGenerator.Node('A', new ProblemMapGenerator.Point(1, 0), new ProblemMapGenerator.Point(10, 0));
    var nodeC = new ProblemMapGenerator.Node('C', new ProblemMapGenerator.Point(1, 1), new ProblemMapGenerator.Point(10, 10));
    
    nodeA.addChildNode(nodeB);
    nodeA.addChildNodes([nodeB, nodeC]);

    nodeA.removeChildNode(nodeB);
    nodeA.removeChildNodes([nodeB, nodeC]);
```
## Point
```javascript
    var point = new ProblemMapGenerator.Point(1,2);
```