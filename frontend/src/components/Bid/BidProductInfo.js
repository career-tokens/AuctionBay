import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

function BidProductInfo({ product}) {
  console.log("product: ", product)
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
  return (
    <motion.div className="sm:w-[800px] bg-[cadetblue] sm:px-[2vw] sm:py-[2vh] rounded-xl hover:scale-105"
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
       style={{
             boxShadow: "0 2px 20px rgba(0,0,0,0.5)",
             rotateY,
             rotateX,
            transformStyle: "preserve-3d",
             }}>
      <div className="flex w-full justify-center items-center">
        <img src={product.url} alt={product.model} className="w-[80vw] h-[300px] sm:h-[450px] rounded-xl" />
      </div>

      <div className="mt-2 text-center text-white">
        <h3 className="text-2xl font-medium">{product.model}</h3>
        <p className="mt-2 text-xl">{product.description} </p>
      </div>
    </motion.div>
  );
}

export default BidProductInfo;