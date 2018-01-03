import {MapNode} from './MapNode';
import {Point} from './Point';

export class Map {

    constructor(parameters) {
        this.setSettings(parameters);
        this.random = null;
    }

    setSettings(parameters) {
        this.cols = parameters.cols || 10;
        this.rows = parameters.rows || 10;
        this.width = parameters.width || 100;
        this.height = parameters.height || 100;
        this.nodes = [];
    }

    getNodes() {
        if (this.nodes.length === 0) {
            this.buildMap();
        }
        return this.nodes;
    }

    injectRandom(random) {
        this.random = random;
    }

    buildMap() {
        this.calculateGutter();
        this.addNodes();
        this.addConnections();
        this.randomizeNodes();
    }

    calculateGutter() {
        this.gutter = {
            'x': this.width / this.cols,
            'y': this.height / this.rows
        };
    }

    addNodes() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let x = (c * this.gutter.x) + (this.gutter.x / 2),
                    y = (r * this.gutter.y) + (this.gutter.y / 2);
                this.nodes.push(new MapNode({
                    'id': `${r}-${c}`,
                    'point': new Point(r, c),
                    'position': new Point(x, y)
                }));
            }
        }
    }

    addConnections() {
        this.nodes.forEach((node) => {
            this.addConnectionsToNode(node);
        });
    }

    addConnectionsToNode(node) {
        let neighbors = [
            new Point(node.point.x, node.point.y + 1),
            new Point(node.point.x + 1, node.point.y + 1),
            new Point(node.point.x + 1, node.point.y),
            new Point(node.point.x, node.point.y - 1),
            new Point(node.point.x - 1, node.point.y),
            new Point(node.point.x - 1, node.point.y - 1)
        ];
        neighbors.forEach((neighbor) => {
            if (this.findNodeByPoint(neighbor)) {
                node.addChildNode(this.findNodeByPoint(neighbor));
            }
        });
    }

    randomizeNodes() {
        this.nodes.forEach((node) => {
            node.position = this.randomizePosition(node.position);
            this.randomizeChildNodes(node);
        });
    }

    randomizePosition(position) {
        let random = {
            'x': this.random.getBetweenMinMax(position.x - (this.gutter.x / 2), position.x + (this.gutter.x / 2)),
            'y': this.random.getBetweenMinMax(position.y - (this.gutter.y / 2), position.y + (this.gutter.y / 2))
        };
        return new Point(
            Math.min(this.width - (this.gutter.x / 2), Math.max(this.gutter.x / 2, random.x)),
            Math.min(this.height - (this.gutter.y / 2), Math.max(this.gutter.y / 2, random.y))
        );
    }

    randomizeChildNodes(parentNode) {
        let nodesToRemove = parentNode.childs.filter(() => this.random.getBetweenMinMax(0, 5) === 1);
        nodesToRemove.forEach((removeItem) => {
            parentNode.removeChildNode(removeItem);
            removeItem.removeChildNode(parentNode);
        });
    }

    findNodeByPosition(position, threshold = 4) {
        return this.nodes.find((node) => Math.abs(position.x - node.position.x) + Math.abs(position.y - node.position.y) <= threshold);
    }

    findNodeByPoint(point) {
        return this.nodes.find((node) => node.point.x === point.x && node.point.y === point.y);
    }

}