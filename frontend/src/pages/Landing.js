/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useState } from 'react';
import Marquee from "react-fast-marquee";
import emailjs from "@emailjs/browser";
import {AnimatePresence, motion} from "framer-motion"
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
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';
import GavelIcon from '@mui/icons-material/Gavel';
import BoltIcon from '@mui/icons-material/Bolt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
const Landing = ({ModalComponent}) => {
  const nonMobile = useMediaQuery("(min-width:640px)");
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        {
          to_email: email,
        },
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Email Sent!");
        },
        (error) => {
          toast.error("Some error occurred!");
        }
      );
  }
  return (
    <div className="landing min-h-screen w-screen bg-black">
      <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        image1,image2,image3,image4,image5,image6,image7,image8,image9,image10,image11,image12,image13
      ]}
      >
      <div className="image-animation w-screen h-screen"
          >
          <img src="https://media.istockphoto.com/id/953708478/photo/legal-law-concept-image.jpg?s=612x612&w=0&k=20&c=FIf5SdxwbD9sIsDoxDcV5Ff_k1x4rWMHmk3P49mWj0A=" alt=""
            className="w-screen sm:h-screen h-[50vh]" />
        </div>
        <motion.div
          className={`absolute right-[3vw] font-bold  text-[6vh] text-white z-100 sm:w-[50vw] top-[30%] ${nonMobile?"":"text-center"}`}>
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
      <div className="scroll w-screen flex gap-[2vh] text-center flex-col justify-center items-center text-white sm:pt-[8vh] pt-[3vh] pb-[4vh] text-[4vh] font-[Montserrat]">
        <motion.div initial={{ opacity: 0,marginTop:"100px" }} variants={{
          animate: {
            opacity: 1,
            marginTop:"0px"
          }
        }}
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 1 }}>
          Trusted by world's leading companies
        </motion.div>
      <ScrollingLogo/>
      </div>
      <div className="properties flex flex-col pb-[6vh] gap-y-[6vh]">
        <motion.p className="text-center text-white font-semibold text-[4vh]  font-[Montserrat]">Main features of the App:</motion.p>
      <div className="flex flex-wrap px-[10vw] justify-evenly gap-y-[4vh] gap-x-[5vw] text-white bg-black">
        {
          property.map((item, index) => (
            <PropertyCard Icon={item.Icon} title={item.title} description={item.description} index={index}/>
          )
          )
          }
     </div>         
      </div>
      <div className="demo flex justify-center pb-[6vh]">
        <motion.button
          className="py-3 px-2 bg-white text-black text-lg font-[Montserrat] rounded font-semibold"
          intial={{ rotate: "0deg" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85, rotate: "2.5deg" } }
          transition={{
            duration: 0.125,
            ease:"easeInOut"
          }}
          onClick={() => setIsOpen(true)}
          onClick={()=>setIsOpen(true)}>Get Free Demo</motion.button>
      </div>
      <div  className="dark-to-color w-[100%] sm:h-[70vh] h-[40vh] overflow-hidden relative text-white mb-[8vh]">
        <img className="w-[100%] sm:grayscale hover:grayscale-0 h-[70vh] hover:scale-[1.1] transition-all"
          src={nonMobile?"https://imgs.search.brave.com/xhKR0w-TIUkFv5PI1jsMbxnQrqTufGBAcf14zWukr1o/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTE5/MDQxOC5qcGc":"https://cdn.pixabay.com/photo/2016/03/02/10/45/port-1232089_640.jpg"}
          alt="black-white" />
        <motion.div
                  initial={{ opacity: 0,top:"25%" }} variants={{
                    animate: {
                      opacity: 1,
                      top:"10%"
                    }
                  }}
                    whileInView="animate"
                    viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute top-[10%] left-[5%] sm:w-[30%] w-[90%] text-[23px]   font-[Mulish]">
       <p>“AuctionBay has helped us bring in <span className="font-bold">savings of 8-10%</span>  in our purchase. The customer support of AuctionBay is very prompt. Use of AuctionBay has also helped us bring down our turnaround time of purchase from <span className="font-bold">24 hours to 30 minutes</span>.”</p> 
        <p className="text-[#cef144]">-Robert (VincentGog)</p>
        </motion.div>
      </div>
      <div className={`step flex flex-col sm:flex-row px-[5vw] text-white ${nonMobile?"":"text-center"} mb-[6vh]`}>
        <div className="left sm:w-[40vw] w-[90vw]  text-[40px] ">
          <p className="font-bold">How It Works:</p>
          <p className="text-[25px] mb-[6vh]">4 easy steps to achieve results</p>
          {
            ["Share your product", "Invite others", "Launch event", "Start Bidding"].map((item, index) => (
              <motion.p
              initial={{
                opacity: 0,
                translateX: index % 2 === 0 ? -50 : 50,
                translateY: -50,
              }}
              variants={{
                animate:{opacity: 1, translateX: 0, translateY: 0}
              }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              whileInView="animate"
                className={`flex gap-5 items-center mb-[4vh] ${nonMobile?"":"border-2 border-white"}`}>
              <div className="w-[60px] h-[60px] flex justify-center items-center border-2 border-white">{index+1}</div>
              <div className="text-[30px]">{item}</div>
            </motion.p>
            ))
          }
          <motion.button
          className="py-3 px-2 bg-white text-black text-lg font-[Montserrat] rounded font-semibold"
          intial={{ rotate: "0deg" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85, rotate: "2.5deg" } }
          transition={{
            duration: 0.125,
            ease:"easeInOut"
        }}
        onClick={()=>setIsOpen(true)}>Get Free Demo</motion.button>
        </div>
        <div className="right sm:w-[50vw] w-[90vw] sm:mt-[0px] mt-[4vh]">
          <img
            className="w-[100%] h-auto"
            src="https://www.procol.io/static/bb18f12224a835e1881b15853c8788db/a6fb7/auction-dashboard.webp" alt="" />
        </div>
      </div>
      <div className="testimonial-marquee mb-[10vh]">
        <motion.p
          initial={{ opacity: 0,marginTop:"100px" }} variants={{
          animate: {
            opacity: 1,
            marginTop:"0px"
          }
        }}
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[4vh] text-white text-center font-[Montserrat] sm:pb-[5vh] pb-[2vh]">Success Stories</motion.p>
        <Marquee speed={200} pauseOnHover={true} pauseOnClick={true} >
        {
          testimonials.map((item, index) => (
            <div className="sm:w-[700px] sm:h-[220px] flex text-white mr-[2vw] rounded-xl w-[525px] h-[165px]" style={{ backdropFilter: "blur(9px) saturate(180%)",
            backgroundColor: "rgba(15, 23, 42, 0.9)"
          }}>
            <div className="left sm:w-[200px] h-[100%] overflow-hidden w-[150px]">
              <img src={`https://www.hover.dev/imgs/head-shots/${index+1}.jpg`} alt="" className="w-[200px] h-[250px] rounded-xl"/>
            </div>
            <div className="right w-[500px] flex flex-col px-[2vw] justify-evenly">
              <p className="sm:text-[25px] font-bold text-[20px]">{item.name}</p>
              <p className="sm:text-[20px] font-semibold text-[16px]">Founder of {item.company}</p>
                <p className="sm:text-[18px] text-[#87909f] text-[14px]">{item.say}</p>
            </div>
      </div>
          ))
          }
        {
          testimonials.map((item, index) => (
            <div className="sm:w-[700px] sm:h-[220px] flex text-white mr-[2vw] rounded-xl w-[525px] h-[165px]" style={{ backdropFilter: "blur(9px) saturate(180%)",
            backgroundColor: "rgba(15, 23, 42, 0.9)"
          }}>
            <div className="left sm:w-[200px] h-[100%] overflow-hidden w-[150px]">
              <img src={`https://www.hover.dev/imgs/head-shots/${index+1}.jpg`} alt="" className="w-[200px] h-[250px] rounded-xl"/>
            </div>
            <div className="right w-[500px] flex flex-col px-[2vw] justify-evenly">
              <p className="sm:text-[25px] font-bold text-[20px]">{item.name}</p>
              <p className="sm:text-[20px] font-semibold text-[16px]">Founder of {item.company}</p>
                <p className="sm:text-[18px] text-[#87909f] text-[14px]">{item.say}</p>
            </div>
      </div>
          ))
          }
        </Marquee>
        
      </div>
      <div  className="revolutionise text-center mb-[8vh] flex flex-col text-white justify-center items-center gap-y-[4vh]">
        <motion.p
                    initial={{ opacity: 0,marginTop:"100px" }} variants={{
                      animate: {
                        opacity: 1,
                        marginTop:"0px"
                      }
                    }}
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
          className="text-[4vh] font-bold font-[Montserrat]">AuctionBay can revolutionize procurements for you</motion.p>
        <p className="text-[3vh] font-[Mulish]">Connect with an expert who can share more about our solutions and answer any questions you have.</p>
        <motion.button
          className="py-3 px-2 bg-white text-black text-lg font-[Montserrat] rounded font-semibold w-fit"
          intial={{ rotate: "0deg" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85, rotate: "2.5deg" } }
          transition={{
            duration: 0.125,
            ease:"easeInOut"
          }}
          onClick={()=>setIsOpen(true)}>Get Free Demo</motion.button>
        <p className="text-base">Fast Onboarding • Security and Privacy</p>
      </div>
      <div className={`relative send-email flex flex-col px-[10vw] pt-[5vh] pb-[18vh] w-full gap-[5vh] ${nonMobile?"":"text-center"} overflow-hidden`} style={{
        backgroundImage: "url('https://imgs.search.brave.com/AhU1iWmvuy8t-lXDtQCBqTgNN6Lw28BdBmI7vmpVo7U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kaWdp/dGFsc3lub3BzaXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE3LzAyL2JlYXV0/aWZ1bC1jb2xvci1n/cmFkaWVudHMtYmFj/a2dyb3VuZHMtMDAx/LXdhcm0tZmxhbWUu/cG5n')",
        backgroundSize: "cover", 
        
      }}>
        <p className="text-[4vh] font-bold font-[Montserrat]">Get the latest updates in your Inbox!</p>
        <p className="flex gap-x-[2vw]">
          <input type="text" placeholder="Enter Your Email!" className="w-[300px] text-center text-xl rounded"
          onChange={(e)=>{setEmail(e.target.value)}}/>
          <motion.button
          className="py-3 px-2 bg-black text-white text-lg font-[Montserrat] rounded font-semibold"
          intial={{ rotate: "0deg" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85, rotate: "2.5deg" } }
          transition={{
            duration: 0.125,
            ease:"easeInOut"
            }}
          onClick={handleSubmit}>Subscribe</motion.button>
        </p>
        { nonMobile&&<div className="absolute w-[30vw] right-[10vw] top-0 h-[100%]">
          <img
            className="w-auto h-[100%]"
            src="https://cdn.pixabay.com/photo/2023/06/09/19/37/letter-8052497_640.png" alt="" />
        </div>}
      </div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} ModalComponent={ ModalComponent} />
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
  
