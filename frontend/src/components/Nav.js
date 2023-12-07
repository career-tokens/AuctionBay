import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext/authContextProvider";
import LoginComponent from "./Login/LoginComponent"
import { AnimatePresence,motion } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout, user } = useContext(authContext);

  return (
    <>
    <div className="w-[100vw] text-white shadow-md  fixed z-50 uppercase font-[Montserrat]" style={{
      backdropFilter: "blur(10px) saturate(180%)",
      backgroundColor:" rgba(255, 255, 255, 0.17)"

}}>
      <nav className="flex justify-between py-6 w-[100vw] m-auto px-[4vw]">
        <div className="header flex gap-x-3">
        <Link
            className="link text-lg font-medium hover:text-xl transition-all ease-in-out"
            to="/"
          >
            Home
          </Link>
          <Link
            className="link text-lg font-medium hover:text-xl transition-all ease-in-out"
            to="/profile"
          >
            {user && <h1>{user?.username || user}</h1>}
          </Link>
        </div>

        <div className="h-9">
          {!user ? (
            <>
              <div
                className="link text-lg font-medium hover:text-xl transition-all ease-in-out"
                onClick={() => setIsOpen(true)}
              >
                Login
              </div>
            </>
          ) : (
            <button
              className="text-lg font-medium hover:text-xl hover:text-red-600 transition-all ease-in-out"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          )}
        </div>
      </nav>
    </div>
          <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Nav;

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer h-screen w-screen place-content-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-[100vw] max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
          <LoginComponent/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};