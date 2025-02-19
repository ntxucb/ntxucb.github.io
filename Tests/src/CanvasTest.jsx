import React, { useId, useEffect, useRef } from 'react';
import Node from './models/Node';
import NodeCluster from './models/NodeCluster';

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
            cluster.createNode(50, 40, 0.1)
            cluster.createNode(150, 400, 0.3)
            cluster.createNode(250, 300, 0.5)
            cluster.createNode(570, 300, 1.4)
            cluster.createNode(570, 500, 2.3)


            setTimeout(() => {
                cluster[0].upperEdge.anchor.attach(cluster[1].upperEdge)
            }, 1000)

            canvas.current.addEventListener('mousemove',  (e) => {
                cluster.updateMouse(e.clientX, e.clientY)
            })

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

    return <div ref={div} style={{overflow: "auto", height: "100vh", width:"100vw"}}> 
    {/* <span ref={div}>sdfdsf<br/>fsadfsad</span> */}
        <canvas style={{overflow: "auto", width: "100%", height: "100%", objectFit: "contain", display:"block"}} height={height} width={width} ref={canvas}></canvas> 
    </div>  
}

//additional scrollbar width and height are automatically compensated
//when a container width and height are calculated with vw and vh
//scrollbarGutter: "stable both-edges"