import { node } from "globals";
import Node from "./Node.js";

export default class NodeCluster {
  contactTolerace = 20;

  constructor(nodes = []) {
    this.nodes = nodes;
    this.mouseIn = false;
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.randomX = undefined;
    this.randomY = undefined;
    this.randomOn = false;

    this.maxWidth = 0;
    this.maxHeight = 0;
    this.timeoutId = null;
    // this.randomQueue = []
  }

  triggerRandom() {
    this.timeoutId = setTimeout(() => {
      this.randomX = Math.random()*this.maxWidth;
      this.randomY = Math.random()*this.maxHeight;
      this.triggerRandom()
      setTimeout(() => {
        this.timeoutId = this.triggerRandom()
      }, Math.random()*500 + 500)
    }, Math.random()*500)
  }

  startRandom(){
      this.randomOn = true;
      this.randomX = Math.random()*this.maxWidth;
      this.randomY = Math.random()*this.maxHeight;
      this.triggerRandom();
  }

  endRandom(){
    if(!this.randomOn) return;
    this.randomOn = false;
    if(this.timeoutId) clearTimeout(this.timeoutId)
  }

  clear() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  createNode(x, y, angle = undefined, m = undefined) {
    this.nodes.push(new Node(x, y, angle, m));
    this.maxWidth = Math.max(this.maxWidth, x);
    this.maxHeight = Math.max(this.maxHeight, y);
  }

  removeMouse() {
    this.mouseIn = false;
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

    if (edgeDet == 0) {
      const normal =
        [-dirTest[1], dirTest[0]] /
        Math.sqrt(dirTest[0] ** 2 + dirTest[1] ** 2);
      const anchorx = originEdge.anchor.x;
      const anchory = originEdge.anchor.y;
      const distToAnchor =
        normal[0] * (anchorx - testEdge.anchor.x) +
        normal[1] * (anchory - testEdge.anchor.y);

      const xMaxBound = Math.max(testEdge.anchor.x, testEdge.node.x);
      const xMinBound = Math.min(testEdge.anchor.x, testEdge.node.x);
      const yMaxBound = Math.max(testEdge.anchor.y, testEdge.node.y);
      const yMinBound = Math.min(testEdge.anchor.y, testEdge.node.y);

      if (
        Math.abs(distToAnchor) < this.contactTolerace &&
        anchorx >= xMinBound &&
        anchorx <= xMaxBound &&
        anchory >= yMinBound &&
        anchory <= yMaxBound
      ) {
        const corrected = [
          anchorx - normal[0] * distToAnchor,
          anchory - normal[1] * distToAnchor,
        ];
        const fromAnchorNode = [
          corrected[0] - testEdge.node.x,
          corrected[1] - testEdge.node.y,
        ];
        const Ta =
          Math.sqrt(fromAnchorNode[0] ** 2 + fromAnchorNode[1] ** 2) /
          Math.sqrt(dirTest.x ** 2 + dirTest.y ** 2);

        return [1, Ta];
      } else {
        return [null, null];
      }
    }

    const edgeAdj = this.#adjMat(edgeMatrix);
    const ta =
      (edgeAdj[0][0] * nodeDiff[0] + edgeAdj[0][1] * nodeDiff[1]) / edgeDet;
    const to =
      (edgeAdj[1][0] * nodeDiff[0] + edgeAdj[1][1] * nodeDiff[1]) / edgeDet;

    const toleranceO =
      this.contactTolerace / Math.sqrt(dirOrigin[0] ** 2 + dirOrigin[1] ** 2);
    const toleranceA =
      this.contactTolerace / Math.sqrt(dirTest[0] ** 2 + dirTest[1] ** 2);

    // console.log("La tola", toleranceA, toleranceO)
    // console.log("Lo que lo diveite", )
    // console.log("Y la solution is:", to, ta)
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
      node.feed(power / (dist ** 2 / 3 + 1));
    });
  }

  #intersect() {
    this.nodes.forEach((node) => {
      this.nodes.forEach((attachNode) => {
        if (node === attachNode) return;
        if (!node.upperEdge.isAttached()) {
          let [t0, ta] = this.#edgeIntersection(
            node.upperEdge,
            attachNode.upperEdge
          );
          if (
            t0 !== null &&
            ta !== null &&
            !attachNode.upperEdge.isAttached()
          ) {
            node.upperEdge.attach(attachNode.upperEdge, t0, ta);
            return;
          }

          [t0, ta] = this.#edgeIntersection(
            node.upperEdge,
            attachNode.lowerEdge
          );
          if (
            t0 !== null &&
            ta !== null &&
            !attachNode.lowerEdge.isAttached()
          ) {
            node.upperEdge.attach(attachNode.lowerEdge, t0, ta);
            return;
          }
        }

        if (!node.lowerEdge.isAttached()) {
          let [t0, ta] = this.#edgeIntersection(
            node.lowerEdge,
            attachNode.upperEdge
          );
          if (
            t0 !== null &&
            ta !== null &&
            !attachNode.upperEdge.isAttached()
          ) {
            node.lowerEdge.attach(attachNode.upperEdge, t0, ta);
            return;
          }

          [t0, ta] = this.#edgeIntersection(
            node.lowerEdge,
            attachNode.lowerEdge
          );
          if (
            t0 !== null &&
            ta !== null &&
            !attachNode.lowerEdge.isAttached()
          ) {
            node.lowerEdge.attach(attachNode.lowerEdge, t0, ta);
            return;
          }
        }
      });
    });
  }

  draw(context) {
    if (this.mouseIn) this.#feed(this.mouseX, this.mouseY, 120);
    if (this.randomOn) this.#feed(this.randomX, this.randomY, 50);
    this.#intersect();
    this.nodes.forEach((node) => {
      node.draw(context);
    });
  }
}
