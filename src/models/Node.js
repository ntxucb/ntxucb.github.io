import Edge from "./Edge";

export default class Node {
  frictionDrag = 0.1;
  inertia = 15;
  maxCapacity = 1;
  feedRate = 0.17;
  consumeRate = 0.07;
  constructor(x = 0, y = 0, angle = 1, m = 10, density = 0.5) {
    this.x = x;
    this.y = y;
    this.angle = (angle + 2 * Math.PI).toFixed(7) % (2 * Math.PI);
    this.density = density;
    this.m = m;
    this.r = this.m / density;

    this.dx = 0;
    this.dy = 0;
    this.do = 0;
    this.energy = 0;

    this.do = 0;
    this.energy = 0;

    this.edges = [];
    this.spawnCooldown = 0;
    this.stimulus = { x: 0, y: 0 };
    this.seed = Math.random() * 1000; // Stable random seed for visual variance

    // Internal organelles for cytoplasm rendering
    this.organelles = [];
    for (let i = 0; i < 8; i++) {
      this.organelles.push({
        r: Math.random() * 0.4 + 0.1, // radius relative to node
        theta: Math.random() * 2 * Math.PI,
        dist: Math.random() * 0.6, // distance from center (0-1)
        speed: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Initial edges removed - grow from 0 based on energy

    // Keep references for backward compatibility if needed, using proxies (now empty)
    this.upperEdge = null;
    this.lowerEdge = null;
  }

  feed(power, dx = 0, dy = 0) {
    this.energy += this.feedRate * (this.maxCapacity - this.energy) * power;
    if (this.energy >= this.maxCapacity) this.energy = this.maxCapacity;

    // Accumulate directional stimulus with decay
    if (power > 0.01) {
      this.stimulus.x += dx * power * 0.1;
      this.stimulus.y += dy * power * 0.1;
    }
  }

  // Manage dynamic structure
  updateStructure() {
    // Decay stimulus
    this.stimulus.x *= 0.95;
    this.stimulus.y *= 0.95;

    if (this.spawnCooldown > 0) {
      this.spawnCooldown--;
      return;
    }

    // Spawning logic: high energy + strong directional stimulus
    const stimulusStrength = Math.sqrt(
      this.stimulus.x ** 2 + this.stimulus.y ** 2,
    );

    // Dynamic threshold: easier to spawn the first edge
    const energyThreshold = this.edges.length === 0 ? 0.4 : 0.8;
    const stimulusThreshold = this.edges.length === 0 ? 0.2 : 0.5;

    if (
      this.energy > energyThreshold &&
      stimulusStrength > stimulusThreshold &&
      this.edges.length < 6
    ) {
      // Max 6 stems
      const stimulusAngle = Math.atan2(this.stimulus.y, this.stimulus.x);

      // Check if we already have an edge in roughly this direction
      const tooClose = this.edges.some((e) => {
        const edgeDir = e.direction();
        const angle = Math.atan2(edgeDir.y, edgeDir.x);
        // Minimal separation of ~30 degrees
        return Math.abs(angle - stimulusAngle) < 0.5;
      });

      if (!tooClose) {
        // Spawn cost
        this.energy -= 0.3;
        const newEdge = new Edge(this, undefined, stimulusAngle, 0.02, 0.07, {
          drawToCenter: true,
        });
        newEdge.energy = 0.5; // Give it a start
        this.edges.push(newEdge);
        this.spawnCooldown = 150; // Delay before next spawn
      }
    }

    // Pruning logic: if too many edges and low energy, remove weakest (lowest energy edge that is not attached)
    // Relaxed condition: if we have edges and are starving
    // Starvation threshold lowered to 0.05 to prevent flickering
    if (this.energy < 0.05 && this.edges.length > 0) {
      // Find candidate to prune (any unattached edge)
      let pruneIndex = -1;
      let minScore = Infinity;

      for (let i = 0; i < this.edges.length; i++) {
        const e = this.edges[i];

        // Never prune attached edges (connections)
        if (e.isAttached()) continue;
        // Don't re-prune already dying edges
        if (e.isPruned) continue;

        // Score based on structural value.
        // Edges with children (active trees) are much more valuable than stumps.
        // Parents lose energy to children, so raw energy is a bad metric for them.
        // We boost the score significantly for having offspring.
        const score = e.energy + e.children.length * 10;

        if (score < minScore) {
          minScore = score;
          pruneIndex = i;
        }
      }

      if (pruneIndex !== -1) {
        // Mark for death - starve it out
        const e = this.edges[pruneIndex];
        e.isPruned = true;
        e.energy = 0; // Cut off energy immediately so it starts shrinking
      }
    }

    // Cleanup fully dead edges
    for (let i = this.edges.length - 1; i >= 0; i--) {
      const e = this.edges[i];
      if (e.isPruned && e.length < 5) {
        this.edges.splice(i, 1);
      }
    }
  }

  draw(context) {
    this.updateStructure();

    let Fx = 0,
      Fy = 0;

    let T = 0;

    // Sum forces from all edges
    for (const edge of this.edges) {
      const tens = edge.tension();
      const targetAngle =
        edge.direction().y === 0 && edge.direction().x === 0
          ? this.angle
          : Math.atan2(edge.direction().y, edge.direction().x);

      // We want the node to rotate such that edges are relaxed?
      // Original code used compensatePhase relative to 0 and PI for upper/lower.
      // With N edges, maybe we just omit rotational torque from edges for now
      // OR align to the average direction?
      // The original 'compensatePhase' was driving the anchor to align with node.angle.
      // Now we have multiple edges at arbitrary angles.
      // We should probably let the anchors follow their own spawning angle relative to the node,
      // OR just let the node handle translational forces and anchors handle themselves.

      // Re-implementing original logic roughly:
      // The anchors want to stay at their designated angle relative to node.angle??
      // In original code: upperEdge assumed at angle, lowerEdge at angle+PI.

      // For dynamic edges, let's assume they are free-floating relative to the node unless we track their "socket" angle on the soma.
      // For now, let's just sum tensions and simple damping.

      Fx += tens.x;
      Fy += tens.y;

      // If we want the anchor to maintain position relative to the node, we run compensatePhase
      // But we need to know the 'target' angle for this specific edge on the node body.
      // We can infer it from the edge's current angle (spawn angle).

      // Let's assume the edge wants to stay at its spawning angle relative to World,
      // or we assign "sockets" on the node?
      // Simplification: Standard compensatePhase logic essentially tries to keep the anchor at `theta`.
      // Let's keep the anchor 'dragged' by the node but allowing rotation?

      // Actually, compensatePhase takes `theta` which is "where the anchor SHOULD be".
      // For upper/lower it was `this.angle` and `this.angle + PI`.
      // For new edges, we don't track a 'socket'.
      // Let's approximate: Use current angle of edge as target? No, that's circular.

      // Let's Just use tension + damping on node motion.
      // Anchors update themselves via edge.draw -> edge.compensatePhase?
      // Wait, edge.compensatePhase IS called here in Node.draw.

      // We will skip compensatePhase for dynamic edges for now,
      // OR we assume they lock to the angle they were spawned at relative to the node?
      // Let's try: No compensatePhase for dynamic edges, just tension.
      // BUT clean up the original 2 edges:
    }

    // Special handling for the first 2 edges (upper/lower) to maintain original behavior?
    // Or generalize?
    // Let's generalize: We ignore compensatePhase torque for now to avoid spinning crazy.
    // Just translational forces.
    // AND we call compensatePhase with the edge's own current angle to simulate "stiffness" or drag
    // if we wanted.

    // Better: Just apply tension. The anchors update themselves in Edge.js?
    // No, Edge.js anchor.update() is called by compensatePhase usually.
    // If we don't call compensatePhase, the anchor physics won't step!
    // We MUST call compensatePhase or manually update anchor.

    // In Edge.js:
    // if (ch.anchor) { ch.anchor.update({ x: 0, y: 0 }); }
    // This is done for children.

    this.edges.forEach((edge, index) => {
      // Ensure edge knows its relative attachment point (socket)
      if (edge.relativeAngle === undefined) {
        // Lock it to where it currently is relative to node angle
        const dir = edge.direction();
        let currentAngle = Math.atan2(dir.y, dir.x);
        edge.relativeAngle = currentAngle - this.angle;
      }

      const tens = edge.tension();
      Fx += tens.x;
      Fy += tens.y;

      // CALCULATE TORQUE
      // The edge pulls from the surface at (x + r*cos(a), y + r*sin(a))
      // Lever arm is vector from center to surface attachment
      const attachAngle = this.angle + edge.relativeAngle;
      const rx = Math.cos(attachAngle) * this.r * 2.5; // *2.5 for visual radius
      const ry = Math.sin(attachAngle) * this.r * 2.5;

      // Torque = r x F (2D cross product: rx*Fy - ry*Fx)
      const torque = rx * tens.y - ry * tens.x;
      T += torque;

      // Update edge anchor physics
      edge.anchor.update({ x: 0, y: 0 });
    });

    Fx -= 0.5 * this.dx * this.edges.length; // Linear drag
    Fy -= 0.5 * this.dy * this.edges.length;

    const ax = Fx / this.m;
    const ay = Fy / this.m;

    // Rotational Dynamics
    // Inertia approximation (Sphere ~ 2/5 * m * r^2)
    // Scaled up for stable feeling
    const angularInertia = this.m * (this.r * 2.5) * (this.r * 2.5) * 0.5;
    const ao = T / Math.max(1, angularInertia);

    this.dx += ax;
    this.dy += ay;
    this.do += ao;

    // Rotational Drag
    this.do *= 0.9; // Strong damping to prevent spinning out

    this.x += this.dx;
    this.y += this.dy;
    this.angle += this.do;
    this.angle = (this.angle + 2 * Math.PI) % (2 * Math.PI); // Keep 0-2PI

    // Dynamic Membrane Drawing
    // We construct the cell body shape based on where the dendrites (edges) are pulling it.

    // 1. Collect edge angles based on FIXED SOCKETS now, so the blob rotates with the body
    const edgePoints = this.edges.map((e) => {
      // Use the constrained attachment angle instead of the loose direction angle
      // This strictly binds the "spikes" of the blob to the rotating body
      let angle = (this.angle + e.relativeAngle) % (2 * Math.PI);
      if (angle < 0) angle += 2 * Math.PI;
      return { angle, edge: e };
    });

    // 2. Sort to draw polygon in order (Should already be sorted if relativeAngles are kept, but safety first)
    edgePoints.sort((a, b) => a.angle - b.angle);

    // 3. Generate vertices for the blob
    // We include points at the edge attachments, and 'filler' points in the gaps
    const vertices = [];
    const baseR = this.r * 2.5; // Scaled up for visual impact

    // Add time-based oscillation for "plasma" feel
    // Use simple counter if Date is too jerky, but Date is fine for consistent wave
    const time = Date.now() / 1000;

    // Unified noise function for consistency
    const getNoiseRadius = (angle) => {
      // Use stable seed instead of position to prevent vibration when dragging
      const phase = this.seed;
      const noise = Math.sin(angle * 4 + time + phase) * 0.05;
      const noise2 = Math.cos(angle * 2 - time * 0.5) * 0.05;
      return baseR * (0.8 + noise + noise2);
    };

    if (edgePoints.length === 0) {
      // Amorphous blob with no dendrites
      const steps = 24; // More vertices for smoother shape
      for (let i = 0; i < steps; i++) {
        const angle = (i / steps) * 2 * Math.PI;
        // Only noise, no tension
        const radius = getNoiseRadius(angle);
        vertices.push({
          x: this.x + Math.cos(angle) * radius,
          y: this.y + Math.sin(angle) * radius,
        });
      }
    } else {
      for (let i = 0; i < edgePoints.length; i++) {
        const curr = edgePoints[i];
        const next = edgePoints[(i + 1) % edgePoints.length];

        // Point at the edge attachment: stretched out by tension?
        // Ramp up the stretch based on edge length so it doesn't pop instantly
        const lenRatio = Math.min(1.0, Math.max(0, curr.edge.length / 150));

        // Calculate what the radius WOULD be if there were no edge here (pure noise)
        const naturalR = getNoiseRadius(curr.angle) / baseR; // Normalize to factor

        // Target stretch when fully grown (tension dominant)
        const targetStretch = 1.1 + curr.edge.energy * 0.2;

        // Smooth blend: starts at natural noisy shape, morphs to tense spike
        // Using ease-out for smoother start check
        const blend = lenRatio * lenRatio * (3 - 2 * lenRatio); // Smoothstep

        const finalStretch = naturalR * (1 - blend) + targetStretch * blend;

        vertices.push({
          x: this.x + Math.cos(curr.angle) * baseR * finalStretch,
          y: this.y + Math.sin(curr.angle) * baseR * finalStretch,
        });

        // Fill gaps between dendrites
        let diff = next.angle - curr.angle;
        if (diff <= 1e-4) diff += 2 * Math.PI; // Handle wrap-around or single edge (diff~0)

        // If gap is large, add concave/relaxed membrane points
        const desiredSpacing = 0.3; // radians (~17 deg) for smoother blob
        if (diff > desiredSpacing) {
          const count = Math.floor(diff / desiredSpacing);
          for (let j = 1; j <= count; j++) {
            const t = j / (count + 1);
            const ang = curr.angle + diff * t;

            // Use same noise function for gaps to ensure continuity
            const radius = getNoiseRadius(ang);

            vertices.push({
              x: this.x + Math.cos(ang) * radius,
              y: this.y + Math.sin(ang) * radius,
            });
          }
        }
      }
    }

    // Draw the blob using smooth curves
    context.globalAlpha = 0.8;
    // context.fillStyle = "#54aeaf"; // Replaced by dynamic cytoplasm below
    context.beginPath();

    const end = vertices[vertices.length - 1];
    const start = vertices[0];
    context.moveTo((start.x + end.x) / 2, (start.y + end.y) / 2);

    for (let i = 0; i < vertices.length; i++) {
      const p1 = vertices[i];
      const p2 = vertices[(i + 1) % vertices.length];
      context.quadraticCurveTo(
        p1.x,
        p1.y,
        (p1.x + p2.x) / 2,
        (p1.y + p2.y) / 2,
      );
    }
    context.closePath();

    // -- CYTOPLASM RENDERING --
    context.save();
    context.clip(); // Clip to the blob shape

    // 1. Background Gradient (Metabolic State)
    // Way more subtle gradient. Base color is #54aeaf (84, 174, 175)
    // Extremely subtle variations to avoid looking like a button
    const rBase = this.r * 2.5;
    const energyLevel = Math.max(0, Math.min(1, this.energy));

    // Create radial gradient for "glowing" core
    const grd = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      rBase,
    );

    // Core color - very close to original, slightly brighter with energy
    // Reduced dynamic range for subtlety
    const coreLight = `rgba(${84 + energyLevel * 10}, ${174 + energyLevel * 10}, ${175 + energyLevel * 10}, 1)`;
    // Outer rim - almost identical to core for flat look with hint of dimension
    const rimColor = `rgba(${80 + energyLevel * 5}, ${170 + energyLevel * 5}, ${171 + energyLevel * 5}, 1)`;

    grd.addColorStop(0, coreLight);
    grd.addColorStop(1, rimColor);

    context.fillStyle = grd;
    context.fill();

    // 2. Organelles (Floating bits) - Very faint
    this.organelles.forEach((o) => {
      // Rotate organelles based on time and energy (higher energy = faster churn)
      // PLUS rotate with the cell body angle
      o.theta += o.speed * (0.5 + this.energy * 2) + this.do; // Add angular velocity to churn

      // Slight radial pulsation
      const pulse = Math.sin(time * 2 + o.phase) * 0.1;
      const dist = o.dist + pulse * 0.05;

      const ox = this.x + Math.cos(o.theta + this.angle) * rBase * dist; // Apply body rotation
      const oy = this.y + Math.sin(o.theta + this.angle) * rBase * dist;
      const or = rBase * o.r * (0.8 + this.energy * 0.2); // swell with energy

      context.beginPath();
      context.arc(ox, oy, or, 0, 2 * Math.PI);
      // Drastically reduced opacity for subtle texture - almost invisible
      context.fillStyle = `rgba(255, 255, 255, ${0.01 + this.energy * 0.04})`;
      context.fill();
    });

    // 3. Nucleus (The Brain) - Barely visible shadow
    const nucleusR = rBase * 0.25;
    // Rotate nucleus position slightly with body
    const nX = this.x + Math.sin(time * 0.3 + this.angle) * (rBase * 0.05);
    const nY = this.y + Math.cos(time * 0.4 + this.angle) * (rBase * 0.05);

    context.beginPath();
    context.arc(nX, nY, nucleusR, 0, 2 * Math.PI);
    context.fillStyle = "rgba(0, 40, 50, 0.02)"; // Almost invisible shadow
    context.fill();

    // Nucleolus - faint highlight
    context.beginPath();
    context.arc(
      nX - nucleusR * 0.2,
      nY - nucleusR * 0.2,
      nucleusR * 0.3,
      0,
      2 * Math.PI,
    );
    context.fillStyle = "rgba(255, 255, 255, 0.05)";
    context.fill();

    context.restore(); // remove clip

    // Draw outline on top for definition
    context.strokeStyle = `rgba(84, 174, 175, ${0.2 + this.energy * 0.3})`;
    context.lineWidth = 1;
    context.stroke();
    // -- END CYTOPLASM --

    const dEnergy = this.energy * this.consumeRate;
    if (this.energy - dEnergy >= 0) {
      this.edges.forEach((edge) => {
        // Only feed edges that are not marked for pruning
        if (!edge.isPruned) {
          this.energy -= edge.feed(this.energy) ? dEnergy : 0;
        }
      });
    }

    this.edges.forEach((edge) => edge.draw(context));
  }
}
