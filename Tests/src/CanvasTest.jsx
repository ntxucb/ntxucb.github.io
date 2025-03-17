import React, { useId, useEffect, useRef } from 'react';
import Node from './models/Node';
import NodeCluster from './models/NodeCluster';
import styles from "./CanvasTest.module.css";

export default function CanvasTest(){
    const canvas = useRef()
    const div = useRef()
    useEffect(
        function(){
            if(!canvas.current) return
            const context = canvas.current.getContext("2d")
            
            const cluster = new NodeCluster();
            for(let i = 0; i<100; i++){
              cluster.createNode(Math.random()*1500, Math.random()*1080, Math.random() *2*Math.PI)
            }

            document.addEventListener('mousemove',  (e) => {
                cluster.updateMouse(e.clientX, e.clientY)
            }, true)
            document.addEventListener('touchmove',  (e) => {
              const touch = e.touches[0];
              const rect = div.current.getBoundingClientRect();
              const offsetX = touch.clientX - rect.left;
              const offsetY = touch.clientY - rect.top;
              cluster.updateMouse(offsetX, offsetY)
            }, true)

            document.addEventListener('touchend', () => {
              cluster.removeMouse()
            })

            document.addEventListener('touchcancel', () => {
              cluster.removeMouse()
            })

            let id = 0
            function draw(){
                context.fillStyle = "black"
                context.globalAlpha=0.6
                const w = canvas.current.getBoundingClientRect().width
                const h = canvas.current.getBoundingClientRect().height
                context.fillRect(0, 0, w,  h)
                cluster.draw(context)
                id = requestAnimationFrame(draw)
            }
            draw()
            return () => cancelAnimationFrame(id)
        }
        , [])


    const { innerWidth: width, innerHeight: height } = window;

    return (
      <div className={styles['animation-container']} ref={div}>
        <canvas
          height={height}
          width={width}
          ref={canvas}
        ></canvas>
      </div>
    );  
}

//additional scrollbar width and height are automatically compensated
//when a container width and height are calculated with vw and vh
//scrollbarGutter: "stable both-edges"