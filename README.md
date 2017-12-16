# Problem Map Generator

[![Build Status](https://travis-ci.org/marcbreitung/problem-map-generator.svg?branch=master)](https://travis-ci.org/marcbreitung/problem-map-generator) [![Coverage Status](https://coveralls.io/repos/github/marcbreitung/problem-map-generator/badge.svg?branch=master)](https://coveralls.io/github/marcbreitung/problem-map-generator?branch=master)

Creates a graph with *column x row* nodes with nearest neighbors as child nodes and randomizes the node position and the number of child nodes. Useful for testing search problems. The id for every node is generated form the column and row and separated with a hyphen (e.g. '1-2').

## Usage
Include the [minified javascript](https://raw.githubusercontent.com/marcbreitung/problem-map-generator/master/dist/problem-map-generator.min.js) in your HTML.

```html
<script src="js/problem-map-generator.min.js"></script>
```
Or use the [node module](https://raw.githubusercontent.com/marcbreitung/problem-map-generator/master/dist/problem-map-generator.node.min.js) version.

```javascript
var ProblemMapGenerator = require('problem-map-generator.node.min')
```

## Map
```javascript
var map = new ProblemMapGenerator.Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
map.injectRandom(ProblemMapGenerator.Random);
map.getNodes(); // Returns the generated nodes as array
```

### Possible Attributes
| Attribute | Type | Default Value | Description |
| --- | --- | --- | --- |
| `cols` | integer | `10` | number of nodes in x direction |
| `rows` | integer | `10` | number of nodes in y direction |
| `width` | integer | `100` | map width |
| `height` | integer | `100` | map height |
### Nodes
```javascript
var nodeA = new ProblemMapGenerator.Node('0-0', new ProblemMapGenerator.Point(0, 0), new ProblemMapGenerator.Point(0, 0));
var nodeB = new ProblemMapGenerator.Node('1-0', new ProblemMapGenerator.Point(1, 0), new ProblemMapGenerator.Point(10, 0));
var nodeC = new ProblemMapGenerator.Node('1-1', new ProblemMapGenerator.Point(1, 1), new ProblemMapGenerator.Point(10, 10));
    
nodeA.addChildNode(nodeB);
nodeA.addChildNodes([nodeB, nodeC]);

nodeA.removeChildNode(nodeB);
nodeA.removeChildNodes([nodeB, nodeC]);
```
### Point
```javascript
var point = new ProblemMapGenerator.Point(1,2);
```