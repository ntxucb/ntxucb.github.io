import React, { useId, useEffect, useRef } from 'react';
import Node from './models/Node';
import NodeCluster from './models/NodeCluster';
import "./HomePage.css"

export default function CanvasTest(){
    const canvas = useRef() // Dont have to ensure uniqueness manually 
    const div = useRef()
    useEffect(
        function(){
            // console.log(canvas.current.scrollHeight)
            // console.log(div.current.scrollHeight)
            // console.log(typeof div.current.getClientRects())
            // console.log(div.current.getClientRects())


            if(!canvas.current) return
            const context = canvas.current.getContext("2d")
            
            const cluster = new NodeCluster();
            cluster.createNode(400, 200, 2.3)
            cluster.createNode(1700, 400, 0.3, Infinity)
            cluster.createNode(250, 300, 0.5, Infinity)
            cluster.createNode(570, 300, 3.3)
            cluster.createNode(570, 500, 2.3)
            cluster.createNode(670, 100, 2.3)
            cluster.createNode(700, 700, 2.3)
            cluster.createNode(870, 300, 2.3)
            cluster.createNode(100, 300, 2.3)
            cluster.createNode(1270, 50, 2.5)
            cluster.createNode(870, 660, 0.3)
            cluster.createNode(770, 200, 0.3)
            cluster.createNode(970, 200, 0.3)


            // setTimeout(() => {
            //     cluster.nodes[4].upperEdge.anchor.attach(cluster.nodes[1].upperEdge)
            //     cluster.nodes[4].lowerEdge.anchor.attach(cluster.nodes[2].lowerEdge)
            //     cluster.nodes[3].lowerEdge.anchor.attach(cluster.nodes[2].lowerEdge)
            //     cluster.nodes[3].upperEdge.anchor.attach(cluster.nodes[4].lowerEdge)
            // }, 3000)

            div.current.addEventListener('mousemove',  (e) => {
                cluster.updateMouse(e.offsetX, e.offsetY)
            }, true)

            let id = 0
            function draw(){
                context.fillStyle = "black"
                context.fillRect(0, 0, canvas.current.width, canvas.current.height)
                cluster.draw(context)
                id = requestAnimationFrame(draw)
            }
            draw()
            return () => cancelAnimationFrame(id)
        }
        , [])


    const { innerWidth: width, innerHeight: height } = window;

    return (
      <div
        className='animation-container'
        ref={div}
        style={{ overflow: "auto", height: "100%", width: "100%" }}
      >
        {/* <span ref={div}>sdfdsf<br/>fsadfsad</span> */}
        <div className="blur-container"></div>
        <canvas
          style={{
            overflow: "auto",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
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