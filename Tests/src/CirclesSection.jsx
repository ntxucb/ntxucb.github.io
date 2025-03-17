import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './CircleSection.module.css';

export default function CircleSection({children}){
    const selfId = useId()
    const [height, setHeight] = useState(0);
    const selfRef = useRef();

    useEffect(
        function(){
            const selfNode = document.getElementById(selfId);
            const childrenNodes = selfNode.childNodes
            
            const observer = new ResizeObserver(_ => {
                let maxi = 0;
                const top = selfRef.current.getBoundingClientRect().top;
                const childrenNodes = selfNode.childNodes
                childrenNodes.forEach((child) => {
                    const bottomChild = child.getBoundingClientRect().bottom;
                    maxi = Math.max(bottomChild - top, maxi);
                })
                setHeight(maxi);    
            })
            
            childrenNodes.forEach((child) => {
                observer.observe(child)
            })

            return () => {observer.disconnect()}
        }, [])
    
    
    return <div id={selfId} className={styles['circle-section']} ref={selfRef} style={{height: height}}>
        {children}
    </div>
}