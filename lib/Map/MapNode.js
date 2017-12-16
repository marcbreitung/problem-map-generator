export class MapNode {

    constructor(parameters) {
        let {id, point, position, label} = parameters;
        this.id = id;
        this.point = point;
        this.position = position;
        this.label = label;
        this.childs = [];
    }

    addChildNode(mapNode) {
        if (mapNode.id !== this.id && this.childs.indexOf(mapNode) === -1) {
            this.childs.push(mapNode);
        }
    }

    addChildNodes(connections) {
        connections.forEach((mapNode) => this.addChildNode(mapNode));
    }

    removeChildNode(mapNode) {
        if (this.childs.indexOf(mapNode) > -1) {
            this.childs.splice(this.childs.indexOf(mapNode), 1);
        }
    }

    removeChildNodes(mapNodes) {
        mapNodes.forEach((mapNode) => this.removeChildNode(mapNode));
    }
}