import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext/authContextProvider";

const Nav = () => {
  const { handleLogout, user } = useContext(authContext);
  return (
    <div className="w-full bg-white shadow-md mb-12">
      <nav className="flex justify-between py-6 max-w-[1300px] m-auto px-4">
        <div className="header flex gap-x-3">
        <Link
            className="text-lg font-medium hover:text-xl transition-all ease-in-out"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-lg font-medium hover:text-xl transition-all ease-in-out"
            to="/profile"
          >
            {user && <h1>{user?.username || user}</h1>}
          </Link>
        </div>

        <div className="h-9">
          {!user ? (
            <>
              <Link
                className="text-lg font-medium hover:text-xl transition-all ease-in-out"
                to="/login"
              >
                Login
              </Link>{" "}
              /{" "}
              <Link
                className="text-lg font-medium hover:text-xl transition-all ease-in-out"
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
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
