import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auctionContext } from "../../context/auctionContext/auctionContextProvider";
import { socket } from "../../socket/socket";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function ProductCard({ product }) {
  //animation code starts
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["25.5deg", "-25.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-25.5deg", "25.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

    // a function if text length longer than 100 characters cut it and add ...
    const textEllipsis = (text) => {
      if (text.length > 100) {
        return text.slice(0, 100) + "...";
      }
      else
        return text;
    };
  

  return (
    <Link to={`bid/${product.id}`}>
      <motion.div className="flex flex-col items-center hover:scale-105    bg-white    shadow-2xl rounded-lg overflow-hidden "
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
        style={{
          width: "350px",
          backgroundColor: "#414852",
          boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}>
        <div className="relative z-10 rounded-lg w-full" style={{
          boxShadow: "rgba(0,0,0,0.55) 0 5px 5px 0",
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}>
          <img alt="" src={product.url} className="w-full h-64 rounded-lg"></img>
        </div>
        <div className="px-4 py-6 w-full" style={{transform: "translateZ(50px)",}}>
          <h1 className="text-lg font-semibold rounded-xl p-1 text-center bg-white uppercase font-[Literata] " style={{fontWeight:"700",color:"black"}}>{product.model}</h1>
          <p className="text-ellipsis h-24 overflow-hidden mt-3 font-[Montserrat] text-[14px] leading-7" style={{color:"white"}}>
            {textEllipsis(product.description)}
          </p>
          <div className="bg-black text-white font-medium rounded p-2 text-center " style={{borderLeft:"2px solid white"}}>
            <h1>Click The Card to Enter Auction </h1>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;

const AnimatedDiv = () => {
  
}
