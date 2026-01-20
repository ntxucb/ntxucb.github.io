export default class Edge {
  phaseK = 0.15; // Very loose rotational spring for "drift" feel (was 1.0)
  phaseE = 0.05; // Low damping to allow sway
  shrink = 1;

  baseLength = 800; // was 250
  branchWidth = 6;
  maxBranchWidth = 1.5 * this.branchWidth;
  minBranchWidth = 0.5 * this.branchWidth;

  minBranchLength = 10;
  maxBranchLength = 1000; // Way larger (was 400)
  growthSpeed = 0.5; // Slower growth! (was 0.05)

  static nHarmonics = 5;
  constructor(
    node,
    anchor,
    angle = 0,
    k = 0.02,
    e = 0.07,
    { drawToCenter } = { drawToCenter: true },
  ) {
    this.node = node;
    this.depth = 0;
    this.drawToCenter = drawToCenter;
    // Track the original neuron ID or reference to prevent self-connection
    // If node is a Node (has no parentEdge), it is the root.
    // If node is a BranchNode, we need to pass down the root ID
    this.rootNeuron = node.parentEdge ? node.parentEdge.rootNeuron : node;

    this.anchor =
      anchor ??
      new Anchor(
        node.x + this.minBranchLength * Math.cos(angle),
        node.y + this.minBranchLength * Math.sin(angle),
        this,
      );

    this.k = k;
    this.e = e;
    this.energy = 0;

    this.time = 0;
    this.lDelta = undefined;
    this.children = [];
    this.spawnCooldown = 15; // Drastically reduced start delay (was 300) to encourage immediate branching
    this.spawnLife = 3500; // Increased life to allow complex trees

    this.lastValidDir = { x: 0, y: 0 };
    this.growthPhases = Edge.generateDephases();
    this.growthFrequencies = Edge.generateFrequencies();
    this.growthDisplacements = Edge.generateDisplacements();

    // Relaxed length constraints to allow larger dendrites
    this.minBranchLength = Math.min(
      this.maxBranchLength,
      Math.max(this.minBranchLength, this.node.r), // Reverted to standard r
    );
    this.maxBranchLength = Math.max(
      this.minBranchLength,
      Math.min(this.maxBranchLength, 50 * this.node.r),
    );
    this.length = this.minBranchLength;
    this.lastLength = this.length;

    // Calculate Surface Socket Radius (matching getStartPos logic)
    // This ensures main branches start OUTSIDE the cell body so they point outwards correcty
    let socketRadius = 0;
    // Check if it's a main Node (has angle) vs BranchNode
    if (this.node.angle !== undefined) {
      socketRadius = (this.node.r || 10) * 2.4;
    }

    // Force anchor to be valid distance (Socket + Length) from center
    // This serves as the initial state, preventing inverted/internal branches
    if (!anchor) {
      this.anchor.x =
        this.node.x + (socketRadius + this.length) * Math.cos(angle);
      this.anchor.y =
        this.node.y + (socketRadius + this.length) * Math.sin(angle);
    }

    this.branchWidth = Math.min(
      this.maxBranchWidth,
      Math.max(this.branchWidth, this.node.r / 5),
    );
    this.maxBranchWidth = 1.5 * this.branchWidth;
    this.minBranchWidth = 0.5 * this.branchWidth;
  }

  static generateDephases() {
    let res = Array.from({ length: Edge.nHarmonics }, () => {
      return 2 * Math.PI * Math.random();
    });
    return res;
  }

  static generateDisplacements() {
    let res = Array.from({ length: Edge.nHarmonics }, () => {
      // Much smaller displacement for subtle movement (0.2 instead of 2)
      return 0.2 * (1 + (0.1 * (Math.random() - 0.5)) / 2);
    });
    return res;
  }

  static generateFrequencies() {
    let res = Array.from({ length: Edge.nHarmonics }, (_, i) => {
      // Slower frequency (divided by 1200 instead of 400)
      return ((10 - i) * (1 + (0.3 * (Math.random() - 0.5)) / 2)) / 1200;
    });
    return res;
  }

  // spawn a child branch at a relative position t (0..1) along this edge
  spawnChild(t = 0.8) {
    if (!this.anchor) return null;

    // don't spawn if we've reached max depth
    const currentDepth = this.depth ?? 0;
    if (currentDepth >= 7) return null; // Increased max depth (was 5)

    const dx = this.anchor.x - this.node.x;
    const dy = this.anchor.y - this.node.y;
    const ux = dx === 0 && dy === 0 ? 1 : dx / Math.sqrt(dx * dx + dy * dy);
    const uy = dx === 0 && dy === 0 ? 0 : dy / Math.sqrt(dx * dx + dy * dy);

    const px = this.node.x + ux * (this.elongation() * t);
    const py = this.node.y + uy * (this.elongation() * t);

    // small BranchNode to act as branch root with its own simple physics
    const parentR = this.node?.r || 4;
    const parentM = this.node?.m || 4;
    const branchRoot = new BranchNode(
      px,
      py,
      Math.max(1, parentR * 0.9),
      Math.max(1, parentM * 0.2),
      this,
    );

    // Calculate outward direction from the Root Neuron (soma) to ensure branches grow away from center
    let baseAngle;
    if (this.rootNeuron) {
      const rx = this.rootNeuron.x;
      const ry = this.rootNeuron.y;
      baseAngle = Math.atan2(py - ry, px - rx);
    } else {
      // Fallback: use parent edge direction
      baseAngle = Math.atan2(uy, ux);
    }

    // smaller spread to grow away from main stem
    const spread = Math.PI / 5.0; // Wide spread to fill space
    // Center the spread properly (-0.5 to 0.5) to avoid spiraling bias
    let angle = baseAngle + (Math.random() - 0.5) * spread;

    // ensure child points generally away from parent direction (dot > 0)
    // We check against the outward vector (calculated from baseAngle)
    const outUx = Math.cos(baseAngle);
    const outUy = Math.sin(baseAngle);

    const candUx = Math.cos(angle);
    const candUy = Math.sin(angle);
    const dot = candUx * outUx + candUy * outUy;

    if (dot < 0.5) {
      // Stricter check: must be predominantly outwards
      // flip towards outward direction or clamp
      angle = baseAngle + (Math.random() - 0.5) * (spread * 0.5);
    }

    const child = new Edge(
      branchRoot,
      undefined,
      angle,
      this.k * 0.9,
      this.e * 0.9,
      { drawToCenter: false },
    );
    child.spawnedAt = this.time;
    child.depth = currentDepth + 1;
    child.parent = this;
    child.targetAngle = angle; // Store intended growth direction

    // Thinner child branches!
    // Set explicit width constraints based on parent
    // Linear reduction instead of exponential
    // Subtract a constant amount (scaled roughly to base sizes) to thin out linearly
    const thinnedWidth = Math.max(0.5, 0.85 * this.branchWidth); // much gentler thinning (was 0.6)
    child.branchWidth = thinnedWidth;
    child.maxBranchWidth = thinnedWidth * 1.2;
    child.minBranchWidth = thinnedWidth * 0.5;

    // Linear length reduction
    // Reduce max length by a constant step
    // Start minLength very small so it grows from the attachment point
    const lengthReduction = 0;
    child.maxBranchLength = Math.max(
      50,
      0.3 * this.maxBranchLength - lengthReduction, // much longer deep branches (was 0.5)
    );
    child.minBranchLength = 2; // Start from base!
    child.length = child.minBranchLength;

    // Reposition anchor to the base to avoid popping in at 20px
    child.anchor.x = child.node.x + child.minBranchLength * Math.cos(angle);
    child.anchor.y = child.node.y + child.minBranchLength * Math.sin(angle);
    // Reset velocities just in case
    child.anchor.dx = 0;
    child.anchor.dy = 0;

    // give the child some initial energy so it can grow
    child.energy = Math.min(
      1,
      (this.energy || 0.5) * (0.4 + Math.random() * 0.6),
    );
    this.children.push(child);
    // set cooldown
    // cooldown grows with depth so upper levels branch slower
    // Faster spawning for tree-like structures
    // Reduced significantly to create dense trees
    // Even faster for upper levels
    this.spawnCooldown = 5 + Math.floor(Math.random() * 10) + currentDepth * 5;
    return child;
  }

  // Helper to get start position, accounting for socket position if defined
  getStartPos() {
    if (
      this.node &&
      this.relativeAngle !== undefined &&
      this.node.angle !== undefined
    ) {
      const a = this.node.angle + this.relativeAngle;
      // We use a simplified radius for physics start to avoid extreme jitter
      // But visually, it comes from the surface.
      // For physics stability, using center is safer, but for "oar" effect lever arm matters.
      // Node.js calculates torque using the surface offset.
      // Edge.js needs to know where it is being pulled FROM to calculate tension correctly?
      // Actually tension is calculated based on distance.
      // If we keep start=center here, the length includes radius.

      // If we want accurate physics, Edge should start from surface socket.
      const r = (this.node.r || 10) * 2.4; // Starts just inside the 2.5r visual boundary
      return {
        x: this.node.x + Math.cos(a) * r,
        y: this.node.y + Math.sin(a) * r,
      };
    }
    // Fallback to center
    return { x: this.node.x, y: this.node.y };
  }

  direction() {
    if (!this.anchor) return { x: 0, y: 0 };

    const start = this.getStartPos();

    const dx = this.anchor.x - start.x;
    const dy = this.anchor.y - start.y;

    if (dx === 0 && dy === 0) return { x: 0, y: 0 };

    const mod = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / mod;
    const uy = dy / mod;

    return { x: ux, y: uy };
  }

  elongation() {
    if (!this.anchor) return 0;

    const start = this.getStartPos();
    const dx = this.anchor.x - start.x;
    const dy = this.anchor.y - start.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  stretch() {
    if (!this.anchor) return 0;

    const s = this.elongation() - this.length;
    return s;
  }

  speed() {
    return -(this.elongation() - this.lastLength);
  }

  tension() {
    if (!this.anchor) return { x: 0, y: 0 };
    const modE = this.k * this.stretch();
    const modD = -this.e * this.speed();
    const mod = modE + modD;
    return { x: this.direction().x * mod, y: this.direction().y * mod };
  }

  compensatePhase(theta) {
    let alpha = Math.atan2(this.direction().y, this.direction().x);
    if (alpha < 0) alpha = (alpha + 2 * Math.PI).toFixed(7) % (2 * Math.PI);
    let diff = Math.abs(theta - alpha);
    let dir = theta >= alpha ? 1 : -1;
    let delta =
      diff < 2 * Math.PI - diff ? dir * diff : -dir * (2 * Math.PI - diff);

    if (Math.abs(delta) < 1e-5) {
      this.anchor.update({ x: 0, y: 0 });
      return { x: 0, y: 0 };
    }

    const dDelta = delta - (this.lDelta ?? delta);
    this.lDelta = delta;
    const elastic = this.phaseK * delta;
    const dump = this.phaseE * dDelta;
    const compound = elastic + dump;

    const compensation = {
      x: -this.direction().y * compound,
      y: this.direction().x * compound,
    };
    this.anchor.update(compensation);
    return { x: -compensation.x, y: -compensation.y, delta: -10 * compound };
  }

  feed(energy) {
    this.energy = Math.max(0, Math.min(1, energy));
    // console.log("Alimentando a las dendritas", this.energy);
    return true;
  }

  isAttached() {
    return this.anchor.attachEdge !== undefined;
  }

  // Recursive check for downstream attachments
  hasAttachedDescendants() {
    if (this.isAttached()) return true;
    for (let ch of this.children) {
      if (ch.hasAttachedDescendants()) return true;
    }
    return false;
  }

  attach(edge, t0, ta) {
    this.anchor.attach(edge);
  }

  draw(context) {
    // Edges use minimal energy for themselves if they are conduits
    // and pass the vast majority (90%) to feed their children.
    if (this.children.length > 0) {
      // Prioritize feeding based on size and complexity
      const weights = this.children.map((ch) => {
        // Weight factors:
        // Base: 20 (Higher base survival chance)
        // Length: +Length (Bigger = hungrier but more established)
        // Children: +Children * 50 (Reduced multiplier to sharing energy)
        // Random: 0.5 to 1.5 (Reduced variance to ensure stability)
        const score = 20 + ch.length + ch.children.length * 50;
        return score * (0.5 + Math.random() * 1.5);
      });

      const totalWeight = weights.reduce((a, b) => a + b, 0);

      // Significantly increased transfer rate to 90% to sustain deeper trees
      // The parent branch acts primarily as a conduit.
      const toFeedChildren = this.energy * 0.9;
      this.energy -= toFeedChildren;

      if (totalWeight > 0) {
        this.children.forEach((ch, i) => {
          const share = weights[i] / totalWeight;
          ch.feed(toFeedChildren * share);
        });
      }
    }

    const noise =
      5 *
      this.growthDisplacements.reduce((acc, displacement, index) => {
        return (
          acc +
          displacement *
            this.energy *
            Math.sin(
              (this.growthFrequencies[index] + this.energy * 0.001) *
                this.time *
                +this.growthPhases[index],
            )
        );
      }, 0);

    this.length += noise;

    // Stateful Growth Logic
    // If we have excess energy, we grow (increase accumulated length)
    // If we have insufficient energy, we atrophy (decrease length) slowly
    // Lowered threshold to near-zero to allow growth everywhere
    const GrowthThreshold = 0.001;
    const MaintenanceCost = 0.002;

    // 1. Pay maintenance for current size
    const sizeCost = (this.length / this.maxBranchLength) * MaintenanceCost;
    this.energy -= sizeCost;

    // 2. Grow or Shrink
    if (this.isAttached()) {
      // Fixed length when attached - smoothly transition to 100
      const targetLength = 30;
      this.length += (targetLength - this.length) * 0.1;
    } else if (
      this.energy > GrowthThreshold &&
      this.length < this.maxBranchLength
    ) {
      // Grow
      // Convert energy to length
      const growth = this.growthSpeed * 2.0;
      this.length += growth;
      // Growing consumes extra energy
      this.energy -= 0.01;
    } else if (this.energy <= 0) {
      // Atrophy if starving completely
      this.length -= 1.0; // Shrink
    }

    // Clamp constraints
    // If starving, allow shrinking to zero. Otherwise respect minBranchLength
    const effectiveMinLength = this.energy <= 0.001 ? 0 : this.minBranchLength;
    this.length = Math.max(
      effectiveMinLength,
      Math.min(this.length, this.maxBranchLength),
    );

    // this.length += this.length + noise > this.minBranchLength ? noise : 0;

    // console.log(this.length, this.minBranchLength)
    this.lastLength = this.elongation();

    // Time tracks maturity, not length directly anymore
    if (!this.isAttached()) {
      this.time += 1;
    }

    // attempt to spawn branches occasionally based on energy and cooldown
    // but ONLY if not attached (prevent dendrite mess around connections)
    if (this.spawnCooldown > 0) this.spawnCooldown -= 1;

    // Aggressive branching logic
    if (
      !this.isAttached() &&
      this.children.length < 8 && // Allow even more children (was 6)
      this.spawnCooldown <= 0 &&
      Math.random() < 0.4 // Higher probability (was 0.3)
    ) {
      // Spawn further out on the branch for tree-like look
      // Allow spawning closer to base for fuller trees
      const t = 0.3 + Math.random() * 0.7; // Use almost entire length
      this.spawnChild(t);
    }

    const { x: ux, y: uy } = this.direction();

    const start = this.getStartPos();
    const cx = start.x; // Start drawing from surface socket!
    const cy = start.y;

    // const cx = this.node.x + (this.drawToCenter ? this.node.r * ux : 0);
    // const cy = this.node.y + (this.drawToCenter ? this.node.r * uy : 0);

    const ax = this.anchor ? this.anchor.x : cx + ux * this.length;
    const ay = this.anchor ? this.anchor.y : cy + uy * this.length;

    context.globalAlpha = 0.5;
    context.fillStyle = "#389088";
    context.shadowColor = "#99bbc5";

    // Cap shadow blur to avoid performance hit or huge glows
    context.shadowBlur = Math.min(20, this.node.energy * 10);

    const dynamicWidth =
      (this.branchWidth * this.baseLength) / this.elongation();
    const startW =
      1.5 *
      Math.max(
        Math.min(dynamicWidth, this.maxBranchWidth),
        this.minBranchWidth,
      );
    const endW = startW * 0.2; // Taper to 20% width at tip

    // Construct curved tentacle shape
    const segments = 8;
    const verticesLeft = [];
    const verticesRight = [];

    // Perpendicular vector for width extrusion
    const nx = -uy;
    const ny = ux;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments; // 0 to 1

      // Linear interpolation of spine
      let px = cx + (ax - cx) * t;
      let py = cy + (ay - cy) * t;

      // Add waviness (noise)
      // Use consistent noise based on time and index
      // Amplitude fades at start (0) and end (0) to keep attachment points solid
      const waveAmp = (1 - Math.abs(2 * t - 1)) * 5; // bulge in middle
      const timeOffset = this.time * 0.05 + i;
      const noiseX = Math.sin(timeOffset) * waveAmp * 0.5 * nx;
      const noiseY = Math.sin(timeOffset) * waveAmp * 0.5 * ny;

      px += noiseX;
      py += noiseY;

      // Interpolate width
      const currentW = startW * (1 - t) + endW * t;

      verticesLeft.push({
        x: px + nx * currentW * 0.5,
        y: py + ny * currentW * 0.5,
      });
      verticesRight.push({
        x: px - nx * currentW * 0.5,
        y: py - ny * currentW * 0.5,
      });
    }

    // Draw the filled polygon found by traversing Left forward and Right backward
    context.beginPath();

    // Move to start (using mid point of first vertices)
    const startL = verticesLeft[0];
    const startR = verticesRight[0];
    context.moveTo(startL.x, startL.y);

    // Curve down left side
    for (let i = 0; i < verticesLeft.length - 1; i++) {
      const p0 = verticesLeft[i];
      const p1 = verticesLeft[i + 1];
      // Simple lineTo or quadratic for smoother look?
      // With enough segments, lineTo is fine, but quadratic is smoother.
      // Let's us midpoints for smooth curve
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      context.quadraticCurveTo(p0.x, p0.y, midX, midY);
    }
    // Final segment to tip
    const lastL = verticesLeft[verticesLeft.length - 1];
    context.lineTo(lastL.x, lastL.y);

    // Tip connection
    const lastR = verticesRight[verticesRight.length - 1];
    context.lineTo(lastR.x, lastR.y);

    // Curve back up right side
    for (let i = verticesRight.length - 1; i > 0; i--) {
      const p0 = verticesRight[i];
      const p1 = verticesRight[i - 1];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      context.quadraticCurveTo(p0.x, p0.y, midX, midY);
    }

    context.lineTo(startR.x, startR.y);
    context.closePath();
    context.fill();

    // Inner highlight (lighter core)
    context.fillStyle = "#62c1cd";
    context.shadowBlur = 0;

    // Draw thinner version
    context.beginPath();
    const coreRatio = 0.4; // Core is 40% width

    // We can reuse the same loop logic but with tighter points
    // Re-calculate or just lerp towards center?
    // Lerp is physically cheaper than re-running the loop with different widths?
    // Actually, reconstructing is safer given the curvature.

    context.moveTo(startL.x, startL.y); // Start generally at same base
    // BUT we want it thinner.
    // Let's just redraw a simpler line for the core or a thinner poly?
    // A thinner poly matches the style better.

    // Optimization: Just stroke the centerline for the core?
    // User asked for "not simple lines".
    // But a highlight stroke *inside* a poly is fine.
    // Let's try drawing a line with variable width? No, canvas 2d limitation.
    // Let's just do a simple stroke over the "spine" logic

    context.beginPath();
    context.strokeStyle = "#80e0d8"; // Bright highlight
    context.lineWidth = startW * 0.3;
    context.lineCap = "round";

    // Stroke the spine
    let first = true;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let px = cx + (ax - cx) * t;
      let py = cy + (ay - cy) * t;

      const waveAmp = (1 - Math.abs(2 * t - 1)) * 5;
      const timeOffset = this.time * 0.05 + i;
      const noiseX = Math.sin(timeOffset) * waveAmp * 0.5 * nx;
      const noiseY = Math.sin(timeOffset) * waveAmp * 0.5 * ny;
      px += noiseX;
      py += noiseY;

      if (first) {
        context.moveTo(px, py);
        first = false;
      } else {
        // Use quadratic interpolation for spine too?
        // Just lineTo is probably okay for the highlight core
        context.lineTo(px, py);
      }
    }
    context.stroke();

    /*
    context.shadowBlur = 2;
    context.shadowColor = "62cdc4ff";
    context.strokeStyle = "62cdc4ff";
    context.lineCap = "round";

    context.lineWidth =
      (1 / 4) *
      Math.max(
        Math.min(dynamicWidth, this.maxBranchWidth),
        this.minBranchWidth,
      );
    context.beginPath();
    context.moveTo(cx, cy);
    if (this.anchor) context.lineTo(this.anchor.x, this.anchor.y);
    context.stroke();
    */

    // draw and update children (prune dead ones)
    for (let i = this.children.length - 1; i >= 0; i--) {
      const ch = this.children[i];

      // update child root physics so branch responds like a smaller stem
      if (ch.node && typeof ch.node.step === "function") {
        ch.node.step(ch, this);
      }

      // Update child anchor physics with Rotational Spring logic
      // Apply torque to maintain the "targetAngle" ensuring branches grow outwards
      if (ch.anchor) {
        if (ch.targetAngle !== undefined) {
          ch.compensatePhase(ch.targetAngle);
        } else {
          // Fallback for legacy/transient states
          ch.anchor.update({ x: 0, y: 0 });
        }
      }

      // draw child (recursive)
      ch.draw(context);

      // if child is unattached and lived too long without attachment, fade and remove
      // Also protect branches that are structural paths to an attachment!
      const isProductive = ch.hasAttachedDescendants(); // Recursive check
      const age = ch.time - (ch.spawnedAt ?? 0);

      // accelerated decay if aged and NOT productive
      if (!isProductive) {
        // base decay
        let decay = 0.000001; // Very gentle base decay
        // accelerate decay if older than spawnLife
        if (age > this.spawnLife) {
          decay = 0.001; // Slow death to allow turnover but not instant
        }
        ch.energy = Math.max(0, (ch.energy ?? 0) - decay);
      }

      // remove child when very low energy and short length (practically invisible)
      // PROTECT PRODUCTIVE BRANCHES FROM DELETION EVEN IF MOMENTARILY STARVED
      if (!isProductive && (ch.energy ?? 0) < 0.001 && ch.length < 5) {
        this.children.splice(i, 1);
      }
    }
  }
}

