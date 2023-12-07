import React, { useEffect } from 'react'
import "./ScrollingLogo.css"
import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png"
import c3 from "../../assets/c3.png"
import c4 from "../../assets/c4.png"
import c5 from "../../assets/c5.png"
import c6 from "../../assets/c6.png"
import c7 from "../../assets/c7.png"
import c8 from "../../assets/c8.png"


const ScrollingLogo = () => {
  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  },[]);

  return (
<div className="scroller" data-direction="right" data-speed="slow">
        <div className="scroller__inner">
  <div className="scroller__inner">
    <img src={c1} alt="" className="ml-[200%] rounded-xl"/>
    <img src={c2} alt="" className="rounded-xl"/>
    <img src={c3} alt="" className="rounded-xl"/>
    <img src={c4} alt="" className="rounded-xl"/>
    <img src={c5} alt="" className="rounded-xl"/>
    <img src={c6} alt="" className="rounded-xl"/>
    <img src={c7} alt="" className="rounded-xl"/>
    <img src={c8} alt="" className="rounded-xl"/>
  </div>
      </div>
      </div>
  )
}

export default ScrollingLogo