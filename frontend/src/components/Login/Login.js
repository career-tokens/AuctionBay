import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Call the useLogin custom hook to handle the login process
  const { login, error, loading, success } = useLogin(
    `${process.env.REACT_APP_TO_BACKEND_URL}/users/login`
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };
    // Call the login function from the useLogin hook
    // to send the user's credentials to the server
    login(user.username, user.password, "/");
  };
  return (
    <div className="w-full">
      <form
        className="max-w-lg p-12 m-auto rounded-xl bg-white"
        style={{boxShadow:" 8px 11px 21px 1px rgba(13,17,15,0.7)"}}
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="text-center mb-2">
            {" "}
            <h1 className="text-red-600 text-2xl">
              Wrong Login information
            </h1>{" "}
          </div>
        )}
        <div className="text-center mb-14">
          <h1 className="text-gray-900 text-4xl" style={{color:"#9649da "}}>Sign In</h1>
        </div>

        <div className="mb-6">
          <label
            htmfor="email"
            className="block mb-2 text-xl font-medium text-gray-900 "
          >
            Your Username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Mainak Mukherjee"
            style={{fontSize:"17px"}}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmfor="password"
            className="block mb-2 text-xl font-medium text-gray-900 "
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
          className="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
        </div>
        <p className="text-gray-500 mt-6 text-lg text-center">
          Don't  have an account ?{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