const PropertyCard = ({ Icon, title, description ,index}) => {
  return (
    <motion.div
      className="flex flex-col w-[300px]  text-center items-center gap-y-[1vh]"
      initial={{
        opacity: 0,
        translateX: index % 2 === 0 ? -50 : 50,
        translateY: -50,
      }}
      variants={{
        animate:{opacity: 1, translateX: 0, translateY: 0}
      }}
      transition={{ duration: 0.3, delay: index * 0.2 }}
      whileInView="animate"
    >
      <div className="image w-fit p-3 rounded" style={{backgroundColor:"rgba(255, 255, 255, 0.13)",backdropFilter:"blur(15px) saturate(100%)"}}>
        <Icon sx={{color:"white",fontSize:"40px"}} />
      </div>
      <p className="text-[22px] font-bold font-[Rubik]">{title}</p>
      <p className="text-[18px] text-[#8b8b8b] font-[Questrial]">{description}</p>
    </motion.div>
  )
}

const property = [{ Icon: VisibilityIcon, title: "Transparency and Visibility", description: "Now view the entire ongoing live-auctions on your web dashboard or mobile. We strive to achieve 100% visibility in  sourcing ." }
  , { Icon: StayCurrentPortraitIcon, title: "Mobile Apps for Suppliers", description: "Our e-auction solutions enable fastest onboarding of Suppliers, giving the clients a  gateway to sell ." }
  , { Icon: GavelIcon, title: "User Friendly Bidding Platform", description: "Placing a bid, or live-auctioning any item on our platform is quite an easy process. You just have to register yourself !" }
  , { Icon: BoltIcon, title: "Advanced Auction Algorithms", description: "AuctionBay has custom built an auction engine that offers highly unique 45+ unique algorithms to generate maximum savings." }
  , { Icon: DashboardIcon, title: "Inbuilt Templates", description: "We have ready to use yet flexible to customise templates that can onboard any category of goods including raw material,MRO etc." }
  , { Icon: DynamicFormIcon, title: "Customised Reporting", description: "Get instant access to reports and insights with customisable parameters for greater insights to make smarter decisions." }
]

