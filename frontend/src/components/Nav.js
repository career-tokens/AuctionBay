import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext/authContextProvider";


const Nav = () => {
  const { handleLogout, user } = useContext(authContext);

  return (
    <div className="w-full text-white shadow-md  fixed z-50 uppercase font-[Montserrat]" style={{
      backdropFilter: "blur(10px) saturate(180%)",
      backgroundColor:" rgba(255, 255, 255, 0.17)"

}}>
      <nav className="flex justify-between py-6 max-w-[1300px] m-auto px-4">
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
              <Link
                className="link text-lg font-medium hover:text-xl transition-all ease-in-out"
                to="/login"
              >
                Login
              </Link>{" "}
              /{" "}
              <Link
                className="link text-lg font-medium hover:text-xl transition-all ease-in-out"
                to="/register"
              >
                Sign Up
              </Link>{" "}
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
  );
};

export default Nav;
