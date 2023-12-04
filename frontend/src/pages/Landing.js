/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef } from 'react';
import {motion} from "framer-motion"
import { useAnimate } from 'framer-motion';
import hammer from '../assets/hammer.jpg';
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.jpg";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import image9 from "../assets/image9.jpg";
import image10 from "../assets/image10.jpg";
import image11 from "../assets/image11.jpg";
import image12 from "../assets/image12.jpg";
import image13 from "../assets/image13.jpg";
import ScrollingLogo from '../components/ScrollingLogo/ScrollingLogo';
const Landing = () => {
  return (
    <div className="landing min-h-screen w-screen bg-black">
          <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13
      ]}
      >
      <div
        className="image-animation w-screen h-screen"
          >
              <img src="https://media.istockphoto.com/id/953708478/photo/legal-law-concept-image.jpg?s=612x612&w=0&k=20&c=FIf5SdxwbD9sIsDoxDcV5Ff_k1x4rWMHmk3P49mWj0A=" alt="" className="w-screen h-screen"/>
        </div>
        <motion.div
          className="absolute right-[3vw] font-bold  text-[6vh] text-white z-100 sm:w-[50vw] top-[30%]">
          <motion.div
            variants={{
            animate:{
               marginTop:"0%",
               opacity:1
            }
            }}
            initial={{
              marginTop: "5%",
              opacity:0
            }}
            whileInView="animate"
            transition={{
              duration: 1,
            }}>
          <p>All in One : E-Auction,E-Bidding, </p>
          <p>E-Tendering</p>
          </motion.div>

          <motion.p className=" absolute text-[3vh] font-semibold mt-[3vh]"
                        variants={{
                          animate:{
                             top:"100%",
                             opacity:1
                          }
                          }}
                          initial={{
                            top: "110%",
                            opacity:0
                          }}
                          whileInView="animate"
                          transition={{
                            duration: 1,
                            delay:0.6
                          }}
          >India's fastest and 100% secure online e-auction platform, to procure and sell all categories of goods with ease.
          </motion.p>
        </motion.div>
      </MouseImageTrail>
      <div className="scroll w-screen flex gap-[2vh] flex-col justify-center items-center h-[300px] text-white py-[2vh] text-[4vh] font-[Montserrat]">
        <motion.div initial={{ opacity: 0,marginTop:"100px" }} variants={{
          animate: {
            opacity: 1,
            marginTop:"0px"
          }
        }}
          whileInView="animate"
          transition={{ duration: 1 }}>
          Trusted by world's leading companies
        </motion.div>
      <ScrollingLogo/>
      </div>
    
    </div>
  );
};

export default Landing;


const MouseImageTrail = ({
    children,
    // List of image sources
    images,
    // Will render a new image every X pixels between mouse moves
    renderImageBuffer,
    // images will be rotated at a random number between zero and rotationRange,
    // alternating between a positive and negative rotation
    rotationRange,
  }) => {
    const [scope, animate] = useAnimate();
  
    const lastRenderPosition = useRef({ x: 0, y: 0 });
    const imageRenderCount = useRef(0);
  
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
  
      const distance = calculateDistance(
        clientX,
        clientY,
        lastRenderPosition.current.x,
        lastRenderPosition.current.y
      );
  
      if (distance >= renderImageBuffer) {
        lastRenderPosition.current.x = clientX;
        lastRenderPosition.current.y = clientY;
  
        renderNextImage();
      }
    };
  
    const calculateDistance = (x1, y1, x2, y2) => {
      const deltaX = x2 - x1;
      const deltaY = y2 - y1;
  
      // Using the Pythagorean theorem to calculate the distance
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
      return distance;
    };
  
    const renderNextImage = () => {
      const imageIndex = imageRenderCount.current % images.length;
      const selector = `[data-mouse-move-index="${imageIndex}"]`;
  
      const el = document.querySelector(selector);
  
      el.style.top = `${lastRenderPosition.current.y}px`;
      el.style.left = `${lastRenderPosition.current.x}px`;
      el.style.zIndex = imageRenderCount.current.toString();
  
      const rotation = Math.random() * rotationRange;
  
      animate(
        selector,
        {
          opacity: [0, 1],
          transform: [
            `translate(-50%, -25%) scale(0.5) ${
              imageIndex % 2
                ? `rotate(${rotation}deg)`
                : `rotate(-${rotation}deg)`
            }`,
            `translate(-50%, -50%) scale(1) ${
              imageIndex % 2
                ? `rotate(-${rotation}deg)`
                : `rotate(${rotation}deg)`
            }`,
          ],
        },
        { type: "spring", damping: 15, stiffness: 200 }
      );
  
      animate(
        selector,
        {
          opacity: [1, 0],
        },
        { ease: "linear", duration: 0.5, delay: 5 }
      );
  
      imageRenderCount.current = imageRenderCount.current + 1;
    };
  
    return (
      <div
        ref={scope}
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {children}
  
        {images.map((img, index) => (
          <img
            className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
            src={img}
            alt={`Mouse move image ${index}`}
            key={index}
            data-mouse-move-index={index}
          />
        ))}
      </div>
    );
  };