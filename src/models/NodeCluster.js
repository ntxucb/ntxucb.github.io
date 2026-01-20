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
    this.dragNode = null;
    // this.randomQueue = []
  }

  handleDown(x, y) {
    // Check for node hit
    for (const node of this.nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const hitRadius = Math.max(node.r * 1.5, 20); // Generous hit area

      if (dist < hitRadius) {
        this.dragNode = node;
        this.dragNode.dx = 0;
        this.dragNode.dy = 0;
        return true;
      }
    }
    return false;
  }

  handleUp() {
    this.dragNode = null;
  }

  handleMove(x, y) {
    this.updateMouse(x, y);
    if (this.dragNode) {
      this.dragNode.x = x;
      this.dragNode.y = y;
      this.dragNode.dx = 0;
      this.dragNode.dy = 0;
    }
  }

  triggerRandom() {
    this.timeoutId = setTimeout(() => {
      this.randomX = Math.random() * this.maxWidth;
      this.randomY = Math.random() * this.maxHeight;
      this.triggerRandom();
      setTimeout(
        () => {
          this.timeoutId = this.triggerRandom();
        },
        Math.random() * 700 + 700,
      );
    }, Math.random() * 500);
  }

  startRandom() {
    this.randomOn = true;
    this.randomX = Math.random() * this.maxWidth;
    this.randomY = Math.random() * this.maxHeight;
    this.triggerRandom();
  }

  endRandom() {
    if (!this.randomOn) return;
    this.randomOn = false;
    if (this.timeoutId) clearTimeout(this.timeoutId);
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

  handleClick(x, y) {
    // Only spawn if not overcrowded
    if (this.nodes.length >= 15) return;

    // Check if we clicked on an existing node (to avoid spawning on top while dragging)
    for (const node of this.nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      // If query is within Hit Radius, assume interaction, not spawn
      if (Math.sqrt(dx * dx + dy * dy) < Math.max(node.r * 1.5, 20)) return;
    }

    // Optional: check proximity to other nodes to prevent overly dense overlap on spawn?
    // User asked to "avoid spawning neurions to close too each other at the begining",
    // but for click-to-spawn, users usually want it exactly where they clicked.
    // The physics will push them apart anyway.

    // Spawn a new healthy node
    const angle = Math.random() * Math.PI * 2;
    const m = 5 + Math.random() * 15; // Random mass like initial spawn
    this.createNode(x, y, angle, m);

    // Give it a burst of energy
    const newNode = this.nodes[this.nodes.length - 1];
    if (newNode) newNode.energy = 0.8;
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

  #feed(x, y, power = 200, radius = 20) {
    this.nodes.forEach((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Reduce power to prevent infinity generation/saturation
      // Use a sharper drop-off or just clamp total energy better?
      // Reducing raw power and increasing radius drop-off
      const safePower = Math.min(power, 100);
      node.feed(safePower / (dist ** 2 / radius + 5), -dx, -dy);
    });
  }

  #intersect() {
    // Optimization: reuse arrays to avoid GC, or just iterate directly
    // Simple flatten of all potentially active edges
    const allEdges = [];

    // Recursive collection
    const collectFromEdge = (edge) => {
      if (!edge) return;
      // Filter out weird zero-length edges to avoid NaN issues in geometry
      // if (Math.abs(edge.node.x - edge.anchor.x) < 0.1 && Math.abs(edge.node.y - edge.anchor.y) < 0.1) return;

      allEdges.push(edge);
      if (edge.children && edge.children.length) {
        for (let i = 0; i < edge.children.length; i++) {
          collectFromEdge(edge.children[i]);
        }
      }
    };

    // Collect all edges from all nodes first (O(E))
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (node.edges) {
        node.edges.forEach((e) => collectFromEdge(e));
      } else {
        // Fallback for nodes that might not have the edges array yet (though they should)
        if (node.upperEdge) collectFromEdge(node.upperEdge);
        if (node.lowerEdge) collectFromEdge(node.lowerEdge);
      }
    }

    // SPATIAL PARTITIONING (Grid)
    // Reduce O(E^2) to near O(E) on average

    const cellSize = 100; // Roughly max edge length or a bit smaller
    const grid = new Map();

    // Add edge to all cells it touches (AABB)
    for (const edge of allEdges) {
      // We put ALL edges in the grid so that unattached edges can find any target

      const minX = Math.min(edge.node.x, edge.anchor.x);
      const maxX = Math.max(edge.node.x, edge.anchor.x);
      const minY = Math.min(edge.node.y, edge.anchor.y);
      const maxY = Math.max(edge.node.y, edge.anchor.y);

      const startX = Math.floor(minX / cellSize);
      const endX = Math.floor(maxX / cellSize);
      const startY = Math.floor(minY / cellSize);
      const endY = Math.floor(maxY / cellSize);

      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          const key = `${x},${y}`;
          if (!grid.has(key)) grid.set(key, []);
          grid.get(key).push(edge);
        }
      }
    }

    // Iterate to check collisions
    // Only iterate edges that are seeking attachments (ea)

    for (const ea of allEdges) {
      if (!ea.anchor || (ea.isAttached && ea.isAttached())) continue;

      // Define ea AABB again
      const minX = Math.min(ea.node.x, ea.anchor.x);
      const maxX = Math.max(ea.node.x, ea.anchor.x);
      const minY = Math.min(ea.node.y, ea.anchor.y);
      const maxY = Math.max(ea.node.y, ea.anchor.y);

      const startX = Math.floor((minX - this.contactTolerace) / cellSize);
      const endX = Math.floor((maxX + this.contactTolerace) / cellSize);
      const startY = Math.floor((minY - this.contactTolerace) / cellSize);
      const endY = Math.floor((maxY + this.contactTolerace) / cellSize);

      // Collect candidates from grid
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          const key = `${x},${y}`;
          const cell = grid.get(key);
          if (!cell) continue;

          for (const eb of cell) {
            if (ea === eb) continue;

            // self-connection check
            if (
              ea.rootNeuron &&
              eb.rootNeuron &&
              ea.rootNeuron === eb.rootNeuron
            )
              continue;

            // Only allow connections for branches up to depth 3 (main stems + 3 levels)
            // This prevents very fine dendrites from cluttering connections
            if ((ea.depth ?? 0) > 3 || (eb.depth ?? 0) > 3) continue;

            if (eb.isAttached && eb.isAttached()) continue;

            // AABB Check
            const minBx = Math.min(eb.node.x, eb.anchor.x);
            const maxBx = Math.max(eb.node.x, eb.anchor.x);
            const minBy = Math.min(eb.node.y, eb.anchor.y);
            const maxBy = Math.max(eb.node.y, eb.anchor.y);

            if (
              maxX < minBx - this.contactTolerace ||
              minX > maxBx + this.contactTolerace ||
              maxY < minBy - this.contactTolerace ||
              minY > maxBy + this.contactTolerace
            ) {
              continue;
            }

            let [t0, ta] = this.#edgeIntersection(ea, eb);
            if (t0 !== null && ta !== null) {
              ea.attach(eb, t0, ta);
              // ea is attached, break all loops for this ea
              x = endX + 1;
              y = endY + 1; // force break outer
              break;
            }
          }
          if (ea.isAttached && ea.isAttached()) break;
        }
      }
    }
  }

  #constrainBounds() {
    // Soft boundary constraint
    // "Offset outwards by 150%"
    // Effective bounds: [-1.5*W, -1.5*H] to [2.5*W, 2.5*H]
    const marginX = this.maxWidth * 1.2;
    const marginY = this.maxHeight * 1.2;

    const minX = 0;
    const maxX = this.maxWidth;
    const minY = 0;
    const maxY = this.maxHeight;

    this.nodes.forEach((node) => {
      let forceX = 0;
      let forceY = 0;
      const k = 0.05; // Spring constant for boundary

      if (node.x < minX) forceX += (minX - node.x) * k;
      if (node.x > maxX) forceX += (maxX - node.x) * k;
      if (node.y < minY) forceY += (minY - node.y) * k;
      if (node.y > maxY) forceY += (maxY - node.y) * k;

      if (forceX !== 0 || forceY !== 0) {
        node.dx += forceX / node.m;
        node.dy += forceY / node.m;
      }
    });
  }

  #collideNodes() {
    for (let i = 0; i < this.nodes.length; i++) {
      const n1 = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n2 = this.nodes[j];
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist2 = dx * dx + dy * dy;
        const minR = (2 * n1.r || 10) + (2 * n2.r || 10);

        if (dist2 < minR * minR) {
          const dist = Math.sqrt(dist2) || 0.1;
          const overlap = minR - dist;
          const force = overlap * 0.05; // Much softer spring constant (was 0.5)
          // Normalized direction
          const nx = dx / dist;
          const ny = dy / dist;

          // Repulse
          const f1 = force / (n1.m || 1);
          const f2 = force / (n2.m || 1);

          n1.dx -= nx * f1;
          n1.dy -= ny * f1;
          n2.dx += nx * f2;
          n2.dy += ny * f2;
        }
      }
    }
  }

  draw(context) {
    if (this.mouseIn) this.#feed(this.mouseX, this.mouseY, 160);
    if (this.randomOn) this.#feed(this.randomX, this.randomY, 140, 10);
    this.#intersect();
    this.#collideNodes();
    this.#constrainBounds(); // Keep nodes within valid simulation area
    this.nodes.forEach((node) => {
      node.draw(context);
    });

    // Multi-Neuron Lifecycle Dynamics (Mitosis, Starvation, Parasitism)
    this.#manageLifecycle();
    this.#applyParasitism();
  }

  #manageLifecycle() {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const node = this.nodes[i];

      // 1. Metabolic Cost (Mass-based decay)
      // Large neurons burn more energy to exist
      node.energy -= node.m * 0.0003;

      // 2. Starvation/Atrophy
      if (node.energy <= 0) {
        node.energy = 0;
        node.m *= 0.998; // Shrink due to starvation
        node.r = node.m / node.density; // Update radius visual
      } else {
        // Slow growth if well fed, up to a limit
        if (node.energy > 0.6 && node.m < 40) {
          node.m *= 1.001;
          node.r = node.m / node.density;
        }
      }

      // 3. Death
      if (node.m < 4) {
        // Remove node
        this.nodes.splice(i, 1);
        continue;
      }

      // 4. Mitosis
      // If huge and fully charged, split
      if (node.m > 30 && node.energy > 0.9 && this.nodes.length < 15) {
        // Split!
        node.m *= 0.6; // Parent shrinks
        node.r = node.m / node.density;
        node.energy *= 0.5;

        // Spawn child nearby
        const angle = Math.random() * Math.PI * 2;
        const dist = node.r * 2.5 + 10;
        const nx = node.x + Math.cos(angle) * dist;
        const ny = node.y + Math.sin(angle) * dist;

        // New node
        const child = new Node(nx, ny, Math.random() * 6, node.m);
        // Inherit some momentum to separate
        child.dx = Math.cos(angle) * 2;
        child.dy = Math.sin(angle) * 2;
        child.energy = node.energy;

        this.nodes.push(child);

        // Optional: connect them immediately?
        // No, let them grow connections naturally.
      }
    }
  }

  #applyParasitism() {
    // Networks share resources. Larger nodes dominate smaller ones.
    // Iterating all edges to find connections.

    const visitedEdges = new Set();

    const checkEdge = (edge, hostNode) => {
      if (!edge || visitedEdges.has(edge)) return;
      visitedEdges.add(edge);

      // If this edge is attached to another edge
      if (edge.isAttached && edge.isAttached() && edge.anchor.attachEdge) {
        const targetEdge = edge.anchor.attachEdge;
        const targetNode = targetEdge.rootNeuron;

        if (targetNode && targetNode !== hostNode) {
          // Connection Established between Host and Target

          // Calculate Mass Difference
          const massDiff = hostNode.m - targetNode.m;

          // If difference is significant, flow energy
          // If roughly equal (-5 to 5), no flow (equilibrium)
          if (Math.abs(massDiff) > 2) {
            const transferRate = 0.005; // Amount per frame
            const flow = massDiff * transferRate;

            // flow > 0: Host takes from Target (Host is bigger)
            // flow < 0: Target takes from Host (Target is bigger)

            if (flow > 0) {
              // Host steals
              const amount = Math.min(flow, targetNode.energy);
              targetNode.energy -= amount;
              hostNode.energy += amount;
            } else {
              // Target steals
              const amount = Math.min(-flow, hostNode.energy);
              hostNode.energy -= amount;
              targetNode.energy += amount;
            }
          }
        }
      }

      // Traverse children
      if (edge.children) {
        for (let i = 0; i < edge.children.length; i++) {
          checkEdge(edge.children[i], hostNode);
        }
      }
    };

    this.nodes.forEach((node) => {
      if (node.edges) {
        node.edges.forEach((e) => checkEdge(e, node));
      }
    });
  }
}
