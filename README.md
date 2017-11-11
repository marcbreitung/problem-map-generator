# Problem Map Generator

Creates a graph with *column x row* nodes with nearest neighbors as child nodes and randomizes the node position and the number of child nodes. Useful for testing search problems. The id for every node is generated form the column and row and separated with a hyphen (e.g. '1-2').

## Usage
Include the [minified javascript](https://raw.githubusercontent.com/marcbreitung/problem-map-generator/master/dist/problem-map-generator.min.js) in your HTML.

```html
<script src="js/problem-map-generator.min.js"></script>
```

## Map
```javascript
var map = new ProblemMapGenerator.Map({'cols': 2, 'rows': 2, 'width': 10, 'height': 10});
map.injectRandom(ProblemMapGenerator.Random);
map.getNodes(); // Returns the generated nodes as array
```
### Properties
```javascript
{
    'cols': 2,   // horizontal number of nodes
    'rows': 2,   // vertical number of nodes
    'width': 10, // Map width (e.g. pixel)
    'height': 10 // Map height (e.g. pixel)
}
```
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