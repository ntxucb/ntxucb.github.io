import React, { useRef, useEffect } from "react";
import NodeCluster from "../../models/NodeCluster.js";

export default function NeuronSimulation() {
  const canvasRef = useRef(null);
  const clusterRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const parent = canvas.parentElement || document.body;
      const width = parent.clientWidth;
      const height =
        parent.clientHeight || Math.floor(window.innerHeight * 0.7);

      // Setting style.width/height is crucial for correct display size
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Scaling for HiDPI
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      // Normalize coordinate system to logical pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // If edges look blurry, try translating by 0.5px or ensure positions are round?
      // For now, standard HiDPI scaling is usually enough.

      if (clusterRef.current) {
        clusterRef.current.maxWidth = width;
        clusterRef.current.maxHeight = height;
      }
    }

    resize();
    window.addEventListener("resize", resize);

    const cluster = new NodeCluster();
    clusterRef.current = cluster;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const count = Math.min(6, Math.floor((width * height) / 20000));

    // Track spawned positions to ensure separation
    const spawned = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const m = 10 + Math.random() * 3;

      let x, y, safe;
      let attempts = 0;
      const minDistance = 300; // Minimum distance between centers

      do {
        safe = true;
        // Bias towards center slightly to avoid immediate boundary issues
        x = width * 0.2 + Math.random() * width * 0.6;
        y = height * 0.2 + Math.random() * height * 0.6;

        for (const pos of spawned) {
          const dx = x - pos.x;
          const dy = y - pos.y;
          if (Math.sqrt(dx * dx + dy * dy) < 2 * minDistance) {
            safe = false;
            break;
          }
        }
        attempts++;
      } while (!safe && attempts < 50);

      spawned.push({ x, y });
      cluster.createNode(x, y, angle, m);
    }

    cluster.maxWidth = width;
    cluster.maxHeight = height;

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      cluster.handleMove(e.clientX - rect.left, e.clientY - rect.top);
    }
    function onDown(e) {
      const rect = canvas.getBoundingClientRect();
      cluster.handleDown(e.clientX - rect.left, e.clientY - rect.top);
    }
    function onUp(e) {
      cluster.handleUp();
    }
    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      cluster.handleClick(e.clientX - rect.left, e.clientY - rect.top);
    }
    function onLeave() {
      cluster.removeMouse();
      cluster.handleUp();
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("mouseenter", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    function render() {
      // Use CSS variable if available, else black
      // We read once or assuming it doesn't change every frame to avoid perf hit.
      // But to be safe against trails, we enforce full alpha clear.

      // Clear transparently so CSS background shows through
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      cluster.draw(ctx);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mouseenter", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (
        clusterRef.current &&
        typeof clusterRef.current.endRandom === "function"
      ) {
        clusterRef.current.endRandom();
      }
      clusterRef.current = null;
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        background: "white",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "white",
          filter: "blur(6px) contrast(1.2)",
        }}
      />
    </div>
  );
}
