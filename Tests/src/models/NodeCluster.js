import { node } from "globals";
import Node from "./Node.js";

export default class NodeCluster {
  contactTolerace = 10;

  constructor(nodes = []) {
    this.nodes = nodes;
    this.mouseIn = false;
    this.mouseX = undefined;
    this.mouseY = undefined;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  createNode(x, y, angle = undefined, m = undefined) {
    this.nodes.push(new Node(x, y, angle, m));
  }

  updateMouse(x, y) {
    this.mouseIn = true;
    this.mouseX = x;
    this.mouseY = y;
  }

  #adjMat(mat) {
    const [[a, b], [c, d]] = mat;
    return [
      [d, -b],
      [-c, a],
    ];
  }

  #det(mat) {
    const [[a, b], [c, d]] = mat;
    return a * d - b * c;
  }

  #edgeIntersection(originEdge, testEdge) {
    if (originEdge.anchor == null || testEdge.anchor == null)
      return [null, null];

    const dirTest = [
      testEdge.anchor.x - testEdge.node.x,
      testEdge.anchor.y - testEdge.node.y,
    ];
    const dirOrigin = [
      -originEdge.anchor.x + originEdge.node.x,
      -originEdge.anchor.y + originEdge.node.y,
    ];
    const nodeDiff = [
      originEdge.node.x - testEdge.node.x,
      originEdge.node.y - testEdge.node.y,
    ];

    const edgeMatrix = [
      [dirTest[0], dirOrigin[0]],
      [dirTest[1], dirOrigin[1]],
    ];
    const edgeDet = this.#det(edgeMatrix);
    const toleranceO =
      this.contactTolerace / Math.sqrt(dirOrigin.x ** 2 + dirOrigin.y ** 2);
    const toleranceA =
      this.contactTolerace / Math.sqrt(dirTest.x ** 2 + dirTest.y ** 2);

    if (edgeDet == 0) {
      
    }

    const edgeAdj = this.#adjMat(edgeMatrix);
    const ta = edgeAdj[0][0] * nodeDiff[0] + edgeAdj[0][1] * nodeDiff[1];
    const to = edgeAdj[1][0] * nodeDiff[0] + edgeAdj[1][1] * nodeDiff[1];

    if (
      ta < 0 - toleranceA ||
      ta > 1 + toleranceA ||
      to < 0 - toleranceO ||
      to > 1 + toleranceO
    )
      return [null, null];
    return [to, ta];
  }

  #feed(x, y, power = 100) {
    this.nodes.forEach((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      node.feed(power / (dist ** 2 + 1));
    });
  }

  draw(context) {
    if (this.mouseIn) {
      this.#feed(this.mouseX, this.mouseY);
    }
    this.nodes.forEach((node) => {
      node.draw(context);
    });
  }
}
