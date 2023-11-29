import React from "react";
import Nav from "../Nav";
import AnimatedCursor from "react-animated-cursor"

function Layout({ children }) {

  return (
    <>
      <div className=" bg-[#414852]" style={{height:"fitContent",minHeight:"100vh"}}>{/**background:" linear-gradient(259deg, rgba(34,193,195,1) 0%, rgba(90,45,253,1) 100%)"*/}
      <Nav />
      <div className="max-w-[1300px] m-auto px-4 flex justify-center items-center">
        {children}
      </div>
    </div>
    <AnimatedCursor
      innerSize={14}
      outerSize={20}
      color='0, 0, 0'
      outerAlpha={1}
      innerScale={1}
        outerScale={2}
        outerStyle={
         {backgroundColor:"white"}
        }
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
        {
          target: '.custom',
          options: {
            innerSize: 8,
            outerSize: 8,
            color: '255, 255, 255',
            outerAlpha: 1,
            innerScale: 1,
            outerScale: 2
          }
        }
      ]}
    />
    </>
  );
}

export default Layout;
