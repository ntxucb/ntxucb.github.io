import React, { useId, useEffect, useRef } from 'react';
import Node from './models/Node';

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
            
            const nodeBase = new Node(0, 0, 0, Infinity)
            const node = new Node(1400, 400, Math.PI/2 + 1)
            const node1 = new Node(1500, 300, Math.PI/3 + 1, Infinity)
            setTimeout(() => {
                node.lowerEdge.anchor.attach(nodeBase.lowerEdge)
                node.upperEdge.anchor.attach(node1.lowerEdge)
            }, 1000)

            let id = 0
            function draw(){
                context.clearRect(0, 0, canvas.current.width, canvas.current.height)
                nodeBase.draw(context)
                node.draw(context)
                node1.draw(context)
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