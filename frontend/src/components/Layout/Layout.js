import React from "react";
import Nav from "../Nav";

function Layout({ children }) {
  return (
    <div className=" bg-[#4ec4ca]" style={{height:"fitContent",minHeight:"100vh"}}>
      <Nav />
      <div className="max-w-[1300px] m-auto px-4 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default Layout;