class Anchor {
  m = 1.0; // Increased mass for laziness (was 0.1)

  constructor(x, y, rootEdge, attachEdge = undefined, attachmentPoint = 1) {
    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 0;

    this.rootEdge = rootEdge;
    this.attachEdge = attachEdge;
    this.attachmentPoint = attachmentPoint;
  }

  get attached() {
    return this.attachEdge !== null;
  }

  netForce() {
    const at = this.attachEdge?.tension() ?? { x: 0, y: 0 };
    const rt = this.rootEdge?.tension() ?? { x: 0, y: 0 };
    return { x: -at.x - rt.x, y: -at.y - rt.y };
  }

  attach(edge, t0, t1) {
    // console.log("Holly", t0, t1)
    this.attachEdge = edge;
    edge.anchor = this;
  }

  update(compensation) {
    const { x: cx, y: cy } = compensation;
    const { x: nx, y: ny } = this.netForce();

    // High drag on anchor to make it trail behind heavily
    const fx = cx + nx - 0.4 * this.dx; // Significantly increased drag (was 0.1)
    const fy = cy + ny - 0.4 * this.dy;

    const ax = fx / this.m;
    const ay = fy / this.m;

    this.dx += ax;
    this.dy += ay;

    this.dx = 1 * this.dx;
    this.dy = 1 * this.dy;

    const nextx = this.x + this.dx;
    const nexty = this.x + this.dy;
    // Removed strict pinning that was causing unattached edges to get stuck at min length
    // Physics (tension) will naturally maintain the length
    /*
    const distx = this.rootEdge.node.x - nextx;
    const disty = this.rootEdge.node.y - nexty;
    const dist = Math.sqrt(distx * distx + disty * disty);
    if (
      this.rootEdge.node.m !== Infinity &&
      dist < this.rootEdge.minBranchLength
    ) {
      this.dx = 0;
      this.dy = 0;
    }
    */

    this.x += this.dx;
    this.y += this.dy;
    return;
  }
}

