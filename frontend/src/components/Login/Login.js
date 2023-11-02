import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Call the useLogin custom hook to handle the login process
  const { login, error, loading, success } = useLogin(
    "http://localhost:4000/users/login "
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
          <h1 className="text-gray-900 text-4xl">Sign in</h1>
        </div>

        <div className="mb-6">
          <label
            htmfor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="tunahangediz"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmfor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Submit
        </button>
        <p className="text-gray-500 mt-6">
          don't you have an account{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