const testimonials = [
  {
    name: "John Smith",
    company: "Tech Innovations Ltd.",
    say: "The seamless online experience provided by the auction company significantly elevated our bidding process, making it effortlessly accessible and user-friendly, setting them apart from the competition."
  },
  {
    name: "Alice Johnson",
    company: "Global Solutions Inc.",
    say: "The auction platform's intuitive interface and efficient navigation not only enhanced our overall experience but also facilitated a swift and transparent bidding process, ensuring utmost satisfaction."
  },
  {
    name: "David Miller",
    company: "EcoTech Ventures",
    say: "One notable aspect of the auction company's service is their commitment to transparency, evident in the comprehensive details provided for each listing, instilling confidence and trust among participants."
  },
  {
    name: "Emily Davis",
    company: "Innovate Enterprises",
    say: "The dynamic and engaging nature of the online auctions, coupled with real-time updates and notifications, kept us consistently informed, fostering a sense of excitement and active participation."
  },
  {
    name: "Michael Clark",
    company: "SecureTrade Solutions",
    say: "The robust security measures implemented by the auction platform reassured us about the confidentiality and integrity of our transactions, creating a secure environment for buyers and sellers alike."
  },
  {
    name: "Sophia Turner",
    company: "CustomerSuccess Corp.",
    say: "The responsive customer support team proved to be an invaluable asset, promptly addressing any queries or concerns, exemplifying the auction company's dedication to ensuring a smooth and satisfying auction experience."
  }
];

const SpringModal = ({ isOpen, setIsOpen,ModalComponent }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
           <ModalComponent/> 
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
