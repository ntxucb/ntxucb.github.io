import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";

import ImageContainer from "./ImageContainer";
import BackgroundContainer from "./BackgroundContainer";
import { flushSync } from "react-dom";

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const [inScreen, setInScreen] = useState([0]);
  const scrollable = useRef(null);
  const animationFrameId = useRef(null);
  const [isPending, startTransition] = useTransition();
  //console.log(inScreen)
  const images = useRef(Array(8).fill());
  const background = useRef(null);
  useEffect(function () {
    images.current.forEach((_, index, array) => {
      array[index] = document.getElementById(`${index}-image`);
    });
  }, []);

  useEffect(function () {
    if (!scrollable.current) return;

    function checkScrolll() {
      const element = scrollable.current;
      // console.log(element.scrollHeight)
      const height = element.scrollHeight;
      const position = element.scrollTop;
      const chunk = height / 8;
      const newPanel = Math.floor(position / chunk);
      // onEnter(newPanel)
      if (imageIndex != newPanel) {
        // images.current[newPanel].classList.add("transparent-image")
        
        // images.current.forEach((image, index) => {
        //   if (index == newPanel) {
        //     image.style.opacity = "0";
        //     console.log(newPanel, "off")
        //   } else {
        //     image.style.opacity = "1";
        //     console.log(index,  "on")
        //   }
        // });
        background.current.src=`/${newPanel+1}.jpg`;
        flushSync(() => setImageIndex(newPanel)); //triggers a synchronous render
        //startTransition(() => setImageIndex(newPanel))
      }
      animationFrameId.current = requestAnimationFrame(checkScrolll);
    }
    animationFrameId.current = requestAnimationFrame(checkScrolll);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [imageIndex]);

  // const onEnter = useCallback(
  //   function (index){
  //     setInScreen((arr) => arr.includes(index)? arr : [...arr, index].toSorted((a, b) => a-b))
  //   }
  // , [])

  // const onExit = useCallback(
  //   function (index){
  //     setInScreen((arr) => arr.filter(item => item!=index).toSorted((a, b) => a-b))
  //   }, [])
  // const observer = useRef(new IntersectionObserver(
  //   (entry, observer) => {
  //     entry.isIntersecting

  //   },
  //   {
  //     root: null,
  //     threshold: 0,
  //     rootMargin: 0,
  //   }))
  return (
    <>
      {/* <BackgroundContainer index={inScreen.at(0)}/>    */}
      <BackgroundContainer index={imageIndex} pref={background} />
      <div className="main-container" ref={scrollable}>
        {Array(8)
          .fill()
          .map((_, index) => {
            return (
              <ImageContainer
                key={index}
                index={index}
                // transparent={index==inScreen.at(0)}
                transparent={index == imageIndex}
                // onEnter={onEnter}
                // onExit={onExit}
                // setImageIndex={setImageIndex}
              />
            );
            //<img src={`/${index+1}.jpg`} alt="Pepe mujica" key={index}/>
          })}
      </div>
    </>
  );
}

export default App;


// npm run dev -- --host
// -- separator to pass options to the script