export { Anchor };

// Minimal physics node for branch roots so sub-stems follow similar rules
// Instead of independent physics, it rides on the parent edge at a fixed relative position (t)
class BranchNode {
  constructor(x, y, r = 2, m = 2, parentEdge = null) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = m;
    this.energy = 0;
    this.parentEdge = parentEdge;

    // calculate initial t
    if (this.parentEdge && this.parentEdge.node && this.parentEdge.anchor) {
      const p1 = this.parentEdge.node;
      const p2 = this.parentEdge.anchor;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len2 = dx * dx + dy * dy;
      // project (x,y) onto line p1-p2 to find t
      if (len2 > 0) {
        this.t = ((this.x - p1.x) * dx + (this.y - p1.y) * dy) / len2;
      } else {
        this.t = 0.5;
      }
    } else {
      this.t = 0.5;
    }
  }

  // physics step: just update position to stick to parent edge
  step(rootEdge, attachEdge) {
    if (!this.parentEdge || !this.parentEdge.node || !this.parentEdge.anchor)
      return;

    // "riding" the edge
    const p1 = this.parentEdge.node;
    const p2 = this.parentEdge.anchor;

    // Linear interpolation
    this.x = p1.x + (p2.x - p1.x) * this.t;
    this.y = p1.y + (p2.y - p1.y) * this.t;
  }
}
