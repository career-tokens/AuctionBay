import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // custom hook to handle registration logic
  const { register, loading, error } = useRegister(
    `https://realtime-auction-backend.onrender.com/users/signup`
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };
    // call the register function from the useRegister hook to send the user's credentials to the server
    register(user.username, user.password, "/");
  };
  return (
    <div className="w-full">
      <form
        className="max-w-lg p-12 m-auto rounded-xl bg-white"
        style={{boxShadow:" 8px 11px 21px 1px rgba(13,17,15,0.7)"}}
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-14">
          <h1 className="text-gray-900 text-4xl" style={{color:"#9649da "}}>Sign Up</h1>
        </div>

        <div className="mb-6">
          <label
            htmfor="email"
            className="block mb-2 text-sm font-medium text-gray-900 text-xl"
          >
            Your Username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="username"
            id="username"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Mainak Mukherjee"
            style={{fontSize:"17px"}}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmfor="password"
            className="block mb-2 text-sm font-medium text-gray-900 text-xl"
          >
            Your Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            style={{fontSize:"17px"}}
            placeholder="********"
          />
        </div>
        <div className="w-full text-center">
        <button
          type="submit"
          className="transition-all text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
        </div>
        <p className="text-gray-500 mt-6 text-center text-lg">
          You have an account ?{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
