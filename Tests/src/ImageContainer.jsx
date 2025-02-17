import React, { memo, useEffect, useRef } from "react";

const ImageContainer = memo(function ImageContainer({ index, transparent, onEnter, onExit}) {
  const source = `/${index+1}.jpg`;
  const element = useRef(null);

  // useEffect(
  //   function(){
  //     const observer = new IntersectionObserver(
  //         (entries, observer) => {
  //           entries.forEach((entry) => {
  //             // console.log(index, entry)
  //             if(entry.isIntersecting) onEnter(index)
  //             else onExit(index)
  //           })
  //         },  
  //         {
  //           root: null,
  //           threshold: 0,
  //           rootMargin: "0px",
  //         })
  //     observer.observe(element.current)
  //   }, [onEnter, onExit])

  return (
    <div ref={element} id={`${index}-image`} className={"image-container "+ (transparent? "transparent-image": "")}> 
    {/* ref={element}  className={"image-container "+ (transparent? "transparent-image": "")}*/}
      <img src={source} alt={source.toString()} />
    </div>
  );
})


export default ImageContainer;