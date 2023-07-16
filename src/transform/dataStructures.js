
// Define Graph class

const prettyPrintNode = ({caseId, startDate, endDate}) => {
  return `${caseId} (${startDate} - ${endDate})`;
}

class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = [];
  }

  addAdjacent(node) {
    if (this.adjacents.includes(node)) {
      return;
    }
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    this.adjacents = this.adjacents.filter(n => n !== node);
  }

  getAdjacents() {
    return this.adjacents;
  }

  isAdjacent(node) {
    return this.adjacents.includes(node);
  }

  toString() {
    return `${prettyPrintNode(this.value)} -> (${this.adjacents.map(n => prettyPrintNode(n.value)).join(', ')})`;
  }

  toSimple() {
    return this.value;
  }
}

class Graph {
  constructor(edgeDirection = Graph.UNDIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }

  addNode(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value)
    } else {
      const node = new Node(value);
      this.nodes.set(value, node);
      return node;
    }
  }

  removeNode(value) {
    const node = this.nodes.get(value);
    if (node) {
      node.getAdjacents().forEach(n => n.removeAdjacent(node));
    }
    return this.nodes.delete(value);
  }

  addEdge(from, to) {
    const fromNode = this.addNode(from);
    const toNode = this.addNode(to);
    fromNode.addAdjacent(toNode);
    if (this.edgeDirection === Graph.UNDIRECTED) {
      toNode.addAdjacent(fromNode);
    }
    return [from, to];
  }

  removeEdge(from, to) {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (fromNode && toNode) {
      fromNode.removeAdjacent(toNode);
      if (this.edgeDirection === Graph.UNDIRECTED) {
        toNode.removeAdjacent(fromNode);
      }
    }
    return [from, to];
  }

  toString() {
    return [...this.nodes.values()].map(n => n.toString()).join('\n');
  }
}

Graph.DIRECTED = Symbol('directed');
Graph.UNDIRECTED = Symbol('undirected');

module.exports = {
  Graph,
}