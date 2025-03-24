import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import NodeCluster from "./models//NodeCluster";
import styles from "./CanvasTest.module.css";

const CanvasTest = forwardRef(
  function CanvasTest({progress}, ref){
  const canvas = useRef();
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [cluster, setCluster] = useState(new NodeCluster());

  console.log("Tatito", progress)
  useEffect(
    function () {
      if (!canvas.current) return;
      console.log("Reloaded");
      const newCluster = new NodeCluster();
      for (let i = 0; i < 20; i++) {
        newCluster.createNode(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          Math.random() * 2 * Math.PI, 
         Math.random()*5 + 7
        );
      }
      newCluster.startRandom();
      setCluster(newCluster);
    },
    [canvasHeight, canvasWidth]
  );

  useEffect(
    function () {
      let id = 0;
      const context = canvas.current.getContext("2d");
      function draw() {
        context.fillStyle = "#f4e4dcff";
        context.globalAlpha = 1;
        context.fillRect(-10, -10, canvasWidth + 10, canvasHeight+10);
        cluster.draw(context);
        id = requestAnimationFrame(draw);
      }
      draw();
      return () => cancelAnimationFrame(id);
    },
    [cluster]
  );

  useEffect(
    function () {
      const updateMouse = (e) => {
        const rect = canvas.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        cluster.updateMouse(offsetX, offsetY);
      };

      const updateTouch = (e) => {
        const touch = e.touches[0];
        const rect = canvas.current.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;
        cluster.updateMouse(offsetX, offsetY);
      };

      const removeMouse = (e) => {
        cluster.removeMouse();
      };

      document.addEventListener("mousemove", updateMouse, true);
      document.addEventListener("touchmove", updateTouch, true);
      document.addEventListener("touchend", removeMouse);
      document.addEventListener("touchcancel", removeMouse);

      return function () {
        document.removeEventListener("mousemove", updateMouse);
        document.removeEventListener("touchmove", updateTouch);
        document.removeEventListener("touchend", removeMouse);
        document.removeEventListener("touchcancel", removeMouse);
      };
    },
    [cluster]
  );

  useEffect(function () {
    const observer = new ResizeObserver(() => {
      const w = canvas.current.getBoundingClientRect().width;
      const h = canvas.current.getBoundingClientRect().height;
      setCanvasHeight(h);
      setCanvasWidth(w);
    });
    observer.observe(canvas.current);
  }, []);

  

  return (
    <div className={styles["animation-container"]} ref={ref}>
      <canvas height={canvasHeight} width={canvasWidth} ref={canvas} />
    </div>
  );
});

export default CanvasTest;

//additional scrollbar width and height are automatically compensated
//when a container width and height are calculated with vw and vh
//scrollbarGutter: "stable both-edges"
